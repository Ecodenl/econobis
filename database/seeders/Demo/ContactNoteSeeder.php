<?php

namespace Database\Seeders\Demo;

use App\Eco\Contact\Contact;
use App\Eco\ContactNote\ContactNote;
use Illuminate\Database\Seeder;

class ContactNoteSeeder extends Seeder
{
    public function run()
    {
        foreach(Contact::all() as $contact){
            ContactNote::factory()->count(random_int(0, 7))
                ->create(['contact_id' => $contact->id]);
        }
    }

}