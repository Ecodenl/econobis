<?php

namespace App\Http\JoryResources;

use App\Eco\Title\Title;
use App\Http\JoryResources\Base\JoryResource;

class TitleJoryResource extends JoryResource
{
    protected $modelClass = Title::class;

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
