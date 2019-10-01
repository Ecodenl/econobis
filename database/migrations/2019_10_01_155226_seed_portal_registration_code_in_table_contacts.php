<?php

use App\Eco\Contact\Contact;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Str;

class SeedPortalRegistrationCodeInTableContacts extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $contacts = Contact::all();

        foreach ($contacts as $contact){
            if($contact->type_id == 'person' && !$contact->portal_registration_code)
            {
                $contact->portal_registration_code = Str::random(32);
                $contact->save();
            }
        }
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
    }
}
