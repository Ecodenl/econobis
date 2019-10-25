<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddOccupationForPortalToOccupations extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //
        Schema::table('occupations', function (Blueprint $table) {
            $table->boolean('occupation_for_portal')->default(false);
        });

        DB::table('occupations')
            ->where('primary_occupation', 'Wettelijke vertegenwoordiger')
            ->update(['occupation_for_portal' => true]);

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
