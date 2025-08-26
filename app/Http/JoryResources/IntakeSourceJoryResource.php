<?php

namespace App\Http\JoryResources;

use \App\Eco\Intake\IntakeSource;
use App\Http\Controllers\Api\Intake\IntakeSourceController;
use App\Http\JoryResources\Base\JoryResource;

class IntakeSourceJoryResource extends JoryResource
{
    protected $modelClass = IntakeSource::class;

    protected function checkAuthorize(): void
    {
        $sourceController = new IntakeSourceController();
        //$sourceController->authorize('view', IntakeSource::class);
    }

    protected function configureForApp(): void
    {
        // Fields
        $this->field('id')->filterable()->sortable();
        $this->field('name')->filterable()->sortable();
        $this->field('name_custom')->filterable()->sortable();
        $this->field('visible')->filterable()->sortable();
        $this->field('created_at')->filterable()->sortable();
        $this->field('updated_at')->filterable()->sortable();
        $this->field('deleted_at')->filterable()->sortable();
    }

    protected function configureForPortal(): void
    {
    }
}
