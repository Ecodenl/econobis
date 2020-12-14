<?php

namespace App\Http\JoryResources;

use App\Eco\FinancialOverview\FinancialOverviewContact;
use App\Http\JoryResources\Base\JoryResource;

class FinancialOverviewContactJoryResource extends JoryResource
{
    protected $modelClass = FinancialOverviewContact::class;

    protected function configureForApp(): void
    {
        // Fields
        $this->field('id')->filterable()->sortable();
        $this->field('contact_id')->filterable()->sortable();
        $this->field('definitive')->filterable()->sortable();
        $this->field('status_id')->filterable()->sortable();
        $this->field('date_sent')->filterable()->sortable();
        $this->field('emailed_to')->filterable()->sortable();
        $this->field('created_at')->filterable()->sortable();
        $this->field('updated_at')->filterable()->sortable();

        // Relations
        $this->relation('contact');
        $this->relation('financialOverview');

    }

    protected function configureForPortal(): void
    {
    }
}
