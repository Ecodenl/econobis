<?php

namespace App\Http\JoryResources;

use App\Eco\FinancialOverview\FinancialOverviewProject;
use App\Http\JoryResources\Base\JoryResource;

class FinancialOverviewProjectJoryResource extends JoryResource
{
    protected $modelClass = FinancialOverviewProject::class;

    protected function configureForApp(): void
    {
        // Fields
        $this->field('id')->filterable()->sortable();
        $this->field('project_id')->filterable()->sortable();
        $this->field('definitive')->filterable()->sortable();
        $this->field('created_at')->filterable()->sortable();
        $this->field('updated_at')->filterable()->sortable();

        // Relations
        $this->relation('project');
    }

    protected function configureForPortal(): void
    {
    }
}
