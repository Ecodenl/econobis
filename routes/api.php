<?php

use App\Eco\User\User;
use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::namespace('Api')
    ->middleware('auth:api')
    ->group(function () {

        Route::get('/me', function (Request $request) {
            return $request->user();
        });

        Route::get('/system-data', function (Request $request){
            return \App\Http\Resources\SystemData\SystemData::make($request);
        });

        Route::get('/contact/grid', 'Contact\GridController@index');
        Route::get('/contact/{contact}', 'Contact\ContactController@show');
        Route::post('/contact/{contact}/delete', 'Contact\ContactController@destroy');

        Route::post('/address', 'Address\AddressController@store');
        Route::post('/address/{address}', 'Address\AddressController@update');
        Route::post('/address/{address}/delete', 'Address\AddressController@destroy');

        Route::post('/email-address', 'EmailAddress\EmailAddressController@store');
        Route::post('/email-address/{emailAddress}', 'EmailAddress\EmailAddressController@update');
        Route::post('/email-address/{emailAddress}/delete', 'EmailAddress\EmailAddressController@destroy');

        Route::post('/phone-number', 'PhoneNumber\PhoneNumberController@store');
        Route::post('/phone-number/{phoneNumber}', 'PhoneNumber\PhoneNumberController@update');
        Route::post('/phone-number/{phoneNumber}/delete', 'PhoneNumber\PhoneNumberController@destroy');

        Route::post('/person', 'Person\PersonController@store');
        Route::post('/person/{person}', 'Person\PersonController@update');

        Route::post('/account', 'Account\AccountController@store');
        Route::post('/account/{account}', 'Account\AccountController@update');

        Route::post('/contact-note', 'ContactNote\ContactNoteController@store');
        Route::post('/contact-note/{contactNote}', 'ContactNote\ContactNoteController@update');
        Route::post('/contact-note/{contactNote}/delete', 'ContactNote\ContactNoteController@destroy');

        Route::get('/account/peek', 'Account\AccountController@peek');
    }
);