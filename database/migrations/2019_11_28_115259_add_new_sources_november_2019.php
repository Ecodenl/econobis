<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddNewSourcesNovember2019 extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $intakeSources = [
            'Energieloket',
            'Digitaal energieloket',
            'Mobiel Energieloket',
            'Bewonersavond',
        ];

        foreach ($intakeSources as $source) {
            DB::table('sources')->insert([
                    ['name' => $source],
                ]
            );
        }

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
