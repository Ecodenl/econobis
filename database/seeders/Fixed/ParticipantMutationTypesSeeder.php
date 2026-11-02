<?php

namespace Database\Seeders\Fixed;

use App\Eco\ParticipantMutation\ParticipantMutationType;
use App\Eco\Project\ProjectType;
use Illuminate\Database\Seeder;

class ParticipantMutationTypesSeeder extends Seeder
{
    public function run(): void
    {
        $participantMutationTypes = [
            ['name' => 'Lening afsluiten', 'description' => 'Inleg', 'code_ref' => 'first_deposit', 'project_type_code_ref' => 'loan', 'order_per_type' => 1],
            ['name' => 'Bijstorten', 'description' => 'Inleg', 'code_ref' => 'deposit', 'project_type_code_ref' => 'loan', 'order_per_type' => 2],
            ['name' => 'Aflossing', 'description' => 'Opname', 'code_ref' => 'with_drawal', 'project_type_code_ref' => 'loan', 'order_per_type' => 3],
            ['name' => 'Rente', 'description' => 'Resultaat', 'code_ref' => 'result', 'project_type_code_ref' => 'loan', 'order_per_type' => 4],
            ['name' => 'Aflossing', 'description' => 'Aflossing', 'code_ref' => 'redemption', 'project_type_code_ref' => 'loan', 'order_per_type' => 5],
            ['name' => 'Resultaat', 'description' => 'Resultaat bijschrijven', 'code_ref' => 'result_deposit', 'project_type_code_ref' => 'loan', 'order_per_type' => 6],

            ['name' => 'Uitgifte obligatie', 'description' => 'Inleg', 'code_ref' => 'first_deposit', 'project_type_code_ref' => 'obligation', 'order_per_type' => 1],
            ['name' => 'Terugbetaling', 'description' => 'Opname', 'code_ref' => 'with_drawal', 'project_type_code_ref' => 'obligation', 'order_per_type' => 2],
            ['name' => 'Rente', 'description' => 'Resultaat', 'code_ref' => 'result', 'project_type_code_ref' => 'obligation', 'order_per_type' => 3],
            ['name' => 'Aflossing', 'description' => 'Aflossing', 'code_ref' => 'redemption', 'project_type_code_ref' => 'obligation', 'order_per_type' => 4],
            ['name' => 'Resultaat', 'description' => 'Uitkering handmatig', 'code_ref' => 'result_deposit', 'project_type_code_ref' => 'obligation', 'order_per_type' => 5],

            ['name' => 'Kapitaalstorting', 'description' => 'Inleg', 'code_ref' => 'first_deposit', 'project_type_code_ref' => 'capital', 'order_per_type' => 1],
            ['name' => 'Kapitaal terugbetaling', 'description' => 'Opname', 'code_ref' => 'with_drawal', 'project_type_code_ref' => 'capital', 'order_per_type' => 2],
            ['name' => 'Resultaat', 'description' => 'Resultaat', 'code_ref' => 'result', 'project_type_code_ref' => 'capital', 'order_per_type' => 3],
            ['name' => 'Boekwaarde aanpassing', 'description' => 'Boekwaarde', 'code_ref' => 'bookworth', 'project_type_code_ref' => 'capital', 'order_per_type' => 4],
            ['name' => 'Resultaat', 'description' => 'Resultaat bijschrijven', 'code_ref' => 'result_deposit', 'project_type_code_ref' => 'capital', 'order_per_type' => 5],

            ['name' => 'Kapitaalstorting', 'description' => 'Inleg', 'code_ref' => 'first_deposit', 'project_type_code_ref' => 'postalcode_link_capital', 'order_per_type' => 1],
            ['name' => 'Teruggave EB', 'description' => 'Indicatie teruggave EB', 'code_ref' => 'energy_tax_refund', 'project_type_code_ref' => 'postalcode_link_capital', 'order_per_type' => 2],
            ['name' => 'Kapitaal terugbetaling', 'description' => 'Opname', 'code_ref' => 'with_drawal', 'project_type_code_ref' => 'postalcode_link_capital', 'order_per_type' => 3],
            ['name' => 'Resultaat', 'description' => 'Resultaat', 'code_ref' => 'result', 'project_type_code_ref' => 'postalcode_link_capital', 'order_per_type' => 4],
            ['name' => 'Boekwaarde aanpassing', 'description' => 'Boekwaarde', 'code_ref' => 'bookworth', 'project_type_code_ref' => 'postalcode_link_capital', 'order_per_type' => 5],
            ['name' => 'Resultaat', 'description' => 'Resultaat bijschrijven', 'code_ref' => 'result_deposit', 'project_type_code_ref' => 'postalcode_link_capital', 'order_per_type' => 6],

            ['name' => 'Deelname', 'description' => 'Deelname', 'code_ref' => 'participation', 'project_type_code_ref' => 'energy_community', 'order_per_type' => 1],
            ['name' => 'Beëindiging deelname', 'description' => 'Beëindiging deelname', 'code_ref' => 'termination', 'project_type_code_ref' => 'energy_community', 'order_per_type' => 2],
        ];

        foreach ($participantMutationTypes as $participantMutationType) {
            $projectType = ProjectType::where(
                'code_ref',
                $participantMutationType['project_type_code_ref']
            )->firstOrFail();

            ParticipantMutationType::updateOrCreate(
                [
                    'code_ref' => $participantMutationType['code_ref'],
                    'project_type_id' => $projectType->id,
                ],
                [
                    'name' => $participantMutationType['name'],
                    'description' => $participantMutationType['description'],
                    'order_per_type' => $participantMutationType['order_per_type'],
                ]
            );
        }
    }
}