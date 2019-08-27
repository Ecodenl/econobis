<?php

use JosKolenberg\LaravelJory\Facades\Jory;
use JosKolenberg\LaravelJory\Http\Controllers\JoryController;

Route::middleware(['auth:api', 'scopes:use-portal'])
    ->group(function () {
        Route::get('/me', function(){
            return Jory::on(\Auth::user()->contact);
        });

        // Apart voor app en portal ivm toepassen aparte middleware
        Route::get('jory', '\\'.JoryController::class.'@multiple');
        Route::get('jory/{uri}/count', '\\'.JoryController::class.'@count');
        Route::get('jory/{uri}/{id}', '\\'.JoryController::class.'@show');
        Route::get('jory/{uri}', '\\'.JoryController::class.'@index');
    });