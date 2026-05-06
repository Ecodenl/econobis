<?php

namespace Database\Seeders\Fixed;

use App\Eco\ParticipantMutation\ParticipantMutationStatus;
use Illuminate\Database\Seeder;

class ParticipantMutationStatusesSeeder extends Seeder
{
    public function run(): void
    {
        $participantMutationStatuses = [
            ['name' => 'Interesse', 'code_ref' => 'interest'],
            ['name' => 'Inschrijving', 'code_ref' => 'option'],
            ['name' => 'Toegekend', 'code_ref' => 'granted'],
            ['name' => 'Definitief', 'code_ref' => 'final'],
        ];

        foreach ($participantMutationStatuses as $participantMutationStatus) {
            ParticipantMutationStatus::updateOrCreate(
                ['code_ref' => $participantMutationStatus['code_ref']],
                $participantMutationStatus
            );
        }
    }
}