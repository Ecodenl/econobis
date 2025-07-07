<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Log;

class LogRedirects
{
    public function handle(Request $request, Closure $next)
    {
        Log::info('Voordat $next($request)', [
            'route' => $request->route() ? $request->route()->getName() : 'unknown',
            'uri' => $request->getRequestUri(),
        ]);

        $response = $next($request);

        Log::info('Na $next($request)', [
            'status' => $response->getStatusCode(),
        ]);

        if ($response instanceof RedirectResponse) {
            Log::info('Redirect gedetecteerd', [
                'van' => $request->fullUrl(),
                'naar' => $response->getTargetUrl(),
                'status' => $response->getStatusCode(),
            ]);

            // Probeer veilige access op user achteraf
            $guards = ['portal_web', 'web', null];

            foreach ($guards as $guard) {
                $user = $guard ? auth($guard)->user() : auth()->user();

                if ($user) {
                    Log::info('Redirect voor ingelogde gebruiker', [
                        'user_id' => $user->getAuthIdentifier(),
                        'guard' => $guard ?? 'default',
                    ]);
                    break;
                }
            }

            if (!isset($user)) {
                Log::info('Redirect zonder ingelogde gebruiker', [
                    'url' => $request->fullUrl(),
                    'session_id' => session()->getId(),
                ]);
            }
        }

        return $response;
    }
}

