<?php

namespace Database\Seeders\Fixed;

use App\Eco\Project\ProjectLoanType;
use Illuminate\Database\Seeder;

class ProjectLoanTypesSeeder extends Seeder
{
    public function run(): void
    {
        ProjectLoanType::upsert([
            ['name' => 'Aflossing over initiële inleg', 'code_ref' => 'lineair'],
            ['name' => 'Aflossing over actuele waarde', 'code_ref' => 'annuitair'],
        ], ['code_ref'], ['name']);
    }
}