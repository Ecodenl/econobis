<?php

use Illuminate\Support\Facades\Route;

Route::get('contact/{contactnr}', 'Contact\ContactController@getContact');

