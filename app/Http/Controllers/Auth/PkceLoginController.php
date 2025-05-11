<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class PkceLoginController extends Controller
{
    public function login(Request $request)
    {
        Log::info('PkceLoginController - login - komen we hier ??');
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required'],
        ]);

        Log::info('Credentials: ');
        Log::info($credentials);

        if (Auth::guard('web')->attempt($credentials)) {
            $request->session()->regenerate();
//            Log::info('Ingelogde gebruiker: ' . Auth::guard('web')->user()?->email);
            Log::info('Ingelogde gebruiker: ' . Auth::guard('web')->id());
            Log::info(Auth::guard('web')->user());
            Log::info('Gebruiker ingelogd en zou nu doorgestuurd moeten kunnen worden naar /oauth/authorize.', [
                'user_id' => Auth::id(),
                'session' => session()->all(),
            ]);

            $response = response()->json(['message' => 'Logged in']);
            Log::info('Response cookies:', [
                'set_cookie_headers' => $response->headers->get('Set-Cookie'),
            ]);
            return $response;

//            return response()->json(['message' => 'Logged in']);
        }
        return response()->json(['message' => 'Invalid credentials'], 401);
    }
}
