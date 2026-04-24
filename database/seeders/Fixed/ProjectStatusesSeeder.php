<?php

namespace Database\Seeders\Fixed;

use App\Eco\Project\ProjectStatus;
use Illuminate\Database\Seeder;

class ProjectStatusesSeeder extends Seeder
{
    public function run(): void
    {
        ProjectStatus::upsert([
            ['id' => 1, 'name' => 'Concept', 'code_ref' => 'concept', 'order' => 1],
            ['id' => 2, 'name' => 'Actief', 'code_ref' => 'active', 'order' => 2],
            ['id' => 3, 'name' => 'Beëindigd', 'code_ref' => 'ended', 'order' => 4],
            ['id' => 4, 'name' => 'Gerealiseerd', 'code_ref' => '', 'order' => 3],
        ], ['id'], ['name', 'code_ref', 'order']);
    }
}