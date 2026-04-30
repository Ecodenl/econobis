<?php

namespace App\Http\Controllers\Auth;

use Illuminate\Http\Request;
use Illuminate\Routing\Controller;

class PortalOauthTokenBridgeController extends Controller
{
    public function issuePortalToken(Request $request)
    {
        $request->validate([
            'username' => ['required', 'string'],
            'password' => ['required', 'string'],
        ]);

        $subRequest = Request::create('/portal/oauth/token', 'POST', [
            'grant_type' => 'password',
            'client_id' => (string) config('app.oauth_client_id'),
            'client_secret' => (string) config('app.oauth_client_secret'),
            'username' => $request->input('username'),
            'password' => $request->input('password'),
        ]);

        return app()->handle($subRequest);
    }
}