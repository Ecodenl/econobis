<?php

namespace Database\Seeders\Fixed;

use App\Eco\Intake\IntakeStatus;
use Illuminate\Database\Seeder;

class IntakeStatusSeeder extends Seeder
{
    public function run(): void
    {
        $intakeStatuses = [
            ['name' => 'Open', 'code_ref' => 'open', 'order' => 1],
            ['name' => 'Afgesloten met kans', 'code_ref' => 'closed_with_opportunity', 'order' => 4],
            ['name' => 'Afgesloten zonder kans', 'code_ref' => 'closed_without_opportunity', 'order' => 3],
            ['name' => 'In behandeling', 'code_ref' => 'in_progress', 'order' => 2],
        ];

        foreach ($intakeStatuses as $intakeStatus) {
            IntakeStatus::updateOrCreate(
                ['code_ref' => $intakeStatus['code_ref']],
                $intakeStatus
            );
        }

    }
}