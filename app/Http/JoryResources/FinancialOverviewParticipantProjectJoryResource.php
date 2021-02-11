<?php

namespace App\Http\JoryResources;

use App\Eco\FinancialOverview\FinancialOverviewParticipantProject;
use App\Http\JoryResources\Base\JoryResource;

class FinancialOverviewParticipantProjectJoryResource extends JoryResource
{
    protected $modelClass = FinancialOverviewParticipantProject::class;

    protected function configureForApp(): void
    {
        // Fields
        $this->field('id')->filterable()->sortable();
        $this->field('participant_project_id')->filterable()->sortable();
        $this->field('quantity_start_value')->filterable()->sortable();
        $this->field('quantity_end_value')->filterable()->sortable();
        $this->field('bookworth_start_value')->filterable()->sortable();
        $this->field('bookworth_end_value')->filterable()->sortable();
        $this->field('amount_start_value')->filterable()->sortable();
        $this->field('amount_end_value')->filterable()->sortable();
        $this->field('created_at')->filterable()->sortable();
        $this->field('updated_at')->filterable()->sortable();

        // Relations
        $this->relation('participantProject');
    }

    protected function configureForPortal(): void
    {
    }
}
