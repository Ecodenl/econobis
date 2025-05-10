<?php

use Laravel\Passport\Http\Controllers\AuthorizationController;
use Laravel\Passport\Http\Controllers\ApproveAuthorizationController;
use Laravel\Passport\Http\Controllers\DenyAuthorizationController;
use Laravel\Passport\Http\Controllers\AccessTokenController;

use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Route;
use Symfony\Bridge\PsrHttpMessage\Factory\PsrHttpFactory;
use Nyholm\Psr7\Factory\Psr17Factory;

Route::middleware(['web'])->group(function () {
    Route::get('/oauth/authorize', function (\Illuminate\Http\Request $request) {
        Log::info('/oauth/authorize bereikt zonder auth middleware', [
            'user' => auth()->user(),
            'session_id' => session()->getId(),
        ]);

        $psr17Factory = new Psr17Factory();
        $psrHttpFactory = new PsrHttpFactory($psr17Factory, $psr17Factory, $psr17Factory, $psr17Factory);
        $psrRequest = $psrHttpFactory->createRequest($request);

        return app(AuthorizationController::class)->authorize(
            $psrRequest, $request,
            app(\Laravel\Passport\ClientRepository::class),
            app(\Laravel\Passport\TokenRepository::class)
        );
    })->name('passport.authorizations.authorize');

    Route::post('/oauth/authorize', [ApproveAuthorizationController::class, 'approve'])
        ->name('passport.authorizations.approve');

    Route::delete('/oauth/authorize', [DenyAuthorizationController::class, 'deny'])
        ->name('passport.authorizations.deny');
});

Route::post('/oauth/token', [AccessTokenController::class, 'issueToken']);
