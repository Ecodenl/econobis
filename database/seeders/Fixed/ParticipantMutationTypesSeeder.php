<?php

namespace Database\Seeders\Fixed;

use App\Eco\ParticipantMutation\ParticipantMutationType;
use Illuminate\Database\Seeder;

class ParticipantMutationTypesSeeder extends Seeder
{
    public function run(): void
    {
        $participantMutationTypes = [
            ['name' => 'Lening afsluiten', 'description' => 'Inleg', 'code_ref' => 'first_deposit', 'project_type_id' => 5],
            ['name' => 'Bijstorten', 'description' => 'Inleg', 'code_ref' => 'deposit', 'project_type_id' => 5],
            ['name' => 'Aflossing', 'description' => 'Opname', 'code_ref' => 'withDrawal', 'project_type_id' => 5],
            ['name' => 'Rente', 'description' => 'Resultaat', 'code_ref' => 'result', 'project_type_id' => 5],

            ['name' => 'Uitgifte obligatie', 'description' => 'Inleg', 'code_ref' => 'first_deposit', 'project_type_id' => 6],
            ['name' => 'Terugbetaling', 'description' => 'Opname', 'code_ref' => 'withDrawal', 'project_type_id' => 6],
            ['name' => 'Rente', 'description' => 'Resultaat', 'code_ref' => 'result', 'project_type_id' => 6],

            ['name' => 'Kapitaalstorting', 'description' => 'Inleg', 'code_ref' => 'first_deposit', 'project_type_id' => 7],
            ['name' => 'Kapitaal terugbetaling', 'description' => 'Opname', 'code_ref' => 'withDrawal', 'project_type_id' => 7],
            ['name' => 'Resultaat', 'description' => 'Resultaat', 'code_ref' => 'result', 'project_type_id' => 7],
            ['name' => 'Boekwaarde aanpassing', 'description' => 'Boekwaarde', 'code_ref' => 'bookworth', 'project_type_id' => 7],

            ['name' => 'Kapitaalstorting', 'description' => 'Inleg', 'code_ref' => 'first_deposit', 'project_type_id' => 8],
            ['name' => 'Teruggave EB', 'description' => 'Indicatie teruggave EB', 'code_ref' => 'energyTaxRefund', 'project_type_id' => 8],
            ['name' => 'Kapitaal terugbetaling', 'description' => 'Opname', 'code_ref' => 'withDrawal', 'project_type_id' => 8],
            ['name' => 'Resultaat', 'description' => 'Resultaat', 'code_ref' => 'result', 'project_type_id' => 8],
            ['name' => 'Boekwaarde aanpassing', 'description' => 'Boekwaarde', 'code_ref' => 'bookworth', 'project_type_id' => 8],

            ['name' => 'Aflossing', 'description' => 'Aflossing', 'code_ref' => 'redemption', 'project_type_id' => 5],
            ['name' => 'Aflossing', 'description' => 'Aflossing', 'code_ref' => 'redemption', 'project_type_id' => 6],

            ['name' => 'Resultaat', 'description' => 'Resultaat bijschrijven', 'code_ref' => 'result_deposit', 'project_type_id' => 7],
            ['name' => 'Resultaat', 'description' => 'Resultaat bijschrijven', 'code_ref' => 'result_deposit', 'project_type_id' => 8],
            ['name' => 'Resultaat', 'description' => 'Resultaat bijschrijven', 'code_ref' => 'result_deposit', 'project_type_id' => 5],
            ['name' => 'Resultaat', 'description' => 'Uitkering handmatig', 'code_ref' => 'result_deposit', 'project_type_id' => 6],
        ];

        foreach ($participantMutationTypes as $participantMutationType) {
            ParticipantMutationType::updateOrCreate(
                ['code_ref' => $participantMutationType['code_ref']],
                $participantMutationType
            );
        }
    }
}