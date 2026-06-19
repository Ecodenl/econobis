<?php

use App\Eco\Measure\Measure;
use App\Eco\Measure\MeasureCategory;
use Illuminate\Database\Migrations\Migration;

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

        // Inductiekookplaat verplaatsen van categorie Overig naar nieuwe categorie Witgoed
        $measureInductiekookplaat = Measure::where('name', 'Inductiekookplaat')->first();
        $measureCategoryOverig = MeasureCategory::where('name', 'Overig')->first();
        $measureCategoryWitgoed = MeasureCategory::where('name', 'Witgoed')->first();

        if($measureInductiekookplaat && $measureCategoryOverig && $measureCategoryWitgoed){
            if($measureInductiekookplaat->measure_category_id == $measureCategoryOverig->id) {

                // Wijzig koppeling in measures (Overig in Witgoed)
                $measureInductiekookplaat->measure_category_id = $measureCategoryWitgoed->id;
                $measureInductiekookplaat->saveQuietly();

                foreach ($measureInductiekookplaat->opportunities as $opportunity) {
                    if ($opportunity->measure_category_id == $measureCategoryOverig->id) {
                        // Voeg Witgoed toe in intake_measure_requested.
                        $opportunity->intake->measuresRequested()->syncWithoutDetaching($measureCategoryWitgoed->id);

                        // Wijzig koppeling in opportunities (Overig in Witgoed)
                        $opportunity->measure_category_id = $measureCategoryWitgoed->id;
                        $opportunity->saveQuietly();
                    }
                }
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
