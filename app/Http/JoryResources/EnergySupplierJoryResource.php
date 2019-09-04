<?php

namespace App\Http\JoryResources;

use App\Http\JoryResources\Base\JoryResource;
use App\Eco\EnergySupplier\EnergySupplier;

class EnergySupplierJoryResource extends JoryResource
{
    protected $modelClass = EnergySupplier::class;

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
