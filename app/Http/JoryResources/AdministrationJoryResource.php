<?php

namespace App\Http\JoryResources;

use App\Eco\Administration\Administration;
use App\Http\JoryResources\Base\JoryResource;

class AdministrationJoryResource extends JoryResource
{
    protected $modelClass = Administration::class;

    protected function configureForApp(): void
    {
        // Fields
        $this->field('id')->filterable()->sortable();
        $this->field('name')->filterable()->sortable();
    }

    protected function configureForPortal(): void
    {
        // Fields
        $this->field('id')->filterable()->sortable();
        $this->field('name')->filterable()->sortable();
    }
}
