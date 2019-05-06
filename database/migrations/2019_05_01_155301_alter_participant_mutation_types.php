<?php

use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AlterParticipantMutationTypes extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('participant_mutation_types', function (Blueprint $table) {
            $table->string('code_ref')->default('')->after('description');
        });

        DB::table('participant_mutation_types')
            ->where('name', 'Lening afsluiten')
            ->update(['code_ref' => 'first_deposit']);

        DB::table('participant_mutation_types')
            ->where('name', 'Uitgifte obligatie')
            ->update(['code_ref' => 'first_deposit']);

        DB::table('participant_mutation_types')
            ->where('name', 'Kapitaalstoring')
            ->update(['code_ref' => 'first_deposit']);

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