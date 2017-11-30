<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class SeedRegistrations extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $registrationReasons = [
            'Milieu',
            'Comfort',
            'Besparing',
        ];

        foreach ($registrationReasons as $reason) {
            DB::table('reasons')->insert([
                    ['name' => $reason],
                ]
            );
        }

        $registrationSources = [
            'E-mail',
            'Website',
            'Evenement',
            'Telefoon',
            'Enquete',
        ];

        foreach ($registrationSources as $source) {
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

        $measures = [
            'Vloerisolatie',
            'Gevelisolatie',
            'Dakisolatie',
            'Dubbelglas beter dan HR++',
            'Dubbelglas',
            'Zonnepanelen',
            'Zonneboiler',
            'Warmtepomp',
            'HR-Ketel',
            'Weet nog niet',
        ];

        foreach ($measures as $measure) {
            DB::table('measures')->insert([
                    ['name' => $measure, 'energy_label_id' => 1],
                ]
            );
        }

        $statussen = [
            'In behandeling',
            'Afgehandeld',
        ];

        foreach ($statussen as $status) {
            DB::table('registration_status')->insert([
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
