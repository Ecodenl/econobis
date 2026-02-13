<?php

namespace Database\Seeders\Demo;

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
            PhoneNumber::factory()->count(5)
                ->create(['contact_id' => $contact->id]);
        }
    }
}
