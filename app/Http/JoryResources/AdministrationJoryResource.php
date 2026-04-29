<?php

namespace App\Http\JoryResources;

use App\Eco\Administration\Administration;
use App\Http\JoryResources\Base\JoryResource;

class AdministrationJoryResource extends JoryResource
{
    protected $modelClass = Administration::class;

    protected function checkAuthorize(): void
    {
        // TODO: Implement checkAuthorize() method.
    }

    protected function configureForApp(): void
    {
        // Fields
        $this->field('id')->filterable()->sortable();
        $this->field('name')->filterable()->sortable();

        // Relations
        $this->relation('emailTemplateFinancialOverview');
    }

    protected function configureForPortal(): void
    {
        // Fields
        $this->field('id')->filterable()->sortable();
        $this->field('name')->filterable()->sortable();
        $this->field('address')->filterable()->sortable();
        $this->field('postal_code')->filterable()->sortable();
        $this->field('city')->filterable()->sortable();
        $this->field('kvk_number')->filterable()->sortable();
        $this->field('website')->filterable()->sortable();
        $this->field('IBAN')->filterable()->sortable();
        $this->field('iban_attn')->filterable()->sortable();
        $this->field('btw_number')->filterable()->sortable();
        $this->field('email')->filterable()->sortable();

        // Attributes
        $this->field('portal_settings_layout_assigned')->filterable()->sortable();

        // Relations
        $this->relation('country');
        $this->relation('documentsOnPortal');

    }
}
