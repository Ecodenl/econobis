<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Laravel\Passport\Token;

class EnsureTokenHasScope
{
    public function handle(Request $request, Closure $next, string $scope)
    {
        $user = $request->user(); // auth-code tokens => user gevuld, client-credentials => meestal null

        // Passport plakt het access token object op de request bij succesvolle auth middleware
        // Maar bij client-credentials gebruiken we CheckClientCredentials doorgaans.
        // Daarom: we valideren hier zélf of er een bearer token is en of die scope heeft.

        $psr = app('request'); // Laravel Request is al ok, maar we gebruiken token parsing via passport intern niet publiek
        $bearer = $request->bearerToken();
        if (!$bearer) {
            return response()->json(['message' => 'Unauthenticated.'], 401);
        }

        // Zoek token record
        $token = Token::where('id', $this->tokenIdFromJwt($bearer))->first();
        if (!$token || $token->revoked) {
            return response()->json(['message' => 'Unauthenticated.'], 401);
        }

        if (!$token->can($scope)) {
            return response()->json(['message' => 'Invalid scope(s) provided.'], 403);
        }

        return $next($request);
    }

    private function tokenIdFromJwt(string $jwt): ?string
    {
        // JWT is 3 parts: header.payload.signature
        $parts = explode('.', $jwt);
        if (count($parts) !== 3) return null;

        $payload = json_decode(base64_decode(strtr($parts[1], '-_', '+/')), true);
        // Passport gebruikt meestal 'jti' als token id
        return $payload['jti'] ?? null;
    }
}
