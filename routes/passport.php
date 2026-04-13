<?php

use App\Http\Controllers\Auth\OauthTokenBridgeController;
use App\Http\Controllers\Auth\PortalOauthTokenBridgeController;
use App\Http\Middleware\LoginAttemptThrottle;
use App\Http\Middleware\LoginPortalAttemptThrottle;
use Illuminate\Support\Facades\Route;
use Laravel\Passport\Http\Controllers\AccessTokenController;

Route::group(['middleware' => ['scope.app']], function () {
    // Bridge voor client-app login
    Route::post('/auth/token', [OauthTokenBridgeController::class, 'issueClientAppToken'])
        ->middleware([LoginAttemptThrottle::class, 'throttle:oauth-login']);

    // Bridge voor client-app refresh token
    Route::post('/auth/token/refresh', [OauthTokenBridgeController::class, 'refreshClientAppToken']);

    // Onderliggende Passport route - niet rechtstreeks vanuit frontend gebruiken
    Route::post('/oauth/token', [AccessTokenController::class, 'issueToken']);
});

Route::group(['prefix' => 'portal'], function () {
    // Bridge voor portal login
    Route::post('/auth/token', [PortalOauthTokenBridgeController::class, 'issuePortalToken'])
        ->middleware([LoginPortalAttemptThrottle::class, 'throttle:oauth-login-portal']);
});

Route::group(['middleware' => ['passport-portal', 'scope.portal'], 'prefix' => 'portal/oauth'], function () {
    Route::post('/token', [AccessTokenController::class, 'issueToken']);
});