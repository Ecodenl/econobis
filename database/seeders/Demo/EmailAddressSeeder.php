<?php

namespace Database\Seeders\Demo;

use App\Eco\Contact\Contact;
use App\Eco\EmailAddress\EmailAddress;
use Illuminate\Database\Seeder;

class EmailAddressSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        foreach(Contact::all() as $contact){
            EmailAddress::factory()->count(2)->create(['contact_id' => $contact->id]);
        }
    }
}
