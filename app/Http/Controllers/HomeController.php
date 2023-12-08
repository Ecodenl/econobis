<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;

class HomeController extends Controller
{
    public function welcome()
    {
        try{
            $clientKey = DB::table('oauth_clients')->where('id', config('app.oauth_client_id'))->first()->secret;
        }catch (\Exception $exception){
            abort(501, 'Er kon (tijdelijk) geen verbinding gemaakt worden. Probeer het later nog eens.');
        }

        return view('welcome', [
            'clientKey' => $clientKey
        ]);
    }
}
