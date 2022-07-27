<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class SeedJuly2022MeasureCategoriesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $categorizedMeasures = [
            'Energieconciërge' => [
                'Klimaatklusser',
            ],
            'Overig' => [
                'Energiebespaartegoed 100 euro',
            ],
            'Isolatieglas' => [
                'Isolerende beglazing',
            ],
        ];

        $id = 6;
        foreach ($categorizedMeasures as $category => $measures) {
            // Get the category
            $catId = DB::table('measure_categories')->where('name', $category)->first()->id;
            // Create the measures
            foreach($measures as $measure) {
                DB::table('measures')->insertGetId(
                    ['name'=> $measure,
                        'measure_category_id' => $catId,
                        'number' => 'M2022-' . $id ]
                );
                $id++;
            }
        }

        // Change label 'voorbereiding' to 'concept'
        DB::table('measures')->where('name', 'Algemeen')->where('measure_category_id', 3)->update(['name' => 'Dakisolatie algemeen']);

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
