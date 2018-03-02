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
        $categorizedMeasures = [
            'Vloerisolatie' => [
                'Isolatie van de vloer',
                'Isolatie van de bodem',
                'Isolatie van de bodem inclusief leidingisolatie',
                'Isolatie van de vloer inclusief leidingisolatie',
                'Leiding isolatie kruipruimte',

            ],
            'Gevelisolatie' => [
                'Spouwmuurisolatie',
                'Gevel isolatie binnenzijde',
                'Gevel isolatie buitenzijde',
            ],
            'Dakisolatie' => [
                'Isolatie hellend dak binnen',
                'Isolatie hellend dak, buiten (vervangen dakpannen, bitume isolerend onderdak etc)',
                'Isolatie plat dak, buiten (op huidige dakbedekking)',
                'Isolatie plat dak, buiten (vervanging huidige dakbedekking)',
                'Vegetatiedak',
                'Isolatie zoldervloer, bovenop',
                'Isolatie zoldervloer, tussen plafond',
            ],
            'Isolatieglas' => [
                'Glas-in-lood',
                'Plaatsen isolatieglas, alleen beglazing',
                'Plaatsen isolatieglas, inclusief kozijn',
                'Plaatsen geïsoleerd kozijn met triple glas',
                'Plaatsen achterzetbeglazing',
            ],
            'Kierdichting' => [
                'Kierdichting ramen en deuren',
                'Kierdichting aansluiting kozijn en muur',
                'Kierdichting aansluiting dak en muur',
                'Kierdichting aansluiting nok',
                'Kierdichting kruipluik, houten vloer',
            ],
            'Ventilatie' => [
                'Ventilatie roosters',
                'Decentrale ventilatie met wtw',
                'Gebalanceerde ventilatie met wtw',
                'Vraag gestuurde mechanische ventilatie',
                'Gelijkstroom ventilatiebox',
            ],
            'Cv-ketel' => [
                'Bestaande HR ketel vervangen',
                'HR ketel incl. afgifte systeem nieuw plaatsen',
                'HR ketel nieuw plaatsen',
            ],

            'Warmtepomp' => [
                'Hybride (bron lucht)',
                'Volledig (bron lucht)',
                'Volledig (bron bodem)',
                'Volledig (bron ventilatielucht)',
                'Warmtepompboiler (tbv tapwater)',
            ],
            'Biomassa' => [
                'Pelletkachel',
                'houtkachel Hoogrendement)',
            ],
            'Warmte afgifte' => [
                'Hoog temperatuur convectoren',
                'Hoog temperatuur radiatoren',
                'Laag temperatuur convectoren',
                'Laag temperatuur radiatoren',
                'Laag temperatuur vloerverwarming',
                'Laag temperatuur wandverwarming',
                'Stralingspanelen',
                'Thermostaatknoppen',
                'Waterzijdig inregelen',
                'Luchtverwarming',
                'Zone indeling',
            ],
            'Zonnepanelen' => [
                'Zonnepanelen',
            ],
            'Zonneboiler' => [
                'PVT',
                'Zonneboiler voor verwarming',
                'Zonneboiler voor warm tapwater',
                'Zonneboiler voor warm tapwater en verwarming',
            ],

            'Opslag' => [
                'Thermische opslag',
                'Batterij (huis/buurt)',
                'Koppeling elektrische auto',
                'PCM (phase change materials)',
                'Thermische opslag',
                'Thermochemische opslag',
            ],
            'Overig' => [
                'Elektrische apparatuur',
                'LED verlichting',
                'Witgoed',
                'Zonwering',
            ],

            'Domotica' => [
                'Energiemanagement',
                'Internet aansturing apparatuur',
                'Monitoring',
                'Slimme thermostaat',
                'Standby verbruik beperken',
                'Weersafhankelijke regeling',
            ],

            'Leidingisolatie overig' => [
                'Isolatie van leidingen anders dan in de kruipruimte',
            ],

            'Warm water toestel' => [
                'Spaardouche',
                'Douche wtw',
                'Hotfill',
                'Electrische boiler',
                'Recycle douche',
            ],
            'Energiebespaaradvies' => [
                'Epa-w',
                'Expertadvies',
                'Nul-op-de-meter advies',
            ],
            'Energiebespaarcoaching' => [
                'Keukentafelgesprek',
                'Warmtescan',
            ],
        ];
        $id = 0;
        foreach ($categorizedMeasures as $category => $measures) {
            // Get the category. If it doesn't exist: create it
            $catId = DB::table('measure_categories')->insertGetId(
                    [ 'name' => $category ]
                );
            // Create the measures
            foreach($measures as $measure) {
                DB::table('measures')->insertGetId(
                    ['name'=> $measure,
                     'measure_category_id' => $catId,
                     'number' => 'M2018-' . $id ]
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
        Schema::table('measure_categories', function (Blueprint $table) {
            //
        });
    }
}
