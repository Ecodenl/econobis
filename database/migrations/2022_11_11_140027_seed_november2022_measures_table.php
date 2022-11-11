<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class SeedNovember2022MeasuresTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $id = 11;

        //Maatregel Energierekening aan Energieconciërge
        $categorizedMeasures = [
            'Energiebespaaradvies' => [
                'Korter douchen',
                'Thermostaat graadje lager',
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

        //Hoofdcategorie Energieconciërge toevoegen
        //Maatregel Huisbezoek aan Energieconciërge
        $categorizedMeasures = [
            'Lampen' => [
                'LED verlichting',
                'Lamp type 1',
                'Lamp type 2',
                'Lamp type 3',
                'Lamp type 4',
                'Lamp type 5',
                'Lamp type 6',
                'Lamp type 7',
                'Lamp type 8',
                'Lamp type 9',
                'Lamp type 10',
                'Lamp type 11',
                'Lamp type 12',
                'Lamp type 13',
                'Lamp type 14',
                'Lamp type 15',
                'Lamp type 16',
                'Lamp type 17',
                'Lamp type 18',
                'Lamp type 19',
                'Lamp type 20',
                'Lamp type 21',
                'Lamp type 22',
                'Lamp type 23',
                'Lamp type 24',
                'Lamp type 25',
            ],
            'Kleine maatregel' => [
                'Radiatorfolie',
                'Deurdrangers',
                'Bespaarbox',
                'Spaardouche',
                'Glasfolie',
                'Glasfolie type 2',
                'Glasfolie type 3',
                'Glasfolie type 4',
                'Glasfolie type 5',
                'Schakelmateriaal',
                'Schakelmateriaal type 2',
                'Schakelmateriaal type 3',
                'Schakelmateriaal type 4',
                'Schakelmateriaal type 5',
                'Kleding',
                'Kleding type 2',
                'Kleding type 3',
                'Kleding type 4',
                'Kleding type 5',
                'Ventilatierooster',
                'Ventilatierooster type 2',
                'Ventilatierooster type 3',
                'Ventilatierooster type 4',
                'Ventilatierooster type 5',
                'Radiatorventilator',
                'Radiatorventilator type 2',
                'Radiatorventilator type 3',
                'Radiatorventilator type 4',
                'Radiatorventilator type 5',
                'Tochtstrip of band ',
                'Tochtstrip of band type 2',
                'Tochtstrip of band type 3',
                'Tochtstrip of band type 4',
                'Tochtstrip of band type 5',
                'Brievenbusborstel',
                'Brievenbusborstel type 2',
                'Brievenbusborstel type 3',
                'Brievenbusborstel type 4',
                'Brievenbusborstel type 5',
                'Gordijnen type 1',
                'Gordijnen type 2',
                'Tape type 1',
                'Tape type 2',
                'Tape type 3',
                'Tape type 4',
                'Tape type 5',
                'Dorpelprofiel type 1',
                'Dorpelprofiel type 2',
                'Dorpelprofiel type 3',
                'Dorpelprofiel type 4',
                'Dorpelprofiel type 5',
                'Doorstroombegrenzer',
                'Douchetimer / zandloper',
            ],
        ];

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
