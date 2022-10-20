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
        return response()->json([
            'svg' => $request->user()->twoFactorQrCodeSvg(),
        ]);
    }
}
