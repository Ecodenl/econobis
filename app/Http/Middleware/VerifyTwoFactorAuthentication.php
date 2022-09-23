<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Auth\AuthenticationException;

class VerifyTwoFactorAuthentication
{
    public function handle($request, Closure $next)
    {
        if(!$request->user()->requiresTwoFactorAuthentication()){
            return $next($request);
        }

        $token = $request->header('TwoFactorToken');

        if (!$request->user()->hasValidTwoFactorToken($token)) {
            throw new AuthenticationException();
        }

        return $next($request);
    }
}
