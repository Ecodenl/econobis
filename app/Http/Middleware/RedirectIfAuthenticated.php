<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class RedirectIfAuthenticated
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @param  string|null  $guard
     * @return mixed
     */
    public function handle($request, Closure $next, $guard = null)
    {
        Log::info('RedirectIfAuthenticated - wordt dit gebruikt?');
        if (Auth::guard($guard)->check()) {
            Log::info('RedirectIfAuthenticated check true');
            return redirect('/xxx');
        }

        return $next($request);
    }
}
