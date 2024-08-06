<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
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
            'Witgoed' => [
                'Financieringsplan',
                'Financieringsplan',
                'Koelkast',
                'Vriezer',
                'Wasmachine',
                'Droger',
                'Vaatwasser',
                'Was/droogcombinatie',
                'Koelvriescombinatie',
                'Fornuis',
                '(Combi)magnetron',
                'Oven',
                'Overig 1',
                'Overig 2',
                'Overig 3',
                'Overig 4',
                'Overig 5',
            ],
        ];

        $id = 3;
        foreach ($categorizedMeasures as $category => $measures) {
            // Create the category
            $catId = DB::table('measure_categories')->insertGetId(
                [ 'name' => $category ]
            );

            DB::table('measures')->where('name', 'Inductiekookplaat')->update(["measure_category_id" =>$catId]);

            // Create the measures
            foreach($measures as $measure) {
                DB::table('measures')->insertGetId(
                    ['name'=> $measure,
                        'measure_category_id' => $catId,
                        'number' => 'M2024-' . $id,
                        'visible' => 0 ]
                );
                $id++;
            }
        }

        //tweede toevoeging obv standaard script
        $categorizedMeasures = [
            'Energieconciërge' => [
                'Intakegesprek',
                'Vervolggesprek',
                'Nazorg',
                'Vocht en schimmel',
                'Klushulp',
                'Eindgesprek',
            ],
            'Domotica' => [
                'P1 Dongel',
            ],
            'Energiebespaarcoaching' => [
                'Vervolggesprek',
                'Eindgesprek',
            ],
            'Kleine maatregel' => [
                'Standbykiller enkel',
                'Stekkerdoos 3 voudig',
                'Stekkerdoos 6 voudig',
                'Magneet per stuk',
                'Dorpelstrip voor vloerbedekking',
                'Dorpelstrip (borstel) transparant',
                'Dorpelstrip (borstel) wit',
                'Straalregelaar SLC AC verchroomd M24x1',
                'Straalregelaar SLC AC verchroomd M22x1',
                'Straalregelaar SLC AC verchroomd M24x1 met kogelgewricht',
                'Energiemeter',
                'Warmtedeken',
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
                        'number' => 'M2024-' . $id,
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
};
