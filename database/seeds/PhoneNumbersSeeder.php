<?php

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
        foreach(\App\Eco\Contact\Contact::all() as $contact){
            factory(\App\Eco\PhoneNumber\PhoneNumber::class, 2)->create(['contact_id' => $contact->id]);
        }
    }
}
