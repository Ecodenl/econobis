<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class SeedJune22023MeasuresTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $categorizedMeasures = [
            'Mobiliteit' => [
                'Elektrische deelauto',
            ],
        ];

        $id = 40;
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
