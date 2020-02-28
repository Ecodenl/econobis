<?php

namespace App\Http\JoryResources;


use App\Eco\Opportunity\OpportunityStatus;
use App\Http\JoryResources\Base\JoryResource;

class OpportunityStatusJoryResource extends JoryResource
{
    protected $modelClass = OpportunityStatus::class;

    protected function configureForApp(): void
    {
        $this->field('id')->filterable()->sortable();
        $this->field('name')->filterable()->sortable();
        $this->field('uses_wf')->filterable()->sortable();
        $this->field('email_template_id_wf')->filterable()->sortable();
        $this->field('number_of_days_to_send_email')->filterable()->sortable();

        // Relations
        $this->relation('emailTemplateWorkflow');
    }

    protected function configureForPortal(): void
    {
        // TODO: Implement configureForPortal() method.
    }
}