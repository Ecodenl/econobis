<?php

namespace App\Http\Middleware;

use App\Eco\Portal\PortalUser;
use App\Eco\Portal\PortalUserLoginAttempt;
use App\Notifications\Portal\PortalUserPermanentlyBlocked;
use App\Notifications\Portal\PortalUserTemporarilyBlocked;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class LoginPortalAttemptThrottle
{
    /**
     * Handlerschema:
     * 1) Pre-check: blokkeer als user permanent of tijdelijk geblokkeerd is (en log).
     * 2) Laat Passport issueToken afhandelen.
     * 3) Post-check: log resultaat; bij 200 reset, bij 400/401 ophogen + blokkeren, bij 429 markeer rate_limited.
     */
    public function handle(Request $request, Closure $next)
    {
        // Identifier uit password grant payload (frontend stuurt 'username')
        $identifier = $request->input('username') ?? $request->input('email');

        // Probeer user te vinden op email/username; doe niets als onbekend (tegen user enumeration)
        $portalUser = $identifier ? PortalUser::where('email', $identifier)->first() : null;

        // 1) PRE-CHECK: geblokkeerd? -> log intern, extern uniform 401
        if ($portalUser) {
            // Permanent geblokkeerd
            if ($portalUser->blocked_permanent) {
                $this->logAttempt($portalUser, $identifier, $request, false, 'blocked_permanent', $portalUser->failed_logins, null, true);
                return $this->genericUnauthorized();
            }

            // Tijdelijk geblokkeerd
            if ($portalUser->blocked_until && now()->lt($portalUser->blocked_until)) {
                $this->logAttempt($portalUser, $identifier, $request, false, 'blocked_until', $portalUser->failed_logins, $portalUser->blocked_until, false);
                return $this->genericUnauthorized();
            }
        }

        // 2) Laat throttle + Passport issueToken afhandelen
        $response = $next($request);
        $status   = $response->getStatusCode();

        // Geen user → nog steeds uniform reageren, maar intern loggen wat er gebeurde
        if (!$portalUser) {
            if ($status === 200) {
                $this->logAttempt(null, $identifier, $request, true, 'ok');
                return $response;
            }
            // 429 (rate limit) -> uniforme 401 naar buiten, intern loggen als rate_limited
            if ($status === 429) {
                $this->logAttempt(null, $identifier, $request, false, 'rate_limited');
                return $this->genericUnauthorized();
            }
            // 400/401 enz. -> uniforme 401
            $this->logAttempt(null, $identifier, $request, false, in_array($status, [400,401], true) ? 'invalid_grant' : "other_{$status}");
            return $this->genericUnauthorized();
        }

        // 429 van RateLimiter -> uniform 401 naar buiten, intern loggen
        if ($status === 429) {
            $this->logAttempt($portalUser, $identifier, $request, false, 'rate_limited', $portalUser->failed_logins, $portalUser->blocked_until, (bool)$portalUser->blocked_permanent);
            return $this->genericUnauthorized();
        }

        // 3) Post-checks per status
        // 200: reset teller/blokkades en laat het succes gewoon door
        if ($status === 200) {
            if ($portalUser->failed_logins > 0 || $portalUser->blocked_until || $portalUser->blocked_permanent) {
                $portalUser->update([
                    'failed_logins'       => 0,
                    'blocked_until'       => null,
                    'blocked_permanent'   => false,
                ]);
            }
            $this->logAttempt($portalUser, $identifier, $request, true, 'ok', 0);
            return $response;
        }

        // 400/401: mislukt -> teller + drempels, notificaties, uniform 401 terug
        if (in_array($status, [400, 401], true)) {
            $portalUser->increment('failed_logins');
            $portalUser->refresh();

            $result = 'invalid_grant';
            switch ($portalUser->failed_logins) {
                case 15:
                    $portalUser->blocked_permanent = true;
                    $portalUser->blocked_until = null;
                    $portalUser->save();
                    $portalUser->notify(new PortalUserPermanentlyBlocked());
                    $result = 'blocked_permanent_set';
                    break;
                case 10:
                    $until = now()->addHour();
                    $portalUser->update(['blocked_until' => $until]);
                    $portalUser->notify(new PortalUserTemporarilyBlocked($until));
                    $result = 'blocked_until_1h';
                    break;
                case 5:
                    $until = now()->addMinutes(15);
                    $portalUser->update(['blocked_until' => $until]);
                    $portalUser->notify(new PortalUserTemporarilyBlocked($until));
                    $result = 'blocked_until_15m';
                    break;
                default:
                    // 1–4, 6–9, 11–14: geen extra blokkade, alleen loggen
                    break;
            }

            // Log met de actuele stand
            $this->logAttempt(
                $portalUser,
                $identifier,
                $request,
                false,
                $result,
                $portalUser->failed_logins,
                $portalUser->blocked_until,
                (bool) $portalUser->blocked_permanent
            );

            return $this->genericUnauthorized();
        }

        // Overige statuscodes -> intern loggen, extern alsnog uniforme 401
        $this->logAttempt(
            $portalUser,
            $identifier,
            $request,
            false,
            "other_{$status}",
            $portalUser->failed_logins,
            $portalUser->blocked_until,
            (bool) $portalUser->blocked_permanent
        );
        return $this->genericUnauthorized();
    }

    /**
     * Uniforme response naar de frontend (geen enumeratie).
     */
    protected function genericUnauthorized()
    {
        return response()->json([
            'error' => 'Inloggen is niet gelukt. Probeer het (later) opnieuw of reset je wachtwoord als je die vergeten bent. Check je mailbox om te kijken of je account wellicht geblokkeerd is.',
        ], 401);
    }

    /**
     * Schrijf logregel weg naar user_login_attempts.
     */
    protected function logAttempt(
        ?PortalUser $portalUser,
        ?string $identifier,
        Request $request,
        bool $succeeded,
        ?string $result = null,
        ?int $failedLoginsAfter = null,
        $blockedUntil = null,
        bool $blockedPermanent = false
    ): void {
        // Veiligheid: user_agent kan lang zijn; DB kolom user_agent is 512
        $ua = (string) $request->userAgent();
        if (strlen($ua) > 512) { $ua = substr($ua, 0, 512); }

        PortalUserLoginAttempt::create([
            'portal_user_id'      => $portalUser?->id,
            'identifier'          => $identifier,
            'ip'                  => $request->ip(),
            'user_agent'          => $ua,
            'succeeded'           => $succeeded,
            'result'              => $result,
            'failed_logins_after' => $failedLoginsAfter,
            'blocked_until'       => $blockedUntil,
            'blocked_permanent'   => $blockedPermanent,
        ]);
    }
}
