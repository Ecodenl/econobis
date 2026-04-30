<?php

namespace App\Http\Controllers\RestApi\Oauth;

use App\Http\Controllers\Api\ApiController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class RestApiAuthController extends ApiController
{

    public function token(Request $request)
    {
        $data = $request->validate([
            'client_id' => ['required'],
            'client_secret' => ['required'],
        ]);

        $resp = Http::asForm()->post(url('/oauth/token'), [
            'grant_type' => 'client_credentials',
            'client_id' => $data['client_id'],
            'client_secret' => $data['client_secret'],
            'scope' => 'econobis-rest-api',
        ]);

        return response($resp->body(), $resp->status())
            ->header('Content-Type', 'application/json');
    }

}