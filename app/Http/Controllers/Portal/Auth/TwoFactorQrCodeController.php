<?php

namespace App\Http\Controllers\Portal\Auth;

use Illuminate\Http\Request;
use Illuminate\Routing\Controller;

class TwoFactorQrCodeController extends Controller
{
    public function show(Request $request)
    {
        return response()->json([
            'svg' => $request->user()->twoFactorQrCodeSvg(),
        ]);
    }
}
