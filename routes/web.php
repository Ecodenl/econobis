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

Route::get('/twinfield', 'Api\Twinfield\TwinfieldController@twinfield');

Route::get('/mollie/betalen/{invoiceCode}', [InvoiceMolliePaymentController::class, 'pay'])->name('mollie.pay');
Route::get('/mollie/redirect/{invoiceCode}', [InvoiceMolliePaymentController::class, 'redirect'])->name('mollie.redirect');

Route::get('/portal/mollie/betalen/{participantMutationCode}', [ParticipantMutationMolliePaymentController::class, 'pay'])->name('portal.mollie.pay');
Route::get('/portal/mollie/redirect/{participantMutationCode}', [ParticipantMutationMolliePaymentController::class, 'redirect'])->name('portal.mollie.redirect');

// Welcome
Route::get('/', 'HomeController@welcome');

Route::get('/oauth/gmail/callback', [MailboxController::class, 'gmailApiConnectionCallback'])->name('oauth.gmail.callback');
//todo WM oauth: nog testen en opschonen !!!
Route::get('/oauth/ms-azure/redirect', [MailboxController::class, 'msOauthApiConnectionRedirect'])->name('oauth.ms-azure.redirect');
//Route::get('/oauth/ms-azure/callback', [MailboxController::class, 'msOauthApiConnectionCallback'])->name('oauth.ms-azure.callback');
Route::post('/mailgun/mail/{mailgunPostToken}', [MailgunMailController::class, 'store'])->name('mailgun.mail.store');