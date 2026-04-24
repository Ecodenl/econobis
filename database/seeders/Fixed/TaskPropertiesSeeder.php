<?php

namespace Database\Seeders\Fixed;

use App\Eco\Task\TaskProperty;
use Illuminate\Database\Seeder;

class TaskPropertiesSeeder extends Seeder
{
    public function run(): void
    {
        TaskProperty::upsert([
            ['name' => 'Aantal', 'code' => 'aantal'],
            ['name' => 'Advies', 'code' => 'advies'],
            ['name' => 'Conceptovereenkomst', 'code' => 'conceptovereenkomst'],
            ['name' => 'Lid', 'code' => 'lid'],
            ['name' => 'Bedrijf', 'code' => 'bedrijf'],
            ['name' => 'Naam bedrijf', 'code' => 'naam_bedrijf'],
            ['name' => 'Energiemaatschappij', 'code' => 'energiemaatschappij'],
            ['name' => 'Akkoord', 'code' => 'akkoord'],
            ['name' => 'Later bellen', 'code' => 'later_bellen'],
            ['name' => 'Lid worden', 'code' => 'lid_worden'],
            ['name' => 'Overstappen', 'code' => 'overstappen'],
            ['name' => 'Jeugdlid', 'code' => 'jeugdlid'],
            ['name' => 'Naam wettelijk vertegenwoordiger', 'code' => 'wettelijk_vertegenwoordiger_naam'],
            ['name' => 'Telefoonnummer wettelijke vertegenwoordiger', 'code' => 'wettelijk_vertegenwoordiger_telefoonnummer'],
            ['name' => 'E-mailadres wettelijk vertegenwoordiger', 'code' => 'wettelijk_vertegenwoordiger_emailadres'],
            ['name' => 'Tijdstip bellen', 'code' => 'tijdstip_bellen'],
            ['name' => 'Jaarverbruik kWh', 'code' => 'jaarverbruik_kwh'],
            ['name' => 'Bestemd voor', 'code' => 'bestemd_voor'],
            ['name' => 'Wil voorinschrijven', 'code' => 'wil_voorinschrijven'],
            ['name' => 'Wil informatie over energiebesparing', 'code' => 'wil_informatie_energiebesparing'],
            ['name' => 'Aantal panelen', 'code' => 'aantal_panelen'],
            ['name' => 'Brochure aanvragen', 'code' => 'brochure_aanvragen'],
            ['name' => 'Buurt initiatief', 'code' => 'buurt_initiatief'],
            ['name' => 'Verzendwijze', 'code' => 'verzendwijze'],
        ], ['code'], ['name']);
    }
}