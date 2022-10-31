<?php

namespace App\Http\JoryResources;

use App\Eco\Document\Document;
use App\Http\JoryResources\Base\JoryResource;

class DocumentJoryResource extends JoryResource
{
    protected $modelClass = Document::class;

    protected function checkAuthorize(): void
    {
        // TODO: Implement checkAuthorize() method.
    }

    protected function configureForApp(): void
    {
    }

    protected function configureForPortal(): void
    {
        // Fields
        $this->field('id')->filterable()->sortable();
        $this->field('filename')->filterable()->sortable();
        $this->field('description')->filterable()->sortable();
    }
}
