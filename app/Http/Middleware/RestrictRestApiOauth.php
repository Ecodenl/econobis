<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Symfony\Component\HttpFoundation\Response;

class RestrictRestApiOauth
{
    public function handle(Request $request, Closure $next): Response
    {
        if (app()->isLocal()) {
            Log::info('RestrictRestApiOauth HIT', [
                'path' => $request->path(),
                'is' => $request->is('oauth/authorize*'),
                'method' => $request->method(),
                'user' => Auth::guard('web')->user()?->email,
                'session_id' => $request->hasSession() ? $request->session()->getId() : null,
                'web_check' => Auth::guard('web')->check(),
            ]);
//            Log::info('cookies', [
//                'laravel_session_cookie' => $request->cookie(config('session.cookie')),
//            ]);
        }

        // Alleen van toepassing op OAuth authorize flow
        if ($request->is('oauth/authorize*') && Auth::guard('web')->check()) {
            $allowedEmails = config('rest-api-oauth.allowed_emails', []);
            $email = Auth::guard('web')->user()?->email;

            if (app()->isLocal()) {
                Log::warning('RestrictRestApiOauth BLOCK', [
                    'email' => $email,
                    'allowed' => $allowedEmails,
                ]);
            }
            if (
                empty($allowedEmails) === false &&
                (!$email || !in_array($email, $allowedEmails, true))
            ) {
                // user uitloggen (alleen web guard)
                Auth::guard('web')->logout();
                // sessie invalidaten + CSRF token vernieuwen
                $request->session()->invalidate();
                $request->session()->regenerateToken();

                abort(403, 'Je bent niet gemachtigd om deze REST API koppeling te autoriseren.');
            }
        }

        return $next($request);
    }
}
