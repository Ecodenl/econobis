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

use App\Eco\Contact\Contact;
use App\Helpers\Twinfield\TwinfieldHelper;

Route::get('/twinfield', function () {


    $twinfieldHelper = new TwinfieldHelper("COM006123", "XXXX", "PROEF", 'NLA017551');


    $response = $twinfieldHelper->createCustomer(Contact::find(3));

    dd($response);
});

Route::get('/', function () {
    return view('welcome');
});
