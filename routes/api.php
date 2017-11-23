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

        Route::get('/me', 'User\UserController@me');

        Route::get('/system-data', 'SystemData\SystemDataController@get');

        Route::get('/contact/grid', 'Contact\GridController@index');
        Route::get('/contact/{contact}', 'Contact\ContactController@show');
        Route::post('/contact/{contact}/delete', 'Contact\ContactController@destroy');

        Route::get('/registrations', 'Registration\RegistrationController@show');

        Route::get('/contact/{contact}/registration', 'Registration\RegistrationController@getStore');
        Route::post('/contact/registration', 'Registration\RegistrationController@store');
        Route::get('/registration/{registration}', 'Registration\RegistrationController@getRegistration');
        Route::post('/registration/{registration}/update', 'Registration\RegistrationController@updateRegistration');
        Route::delete('/registration/{registration}/delete', 'Registration\RegistrationController@deleteRegistration');

        Route::post('/registration/{registration}/measure-taken', 'Registration\RegistrationController@storeMeasureTaken');
        Route::post('/registration/{registration}/measure-taken/delete', 'Registration\RegistrationController@deleteMeasureTaken');

        Route::post('/registration/{registration}/measure-requested', 'Registration\RegistrationController@storeMeasureRequested');
        Route::post('/registration/{registration}/measure-requested/delete', 'Registration\RegistrationController@deleteMeasureRequested');

        Route::post('/registration/{registration}/note', 'Registration\RegistrationController@storeNote');
        Route::post('/registration/note/{note}/update', 'Registration\RegistrationController@updateNote');
        Route::post('/registration/note/{note}/delete', 'Registration\RegistrationController@deleteNote');


        Route::get('/user/grid', 'User\GridController@index');
        Route::post('/user', 'User\UserController@store');
        Route::get('/user/{user}', 'User\UserController@show');
        Route::post('/user/{user}', 'User\UserController@update');

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
        Route::get('/person/peek/no-account', 'Person\PersonController@peekNoAccount');

        Route::post('/account', 'Account\AccountController@store');
        Route::post('/account/{account}', 'Account\AccountController@update');

        Route::post('/contact-note', 'ContactNote\ContactNoteController@store');
        Route::post('/contact-note/{contactNote}', 'ContactNote\ContactNoteController@update');
        Route::post('/contact-note/{contactNote}/delete', 'ContactNote\ContactNoteController@destroy');

        Route::get('/account/peek', 'Account\AccountController@peek');
    }
);