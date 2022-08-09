<?php

namespace Database\Seeders;

use App\Eco\Contact\Contact;
use App\Eco\PhoneNumber\PhoneNumber;
use Illuminate\Database\Seeder;

class PhoneNumbersSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        foreach(Contact::all() as $contact){
            factory(PhoneNumber::class, 2)->create(['contact_id' => $contact->id]);
        }
    }
}
