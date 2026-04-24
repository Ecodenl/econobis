<?php

namespace Database\Seeders\Fixed;

use App\Eco\ParticipantMutation\ParticipantMutationStatus;
use Illuminate\Database\Seeder;

class ParticipantMutationStatusesSeeder extends Seeder
{
    public function run(): void
    {
        ParticipantMutationStatus::upsert([
            ['name' => 'Interesse', 'code_ref' => 'interest'],
            ['name' => 'Inschrijving', 'code_ref' => 'option'],
            ['name' => 'Toegekend', 'code_ref' => 'granted'],
            ['name' => 'Definitief', 'code_ref' => 'final'],
        ], ['code_ref'], ['name']);
    }
}