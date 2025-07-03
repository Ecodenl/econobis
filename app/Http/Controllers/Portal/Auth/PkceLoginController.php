<?php

namespace App\Http\Controllers\Portal\Auth;

use App\Http\Controllers\Controller;
use App\Models\PortalUser;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class PkceLoginController extends Controller
{
    public function login(Request $request)
    {
        $request->validate([
            'username' => 'required|email',
            'password' => 'required',
            'code_challenge' => 'required',
            'code_challenge_method' => 'required|in:S256,plain',
        ]);

        // 1. Vind de user in de juiste portal-user provider
        $user = PortalUser::where('email', $request->username)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json(['message' => 'Invalid credentials'], 401);
        }

        // 2. Bepaal redirect URL (op basis van omgeving)
        if (str_starts_with($request->header('referer'), 'http://localhost')) {
            $clientId = config('app.oauth_client_id_portal_local');
            $redirect = 'http://localhost:3000/auth/callback';
        } else {
            $clientId = config('app.oauth_client_id_portal');
            $redirect = config('app.url') . '/auth/callback';
        }

        // 3. Bouw authorize URL
        $query = http_build_query([
            'response_type' => 'code',
            'client_id' => $clientId,
            'redirect_uri' => $redirect,
            'code_challenge' => $request->code_challenge,
            'code_challenge_method' => $request->code_challenge_method,
            'scope' => 'use-portal',
            'state' => Str::random(32), // optioneel, voor CSRF bescherming
            'prompt' => 'none', // optioneel, kan login scherm overslaan als al ingelogd
        ]);

        $authorizeUrl = url("/oauth/authorize?$query");

        // 4. Response naar frontend
        return response()->json([
            'authorize_url' => $authorizeUrl,
            'client_id' => $clientId,
            'redirect_uri' => $redirect,
        ]);
    }
}
