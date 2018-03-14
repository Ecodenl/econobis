<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

class ChangeTremaContactType extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $organisationType = DB::table('organisation_types')->where('name', 'Cooperatie')->first();
        DB::table('organisation_types')->where('id', $organisationType->id)->update(["name" => "Coöperatie"]);

        $personType = DB::table('person_types')->where('name', 'Collega cooperatie')->first();
        DB::table('person_types')->where('id', $personType->id)->update(["name" => "Collega coöperatie"]);

        DB::table('industries')->insert([
                ['name' => 'Energie'],
            ]
        );
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
