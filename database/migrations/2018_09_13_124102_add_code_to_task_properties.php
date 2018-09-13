<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddCodeToTaskProperties extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('task_properties', function (Blueprint $table) {
            $table->string('code')->default('');
        });

        foreach (\App\Eco\Task\TaskProperty::all() as $taskProperty) {
            $taskProperty->code = strtolower(str_replace(' ', '_', $taskProperty->name));
            $taskProperty->save();
        }

        foreach ([
                     'lid_worden' => 'Lid worden',
                     'overstappen' => 'Overstappen',
                     'advies' => 'Advies',
                     'conceptovereenkomst' => 'Conceptovereenkomst',
                     'bedrijf' => 'Bedrijf',
                     'naam_bedrijf' => 'Naam bedrijf',
                     'jeugdlid' => 'Jeugdlid',
                     'wettelijk_vertegenwoordiger_naam' => 'Naam wettelijk vertegenwoordiger',
                     'wettelijk_vertegenwoordiger_telefoonnummer' => 'Telefoonnummer wettelijke vertegenwoordiger',
                     'wettelijk_vertegenwoordiger_emailadres' => 'E-mailadres wettelijk vertegenwoordiger',
                     'tijdstip_bellen' => 'Tijdstip bellen',
                     'jaarverbruik_kwh' => 'Jaarverbruik kWh',
                     'bestemd_voor' => 'Bestemd voor',
                     'wil_voorinschrijven' => 'Wil voorinschrijven',
                     'wil_informatie_energiebesparing' => 'Wil informatie over energiebesparing',
                     'aantal_panelen' => 'Aantal panelen',
                 ] as $code => $name) {
            $taskProperty::create([
                'code' => $code,
                'name' => $name,
            ]);
        }
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('task_properties', function (Blueprint $table) {
            //
        });
    }
}
