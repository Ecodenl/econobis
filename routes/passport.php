<?php

use App\Http\Controllers\Auth\OauthTokenBridgeController;
use App\Http\Middleware\LoginAttemptThrottle;
use App\Http\Middleware\LoginPortalAttemptThrottle;
use Illuminate\Support\Facades\Route;
use Laravel\Passport\Http\Controllers\AccessTokenController;

Route::group(['middleware' => ['scope.app']], function () {
    // Nieuwe bridge voor client-app login
    Route::post('/auth/token', [OauthTokenBridgeController::class, 'issueClientAppToken'])
        ->middleware([LoginAttemptThrottle::class, 'throttle:oauth-login']);

    // Nieuwe bridge voor refresh token
    Route::post('/auth/token/refresh', [OauthTokenBridgeController::class, 'refreshClientAppToken']);

    // Onderliggende Passport route - niet meer rechtstreeks vanuit frontend gebruiken
    Route::post('/oauth/token', [AccessTokenController::class, 'issueToken']);
});

Route::group(['middleware' => ['passport-portal', 'scope.portal'], 'prefix' => 'portal/oauth'], function () {
    Route::post('/token', [AccessTokenController::class, 'issueToken'])
        ->middleware([LoginPortalAttemptThrottle::class, 'throttle:oauth-login-portal']);
});