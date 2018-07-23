<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class RecalculateParticipations extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {

        $contacts = \App\Eco\Contact\Contact::all();

        foreach ($contacts as $contact){
            $participations = 0;

            foreach ($contact->participations as $participation){
                $participations += $participation->participations_current;
            }
            $contact->participations_current = $participations;
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
