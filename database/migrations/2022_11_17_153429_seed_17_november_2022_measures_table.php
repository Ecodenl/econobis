<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class Seed17November2022MeasuresTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $id = 92;

        //Maatregel Energierekening aan Energieconciërge
        $categorizedMeasures = [
            'Kleine maatregel' => [
                'Waardebon',
                'Waardebon type 2',
                'Waardebon type 3',
                'Waardebon type 4',
                'Waardebon type 5',
                'Waardebon type 6',
                'Waardebon type 7',
                'Waardebon type 8',
                'Waardebon type 9',
                'Waardebon type 10',
                'Spaardouche type 2',
                'Spaardouche type 3',
                'Spaardouche type 4',
                'Spaardouche type 5',
                'Schakelmateriaal type 6',
                'Schakelmateriaal type 7',
                'Schakelmateriaal type 8',
                'Schakelmateriaal type 9',
                'Schakelmateriaal type 10',
                'Schakelmateriaal type 6',
                'Schakelmateriaal type 7',
                'Schakelmateriaal type 8',
                'Schakelmateriaal type 9',
                'Schakelmateriaal type 10',
                'Thermometer',
                'Thermometer type 2',
                'Thermometer type 3',
                'Thermometer type 4',
                'Thermometer type 5',
                'Deursluiters',
                'Deursluiters type 2',
                'Deursluiters type 3',
                'Deursluiters type 4',
                'Deursluiters type 5',
                'Buisisolatie',
                'Buisisolatie type 2',
                'Buisisolatie type 3',
                'Buisisolatie type 4',
                'Buisisolatie type 5',
                'Buisisolatie type 6',
                'Buisisolatie type 7',
                'Buisisolatie type 8',
                'Buisisolatie type 9',
                'Buisisolatie type 10',
                'Thermostaat',
                'Thermostaat type 2',
                'Thermostaat type 3',
                'Thermostaat type 4',
                'Thermostaat type 5',
            ],
        ];

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
