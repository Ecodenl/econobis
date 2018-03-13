<?php

use App\Eco\Contact\Contact;
use Illuminate\Database\Migrations\Migration;

class AlterContactStatus extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
       $contacts = Contact::all();

       foreach ($contacts as $contact){
           $contact->status_id = 'interested';
           $contact->save();
       }
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {

    }
}
