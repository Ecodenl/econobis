<?php

use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class ChangeCoderefParticipantMutationTypes extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        DB::table('participant_mutation_types')
            ->where('name', 'Bijstorten')
            ->update(['code_ref' => 'deposit']);

        DB::table('participant_mutation_types')
            ->where('description', 'Opname')
            ->update(['code_ref' => 'withDrawal']);

        DB::table('participant_mutation_types')
            ->where('description', 'Resultaat')
            ->update(['code_ref' => 'result']);

        DB::table('participant_mutation_types')
            ->where('description', 'Boekwaarde')
            ->update(['code_ref' => 'bookworth']);

        DB::table('participant_mutation_types')
            ->where('description', 'Verkoop')
            ->update(['code_ref' => 'sell']);

        DB::table('participant_mutation_types')
            ->where('description', 'Indicatie teruggave EB')
            ->update(['code_ref' => 'energyTaxRefund']);
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