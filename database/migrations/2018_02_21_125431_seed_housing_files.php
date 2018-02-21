<?php

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class SeedHousingFiles extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $roofTypes = [
            'Hellend dak met dakpannen',
            'Hellend dak met bitumen',
            'Platdak',
            'Geen dak',
        ];

        foreach ($roofTypes as $roofType) {
            DB::table('roof_types')->insert([
                    ['name' => $roofType],
                ]
            );
        }

        $energyLabelStatusses = [
            'Voorlopig',
            'Definitief',
        ];

        foreach ($energyLabelStatusses as $energyLabelStatus) {
            DB::table('energy_label_status')->insert([
                    ['name' => $energyLabelStatus],
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
    }
}
