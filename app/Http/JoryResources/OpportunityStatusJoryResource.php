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
        $this->field('usesWf')->filterable()->sortable();
        $this->field('emailTemplateIdWf')->filterable()->sortable();
        $this->field('numberOfDaysToSendEmail')->filterable()->sortable();

        // Relations
        $this->relation('emailTemplateWorkflow');
    }

    protected function configureForPortal(): void
    {
        // TODO: Implement configureForPortal() method.
    }
}