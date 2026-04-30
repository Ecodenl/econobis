<?php

namespace Database\Seeders\Fixed;

use App\Eco\OrganisationType\OrganisationType;
use Illuminate\Database\Seeder;

class OrganisationTypesSeeder extends Seeder
{
    public function run(): void
    {
        $organisationTypes = [
            ['name' => 'Leverancier'],
            ['name' => 'Afnemer'],
            ['name' => 'Coöperatie'],
        ];

        foreach ($organisationTypes as $organisationType) {
            OrganisationType::updateOrCreate(
                ['name' => $organisationType['name']],
                $organisationType
            );
        }
    }
}