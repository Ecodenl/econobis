<?php

namespace Database\Seeders\Fixed;

use App\Eco\Opportunity\OpportunityStatus;
use Illuminate\Database\Seeder;

class OpportunityStatusSeeder extends Seeder
{
    public function run(): void
    {
        $opportunityStatuses = [
            ['name' => 'Actief', 'uses_wf' => 0, 'email_template_id_wf' => null, 'number_of_days_to_send_email' => 0, 'active' => 1, 'external_hoom_id' => 1, 'code_ref' => 'active', 'order' => 2],
            ['name' => 'In afwachting', 'uses_wf' => 0, 'email_template_id_wf' => null, 'number_of_days_to_send_email' => 0, 'active' => 1, 'external_hoom_id' => 3, 'code_ref' => 'pending', 'order' => 3],
            ['name' => 'Uitgevoerd', 'uses_wf' => 0, 'email_template_id_wf' => null, 'number_of_days_to_send_email' => 0, 'active' => 1, 'external_hoom_id' => 5, 'code_ref' => 'executed', 'order' => 5],
            ['name' => 'Uitvoering, doe het zelf', 'uses_wf' => 0, 'email_template_id_wf' => null, 'number_of_days_to_send_email' => 0, 'active' => 0, 'external_hoom_id' => null, 'code_ref' => 'executed-do-it-yourself', 'order' => 5],
            ['name' => 'Geen uitvoering', 'uses_wf' => 0, 'email_template_id_wf' => null, 'number_of_days_to_send_email' => 0, 'active' => 1, 'external_hoom_id' => 6, 'code_ref' => 'no_execution', 'order' => 70],
            ['name' => 'Opdracht', 'uses_wf' => 0, 'email_template_id_wf' => null, 'number_of_days_to_send_email' => 0, 'active' => 1, 'external_hoom_id' => null, 'code_ref' => 'mandate', 'order' => 4],
            ['name' => 'Inactief', 'uses_wf' => 0, 'email_template_id_wf' => null, 'number_of_days_to_send_email' => 0, 'active' => 1, 'external_hoom_id' => 2, 'code_ref' => 'inactive', 'order' => 1],
            ['name' => 'Verwijderd in Hoomdossier', 'uses_wf' => 0, 'email_template_id_wf' => null, 'number_of_days_to_send_email' => 0, 'active' => 1, 'external_hoom_id' => null, 'code_ref' => 'deleted_in_hd', 'order' => 80],
            ['name' => 'In uitvoering', 'uses_wf' => 0, 'email_template_id_wf' => null, 'number_of_days_to_send_email' => 0, 'active' => 1, 'external_hoom_id' => 4, 'code_ref' => 'in_progress', 'order' => 4],
            ['name' => 'Uitgevoerd zonder maatregel', 'uses_wf' => 0, 'email_template_id_wf' => null, 'number_of_days_to_send_email' => 0, 'active' => 1, 'external_hoom_id' => null, 'code_ref' => 'executed_without_measure', 'order' => 6],
            ['name' => 'Subsidie aanvaag in afwachting', 'uses_wf' => 0, 'email_template_id_wf' => null, 'number_of_days_to_send_email' => 0, 'active' => 1, 'external_hoom_id' => null, 'code_ref' => 'subsidy-request_pending', 'order' => 10],
            ['name' => 'Subsidie aanvraag toegekend', 'uses_wf' => 0, 'email_template_id_wf' => null, 'number_of_days_to_send_email' => 0, 'active' => 1, 'external_hoom_id' => null, 'code_ref' => 'subsidy-request_granted', 'order' => 11],
            ['name' => 'Subsidie aanvraag afgewezen', 'uses_wf' => 0, 'email_template_id_wf' => null, 'number_of_days_to_send_email' => 0, 'active' => 1, 'external_hoom_id' => null, 'code_ref' => 'subsidy-request_rejected', 'order' => 12],
        ];

        foreach ($opportunityStatuses as $opportunityStatus) {
            OpportunityStatus::updateOrCreate(
                ['code_ref' => $opportunityStatus['code_ref']],
                $opportunityStatus
            );
        }
    }
}