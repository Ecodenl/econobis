<?php

namespace Database\Seeders;

use App\Eco\Contact\Contact;
use App\Eco\EmailAddress\EmailAddress;
use Illuminate\Database\Seeder;

class EmailAddressesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        foreach(Contact::all() as $contact){
            factory(EmailAddress::class, 2)->create(['contact_id' => $contact->id]);
        }
    }
}
