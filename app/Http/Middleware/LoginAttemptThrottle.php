<?php

namespace App\Http\Middleware;

use App\Eco\User\User;
use App\Eco\User\UserLoginAttempt;
use App\Notifications\UserPermanentlyBlocked;
use App\Notifications\UserTemporarilyBlocked;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

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

        // 1) PRE-CHECK: geblokkeerd?
        if ($user) {
            // Permanent geblokkeerd
            if ($user->blocked_permanent) {
                $this->logAttempt($user, $identifier, $request, false, 'blocked_permanent', $user->failed_logins, null, true);

                return response()->json([
                    'error' => 'Account geblokkeerd. Neem contact op met support.'
                ], 423);
            }

            // Tijdelijk geblokkeerd
            if ($user->blocked_until && now()->lt($user->blocked_until)) {
                $this->logAttempt($user, $identifier, $request, false, 'blocked_until', $user->failed_logins, $user->blocked_until, false);

                return response()->json([
                    'error' => 'Te veel mislukte pogingen. Probeer later opnieuw.',
                    'retry_after_seconds' => now()->diffInSeconds($user->blocked_until),
                ], 429);
            }
        }

        // 2) Laat throttle + Passport het werk doen
        $response = $next($request);
        $status   = $response->getStatusCode();

        // Als we geen user konden resolven → toch loggen, maar zonder user_id
        if (!$user) {
            $this->logAttempt(null, $identifier, $request, $status === 200, $status === 200 ? 'ok' : ($status === 429 ? 'rate_limited' : 'invalid_grant'));
            return $response;
        }

        // 429 door RateLimiter (middelware na ons) → log rate limited en klaar
        if ($status === 429) {
            $this->logAttempt($user, $identifier, $request, false, 'rate_limited', $user->failed_logins, $user->blocked_until, (bool)$user->blocked_permanent);
            return $response;
        }

        // 3) Post-checks per status
        if ($status === 200) {
            // Succes: reset teller + blokkades
            $user->failed_logins   = 0;
            $user->blocked_until   = null;
            $user->blocked_permanent = false;
            $user->save();

            $this->logAttempt($user, $identifier, $request, true, 'ok', 0);
            return $response;
        }

        // Mislukking (400/401)
        if (in_array($status, [400, 401], true)) {
            // Teller verhogen en actuele waarde ophalen
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

            return $response;
        }

        if ($status === 200) {
            // Doe alleen updates als er echt iets te resetten valt
            if ($user->failed_logins > 0 || $user->blocked_until || $user->blocked_permanent) {
                $user->update([
                    'failed_logins' => 0,
                    'blocked_until' => null,
                    'blocked_permanent' => false,
                ]);
            }

            $this->logAttempt($user, $identifier, $request, true, 'ok', 0);
            return $response;
        }
    }

    /**
     * Schrijft een regel weg naar user_login_attempts.
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
        // Veiligheid: user_agent kan lang zijn; DB kolom is 512
        $ua = (string) $request->userAgent();
        if (strlen($ua) > 512) {
            $ua = substr($ua, 0, 512);
        }

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
