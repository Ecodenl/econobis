<?php

namespace App\Http\Controllers\Auth;

use Illuminate\Auth\AuthenticationException;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;

class TwoFactorQrCodeController extends Controller
{
    public function show(Request $request)
    {
        if (is_null($request->user()->two_factor_secret)) {
            return [];
        }

        if($request->user()->two_factor_confirmed_at){
            /**
             * QR kan alleen worden getoond als 2fa nog niet is bevestigd (=eerste keer activatie), of als gebruiker ook 2fa ingelogd is.
             */
            $token = $request->header('TwoFactorToken');

            if (!$request->user()->hasValidTwoFactorToken($token)) {
                return response()->json(['message' => 'Two factor authentication is already confirmed, won\'t display QR again without being 2fa authenticated.'], 422);
            }
        }

        return response()->json([
            'svg' => $request->user()->twoFactorQrCodeSvg(),
            'url' => $request->user()->twoFactorQrCodeUrl(),
        ]);
    }
}
