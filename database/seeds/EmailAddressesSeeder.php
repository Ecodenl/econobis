<?php

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
        foreach(\App\Eco\Contact\Contact::all() as $contact){
            factory(\App\Eco\EmailAddress\EmailAddress::class, 2)->create(['contact_id' => $contact->id]);
        }
    }
}
