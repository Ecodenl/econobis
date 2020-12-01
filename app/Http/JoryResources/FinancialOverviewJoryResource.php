<?php

namespace App\Http\JoryResources;

use \App\Eco\FinancialOverview\FinancialOverview;
use App\Http\JoryResources\Base\JoryResource;

class FinancialOverviewJoryResource extends JoryResource
{
    protected $modelClass = FinancialOverview::class;

    protected function configureForApp(): void
    {
        // Fields
        $this->field('id')->filterable()->sortable();
        $this->field('administration_id')->filterable()->sortable();
        $this->field('year')->filterable()->sortable();
        $this->field('definitive')->filterable()->sortable();
        $this->field('created_at')->filterable()->sortable();
        $this->field('updated_at')->filterable()->sortable();

        // Relations
        $this->relation('administration');
        $this->relation('financialOverviewProjects');
    }

    protected function configureForPortal(): void
    {
    }
}
