<?php

namespace Database\Seeders\Fixed;

use App\Eco\Occupation\Occupation;
use Illuminate\Database\Seeder;

class OccupationsSeeder extends Seeder
{
    public function run(): void
    {
        Occupation::upsert([
            ['primary_occupation' => 'Directeur', 'secondary_occupation' => 'Directeur', 'occupation_for_portal' => 0],
            ['primary_occupation' => 'Eigenaar', 'secondary_occupation' => 'Eigenaar', 'occupation_for_portal' => 0],
            ['primary_occupation' => 'Verkoper', 'secondary_occupation' => 'Verkoper', 'occupation_for_portal' => 0],
            ['primary_occupation' => 'Administratief medewerker', 'secondary_occupation' => 'Administratief medewerker', 'occupation_for_portal' => 0],
            ['primary_occupation' => 'Technisch medewerker', 'secondary_occupation' => 'Technisch medewerker', 'occupation_for_portal' => 0],
            ['primary_occupation' => 'Financieel medewerker', 'secondary_occupation' => 'Financieel medewerker', 'occupation_for_portal' => 0],
            ['primary_occupation' => 'Wettelijke vertegenwoordiger', 'secondary_occupation' => 'Vertegenwoordigde', 'occupation_for_portal' => 1],
            ['primary_occupation' => 'Schenker', 'secondary_occupation' => 'Ontvanger', 'occupation_for_portal' => 0],
            ['primary_occupation' => 'Hoofdvestiging', 'secondary_occupation' => 'Nevenvestiging', 'occupation_for_portal' => 0],
            ['primary_occupation' => 'Bewindvoerder', 'secondary_occupation' => 'Bewindvoerder', 'occupation_for_portal' => 0],
            ['primary_occupation' => 'Penningmeester', 'secondary_occupation' => 'Penningmeester', 'occupation_for_portal' => 0],
            ['primary_occupation' => 'Voorzitter', 'secondary_occupation' => 'Voorzitter', 'occupation_for_portal' => 0],
            ['primary_occupation' => 'Secretaris', 'secondary_occupation' => 'Secretaris', 'occupation_for_portal' => 0],
            ['primary_occupation' => 'Medewerker', 'secondary_occupation' => 'Medewerker', 'occupation_for_portal' => 0],
            ['primary_occupation' => 'Bestuurslid', 'secondary_occupation' => 'Bestuurslid', 'occupation_for_portal' => 0],
            ['primary_occupation' => 'Huisgenoot', 'secondary_occupation' => 'Huisgenoot', 'occupation_for_portal' => 0],
            ['primary_occupation' => 'Coach van', 'secondary_occupation' => 'Gecoacht door', 'occupation_for_portal' => 0],
            ['primary_occupation' => 'Directeur/bestuurder', 'secondary_occupation' => 'Directeur/bestuurder', 'occupation_for_portal' => 0],
            ['primary_occupation' => 'Directeur-grootaandeelhouder', 'secondary_occupation' => 'Directeur-grootaandeelhouder', 'occupation_for_portal' => 0],
            ['primary_occupation' => 'Overste', 'secondary_occupation' => 'Overste', 'occupation_for_portal' => 0],
            ['primary_occupation' => 'Gegevens beheerd door', 'secondary_occupation' => 'Gegevensbeheerder van', 'occupation_for_portal' => 1],
            ['primary_occupation' => 'Projectleider', 'secondary_occupation' => 'Projectleider van', 'occupation_for_portal' => 0],
            ['primary_occupation' => 'Adviseur', 'secondary_occupation' => 'Adviseur van', 'occupation_for_portal' => 0],
            ['primary_occupation' => 'Manager', 'secondary_occupation' => 'Manager van', 'occupation_for_portal' => 0],
            ['primary_occupation' => 'Beheerder abonnement', 'secondary_occupation' => 'Abonnement beheerd door', 'occupation_for_portal' => 0],
            ['primary_occupation' => 'Factuur organisatie', 'secondary_occupation' => 'Afnemer organisatie', 'occupation_for_portal' => 0],
            ['primary_occupation' => 'Buren', 'secondary_occupation' => 'Buren van', 'occupation_for_portal' => 0],
            ['primary_occupation' => 'Politicus', 'secondary_occupation' => 'Politicus van', 'occupation_for_portal' => 0],
            ['primary_occupation' => 'Coördinator', 'secondary_occupation' => 'Coördinator van', 'occupation_for_portal' => 0],
            ['primary_occupation' => 'VvE lid', 'secondary_occupation' => 'VvE lid van', 'occupation_for_portal' => 0],
        ], ['primary_occupation', 'secondary_occupation'], ['occupation_for_portal']);
    }
}