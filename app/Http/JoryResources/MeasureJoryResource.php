<?php

namespace App\Http\JoryResources;


use App\Eco\Measure\Measure;
use App\Http\JoryResources\Base\JoryResource;

class MeasureJoryResource extends JoryResource
{
    protected $modelClass = Measure::class;

    protected function configureForApp(): void
    {
        $this->field('id')->filterable()->sortable();
        $this->field('name')->filterable()->sortable();
    }

    protected function configureForPortal(): void
    {
        // TODO: Implement configureForPortal() method.
    }
}