<?php

use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class ChangeParticipantMutationStatusesAndAddCoderef extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('participant_mutation_statuses', function (Blueprint $table) {
            $table->string('code_ref')->default('')->after('name');
        });

        // Add code ref and sort order to all active statuses
        DB::table('participant_mutation_statuses')
            ->where('name', 'Interesse')
            ->update(['code_ref' => 'interest']);

        DB::table('participant_mutation_statuses')
            ->where('name', 'Aangevraagd')
            ->update(['name' => 'Optie', 'code_ref' => 'option']);

        DB::table('participant_mutation_statuses')
            ->where('name', 'Toegekend')
            ->update(['code_ref' => 'granted']);

        DB::table('participant_mutation_statuses')
            ->where('name', 'Definitief')
            ->update(['code_ref' => 'final']);


    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
    }
}