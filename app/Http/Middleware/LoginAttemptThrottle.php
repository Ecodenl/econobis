<?php

namespace App\Http\Middleware;

use App\Eco\User\User;
use App\Eco\User\UserLoginAttempt;
use App\Notifications\UserPermanentlyBlocked;
use App\Notifications\UserTemporarilyBlocked;
use Closure;
use Illuminate\Http\Request;

class LoginAttemptThrottle
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
        $user = $identifier ? User::where('email', $identifier)->first() : null;

        // 1) PRE-CHECK: geblokkeerd? -> log intern, extern uniform 401
        if ($user) {
            // Permanent geblokkeerd
            if ($user->blocked_permanent) {
                $this->logAttempt($user, $identifier, $request, false, 'blocked_permanent', $user->failed_logins, null, true);
                return $this->genericUnauthorized();
            }

            // Tijdelijk geblokkeerd
            if ($user->blocked_until && now()->lt($user->blocked_until)) {
                $this->logAttempt($user, $identifier, $request, false, 'blocked_until', $user->failed_logins, $user->blocked_until, false);
                return $this->genericUnauthorized();
            }
        }

        // 2) Laat throttle + Passport issueToken afhandelen
        $response = $next($request);
        $status   = $response->getStatusCode();

        // Geen user → nog steeds uniform reageren, maar intern loggen wat er gebeurde
        if (!$user) {
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
            $this->logAttempt($user, $identifier, $request, false, 'rate_limited', $user->failed_logins, $user->blocked_until, (bool)$user->blocked_permanent);
            return $this->genericUnauthorized();
        }

        // 3) Post-checks per status
        // 200: reset teller/blokkades en laat het succes gewoon door
        if ($status === 200) {
            if ($user->failed_logins > 0 || $user->blocked_until || $user->blocked_permanent) {
                $user->update([
                    'failed_logins'       => 0,
                    'blocked_until'       => null,
                    'blocked_permanent'   => false,
                ]);
            }
            $this->logAttempt($user, $identifier, $request, true, 'ok', 0);
            return $response;
        }

        // 400/401: mislukt -> teller + drempels, notificaties, uniform 401 terug
        if (in_array($status, [400, 401], true)) {
            $user->increment('failed_logins');
            $user->refresh();

            $result = 'invalid_grant';
            switch ($user->failed_logins) {
                case 15:
                    $user->blocked_permanent = true;
                    $user->blocked_until = null;
                    $user->save();
                    $user->notify(new UserPermanentlyBlocked());
                    $result = 'blocked_permanent_set';
                    break;
                case 10:
                    $until = now()->addHour();
                    $user->update(['blocked_until' => $until]);
                    $user->notify(new UserTemporarilyBlocked($until));
                    $result = 'blocked_until_1h';
                    break;
                case 5:
                    $until = now()->addMinutes(15);
                    $user->update(['blocked_until' => $until]);
                    $user->notify(new UserTemporarilyBlocked($until));
                    $result = 'blocked_until_15m';
                    break;
                default:
                    // 1–4, 6–9, 11–14: geen extra blokkade, alleen loggen
                    break;
            }

            // Log met de actuele stand
            $this->logAttempt(
                $user,
                $identifier,
                $request,
                false,
                $result,
                $user->failed_logins,
                $user->blocked_until,
                (bool) $user->blocked_permanent
            );

            return $this->genericUnauthorized();
        }

        // Overige statuscodes -> intern loggen, extern alsnog uniforme 401
        $this->logAttempt(
            $user,
            $identifier,
            $request,
            false,
            "other_{$status}",
            $user->failed_logins,
            $user->blocked_until,
            (bool) $user->blocked_permanent
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
        ?User $user,
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

        UserLoginAttempt::create([
            'user_id'             => $user?->id,
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
