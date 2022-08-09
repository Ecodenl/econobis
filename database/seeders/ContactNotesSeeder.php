<?php

namespace Database\Seeders;

use App\Eco\Contact\Contact;
use App\Eco\ContactNote\ContactNote;
use Illuminate\Database\Seeder;

class ContactNotesSeeder extends Seeder
{
    public function run()
    {
        foreach(Contact::all() as $contact){
            factory(ContactNote::class, random_int(0, 7))->create(['contact_id' => $contact->id]);
        }
    }

}