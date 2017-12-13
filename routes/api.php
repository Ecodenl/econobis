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
        Route::get('/contact/{contact}/registrations', 'Contact\ContactController@registrations');
        Route::get('/contact/{contact}/groups', 'Contact\ContactController@groups');
        Route::post('/contact/{contact}/delete', 'Contact\ContactController@destroy');

        Route::get('/registration/grid', 'Registration\RegistrationController@grid');
        Route::get('/contact/{contact}/registration', 'Registration\RegistrationController@getStore');
        Route::post('/contact/registration', 'Registration\RegistrationController@store');
        Route::get('/registration/{registration}', 'Registration\RegistrationController@show');
        Route::post('/registration/{registration}/update', 'Registration\RegistrationController@update');
        Route::post('/registration/{registration}/delete', 'Registration\RegistrationController@destroy');

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
        Route::get('/user/with-permission/{permission}', 'User\UserController@withPermission');
        Route::post('/user/{user}/roles/add/{role}', 'User\UserController@addRole');
        Route::post('/user/{user}/roles/remove/{role}', 'User\UserController@removeRole');

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
        Route::get('/person/peek/no-organisation', 'Person\PersonController@peekNoOrganisation');

        Route::post('/organisation', 'Organisation\OrganisationController@store');
        Route::post('/organisation/{organisation}', 'Organisation\OrganisationController@update');

        Route::post('/contact-note', 'ContactNote\ContactNoteController@store');
        Route::post('/contact-note/{contactNote}', 'ContactNote\ContactNoteController@update');
        Route::post('/contact-note/{contactNote}/delete', 'ContactNote\ContactNoteController@destroy');

        Route::get('/contacts/peek', 'Contact\ContactController@peek');
        Route::get('/organisation/peek', 'Organisation\OrganisationController@peek');

        Route::get('contact-group/grid', 'ContactGroup\ContactGroupController@grid');
        Route::get('contact-group/{contactGroup}', 'ContactGroup\ContactGroupController@show');
        Route::get('contact-group/{contactGroup}/name', 'ContactGroup\ContactGroupController@getName');
        Route::post('contact-group/', 'ContactGroup\ContactGroupController@store');
        Route::post('contact-group/{contactGroup}', 'ContactGroup\ContactGroupController@update');
        Route::post('contact-group/{contactGroup}/delete', 'ContactGroup\ContactGroupController@destroy');
        Route::get('contact-group/{contactGroup}/contacts', 'ContactGroup\ContactGroupController@contacts');
        Route::post('contact-group/{contactGroup}/contacts/add/{contact}', 'ContactGroup\ContactGroupController@addContact');
        Route::post('contact-group/{contactGroup}/contacts/remove/{contact}', 'ContactGroup\ContactGroupController@removeContact');
        Route::get('contact-group/{contactGroup}/contacts/grid', 'ContactGroup\ContactGroupController@gridContacts');

        Route::post('contact-group/{contactGroup}/contacts/add-many', 'ContactGroup\ContactGroupController@addContacts');

        Route::get('task/grid', 'Task\TaskController@grid');
        Route::get('task/{task}', 'Task\TaskController@show');
        Route::post('task', 'Task\TaskController@store');
        Route::post('task/{task}', 'Task\TaskController@update');
        Route::post('task/{task}/delete', 'Task\TaskController@destroy');
        Route::post('task/{task}/finish', 'Task\TaskController@finish');
    }
);