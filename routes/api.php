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
        Route::get('/contact/peek', 'Contact\ContactController@peek');
        Route::get('/contact/{contact}', 'Contact\ContactController@show');
        Route::get('/contact/{contact}/groups', 'ContactGroup\ContactGroupController@getContactGroups');
        Route::post('/contact/{contact}/delete', 'Contact\ContactController@destroy');

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

        Route::get('/contacts/peek', 'Contact\ContactController@peek');

        Route::get('contact-group/grid', 'ContactGroup\ContactGroupController@grid');
        Route::get('contact-group/{contactGroup}', 'ContactGroup\ContactGroupController@show');
        Route::post('contact-group/', 'ContactGroup\ContactGroupController@store');
        Route::post('contact-group/{contactGroup}', 'ContactGroup\ContactGroupController@update');
        Route::post('contact-group/{contactGroup}/delete', 'ContactGroup\ContactGroupController@destroy');
        Route::get('contact-group/{contactGroup}/contacts', 'ContactGroup\ContactGroupController@contacts');
        Route::post('contact-group/{contactGroup}/contacts/add/{contact}', 'ContactGroup\ContactGroupController@addContact');
        Route::post('contact-group/{contactGroup}/contacts/remove/{contact}', 'ContactGroup\ContactGroupController@removeContact');
        Route::post('contact-group/{contactGroup}/contacts/add-many', 'ContactGroup\ContactGroupController@addContacts');
    }
);