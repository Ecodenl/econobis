<?php

namespace App\Http\Controllers\Auth;

use App\Eco\User\TwoFactorToken;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Str;
use Laravel\Fortify\Actions\ConfirmTwoFactorAuthentication;

class ConfirmedTwoFactorAuthenticationController extends Controller
{
    public function store(Request $request, ConfirmTwoFactorAuthentication $confirm)
    {
        $confirm($request->user(), $request->input('code'));

        $token = new TwoFactorToken([
            'user_id' => $request->user()->id,
            'token' => Str::random(40),
        ]);
        $token->save();

        return response()->json([
            'token' => $token->token,
        ]);
    }
}
