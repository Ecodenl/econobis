<?php

namespace App\Http\Controllers;

//use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class HomeController extends Controller
{
    public function welcome()
    {
        Log::error('Homecontroller - welcome - wordt dit gebruikt?');
        return view('welcome');
    }
}
