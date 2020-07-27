<?php

namespace App\Http\Controllers\Api\Twinfield;

use App\Eco\Administration\Administration;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class TwinfieldController extends Controller
{
    public function twinfield(Request $request)
    {
        $administrationId = $request->input('administrationId');
        $redirectUri = \Config::get('app.url_api') . '/twinfield';
        if(!empty($administrationId)) {
            $administration = Administration::find($administrationId);
        }
        if(!empty($administration) && $administration->uses_twinfield) {
            return view('twinfield', [
                'redirectUri' => $redirectUri,
                'administration' => $administration,
            ]);
        } else {
            return "Geen geldige administratie gevonden: " . $administrationId;
        }
    }

}
