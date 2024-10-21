<?php

namespace App\Http\JoryResources;


use App\Eco\Opportunity\OpportunityStatus;
use App\Http\Controllers\Api\Opportunity\OpportunityStatusController;
use App\Http\JoryResources\Base\JoryResource;

class OpportunityStatusJoryResource extends JoryResource
{
    protected $modelClass = OpportunityStatus::class;

    protected function checkAuthorize(): void
    {
        $opportunityStatusController = new OpportunityStatusController();
        $opportunityStatusController->authorize('view', OpportunityStatus::class);
    }

    protected function configureForApp(): void
    {
        $this->field('id')->filterable()->sortable();
        $this->field('name')->filterable()->sortable();
        $this->field('uses_wf')->filterable()->sortable();
    }

    protected function configureForPortal(): void
    {
        $this->field('id')->filterable()->sortable();
        $this->field('name')->filterable()->sortable();
        $this->field('active')->filterable()->sortable();
    }
}