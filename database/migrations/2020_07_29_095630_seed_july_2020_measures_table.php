<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class SeedJuly2020MeasuresTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $categorizedMeasures = [
            'Warmte afgifte' => [
                'Radiatorfolie',
            ],
        ];

        $id = 1;
        foreach ($categorizedMeasures as $category => $measures) {
            // Create the category
            $catId = DB::table('measure_categories')->where('name', $category)->first()->id;
            // Create the measures
            foreach($measures as $measure) {
                DB::table('measures')->insertGetId(
                    ['name'=> $measure,
                        'measure_category_id' => $catId,
                        'number' => 'M2020-' . $id ]
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
