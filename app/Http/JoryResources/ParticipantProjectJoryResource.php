<?php

namespace App\Http\JoryResources;

use App\Eco\ParticipantProject\ParticipantProject;
use App\Http\JoryResources\Base\JoryResource;

class ParticipantProjectJoryResource extends JoryResource
{
    protected $modelClass = ParticipantProject::class;

    protected function configureForApp(): void
    {
    }

    protected function configureForPortal(): void
    {
        // Fields
        $this->field('amount_definitive')->filterable()->sortable();
        $this->field('amount_granted')->filterable()->sortable();
        $this->field('amount_interessed')->filterable()->sortable();
        $this->field('amount_optioned')->filterable()->sortable();
        $this->field('contact_id')->filterable()->sortable();
        $this->field('conversion_processed')->filterable()->sortable();
        $this->field('created_at')->filterable()->sortable();
        $this->field('created_by_id')->filterable()->sortable();
        $this->field('date_did_accept_agreement')->filterable()->sortable();
        $this->field('date_did_understand_info')->filterable()->sortable();
        $this->field('date_register')->filterable()->sortable();
        $this->field('date_terminated')->filterable()->sortable();
        $this->field('deleted_at')->filterable()->sortable();
        $this->field('did_accept_agreement')->filterable()->sortable();
        $this->field('did_understand_info')->filterable()->sortable();
        $this->field('gifted_by_contact_id')->filterable()->sortable();
        $this->field('iban_payout')->filterable()->sortable();
        $this->field('iban_payout_attn')->filterable()->sortable();
        $this->field('id')->filterable()->sortable();
        $this->field('legal_rep_contact_id')->filterable()->sortable();
        $this->field('participations_capital_worth')->filterable()->sortable();
        $this->field('participations_definitive')->filterable()->sortable();
        $this->field('participations_definitive_worth')->filterable()->sortable();
        $this->field('participations_granted')->filterable()->sortable();
        $this->field('participations_interessed')->filterable()->sortable();
        $this->field('participations_optioned')->filterable()->sortable();
        $this->field('power_kwh_consumption')->filterable()->sortable();
        $this->field('project_id')->filterable()->sortable();
        $this->field('type_id')->filterable()->sortable();

        // Relations
        $this->relation('project');

    }
}
