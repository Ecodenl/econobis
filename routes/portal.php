<?php

Route::middleware(['auth:api', 'scopes:use-portal'])
    ->group(function () {
        Route::get('/me', function(){
            return \Auth::user();
        });
    });