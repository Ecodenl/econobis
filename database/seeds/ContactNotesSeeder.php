<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 26-10-2017
 * Time: 15:07
 */

class ContactNotesSeeder extends \Illuminate\Database\Seeder
{
    public function run()
    {
        foreach(\App\Eco\Contact\Contact::all() as $contact){
            factory(\App\Eco\ContactNote\ContactNote::class, random_int(0, 7))->create(['contact_id' => $contact->id]);
        }
    }

}