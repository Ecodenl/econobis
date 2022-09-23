<?php

namespace App\Http\Controllers\Auth;

use Carbon\Carbon;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Laravel\Fortify\Actions\EnableTwoFactorAuthentication;

class TwoFactorAuthenticationController extends Controller
{
    public function status(Request $request)
    {
        $token = $request->header('TwoFactorToken');

        return response()->json([
            'requireTwoFactorAuthentication' => $request->user()->requiresTwoFactorAuthentication(),
            'twoFactorActivated' => !!$request->user()->two_factor_secret,
            'hasValidToken' => $request->user()->twoFactorTokens()
                ->where('token', $token)
                ->where('created_at', '>', Carbon::now()->subMinutes(config('auth.two_factor_token_ttl')))
                ->exists(),
        ]);
    }

    public function store(Request $request, EnableTwoFactorAuthentication $enable)
    {
        if($request->user()->two_factor_secret){
            /**
             * Niet een 2e keer generen omdat dan de huidige 2fa meteen ongeldig wordt.
             */
            return response()->json(['message' => 'Two factor authentication is already enabled.'], 422);
        }

        $enable($request->user());

        return new JsonResponse('', 200);
    }
}
