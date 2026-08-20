<?php

namespace Database\Seeders\Fixed;

use App\Eco\Project\ProjectType;
use Illuminate\Database\Seeder;

class ProjectTypesSeeder extends Seeder
{
    public function run(): void
    {
        $projectTypes = [
            ['name' => 'Lening', 'code_ref' => 'loan', 'is_active' => 1],
            ['name' => 'Obligatie', 'code_ref' => 'obligation', 'is_active' => 1],
            ['name' => 'Kapitaal', 'code_ref' => 'capital', 'is_active' => 1],
            ['name' => 'Postcoderoos kapitaal', 'code_ref' => 'postalcode_link_capital', 'is_active' => 1],
            ['name' => 'Energiegemeenschappen', 'code_ref' => 'energy_community', 'is_active' => 1],
        ];

        foreach ($projectTypes as $projectType) {
            $existingProjectType = ProjectType::firstOrCreate(
                [
                    'code_ref' => $projectType['code_ref'],
                ],
                $projectType
            );

            $existingProjectType->update([
                'name' => $projectType['name'],
            ]);
        }
    }
}