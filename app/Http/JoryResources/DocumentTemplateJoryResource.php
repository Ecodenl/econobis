<?php

namespace App\Http\JoryResources;

use App\Eco\DocumentTemplate\DocumentTemplate;
use App\Http\JoryResources\Base\JoryResource;

class DocumentTemplateJoryResource extends JoryResource
{
    protected $modelClass = DocumentTemplate::class;

    protected function configureForApp(): void
    {
        // Fields
        $this->field('id')->filterable()->sortable();
        $this->field('name')->filterable()->sortable();
    }

    protected function configureForPortal(): void
    {
    }
}
