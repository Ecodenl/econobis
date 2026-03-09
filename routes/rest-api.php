<?php

use App\Http\Controllers\RestApi\Oauth\RestApiAuthController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\RestApi\Contact\ContactController;

Route::post('oauth/token', [RestApiAuthController::class, 'token'])
    ->middleware(['throttle:30,1']); // en géén CSRF

Route::middleware(['econobis.scope:econobis-rest-api', 'throttle:30,1'])
    ->prefix('contact')
    ->group(function () {
        Route::get('{contactPublicId}', [ContactController::class, 'getContact']);
    });