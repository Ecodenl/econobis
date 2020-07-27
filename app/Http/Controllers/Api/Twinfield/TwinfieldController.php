<?php

namespace App\Http\Controllers\Api\Twinfield;

use App\Eco\Administration\Administration;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class TwinfieldController extends Controller
{
    public function twinfield(Request $request)
    {
        //        $redirectUri = \Config::get('app.url_api') . '/api/twinfield';
        $redirectUri = \Config::get('app.url_api') . '/twinfield';
        // todo voor test gebruiken we even administratie met client Id API00392
        $administration = Administration::where('twinfield_client_id', 'API000392')->first();
        return view('twinfield', [
            'redirectUri' => $redirectUri,
            'administration' => $administration,
        ]);
    }

}
