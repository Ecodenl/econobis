<?php

namespace Database\Seeders\Fixed;

use App\Eco\Project\ProjectRevenueType;
use Illuminate\Database\Seeder;

class ProjectRevenueTypesSeeder extends Seeder
{
    public function run(): void
    {
        ProjectRevenueType::upsert([
            ['name' => 'Rente'],
            ['name' => 'Dividend'],
            ['name' => 'Productie'],
            ['name' => 'Rendement'],
            ['name' => 'Aflossing'],
            ['name' => 'Rente en aflossing'],
        ], ['name'], []);
    }
}