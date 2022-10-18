<?php

namespace App\Http\Controllers\Portal\Auth;

use App\Eco\Portal\PortalTwoFactorToken;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Str;
use Laravel\Fortify\Actions\ConfirmTwoFactorAuthentication;

class ConfirmedTwoFactorAuthenticationController extends Controller
{
    /**
     * Valideer de 2fa code voor de huidige gebruiker en geef een token terug waarmee de gebruiker 2fa-ingelogd kan blijven.
     */
    public function store(Request $request, ConfirmTwoFactorAuthentication $confirm)
    {
        $user = $request->user();

        $confirm($user, $request->input('code'));

        $token = new PortalTwoFactorToken([
            'portal_user_id' => $user->id,
            'token' => Str::random(40),
        ]);
        $token->save();

        /**
         * Verwijder oude verlopen tokens van deze gebruiker, zodat de tabel niet oneindig aangroeit.
         */
        $user->twoFactorTokens()
            ->where('created_at', '<', Carbon::now()->subMinutes(config('auth.two_factor_token_ttl')))
            ->delete();

        return response()->json([
            'token' => $token->token,
        ]);
    }
}
