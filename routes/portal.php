<?php

Route::middleware('auth:api')
    ->group(function () {
        Route::get('/me', function(){
            dump(config('auth'));
            return \Auth::user();
        });
    });