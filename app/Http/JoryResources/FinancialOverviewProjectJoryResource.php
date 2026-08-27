<?php

namespace App\Http\JoryResources;

use App\Eco\FinancialOverview\FinancialOverviewProject;
use App\Http\JoryResources\Base\JoryResource;

class FinancialOverviewProjectJoryResource extends JoryResource
{
    protected $modelClass = FinancialOverviewProject::class;

    protected function checkAuthorize(): void
    {
        // TODO: Implement checkAuthorize() method.
    }

    protected function configureForApp(): void
    {
        // Fields
        $this->field('id')->filterable()->sortable();
        $this->field('project_id')->filterable()->sortable();
        $this->field('definitive')->filterable()->sortable();
        $this->field('status_id')->filterable()->sortable();
        $this->field('created_at')->filterable()->sortable();
        $this->field('updated_at')->filterable()->sortable();

        // Attributes
        $this->field('start_date')->filterable()->sortable();
        $this->field('end_date')->filterable()->sortable();
        $this->field('number_of_participant_projects')->filterable()->sortable();
        $this->field('total_quantity_start_value')->filterable()->sortable();
        $this->field('total_quantity_end_value')->filterable()->sortable();
        $this->field('bookworth_start_value')->filterable()->sortable();
        $this->field('bookworth_end_value')->filterable()->sortable();
        $this->field('total_amount_start_value')->filterable()->sortable();
        $this->field('total_amount_end_value')->filterable()->sortable();
        $this->field('number_of_financial_overview_contacts_send')->filterable()->sortable();
        $this->field('has_interim_financial_overview_contacts')->filterable()->sortable();

        // Relations
        $this->relation('project');
        $this->relation('financialOverview');
        $this->relation('financialOverviewParticipantProjects');

    }

    protected function configureForPortal(): void
    {
    }
}
