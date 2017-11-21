<?php
/**
 * Created by PhpStorm.
 * User: Fren
 * Date: 20-10-2017
 * Time: 9:35
 */

namespace App\Http\Controllers\Api\Registration;


use App\Eco\Registration\Registration;
use App\Eco\Contact\Contact;
use App\Http\Controllers\Api\ApiController;
use App\Http\Resources\Registration\FullRegistration;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class RegistrationController extends ApiController
{

    public function show()
    {
        $registrations = Registration::all()->load('sources')->load('campaigns')->load('address');

        return FullRegistration::collection($registrations);
    }

    public function showContactRegistrations(Contact $contact)
    {
        $registrations = $contact->registrations->load('sources')->load('campaigns');

        return FullRegistration::collection($registrations);
    }

    public function store(Request $request)
    {

    }

    public function update(Request $request, Registration $registration)
    {


    }
}