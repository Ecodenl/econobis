<?php

namespace Database\Seeders\Fixed;

use App\Eco\Project\ProjectRevenueCategory;
use Illuminate\Database\Seeder;

class ProjectRevenueCategoriesSeeder extends Seeder
{
    public function run(): void
    {
        $projectRevenueCategories = [
            ['name' => 'Opbrengst kWh', 'code_ref' => 'revenueKwh'],
            ['name' => 'Opbrengst euro', 'code_ref' => 'revenueEuro'],
            ['name' => 'Aflossing Euro', 'code_ref' => 'redemptionEuro'],
            ['name' => 'Tussentijds kWh', 'code_ref' => 'revenueKwhSplit'],
            ['name' => 'Opbrengst deelnemer', 'code_ref' => 'revenueParticipant'],
        ];

        foreach ($projectRevenueCategories as $projectRevenueCategory) {
            ProjectRevenueCategory::updateOrCreate(
                ['code_ref' => $projectRevenueCategory['code_ref']],
                $projectRevenueCategory
            );
        }
    }
}