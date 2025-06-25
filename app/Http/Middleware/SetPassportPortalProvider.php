<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Log;

class SetPassportPortalProvider
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        Log::info('SetPassportPortalProvider - wordt dit gebruikt?');

        Config::set('auth.guards.api.provider', 'portal_users');
        Config::set('auth.defaults.passwords', 'portal_users');

        return $next($request);
    }
}
