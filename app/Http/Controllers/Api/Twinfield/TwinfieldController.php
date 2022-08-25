<?php

namespace App\Http\Controllers\Api\Twinfield;

use App\Eco\Administration\Administration;
use App\Http\Controllers\Api\ApiController;
use Illuminate\Http\Request;

class TwinfieldController extends ApiController
{
    public function twinfield(Request $request)
    {
        $redirectUri = \Config::get('app.url_api') . '/twinfield';
        $administrationUrl = \Config::get('app.url') . '/#/administratie';

        $administrationId = $request->input('administrationId');
        if(!empty($administrationId)) {
            $administration = Administration::find($administrationId);
        }else{
            $administration = null;
        }

        return view('twinfield', [
            'redirectUri' => $redirectUri,
            'administration' => $administration,
            'administrationUrl' => $administrationUrl,
        ]);
    }

}
