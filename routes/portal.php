<?php

use App\Http\Controllers\Api\Setting\SettingController;
use JosKolenberg\LaravelJory\Facades\Jory;
use JosKolenberg\LaravelJory\Http\Controllers\JoryController;

Route::post('password/email', 'Auth\ForgotPasswordController@sendResetLinkEmail');
Route::post('password/reset', 'Auth\ResetPasswordController@reset');
Route::post('register', 'Auth\RegisterController@register');

Route::middleware(['auth:api', 'scopes:use-portal'])
    ->group(function () {
        Route::get('/me', function () {
            return Jory::on(\Auth::user()->contact);
        });

        Route::get('/portal-user-email', function () {
            return \Auth::user()->email;
        });

        Route::post('/contact/{contact}', 'Contact\ContactController@update');

        Route::get('/contact/{contact}/{project}/preview-document', 'Contact\ContactController@previewDocument');

        Route::post('/project/participant/create', 'ParticipationProject\ParticipationProjectController@create');

        Route::get('setting', '\\' . SettingController::class . '@get');
        Route::get('setting/multiple', '\\' . SettingController::class . '@multiple');

        // Apart voor app en portal ivm toepassen aparte middleware
        Route::get('jory', '\\' . JoryController::class . '@multiple');
        Route::get('jory/{uri}/count', '\\' . JoryController::class . '@count');
        Route::get('jory/{uri}/{id}', '\\' . JoryController::class . '@show');
        Route::get('jory/{uri}', '\\' . JoryController::class . '@index');
    });