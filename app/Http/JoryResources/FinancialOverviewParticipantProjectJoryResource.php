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
        $this->field('start_value')->filterable()->sortable();
        $this->field('end_value')->filterable()->sortable();
        $this->field('created_at')->filterable()->sortable();
        $this->field('updated_at')->filterable()->sortable();

        // Relations
        $this->relation('participantProject');
    }

    protected function configureForPortal(): void
    {
    }
}
