<?php

namespace Database\Seeders\Fixed;

use App\Eco\ParticipantProject\ParticipantProjectPayoutType;
use Illuminate\Database\Seeder;

class ParticipantProjectPayoutTypesSeeder extends Seeder
{
    public function run(): void
    {
        $participantProjectPayoutTypes = [
            ['name' => 'Uitbetalen (Rekening klant)', 'code_ref' => 'account'],
            ['name' => 'Naar kapitaalrekening (niet uitbetalen)', 'code_ref' => 'credit'],
        ];

        foreach ($participantProjectPayoutTypes as $participantProjectPayoutType) {
            ParticipantProjectPayoutType::updateOrCreate(
                ['code_ref' => $participantProjectPayoutType['code_ref']],
                $participantProjectPayoutType
            );
        }
    }
}