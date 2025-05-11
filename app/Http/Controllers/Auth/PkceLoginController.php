<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
//use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class PkceLoginController extends Controller
{
    public function login(Request $request)
    {
        $request->validate([
            'username' => 'required|email',
            'password' => 'required',
            'code_challenge' => 'required',
            'code_challenge_method' => 'required',
        ]);

        Log::info('HTTP_REFERER: ' . $_SERVER['HTTP_REFERER']);
        if(str_starts_with($_SERVER['HTTP_REFERER'], 'http://localhost')){
            Log::info('HTTP_REFERER: start met http://localhost');
            $clientId = config('app.oauth_client_id_local');
            $redirect = config('app.url') . '/redirect.html';
        } else {
            Log::info('HTTP_REFERER: start NIET met http://localhost');
            $clientId = config('app.oauth_client_id');
            $redirect = config('app.url') . '/auth/callback';
        }

        $query = http_build_query([
            'response_type' => 'code',
            'client_id' => $clientId,
            'redirect_uri' => $redirect,
            'code_challenge' => $request->code_challenge,
            'code_challenge_method' => $request->code_challenge_method,
//            'scope' => 'use-app',
        ]);

        return response()->json([
            'authorize_url' => url("/oauth/authorize?$query"),
        ]);
    }
}
