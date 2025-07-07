<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class SetPortalWebGuard
{
    public function handle($request, Closure $next)
    {
        Log::info('SetPortalWebGuard geactiveerd');

        Auth::shouldUse('portal_web'); // <== hier switch je de sessie-auth context

        return $next($request);
    }
}
