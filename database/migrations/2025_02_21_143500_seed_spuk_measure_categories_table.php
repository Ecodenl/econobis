<?php

use Illuminate\Database\Migrations\Migration;

class SeedSpukMeasureCategoriesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $categorizedMeasures = [
            'Isolatieglas' => [
                'Isolerende deuren',
                'Isolerende deuren i.c.m kozijnen',
            ],
            'Ventilatie' => [
                'CO2 gestuurde ventilatie',
            ],
        ];

        $id = 5;
        foreach ($categorizedMeasures as $category => $measures) {
            // Get the category
            $catId = DB::table('measure_categories')->where('name', $category)->first()->id;
            // Create the measures
            foreach($measures as $measure) {
                DB::table('measures')->insertGetId(
                    ['name'=> $measure,
                        'measure_category_id' => $catId,
                        'number' => 'M2025-' . $id ]
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
