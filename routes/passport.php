<?php

use App\Http\Middleware\LoginAttemptThrottle;
use Laravel\Passport\Http\Controllers\AccessTokenController;
use Illuminate\Support\Facades\Route;

Route::group(['middleware' => ['scope.app']], function () {
    Route::post('/oauth/token', [AccessTokenController::class, 'issueToken'])
        ->middleware([LoginAttemptThrottle::class, 'throttle:oauth-login']);
});

Route::group(['middleware' => ['passport-portal', 'scope.portal'], 'prefix' => 'portal/oauth'], function () {
    Route::post('/token', [AccessTokenController::class, 'issueToken'])
        ->middleware([\App\Http\Middleware\LoginPortalAttemptThrottle::class, 'throttle:oauth-login-portal']);
});
