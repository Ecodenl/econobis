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

Route::get('/twinfield', 'Api\Twinfield\TwinfieldController@twinfield');
Route::get('/mollie/redirect/{invoiceMolliePaymentCode}', [InvoiceMolliePaymentController::class, 'redirect'])->name('mollie.redirect');

// Welcome
Route::get('/', 'HomeController@welcome');

