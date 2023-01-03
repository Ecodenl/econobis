<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class SetOccupationGegevensbeheerderForPortalTrue extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        DB::table('occupations')
            ->where('primary_occupation', 'Gegevens beheerd door')
            ->update(['occupation_for_portal' => true]);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        DB::table('occupations')
            ->where('primary_occupation', 'Gegevens beheerd door')
            ->update(['occupation_for_portal' => false]);
    }
}
