<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

use App\Http\Controllers\Api\Invoice\InvoiceMolliePaymentController;
use App\Http\Controllers\Api\Mailbox\MailboxController;
use App\Http\Controllers\Api\Mailbox\MailgunMailController;
use App\Http\Controllers\Auth\PkceLoginController;
use App\Http\Controllers\Portal\ParticipationProject\ParticipantMutationMolliePaymentController;
use App\Http\Middleware\VerifyCsrfToken;
use Illuminate\Support\Facades\Log;

Route::get('/redirect.html', function () {
    return response()->file(public_path('redirect.html'));
});

Route::get('/client-version', function () {
    return response()->json([
        'version' => config('app.version_major') . '.' . config('app.version_minor') . '.' . config('app.version_fix'),
    ]);
});

Route::get('/auth/callback', function (\Illuminate\Http\Request $request) {
     Log::info('HTTP_REFERER: ' . $_SERVER['HTTP_REFERER']);
    if(str_starts_with($_SERVER['HTTP_REFERER'], 'http://localhost')){
        Log::info('HTTP_REFERER: start met http://localhost');
        $clientId = config('app.oauth_client_id_local');
    } else {
        Log::info('HTTP_REFERER: start NIET met http://localhost');
        $clientId = config('app.oauth_client_id');
    }

    $query = http_build_query([
        'code' => $request->get('code'),
        'state' => $request->get('state'),
        'clientId' => $clientId,
        'redirectUri' => config('app.redirectUri'),
    ]);
    return redirect("/#/auth/callback?$query");
});

Route::post('/pkce-login', [PkceLoginController::class, 'login']);

// todo WM: deze frontend-config kan helemaal vervallen als pkce-login werkt!
//Route::get('/frontend-config', function () {
//    if (window.location.hostname === 'localhost') {
//        console.log('loginRouteFields - localhost - getClientId', window.env.CLIENT_ID);
//        return '9';
//    }
//    Log::info('HTTP_REFERER: ' . $_SERVER['HTTP_REFERER']);
//    if(str_starts_with($_SERVER['HTTP_REFERER'], 'http://localhost')){
//        Log::info('HTTP_REFERER: start met http://localhost');
//        $clientId = config('app.oauth_client_id_local');
//    } else {
//        Log::info('HTTP_REFERER: start NIET met http://localhost');
//        $clientId = config('app.oauth_client_id');
//    }
//
//    return response()->json([
//        'client_id' => $clientId,
//        'url_api' => config('app.url'),
//    ]);
//});

Route::get('/twinfield', 'Api\Twinfield\TwinfieldController@twinfield');

Route::get('/mollie/betalen/{invoiceCode}', [InvoiceMolliePaymentController::class, 'pay'])->name('mollie.pay');
Route::get('/mollie/redirect/{invoiceCode}', [InvoiceMolliePaymentController::class, 'redirect'])->name('mollie.redirect');

Route::get('/portal/mollie/betalen/{participantMutationCode}', [ParticipantMutationMolliePaymentController::class, 'pay'])->name('portal.mollie.pay');
Route::get('/portal/mollie/redirect/{participantMutationCode}', [ParticipantMutationMolliePaymentController::class, 'redirect'])->name('portal.mollie.redirect');

// Welcome
Route::get('/', 'HomeController@welcome');

Route::get('/oauth/ms-azure/redirect', [MailboxController::class, 'msOauthApiConnectionRedirect'])->name('oauth.ms-azure.redirect');

Route::post('/mailgun/mail/{mailgunPostToken}', [MailgunMailController::class, 'store'])->withoutMiddleware(VerifyCsrfToken::class);