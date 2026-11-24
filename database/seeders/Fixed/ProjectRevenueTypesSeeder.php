<?php

namespace Database\Seeders\Fixed;

use App\Eco\Project\ProjectRevenueType;
use Illuminate\Database\Seeder;

class ProjectRevenueTypesSeeder extends Seeder
{
    public function run(): void
    {
        $projectRevenueTypes = [
            ['name' => 'Rente'],
            ['name' => 'Dividend'],
            ['name' => 'Productie'],
            ['name' => 'Rendement'],
            ['name' => 'Aflossing'],
            ['name' => 'Rente en aflossing'],
        ];

        foreach ($projectRevenueTypes as $projectRevenueType) {
            ProjectRevenueType::updateOrCreate(
                ['name' => $projectRevenueType['name']],
                $projectRevenueType
            );
        }
    }
}