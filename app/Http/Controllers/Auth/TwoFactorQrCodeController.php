<?php

namespace App\Http\Controllers\Auth;

use Illuminate\Http\Request;
use Illuminate\Routing\Controller;

class TwoFactorQrCodeController extends Controller
{
    /**
     * Geef de QR code voor de huidige gebruiker om 2fa mee te activeren.
     */
    public function show(Request $request)
    {
        if($request->user()->hasTwoFactorActivated()){
            /**
             * QR kan alleen worden getoond als 2fa nog niet is geactiveerd (=eerste keer activatie), of als gebruiker ook 2fa ingelogd is.
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
