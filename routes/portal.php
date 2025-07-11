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

Route::middleware(['auth:api', 'scopes:use-portal', 'two-factor-portal'])
    ->group(function () {
        Route::get('/me', 'PortalUser\PortalUserController@me');

        Route::middleware([\App\Http\Middleware\CheckPasswordConfirmationHeader::class])->group(function () {
            Route::get('/me/check-password', 'PortalUser\PortalUserController@checkPassword');
            Route::post('me/two-factor-authentication', [\App\Http\Controllers\Portal\Auth\TwoFactorAuthenticationController::class, 'store']);
            Route::post('me/two-factor-authentication/delete', [\App\Http\Controllers\Portal\Auth\TwoFactorAuthenticationController::class, 'destroy']);
            Route::get('me/two-factor-qr-code', [\App\Http\Controllers\Portal\Auth\TwoFactorQrCodeController::class, 'show']);
            Route::get('me/two-factor-recovery-codes', [\App\Http\Controllers\Portal\Auth\RecoveryCodeController::class, 'index']);
            Route::post('me/two-factor-recovery-codes', [\App\Http\Controllers\Portal\Auth\RecoveryCodeController::class, 'store']);
        });
        Route::get('/portal-user-email', 'PortalUser\PortalUserController@portalUserEmail');

        Route::post('/portal-user/change-email', 'PortalUser\PortalUserController@changeEmail');
        Route::post('/portal-user/change-password', 'PortalUser\PortalUserController@changePassword');

        Route::get('/administration/{administration}/document/{document}/download', 'Administration\AdministrationController@documentDownload');

        Route::post('/contact/{contact}', 'Contact\ContactController@update');
        Route::get('/contact/{contact}/financial-overview-documents', 'Contact\ContactController@financialOverviewDocuments');
        Route::get('/contact/{contact}/related-administrations', 'Contact\ContactController@relatedAdministrations');
        Route::get('/financial-overview-contact/{financialOverviewContact}/download', 'FinancialOverview\FinancialOverviewContactController@download');

        Route::post('/contact/{contact}/{project}/preview-document', 'Contact\ContactController@previewDocument');
        Route::post('/contact/{contact}/{project}/{participantProject}/preview-increase-document', 'Contact\ContactController@previewIncreaseDocument');

        Route::get('/project/{project}/document/{document}/download', 'Project\ProjectController@documentDownload');

        Route::get('/project/participant/{participantProject}', 'ParticipationProject\ParticipationProjectController@show');
        Route::get('/project/participant/{participantProject}/document/{document}/download', 'ParticipationProject\ParticipationProjectController@documentDownload');
        Route::post('/project/participant/create', 'ParticipationProject\ParticipationProjectController@create');
        Route::post('/project/participant/{participantProject}/update', 'ParticipationProject\ParticipationProjectController@update');

        Route::get('setting', '\\' . SettingController::class . '@get');
        Route::get('setting/multiple', '\\' . SettingController::class . '@multiple');

        Route::get('/portal-settings-dashboard/{portalSettingsDashboard}/{contact}', 'PortalSettingsDashboard\PortalSettingsDashboardController@get');

        Route::get('/contact/{contact}/contact-free-fields', 'Contact\ContactController@getContactFreeFields');
        Route::get('/contact/{contact}/contact-portal-free-fields', 'Contact\ContactController@getContactPortalFreeFields');
        Route::get('/contact/{contact}/contact-projects', 'Contact\ContactController@getContactProjects');
        Route::get('/contact/{contact}/{project}/contact-project-data', 'Contact\ContactController@getContactProjectData');

        Route::get('/portal-free-fields-page/{contact}/{urlPageRef}', 'PortalFreeFieldsPage\PortalFreeFieldsPageController@show');
        Route::post('/portal-free-fields-page-values/{contact}/update', 'Contact\ContactController@updatePortalFreeFieldsPageValues');

        Route::get('me/quotation-request', 'QuotationRequest\QuotationRequestController@index');
        Route::get('quotation-request/{quotationRequest}', 'QuotationRequest\QuotationRequestController@view');
        Route::get('quotation-request/{quotationRequest}/documenten', 'QuotationRequest\QuotationRequestController@viewDocumenten');
        Route::post('quotation-request/{quotationRequest}', 'QuotationRequest\QuotationRequestController@update');
        Route::post('quotation-request/{quotationRequest}/uploads', 'QuotationRequest\QuotationRequestController@uploads');
        Route::get('quotation-request/{quotationRequest}/document/{document}/delete', 'QuotationRequest\QuotationRequestController@deleteDocument');
        Route::get('quotation-request/{quotationRequest}/document/{document}/download', 'QuotationRequest\QuotationRequestController@downloadDocument');

        /**
         * Availabilities
         */
        Route::get('portal-user/availability/by-week', [\App\Http\Controllers\Portal\PortalUser\ContactAvailabilityController::class, 'getByWeek']);
        Route::post('portal-user/availability', [\App\Http\Controllers\Portal\PortalUser\ContactAvailabilityController::class, 'update']);
        Route::post('portal-user/availability/copy-weeks', [\App\Http\Controllers\Portal\PortalUser\ContactAvailabilityController::class, 'copyWeeks']);

        // Apart voor app en portal ivm toepassen aparte middleware
        Route::get('jory', '\\' . JoryController::class . '@multiple');
        Route::get('jory/{uri}/count', '\\' . JoryController::class . '@count');
        Route::get('jory/{uri}/{id}', '\\' . JoryController::class . '@find');
        Route::get('jory/{uri}', '\\' . JoryController::class . '@get');
    });

Route::middleware(['auth:api', 'scopes:use-portal'])
    ->group(function () {
        Route::get('me/two-factor-status', [\App\Http\Controllers\Portal\Auth\TwoFactorAuthenticationController::class, 'status']);
        Route::post('me/confirmed-two-factor-authentication', [\App\Http\Controllers\Portal\Auth\ConfirmedTwoFactorAuthenticationController::class, 'store']);
        Route::post('me/two-factor-challenge', [\App\Http\Controllers\Portal\Auth\RecoveryCodeController::class, 'recover']);
    });

Route::post('mollie/webhook', [ParticipantMutationMolliePaymentController::class, 'webhook'])->name('portal.mollie.webhook');
Route::get('mollie/test-webhook/{participantMutationCode}', [ParticipantMutationMolliePaymentController::class, 'testWebhook'])->name('portal.mollie.testWebhook');
