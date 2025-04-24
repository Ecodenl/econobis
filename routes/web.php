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
use App\Http\Controllers\Portal\ParticipationProject\ParticipantMutationMolliePaymentController;
use App\Http\Middleware\VerifyCsrfToken;
use Illuminate\Support\Facades\DB;

Route::get('/frontend-config', function () {
    $clientId = env('OAUTH_CLIENT_ID', 2);
    $clientKey = DB::table('oauth_clients')->where('id', $clientId)->value('secret');

    return response()->json([
        'client_id' => $clientId,
        'client_key' => $clientKey ?? '',
        'url_api' => env('APP_URL'),
    ]);
});
Route::get('/twinfield', 'Api\Twinfield\TwinfieldController@twinfield');

Route::get('/mollie/betalen/{invoiceCode}', [InvoiceMolliePaymentController::class, 'pay'])->name('mollie.pay');
Route::get('/mollie/redirect/{invoiceCode}', [InvoiceMolliePaymentController::class, 'redirect'])->name('mollie.redirect');

Route::get('/portal/mollie/betalen/{participantMutationCode}', [ParticipantMutationMolliePaymentController::class, 'pay'])->name('portal.mollie.pay');
Route::get('/portal/mollie/redirect/{participantMutationCode}', [ParticipantMutationMolliePaymentController::class, 'redirect'])->name('portal.mollie.redirect');

// Welcome
Route::get('/', 'HomeController@welcome');

Route::get('/oauth/ms-azure/redirect', [MailboxController::class, 'msOauthApiConnectionRedirect'])->name('oauth.ms-azure.redirect');

Route::post('/mailgun/mail/{mailgunPostToken}', [MailgunMailController::class, 'store'])->withoutMiddleware(VerifyCsrfToken::class);