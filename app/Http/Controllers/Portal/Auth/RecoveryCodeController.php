<?php

namespace App\Http\Controllers\Portal\Auth;

use App\Http\Requests\TwoFactorLoginRequest;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Laravel\Fortify\Contracts\FailedTwoFactorLoginResponse;

class RecoveryCodeController extends Controller
{
    /**
     * Geef de recoverycode voor de huidige gebruiker
     */
    public function index(Request $request)
    {
        return response()->json(json_decode(decrypt(
            $request->user()->two_factor_recovery_codes
        ), true));
    }

    /**
     * Check een recoverycode voor de huidige gebruiker.
     * Na succesvolle verificatie worden de 2fa instellingen verwijderd zodat deze opnieuw kunnen worden ingesteld
     */
    public function recover(TwoFactorLoginRequest $request)
    {
        $user = $request->user();

        if ($request->validRecoveryCode()) {
            $user->two_factor_secret = null;
            $user->two_factor_recovery_codes = null;
            $user->two_factor_confirmed_at = null;
            $user->save();
        } elseif (! $request->hasValidCode()) {
            return app(FailedTwoFactorLoginResponse::class)->toResponse($request);
        }

        return response()->json([], 200);
    }
}
