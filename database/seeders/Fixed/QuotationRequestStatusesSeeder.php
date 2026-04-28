<?php

namespace Database\Seeders\Fixed;

use App\Eco\Opportunity\OpportunityAction;
use App\Eco\QuotationRequest\QuotationRequestStatus;
use Illuminate\Database\Seeder;

class QuotationRequestStatusesSeeder extends Seeder
{
    public function run(): void
    {
        $opportunityActionIds = OpportunityAction::query()
            ->pluck('id', 'code_ref');

        $quotationRequestStatuses = [
            ['name' => 'In overweging bij bewoner', 'code_ref' => 'under-review-occupant', 'opportunity_action_id' => $opportunityActionIds['quotation-request'], 'uses_wf' => 0, 'email_template_id_wf' => null, 'mail_cc_to_coach_wf' => 0, 'number_of_days_to_send_email' => 0, 'send_email_reminder' => 0, 'order' => 4, 'is_pending_status' => 1],
            ['name' => 'Bewoner is akkoord', 'code_ref' => 'approved', 'opportunity_action_id' => $opportunityActionIds['quotation-request'], 'uses_wf' => 0, 'email_template_id_wf' => null, 'mail_cc_to_coach_wf' => 0, 'number_of_days_to_send_email' => 0, 'send_email_reminder' => 0, 'order' => 5, 'is_pending_status' => 0],
            ['name' => 'Bewoner heeft afgewezen', 'code_ref' => 'not-approved', 'opportunity_action_id' => $opportunityActionIds['quotation-request'], 'uses_wf' => 0, 'email_template_id_wf' => null, 'mail_cc_to_coach_wf' => 0, 'number_of_days_to_send_email' => 0, 'send_email_reminder' => 0, 'order' => 6, 'is_pending_status' => 0],
            ['name' => 'Offerte niet mogelijk', 'code_ref' => 'not-possible', 'opportunity_action_id' => $opportunityActionIds['quotation-request'], 'uses_wf' => 0, 'email_template_id_wf' => null, 'mail_cc_to_coach_wf' => 0, 'number_of_days_to_send_email' => 0, 'send_email_reminder' => 0, 'order' => 7, 'is_pending_status' => 0],
            ['name' => 'Offerte aangevraagd', 'code_ref' => 'default', 'opportunity_action_id' => $opportunityActionIds['quotation-request'], 'uses_wf' => 0, 'email_template_id_wf' => null, 'mail_cc_to_coach_wf' => 0, 'number_of_days_to_send_email' => 0, 'send_email_reminder' => 0, 'order' => 2, 'is_pending_status' => 1],
            ['name' => 'Geen reactie ontvangen', 'code_ref' => 'no-response', 'opportunity_action_id' => $opportunityActionIds['quotation-request'], 'uses_wf' => 0, 'email_template_id_wf' => null, 'mail_cc_to_coach_wf' => 0, 'number_of_days_to_send_email' => 0, 'send_email_reminder' => 0, 'order' => 8, 'is_pending_status' => 1],
            ['name' => 'Geen afspraak gemaakt', 'code_ref' => 'default', 'opportunity_action_id' => $opportunityActionIds['visit'], 'uses_wf' => 0, 'email_template_id_wf' => null, 'mail_cc_to_coach_wf' => 0, 'number_of_days_to_send_email' => 0, 'send_email_reminder' => 0, 'order' => 1, 'is_pending_status' => 0],
            ['name' => 'Afspraak gemaakt', 'code_ref' => 'made', 'opportunity_action_id' => $opportunityActionIds['visit'], 'uses_wf' => 0, 'email_template_id_wf' => null, 'mail_cc_to_coach_wf' => 0, 'number_of_days_to_send_email' => 0, 'send_email_reminder' => 0, 'order' => 3, 'is_pending_status' => 1],
            ['name' => 'Afspraak uitgevoerd', 'code_ref' => 'done', 'opportunity_action_id' => $opportunityActionIds['visit'], 'uses_wf' => 0, 'email_template_id_wf' => null, 'mail_cc_to_coach_wf' => 0, 'number_of_days_to_send_email' => 0, 'send_email_reminder' => 0, 'order' => 4, 'is_pending_status' => 0],
            ['name' => 'Budgetaanvraag open', 'code_ref' => 'default', 'opportunity_action_id' => $opportunityActionIds['subsidy-request'], 'uses_wf' => 0, 'email_template_id_wf' => null, 'mail_cc_to_coach_wf' => 0, 'number_of_days_to_send_email' => 0, 'send_email_reminder' => 0, 'order' => 1, 'is_pending_status' => 1],
            ['name' => 'Budgetaanvraag gemaakt', 'code_ref' => 'made', 'opportunity_action_id' => $opportunityActionIds['subsidy-request'], 'uses_wf' => 0, 'email_template_id_wf' => null, 'mail_cc_to_coach_wf' => 0, 'number_of_days_to_send_email' => 0, 'send_email_reminder' => 0, 'order' => 2, 'is_pending_status' => 0],
            ['name' => 'Budgetaanvraag akkoord', 'code_ref' => 'pm-approved', 'opportunity_action_id' => $opportunityActionIds['subsidy-request'], 'uses_wf' => 0, 'email_template_id_wf' => null, 'mail_cc_to_coach_wf' => 0, 'number_of_days_to_send_email' => 0, 'send_email_reminder' => 0, 'order' => 3, 'is_pending_status' => 0],
            ['name' => 'Budgetaanvraag niet akkoord', 'code_ref' => 'pm-not-approved', 'opportunity_action_id' => $opportunityActionIds['subsidy-request'], 'uses_wf' => 0, 'email_template_id_wf' => null, 'mail_cc_to_coach_wf' => 0, 'number_of_days_to_send_email' => 0, 'send_email_reminder' => 0, 'order' => 4, 'is_pending_status' => 0],
            ['name' => 'Afspraak afgezegd', 'code_ref' => 'cancelled', 'opportunity_action_id' => $opportunityActionIds['visit'], 'uses_wf' => 0, 'email_template_id_wf' => null, 'mail_cc_to_coach_wf' => 0, 'number_of_days_to_send_email' => 0, 'send_email_reminder' => 0, 'order' => 5, 'is_pending_status' => 0],
            ['name' => 'Budgetaanvraag verstuurd naar bewoner', 'code_ref' => 'under-review-occupant', 'opportunity_action_id' => $opportunityActionIds['subsidy-request'], 'uses_wf' => 0, 'email_template_id_wf' => null, 'mail_cc_to_coach_wf' => 0, 'number_of_days_to_send_email' => 0, 'send_email_reminder' => 0, 'order' => 5, 'is_pending_status' => 0],
            ['name' => 'Subsidieaanvraag in behandeling', 'code_ref' => 'under-review', 'opportunity_action_id' => $opportunityActionIds['subsidy-request'], 'uses_wf' => 0, 'email_template_id_wf' => null, 'mail_cc_to_coach_wf' => 0, 'number_of_days_to_send_email' => 0, 'send_email_reminder' => 0, 'order' => 6, 'is_pending_status' => 0],
            ['name' => 'Subsidie aanvraag beschikt', 'code_ref' => 'approved', 'opportunity_action_id' => $opportunityActionIds['subsidy-request'], 'uses_wf' => 0, 'email_template_id_wf' => null, 'mail_cc_to_coach_wf' => 0, 'number_of_days_to_send_email' => 0, 'send_email_reminder' => 0, 'order' => 7, 'is_pending_status' => 0],
            ['name' => 'Subsidie aanvraag niet beschikt', 'code_ref' => 'not-approved', 'opportunity_action_id' => $opportunityActionIds['subsidy-request'], 'uses_wf' => 0, 'email_template_id_wf' => null, 'mail_cc_to_coach_wf' => 0, 'number_of_days_to_send_email' => 0, 'send_email_reminder' => 0, 'order' => 8, 'is_pending_status' => 0],
            ['name' => 'Offerte nog niet aangevraagd', 'code_ref' => 'not-made', 'opportunity_action_id' => $opportunityActionIds['quotation-request'], 'uses_wf' => 0, 'email_template_id_wf' => null, 'mail_cc_to_coach_wf' => 0, 'number_of_days_to_send_email' => 0, 'send_email_reminder' => 0, 'order' => 1, 'is_pending_status' => 0],
            ['name' => 'Geen afspraak kunnen maken', 'code_ref' => 'not-made', 'opportunity_action_id' => $opportunityActionIds['visit'], 'uses_wf' => 0, 'email_template_id_wf' => null, 'mail_cc_to_coach_wf' => 0, 'number_of_days_to_send_email' => 0, 'send_email_reminder' => 0, 'order' => 2, 'is_pending_status' => 0],
            ['name' => 'Offerte aanvraag in behandeling', 'code_ref' => 'under-review', 'opportunity_action_id' => $opportunityActionIds['quotation-request'], 'uses_wf' => 0, 'email_template_id_wf' => null, 'mail_cc_to_coach_wf' => 0, 'number_of_days_to_send_email' => 0, 'send_email_reminder' => 0, 'order' => 3, 'is_pending_status' => 0],
            ['name' => 'Uitgevoerd', 'code_ref' => 'executed', 'opportunity_action_id' => $opportunityActionIds['quotation-request'], 'uses_wf' => 0, 'email_template_id_wf' => null, 'mail_cc_to_coach_wf' => 0, 'number_of_days_to_send_email' => 0, 'send_email_reminder' => 0, 'order' => 9, 'is_pending_status' => 0],
            ['name' => 'Offerteverzoek akkoord', 'code_ref' => 'pm-approved', 'opportunity_action_id' => $opportunityActionIds['quotation-request'], 'uses_wf' => 0, 'email_template_id_wf' => null, 'mail_cc_to_coach_wf' => 0, 'number_of_days_to_send_email' => 0, 'send_email_reminder' => 0, 'order' => 10, 'is_pending_status' => 0],
            ['name' => 'Offerteverzoek niet akkoord', 'code_ref' => 'pm-not-approved', 'opportunity_action_id' => $opportunityActionIds['quotation-request'], 'uses_wf' => 0, 'email_template_id_wf' => null, 'mail_cc_to_coach_wf' => 0, 'number_of_days_to_send_email' => 0, 'send_email_reminder' => 0, 'order' => 11, 'is_pending_status' => 0],
            ['name' => 'Subsidievaststelling in behandeling', 'code_ref' => 'under-review-det', 'opportunity_action_id' => $opportunityActionIds['subsidy-request'], 'uses_wf' => 0, 'email_template_id_wf' => null, 'mail_cc_to_coach_wf' => 0, 'number_of_days_to_send_email' => 0, 'send_email_reminder' => 0, 'order' => 9, 'is_pending_status' => 0],
            ['name' => 'Subsidie vastgesteld', 'code_ref' => 'approved-det', 'opportunity_action_id' => $opportunityActionIds['subsidy-request'], 'uses_wf' => 0, 'email_template_id_wf' => null, 'mail_cc_to_coach_wf' => 0, 'number_of_days_to_send_email' => 0, 'send_email_reminder' => 0, 'order' => 10, 'is_pending_status' => 0],
            ['name' => 'Subsidie niet vastgesteld', 'code_ref' => 'not-approved-det', 'opportunity_action_id' => $opportunityActionIds['subsidy-request'], 'uses_wf' => 0, 'email_template_id_wf' => null, 'mail_cc_to_coach_wf' => 0, 'number_of_days_to_send_email' => 0, 'send_email_reminder' => 0, 'order' => 11, 'is_pending_status' => 0],
            ['name' => 'Aanvraag gekoppeld', 'code_ref' => 'linked', 'opportunity_action_id' => $opportunityActionIds['subsidy-request'], 'uses_wf' => 0, 'email_template_id_wf' => null, 'mail_cc_to_coach_wf' => 0, 'number_of_days_to_send_email' => 0, 'send_email_reminder' => 0, 'order' => 4, 'is_pending_status' => 0],
            ['name' => 'Doorverwezen', 'code_ref' => 'default', 'opportunity_action_id' => $opportunityActionIds['redirection'], 'uses_wf' => 0, 'email_template_id_wf' => null, 'mail_cc_to_coach_wf' => 0, 'number_of_days_to_send_email' => 0, 'send_email_reminder' => 0, 'order' => 10, 'is_pending_status' => 0],
            ['name' => 'In behandeling', 'code_ref' => 'under-review', 'opportunity_action_id' => $opportunityActionIds['redirection'], 'uses_wf' => 0, 'email_template_id_wf' => null, 'mail_cc_to_coach_wf' => 0, 'number_of_days_to_send_email' => 0, 'send_email_reminder' => 0, 'order' => 20, 'is_pending_status' => 0],
            ['name' => 'Afgehandeld', 'code_ref' => 'handled', 'opportunity_action_id' => $opportunityActionIds['redirection'], 'uses_wf' => 0, 'email_template_id_wf' => null, 'mail_cc_to_coach_wf' => 0, 'number_of_days_to_send_email' => 0, 'send_email_reminder' => 0, 'order' => 30, 'is_pending_status' => 0],
            ['name' => 'Nog doorverwijzen', 'code_ref' => 'still_refer', 'opportunity_action_id' => $opportunityActionIds['redirection'], 'uses_wf' => 0, 'email_template_id_wf' => null, 'mail_cc_to_coach_wf' => 0, 'number_of_days_to_send_email' => 0, 'send_email_reminder' => 0, 'order' => 5, 'is_pending_status' => 0],
        ];

        foreach ($quotationRequestStatuses as $quotationRequestStatus) {
            QuotationRequestStatus::updateOrCreate(
                [
                    'opportunity_action_id' => $quotationRequestStatus['opportunity_action_id'],
                    'code_ref' => $quotationRequestStatus['code_ref'],
                ],
                $quotationRequestStatus
            );
        }
    }
}