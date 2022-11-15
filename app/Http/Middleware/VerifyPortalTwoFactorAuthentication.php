<?php

namespace App\Http\Middleware;

use Closure;

class VerifyPortalTwoFactorAuthentication
{
    public function handle($request, Closure $next)
    {
        if(!$request->user()->hasEnabledTwoFactorAuthentication()){
            return $next($request);
        }

        $token = $request->header('TwoFactorToken');

        if (!$request->user()->hasValidTwoFactorToken($token)) {
            return response()->json([
                'code' => 'two_factor_token_invalid',
                'message' => 'Two factor token is invalid.'
            ], 401);
        }

        return $next($request);
    }
}
