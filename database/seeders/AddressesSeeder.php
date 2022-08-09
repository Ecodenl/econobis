<?php

namespace Database\Seeders;

use App\Eco\Address\Address;
use App\Eco\Contact\Contact;
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
        foreach(Contact::all() as $contact){
            factory(Address::class, random_int(0, 3))->create(['contact_id' => $contact->id]);
        }
    }
}
