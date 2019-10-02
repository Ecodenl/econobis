<?php

namespace App\Http\JoryResources;

use App\Eco\Project\ProjectType;
use App\Http\JoryResources\Base\JoryResource;

class ProjectTypeJoryResource extends JoryResource
{
    protected $modelClass = ProjectType::class;

    protected function configureForApp(): void
    {
    }

    protected function configureForPortal(): void
    {
        // Fields
        $this->field('id')->filterable()->sortable();
        $this->field('name')->filterable()->sortable();
        $this->field('code_ref')->filterable()->sortable();

        // Relations
    }
}
