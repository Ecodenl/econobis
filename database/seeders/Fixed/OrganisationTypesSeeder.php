<?php

namespace Database\Seeders\Fixed;

use App\Eco\OrganisationType\OrganisationType;
use Illuminate\Database\Seeder;

class OrganisationTypesSeeder extends Seeder
{
    public function run(): void
    {
        OrganisationType::upsert([
            ['name' => 'Leverancier'],
            ['name' => 'Afnemer'],
            ['name' => 'Coöperatie'],
        ], ['name'], []);
    }
}