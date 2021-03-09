<?php

use App\Http\Controllers\Api\Setting\SettingController;
use App\Http\Controllers\Portal\ParticipationProject\ParticipantMutationMolliePaymentController;
use JosKolenberg\LaravelJory\Http\Controllers\JoryController;

Route::get('setting/portal-active', 'Setting\PortalSettingController@getPortalActive');
Route::get('setting/cooperative-name', 'Setting\PortalSettingController@getCooperativeName');
Route::get('setting/show-new-at-cooperative-link', 'Setting\PortalSettingController@getShowNewAtCooperativeLink');
Route::get('setting/new-at-cooperative-link-text', 'Setting\PortalSettingController@getNewAtCooperativeLinkText');

Route::post('password/email', 'Auth\ForgotPasswordController@sendResetLinkEmail');
Route::post('password/reset', 'Auth\ResetPasswordController@reset');
Route::post('register', 'Auth\RegisterController@register');
Route::post('new-account', 'Auth\NewAccountController@createNewAccount');

Route::middleware(['auth:api', 'scopes:use-portal'])
    ->group(function () {
        Route::get('/me', 'PortalUser\PortalUserController@me');
        Route::get('/portal-user-email', 'PortalUser\PortalUserController@portalUserEmail');

        Route::post('/portal-user/change-email', 'PortalUser\PortalUserController@changeEmail');
        Route::post('/portal-user/change-password', 'PortalUser\PortalUserController@changePassword');

        Route::post('/contact/{contact}', 'Contact\ContactController@update');
        Route::get('/contact/{contact}/financial-overview-documents', 'Contact\ContactController@financialOverviewDocuments');
        Route::get('/contact/{contact}/related-administrations', 'Contact\ContactController@relatedAdministrations');
        Route::get('/financial-overview-contact/{financialOverviewContact}/download', 'FinancialOverview\FinancialOverviewContactController@download');

        Route::post('/contact/{contact}/{project}/preview-document', 'Contact\ContactController@previewDocument');

        Route::get('/project/participant/{participantProject}', 'ParticipationProject\ParticipationProjectController@show');
        Route::post('/project/participant/create', 'ParticipationProject\ParticipationProjectController@create');

        Route::get('setting', '\\' . SettingController::class . '@get');
        Route::get('setting/multiple', '\\' . SettingController::class . '@multiple');

        Route::get('/contact/{contact}/{project}/contact-project-data', 'Contact\ContactController@getContactProjectData');

        Route::get('/project/participant-mutation/by-code/{code}', 'ParticipantMutation\ParticipantMutationController@getByCode');

        // Apart voor app en portal ivm toepassen aparte middleware
        Route::get('jory', '\\' . JoryController::class . '@multiple');
        Route::get('jory/{uri}/count', '\\' . JoryController::class . '@count');
        Route::get('jory/{uri}/{id}', '\\' . JoryController::class . '@find');
        Route::get('jory/{uri}', '\\' . JoryController::class . '@get');
    });

Route::post('mollie/webhook', [ParticipantMutationMolliePaymentController::class, 'webhook'])->name('portal.mollie.webhook');
