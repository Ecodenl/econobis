<?php

namespace Database\Seeders\Fixed;

use App\Eco\Project\ProjectLoanType;
use Illuminate\Database\Seeder;

class ProjectLoanTypesSeeder extends Seeder
{
    public function run(): void
    {
        $projectLoanTypes = [
            ['name' => 'Aflossing over initiële inleg', 'code_ref' => 'lineair'],
            ['name' => 'Aflossing over actuele waarde', 'code_ref' => 'annuitair'],
        ];

        foreach ($projectLoanTypes as $projectLoanType) {
            ProjectLoanType::updateOrCreate(
                ['code_ref' => $projectLoanType['code_ref']],
                $projectLoanType
            );
        }
    }
}