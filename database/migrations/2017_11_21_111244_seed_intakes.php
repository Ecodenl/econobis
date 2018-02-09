<?php

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class SeedIntakes extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $intakeReasons = [
            'Milieu',
            'Comfort',
            'Besparing',
        ];

        foreach ($intakeReasons as $reason) {
            DB::table('reasons')->insert([
                    ['name' => $reason],
                ]
            );
        }

        $intakeSources = [
            'E-mail',
            'Website',
            'Evenement',
            'Telefoon',
            'Enquete',
        ];

        foreach ($intakeSources as $source) {
            DB::table('sources')->insert([
                    ['name' => $source],
                ]
            );
        }

        $buildingTypes = [
            'Vrijstaand',
            'Hoekwoning',
            'Tussenwoning',
            'Appartement',
            'Appartement VVE',
            'Gehele tussenwoning',
            'Beneden woning meerdere verdiepingen',
        ];

        foreach ($buildingTypes as $types) {
            DB::table('building_types')->insert([
                    ['name' => $types],
                ]
            );
        }

        $energyLabels = [
            'A+++',
            'A++',
            'A+',
            'A',
            'B',
            'C',
            'D',
            'E',
            'F',
        ];

        foreach ($energyLabels as $energyLabel) {
            DB::table('energy_labels')->insert([
                    ['name' => $energyLabel],
                ]
            );
        }
        

        $statussen = [
            'Open',
            'Afgesloten met kans',
            'Afgesloten zonder kans',
        ];

        foreach ($statussen as $status) {
            DB::table('intake_status')->insert([
                    ['name' => $status],
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
