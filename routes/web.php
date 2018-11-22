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

use App\Eco\Administration\Administration;
use App\Eco\Contact\Contact;
use App\Helpers\Twinfield\TwinfieldCustomerHelper;
use Illuminate\Support\Facades\Log;

Route::get('/twinfield', function () {

    $contact = Contact::find(4);

    $twinfieldCustomerHelper = new TwinfieldCustomerHelper(Administration::find(1));

    $response = $twinfieldCustomerHelper->createCustomer($contact);

    if(class_basename($response) === 'Customer'){
        $contact->twinfield_number = $response->getCode();
        $contact->save();
    }
    else{
        Log::error('Error:' . $response);
    }

});

Route::get('/', function () {
    return view('welcome');
});
