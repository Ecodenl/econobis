<?php

namespace Database\Seeders\Fixed;

use App\Eco\Project\ProjectType;
use Illuminate\Database\Seeder;

class ProjectTypesSeeder extends Seeder
{
    public function run(): void
    {
        $projectTypes = [
            ['id' => 1, 'name' => 'SDE', 'code_ref' => '', 'is_active' => 0],
            ['id' => 2, 'name' => 'PCR', 'code_ref' => '', 'is_active' => 0],
            ['id' => 3, 'name' => 'Investering', 'code_ref' => '', 'is_active' => 0],
            ['id' => 4, 'name' => 'Rente+aflossing', 'code_ref' => '', 'is_active' => 0],
            ['id' => 5, 'name' => 'Lening', 'code_ref' => 'loan', 'is_active' => 1],
            ['id' => 6, 'name' => 'Obligatie', 'code_ref' => 'obligation', 'is_active' => 1],
            ['id' => 7, 'name' => 'Kapitaal', 'code_ref' => 'capital', 'is_active' => 1],
            ['id' => 8, 'name' => 'Postcoderoos kapitaal', 'code_ref' => 'postalcode_link_capital', 'is_active' => 1],
        ];

        foreach ($projectTypes as $projectType) {
            ProjectType::updateOrCreate(
                ['id' => $projectType['id']],
                $projectType
            );
        }
    }
}