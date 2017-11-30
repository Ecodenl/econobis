<?php

use Illuminate\Database\Seeder;

class AddressesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        foreach(\App\Eco\Contact\Contact::all() as $contact){
            factory(\App\Eco\Address\Address::class, random_int(0, 3))->create(['contact_id' => $contact->id]);
        }
    }
}
