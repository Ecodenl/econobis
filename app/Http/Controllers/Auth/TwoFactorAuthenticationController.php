<?php

namespace App\Http\Controllers\Auth;

use Carbon\Carbon;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Laravel\Fortify\Actions\DisableTwoFactorAuthentication;
use Laravel\Fortify\Actions\EnableTwoFactorAuthentication;

class TwoFactorAuthenticationController extends Controller
{
    public function status(Request $request)
    {
        $token = $request->header('TWO_FACTOR_TOKEN');

        return response()->json([
            'twoFactorEnabled' => $request->user()->two_factor_enabled,
            'twoFactorActivated' => !!$request->user()->two_factor_secret,
            'hasValidToken' => $request->user()->twoFactorTokens()
                ->where('token', $token)
                ->where('created_at', '>', Carbon::now()->subMinutes(config('auth.two_factor_token_ttl')))
                ->exists(),
        ]);
    }

    public function store(Request $request, EnableTwoFactorAuthentication $enable)
    {
        $enable($request->user());

        return new JsonResponse('', 200);
    }
}
