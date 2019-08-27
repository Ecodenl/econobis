<?php

namespace App\Http\JoryResources;

use \App\Eco\CostCenter\CostCenter;
use App\Http\JoryResources\Base\JoryResource;

class CostCenterJoryResource extends JoryResource
{
    protected $modelClass = CostCenter::class;

    /**
     * Configure the JoryResource.
     *
     * @return void
     */
    protected function configure(): void
    {
        // Fields
        $this->field('id')->filterable()->sortable();
        $this->field('description')->filterable()->sortable();
        $this->field('twinfield_cost_center_code')->filterable()->sortable();
        $this->field('created_at')->filterable()->sortable();
        $this->field('updated_at')->filterable()->sortable();
        $this->field('deleted_at')->filterable()->sortable();
    }

    protected function configureForPortal(): void
    {
    }
}
