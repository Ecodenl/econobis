<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\RestApi\Contact\ContactController;


Route::middleware(['client:econobis-rest-api', 'throttle:30,1'])
    ->prefix('contact')
    ->group(function () {
        Route::get('{contactnr}', [ContactController::class, 'getContact']);
    });
