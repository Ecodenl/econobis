<?php

namespace App\Http\Middleware;

use Carbon\Carbon;
use Closure;
use Illuminate\Auth\AuthenticationException;

class VerifyTwoFactorAuthentication
{
    public function handle($request, Closure $next)
    {
        $token = $request->header('TwoFactorToken');

        if (!$request->user()->twoFactorTokens()
            ->where('token', $token)
            ->where('created_at', '>', Carbon::now()->subMinutes(config('auth.two_factor_token_ttl')))
            ->exists()) {
            throw new AuthenticationException();
        }

        return $next($request);
    }
}
