<?php

use Laravel\Passport\Http\Controllers\AccessTokenController;
use Illuminate\Support\Facades\Route;
use Laravel\Passport\Http\Controllers\AuthorizationController;

// Voeg deze regel toe om de authorize route expliciet beschikbaar te maken:
Route::middleware(['web', 'auth'])->group(function () {
    Route::get('/oauth/authorize', [AuthorizationController::class, 'authorize'])->name('passport.authorizations.authorize');
});

Route::group(['middleware' => ['scope.app']], function () {
    Route::post('/oauth/token', [AccessTokenController::class, 'issueToken']);
});

Route::group(['middleware' => ['passport-portal', 'scope.portal'], 'prefix' => 'portal/oauth'], function () {
    Route::post('/token', [AccessTokenController::class, 'issueToken']);
});
