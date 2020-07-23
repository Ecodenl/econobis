<?php

namespace App\Http\Controllers\Api\Twinfield;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class TwinfieldController extends Controller
{
    public function twinfield(Request $request)
    {
//        $redirectUri = \Config::get('app.url') . '/api/twinfield';
        $redirectUri = \Config::get('app.url') . '/twinfield';
        return view('twinfield', [
            'redirectUri' => $redirectUri,
        ]);
    }

}
