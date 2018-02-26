<?php

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class SeedMeasuresCategoriesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $measureCategories = [
            'Vloerisolatie',
            'Gevelisolatie',
            'Dakisolatie',
            'Isolatieglas',
            'Kierdichting',
            'Ventilatie',
            'Cv-ketel',
            'Warmtepomp',
            'Biomassa',
            'Warmte afgifte',
            'Zonnepanelen',
            'Zonneboiler',
            'PVT',
            'Opslag',
            'Overig',
        ];

        foreach ($measureCategories as $measureCategory) {
            DB::table('measure_categories')->insert([
                    ['name' => $measureCategory],
                ]
            );
        }

        $category_id = 1;
        while ($category_id < 16) {
            if ($category_id == 1) {
                $measures_specific = [
                    'Isolatie van de vloer',
                    'Isolatie van de bodem',
                    'Isolatie van de kruipruimte',
                    'Leiding isolatie kruipruimte',
                ];
            } elseif ($category_id == 2) {
                $measures_specific = [
                    'Gevel isolatie spouw',
                    'Gevel isolatie  binnenzijde',
                    'Gevel isolatie buitenzijde',
                ];
            } elseif ($category_id == 3) {
                $measures_specific = [
                    'Isolatie hellend dak binnen',
                    'Isolatie hellend dak, buiten (vervangen dakpannen, bitume isolerend onderdak etc)',
                    'Isolatie plat dak, buiten (op huidige dakbedekking)',
                    'Isolatie plat dak, buiten (vervanging huidige dakbedekking)',
                    'Vegetatiedak',
                    'Isolatie zoldervloer, bovenop',
                    'Isolatie zoldervloer, tussen plafond',
                ];
            } elseif ($category_id == 4) {
                $measures_specific = [
                    'Glas-in-lood',
                    'Plaatsen isolatieglas, alleen beglazing',
                    'Plaatsen isolatieglas, inclusief kozijn',
                    'Plaatsen geïsoleerd kozijn met triple glas',
                    'Plaatsen achterzetbeglazing',
                ];
            } elseif ($category_id == 5) {
                $measures_specific = [
                    'Kierdichting ramen en deuren',
                    'Kierdichting aansluiting kozijn en muur',
                    'Kierdichting aansluiting dak en muur',
                    'Kierdichting aansluiting nok',
                    'Kierdichting kruipluik, houten vloer',
                ];
            } elseif ($category_id == 6) {
                $measures_specific = [
                    'Ventilatie roosters',
                    'Vraag gestuurde ventilatie roosters',
                    'Ventilatie lucht/water warmtepomp',
                    'Decentrale wtw',
                    'Centrale wtw',
                    'Gelijkstroom ventilatiebox',

                ];
            } elseif ($category_id == 7) {
                $measures_specific = [
                    'Ketelvervanging',
                    'Waterzijdig inregelen',
                    'Thermostaatknoppen',
                    'Weersafhankelijke regeling',
                    'Slimme thermostaat (thermosmart, nest, tado,…) opentherm of aan/uit',
                    'Zone indeling',
                    'Isolatie leiding onverwarmde ruimte',
                ];
            } elseif ($category_id == 8) {
                $measures_specific = [
                    'Gevel isolatie spouw',
                    'Gevel isolatie  binnenzijde',
                    'Gevel isolatie buitenzijde',
                ];
            } elseif ($category_id == 9) {
                $measures_specific = [
                    'Hybride (bron lucht)',
                    'Volledig (bron lucht)',
                    'Volledig (bron bodem)',
                    'Volledig (bron ventilatielucht)',
                    'Warmtepompboiler (tbv tapwater)',
                    'Smart grid compatibel',

                ];
            } elseif ($category_id == 10) {
                $measures_specific = [
                    'Pelletketel',
                    'Pelletkachel',
                    'Massakachel (Tulikivi, Ortner)',
                    'Cv-gekoppeld',
                    'Hoogrendementshoutkachel (laag emissie fijn stof)',

                ];
            } elseif ($category_id == 11) {
                $measures_specific = [
                    'Laag temperatuur vloerverwarming',
                    'Laag temperatuur wandverwarming',
                    'Laag temperatuur convectoren',
                    'tralingspanelen',
                    'Luchtverwarming',
                    'Radiatoren (laag regime 55-45)',
                ];
            } elseif ($category_id == 12) {
                $measures_specific = [
                    'Vacuumbuiscollector',
                    'Vlakkeplaat',
                    'Voorverwarming SWW',
                    'SWW naverwarming',
                    'SWW + verwarmingsondersteuning',

                ];
            } elseif ($category_id == 13) {

            } elseif ($category_id == 14) {
                $measures_specific = [
                    'Thermische opslag',
                    'Huisbatterij',
                    'Koppeling elektrische auto',
                ];
            } elseif ($category_id == 15) {
                $measures_specific = [
                    'Spaardouche',
                    'Douche wtw',
                    'Hotfill',
                    'LED verlichting',
                    'Witgoed',
                ];
            }

            foreach ($measures_specific as $measure_specific) {
                $measure = new \App\Eco\Measure\Measure();
                $measure->measure_category_id = $category_id;
                $measure->name = $measure_specific;
                $measure->save();
            }
            $category_id++;
        }
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('measure_categories', function (Blueprint $table) {
            //
        });
    }
}
