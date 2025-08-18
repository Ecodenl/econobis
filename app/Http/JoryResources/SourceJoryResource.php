<?php

namespace App\Http\JoryResources;

use \App\Eco\Source\Source;
use App\Http\Controllers\Api\Source\SourceController;
use App\Http\JoryResources\Base\JoryResource;

class SourceJoryResource extends JoryResource
{
    protected $modelClass = Source::class;

    protected function checkAuthorize(): void
    {
        $sourceController = new SourceController();
        //$sourceController->authorize('view', Source::class);
    }

    protected function configureForApp(): void
    {
        // Fields
        $this->field('id')->filterable()->sortable();
        $this->field('name')->filterable()->sortable();
        $this->field('name_custom')->filterable()->sortable();
        $this->field('created_at')->filterable()->sortable();
        $this->field('updated_at')->filterable()->sortable();
        $this->field('deleted_at')->filterable()->sortable();
    }

    protected function configureForPortal(): void
    {
    }
}
