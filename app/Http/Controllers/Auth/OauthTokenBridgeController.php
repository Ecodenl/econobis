<?php

namespace App\Http\Controllers\Auth;

use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
//use Illuminate\Support\Facades\Log;

class OauthTokenBridgeController extends Controller
{
    public function issueClientAppToken(Request $request)
    {
        $request->validate([
            'username' => ['required', 'string'],
            'password' => ['required', 'string'],
        ]);

//        Log::info('Client app token bridge debug', [
//            'client_id' => config('app.oauth_client_id'),
//            'secret_config_prefix' => substr((string) config('app.oauth_client_secret'), 0, 5),
//            'db_secret_prefix' => substr((string) \DB::table('oauth_clients')->where('id', config('app.oauth_client_id'))->value('secret'), 0, 5),
//        ]);

        $subRequest = Request::create('/oauth/token', 'POST', [
            'grant_type' => 'password',
            'client_id' => (string) config('app.oauth_client_id'),
            'client_secret' => (string) config('app.oauth_client_secret'),
            'username' => $request->input('username'),
            'password' => $request->input('password'),
            'scope' => 'use-app',
        ]);

        $response = app()->handle($subRequest);

//        Log::info('Client app token bridge response', [
//            'status' => $response->getStatusCode(),
//            'body' => method_exists($response, 'getContent') ? $response->getContent() : null,
//        ]);

        return $response;
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
            'scope' => 'use-app',
        ]);

        return app()->handle($subRequest);
    }
}