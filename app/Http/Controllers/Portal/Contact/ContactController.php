<?php


namespace App\Http\Controllers\Portal\Contact;


use App\Eco\Contact\Contact;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class ContactController extends Controller
{
    public function update(Contact $contact, Request $request)
    {
        dd($contact);
        dd($request);
    }

}