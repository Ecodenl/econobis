<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class SeedNovember2023MeasuresAndMeasureCategoriesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //eerste toevoeging obv standaard script
        $categorizedMeasures = [
            'Woningaanpassingen' => [
                'Financieringsplan',
            ],
        ];

        $id = 51;
        foreach ($categorizedMeasures as $category => $measures) {
            // Create the category
            $catId = DB::table('measure_categories')->insertGetId(
                [ 'name' => $category ]
            );
            // Create the measures
            foreach($measures as $measure) {
                DB::table('measures')->insertGetId(
                    ['name'=> $measure,
                        'measure_category_id' => $catId,
                        'number' => 'M2023-' . $id ]
                );
                $id++;
            }
        }

        //tweede toevoeging obv standaard script
        $categorizedMeasures = [
            'Energiebespaarcoaching' => [
                'Hoomdossier',
            ],
        ];

        $id = 52;
        foreach ($categorizedMeasures as $category => $measures) {
            // Get the category
            $catId = DB::table('measure_categories')->where('name', $category)->first()->id;
            // Create the measures
            foreach($measures as $measure) {
                DB::table('measures')->insertGetId(
                    ['name'=> $measure,
                        'measure_category_id' => $catId,
                        'number' => 'M2023-' . $id,
                        'visible' => 0 ]
                );
                $id++;
            }

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
