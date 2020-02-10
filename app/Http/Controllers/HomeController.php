<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;

class HomeController extends Controller
{
    public function welcome()
    {
        $clientKey = DB::table('oauth_clients')->where('id', config('app.oauth_client_id'))->first()->secret;
        
        return view('welcome', [
            'clientKey' => $clientKey
        ]);
    }
}
