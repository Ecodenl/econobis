<?php

namespace Database\Seeders\Fixed;

use App\Eco\Opportunity\OpportunityStatus;
use Illuminate\Database\Seeder;

class OpportunityStatusesSeeder extends Seeder
{
    public function run(): void
    {
        // Volgens mij worden deze niet meer gebruikt (zijn dacht ik verplaatst naar campaign_workflows): email_template_id_wf, number_of_days_to_send_email,
        // De volgende zouden denk ik nog wel eens ergens gebruikt kunnen worden: active, external_hoom_id, order

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

        // We voegen ontbrekende (nieuwe) records toe en van bestaande wijzigen we alleen: name, active, external_hoom_id, order
        // We gebruiken hier daarom firstOrCreate() en doen daarna een update() voor niet muteerbare velden (voor gebruiker).
        foreach ($opportunityStatuses as $opportunityStatus) {
            $existingOpportunityStatus = OpportunityStatus::firstOrCreate(
                ['code_ref' => $opportunityStatus['code_ref']],
                $opportunityStatus
            );
            $existingOpportunityStatus->update([
                'name' => $opportunityStatus['name'],
                'active' => $opportunityStatus['active'],
                'external_hoom_id' => $opportunityStatus['external_hoom_id'],
                'order' => $opportunityStatus['order'],
            ]);
        }
    }
}