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
            'client_id' => (string) config('app.oauth_portal_client_id'),
            'client_secret' => (string) config('app.oauth_portal_client_secret'),
            'username' => $request->input('username'),
            'password' => $request->input('password'),
            'scope' => 'use-portal',
        ]);

        return app()->handle($subRequest);
    }

    public function refreshPortalToken(Request $request)
    {
        $request->validate([
            'refresh_token' => ['required', 'string'],
        ]);

        $subRequest = Request::create('/portal/oauth/token', 'POST', [
            'grant_type' => 'refresh_token',
            'refresh_token' => $request->input('refresh_token'),
            'client_id' => (string) config('app.oauth_portal_client_id'),
            'client_secret' => (string) config('app.oauth_portal_client_secret'),
            'scope' => 'use-portal',
        ]);

        return app()->handle($subRequest);
    }
}