<?php

namespace App\Http\JoryResources;

use App\Eco\Country\Country;
use App\Http\JoryResources\Base\JoryResource;

class CountryJoryResource extends JoryResource
{
    protected $modelClass = Country::class;

    protected function configureForApp(): void
    {
    }

    protected function configureForPortal(): void
    {
        // Fields
        $this->field('id')->filterable()->sortable();
        $this->field('name')->filterable()->sortable();

        // Relations
    }
}