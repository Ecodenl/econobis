<?php

namespace App\Http\Controllers\Portal\Auth;

use Carbon\Carbon;
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
        return response()->json([
            'hasTwoFactorEnabled' => $request->user()->hasEnabledTwoFactorAuthentication(),
        ]);
    }

    public function store(Request $request, EnableTwoFactorAuthentication $enable)
    {
        $user = $request->user();

        $enable($user);

        return new JsonResponse('', 200);
    }

    public function destroy(Request $request, DisableTwoFactorAuthentication $disable)
    {
        $user = $request->user();

        $disable($user);

        $user->two_factor_confirmed_at = null;
        $user->save();

        $user->twoFactorTokens()->delete();

        return new JsonResponse('', 200);
    }
}
