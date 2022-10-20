<?php

namespace App\Http\Controllers\Auth;

use App\Eco\Cooperation\Cooperation;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Laravel\Fortify\Actions\DisableTwoFactorAuthentication;
use Laravel\Fortify\Actions\EnableTwoFactorAuthentication;

class TwoFactorAuthenticationController extends Controller
{
    /**
     * Geef de huidige status van de 2fa voor de huidige gebruiker.
     */
    public function status(Request $request)
    {
        $token = $request->header('TwoFactorToken');

        return response()->json([
            'cooperationRequiresTwoFactorAuthentication' => Cooperation::first()->require_two_factor_authentication,
            'requireTwoFactorAuthentication' => $request->user()->requiresTwoFactorAuthentication(),
            'twoFactorActivated' => !!$request->user()->hasTwoFactorActivated(),
            'hasValidToken' => $request->user()->hasValidTwoFactorToken($token),
        ]);
    }

    /**
     * Activeer 2fa voor de huidige gebruiker.
     * (we beschouwen 2fa pas als helemaal geactiveerd als de gebruiker ook een eerste keer via 2fa ingelogd heeft)
     */
    public function store(Request $request, EnableTwoFactorAuthentication $enable)
    {
        $user = $request->user();

        if(!$user->two_factor_secret){
            /**
             * Niet een 2e keer generen omdat dan de huidige 2fa meteen ongeldig wordt.
             */
            $enable($user);
        }

        /**
         * Two factor kan vanuit cooperatie verplicht zijn waardoor het wordt geactiveerd.
         * In dat geval ook op user zelf zetten zodat we een kloppende situatie houden mocht verplichte 2fa later weer uitgezet worden voor de cooperatie.
         */
        $user->require_two_factor_authentication = true;
        $user->save();

        return new JsonResponse('', 200);
    }

    public function destroy(Request $request, DisableTwoFactorAuthentication $disable)
    {
        $cooperation = Cooperation::first();

        if($cooperation->require_two_factor_authentication){
            return response()->json(['message' => 'Two factor authentication is required by the cooperation.'], 422);
        }

        $user = $request->user();

        $disable($user);

        $user->require_two_factor_authentication = false;
        $user->two_factor_confirmed_at = null;
        $user->save();

        $user->twoFactorTokens()->delete();

        return new JsonResponse('', 200);
    }
}
