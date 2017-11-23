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
            'Web',
            'Formulier',
            'Enquete',
        ];

        foreach ($registrationSources as $source) {
            DB::table('sources')->insert([
                    ['name' => $source],
                ]
            );
        }

        $registrationCampaigns = [
            'Reclameborden',
            'Flyers',
        ];

        foreach ($registrationCampaigns as $campaign) {
            DB::table('campaigns')->insert([
                    ['name' => $campaign],
                ]
            );
        }

        $buildingTypes = [
            'Hoekwoning',
            'Alleenstaand',
        ];

        foreach ($buildingTypes as $types) {
            DB::table('building_types')->insert([
                    ['name' => $types],
                ]
            );
        }

        $buildingFeatures = [
            'Bouwjaar',
            'Eigendom',
            'Dak type'
        ];

        foreach ($buildingFeatures as $feature) {
            DB::table('building_features')->insert([
                    ['name' => $feature],
                ]
            );
        }

        $energyLabels = [
            'AA+',
            'AA',
            'A+',
            'A',
            'B',
            'C',
            'D'
        ];

        foreach ($energyLabels as $energyLabel) {
            DB::table('energy_labels')->insert([
                    ['name' => $energyLabel],
                ]
            );
        }

        $measures = [
            'Dubbele wand',
            'Isolatie',
            'Zonnepanelen'
        ];

        foreach ($measures as $measure) {
            DB::table('measures')->insert([
                    ['name' => $measure, 'energy_label_id' => 1],
                ]
            );
        }

        $statussen = [
            'Aangevraagd',
            'Behandeld',
            'Ingediend'
        ];

        foreach ($statussen as $status) {
            DB::table('registration_status')->insert([
                    ['name' => $status],
                ]
            );
        }


        DB::table('measure_taken_address')->insert([
                [
                    'address_id' => 1,
                    'measure_id' => 1,
                    'measure_date' => '2017-11-15 13:43:15'
                ],
            ]
        );

        DB::table('measure_requested_address')->insert([
                [
                    'address_id' => 1,
                    'measure_id' => 2,
                    'desired_date' => '2017-11-15 13:43:15',
                    'degree_interest' => 10
                ],
            ]
        );

        DB::table('registrations')->insert([
                [
                    'address_id' => 1,
                    'campaign_id' => 1,
                    'created_at' => '2017-11-15 13:43:15',
                    'updated_at' => '2017-11-15 13:43:15',
                    'registration_status_id' => 1
                ],
            ]
        );

        DB::table('reason_registration')->insert([
                [
                    'reason_id' => 1,
                    'registration_id' => 1
                ]
            ]
        );

        DB::table('registration_source')->insert([
                [
                    'source_id' => 1,
                    'registration_id' => 1
                ]
            ]
        );

        DB::table('notes_registration')->insert([
                [
                    'registration_id' => 1,
                    'note' => 'Goed gesprek, veel interesse'
                ],
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
