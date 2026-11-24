<?php

namespace Database\Seeders\Fixed;

use App\Eco\HousingFile\HousingFileSpecificationStatus;
use Illuminate\Database\Seeder;

class HousingFileSpecificationStatusesSeeder extends Seeder
{
    public function run(): void
    {
        $housingFileSpecificationStatuses = [
            ['name' => 'Gewenst', 'code_ref' => 'desirable', 'order' => 1],
            ['name' => 'Wordt gerealiseerd', 'code_ref' => 'is_realized', 'order' => 3],
            ['name' => 'Aanwezig', 'code_ref' => 'present', 'order' => 4],
            ['name' => 'Onbekend', 'code_ref' => 'unknown', 'order' => 5],
            ['name' => 'Kans gemaakt', 'code_ref' => 'opportunity_created', 'order' => 2],
        ];

        foreach ($housingFileSpecificationStatuses as $housingFileSpecificationStatus) {
            HousingFileSpecificationStatus::updateOrCreate(
                ['code_ref' => $housingFileSpecificationStatus['code_ref']],
                $housingFileSpecificationStatus
            );
        }
    }
}