<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class ChangeOccupationEnergiecoach extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        DB::table('occupations')
            ->where('primary_occupation', 'Energiecoach van')
            ->update(['primary_occupation' => 'Coach van']);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        DB::table('occupations')
            ->where('primary_occupation', 'Coach van')
            ->update(['primary_occupation' => 'Energiecoach van']);
    }
}
