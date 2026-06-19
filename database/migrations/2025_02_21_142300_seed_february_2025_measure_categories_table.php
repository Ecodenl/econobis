<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class SeedFebruary2025MeasureCategoriesTable extends Migration
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
                'HR++ deur',
                'HR+++ deur',
                'HR++ deur met kozijn',
                'HR+++ deur met kozijn',
            ],
        ];

        $id = 1;
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
