<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class SeedFebruary2021HousingFilesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $roofTypes = [
            'Hellend rietdak',
        ];

        foreach ($roofTypes as $roofType) {
            DB::table('roof_types')->insert([
                    ['name' => $roofType],
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
