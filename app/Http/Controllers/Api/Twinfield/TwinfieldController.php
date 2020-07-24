<?php

namespace App\Http\Controllers\Api\Twinfield;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class TwinfieldController extends Controller
{
    public function twinfield(Request $request)
    {
        //        $redirectUri = \Config::get('app.url_api') . '/api/twinfield';
        $redirectUri = \Config::get('app.url_api') . '/twinfield';
        return view('twinfield', [
            'redirectUri' => $redirectUri,
        ]);
    }

}
