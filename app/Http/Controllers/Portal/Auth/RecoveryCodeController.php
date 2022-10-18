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
//    public function index(Request $request)
//    {
//        if (! $request->user()->two_factor_secret ||
//            ! $request->user()->two_factor_recovery_codes) {
//            return [];
//        }
//
//        if($request->user()->hasEnabledTwoFactorAuthentication()){
//            /**
//             * Recovery codes mogen alleen worden getoond als 2fa nog niet is geactiveerd (=eerste keer activatie), of als gebruiker ook 2fa ingelogd is.
//             */
//            $token = $request->header('TwoFactorToken');
//
//            if (!$request->user()->hasValidTwoFactorToken($token)) {
//                return response()->json(['message' => 'Two factor authentication is already confirmed, won\'t display recovery codes again without being 2fa authenticated.'], 422);
//            }
//        }
//
//        return response()->json(json_decode(decrypt(
//            $request->user()->two_factor_recovery_codes
//        ), true));
//    }

    /**
     * Check een recoverycode voor de huidige gebruiker.
     * Na succesvolle verificatie worden de 2fa instellingen verwijderd zodat deze opnieuw kunnen worden ingesteld
     */
//    public function recover(TwoFactorLoginRequest $request)
//    {
//        $user = $request->user();
//
//        if ($request->validRecoveryCode()) {
//            $user->two_factor_secret = null;
//            $user->two_factor_recovery_codes = null;
//            $user->two_factor_confirmed_at = null;
//            $user->save();
//        } elseif (! $request->hasValidCode()) {
//            return app(FailedTwoFactorLoginResponse::class)->toResponse($request);
//        }
//
//        return response()->json([], 200);
//    }
}
