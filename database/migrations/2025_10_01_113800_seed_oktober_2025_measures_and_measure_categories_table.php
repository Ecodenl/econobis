<?php

use Illuminate\Database\Migrations\Migration;

class SeedOktober2025MeasuresAndMeasureCategoriesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $categorizedMeasures = [
            'Energie aansluiting' => [
                'Afleverset van warmtenet',
                'Aardgasmeter/-afsluiting',
                'Afleverset',
                'Elektriciteitsmeter',
                'Groepenkast aansluiting (1_35, 3_25, 1/3-fasen)',
                'Groepen, beveiligingen',
                'Bedrading (in woning)',
            ],
        ];

        $id = 5;
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
