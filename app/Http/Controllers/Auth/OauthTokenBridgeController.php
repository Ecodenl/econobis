<?php

namespace App\Http\Controllers\Auth;

use Illuminate\Http\Request;
use Illuminate\Routing\Controller;

class OauthTokenBridgeController extends Controller
{
    public function issueClientAppToken(Request $request)
    {
        $request->validate([
            'username' => ['required', 'string'],
            'password' => ['required', 'string'],
        ]);

        $subRequest = Request::create('/oauth/token', 'POST', [
            'grant_type' => 'password',
            'client_id' => (string) config('app.oauth_client_id'),
            'client_secret' => (string) config('app.oauth_client_secret'),
            'username' => $request->input('username'),
            'password' => $request->input('password'),
        ]);

        return app()->handle($subRequest);
    }

    public function refreshClientAppToken(Request $request)
    {
        $request->validate([
            'refresh_token' => ['required', 'string'],
        ]);

        $subRequest = Request::create('/oauth/token', 'POST', [
            'grant_type' => 'refresh_token',
            'refresh_token' => $request->input('refresh_token'),
            'client_id' => (string) config('app.oauth_client_id'),
            'client_secret' => (string) config('app.oauth_client_secret'),
        ]);

        return app()->handle($subRequest);
    }
}