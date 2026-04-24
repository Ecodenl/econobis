<?php

namespace Database\Seeders\Fixed;

use App\Eco\ParticipantProject\ParticipantProjectPayoutType;
use Illuminate\Database\Seeder;

class ParticipantProjectPayoutTypesSeeder extends Seeder
{
    public function run(): void
    {
        ParticipantProjectPayoutType::upsert([
            ['name' => 'Uitbetalen (Rekening klant)', 'code_ref' => 'account'],
            ['name' => 'Naar kapitaalrekening (niet uitbetalen)', 'code_ref' => 'credit'],
            ['name' => 'Energieleverancier', 'code_ref' => ''],
        ], ['code_ref'], ['name']);
    }
}