<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class SeedMarch2021MoreMeasuresTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $categorizedMeasures = [
            'Dakisolatie' => [
                'Algemeen',
            ],
            'Isolatieglas' => [
                'HR++(+)',
            ],
            'Overig' => [
                'Deurdrangers',
                'Korter douchen',
                'Thermostaat graadje lager',
                'Bespaarbox',
            ],
            'Energiebespaarcoaching' => [
                'Energiecoach',
                'Woonwensencoach',
            ],
        ];

        $id = 4;
        foreach ($categorizedMeasures as $category => $measures) {
            // Get the category
            $catId = DB::table('measure_categories')->where('name', $category)->first()->id;
            // Create the measures
            foreach($measures as $measure) {
                DB::table('measures')->insertGetId(
                    ['name'=> $measure,
                        'measure_category_id' => $catId,
                        'number' => 'M2021-' . $id ]
                );
                $id++;
            }

        }

        //
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
