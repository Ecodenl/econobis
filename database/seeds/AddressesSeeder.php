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
            factory(\App\Eco\Address\Address::class, 2)->create(['contact_id' => $contact->id]);
        }
    }
}
