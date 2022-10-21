<?php

namespace App\Http\JoryResources;

use App\Eco\Project\ProjectType;
use App\Http\JoryResources\Base\JoryResource;

class ProjectTypeJoryResource extends JoryResource
{
    protected $modelClass = ProjectType::class;

    protected function checkAuthorize(): void
    {
        // TODO: Implement checkAuthorize() method.
    }

    protected function configureForApp(): void
    {
        // Fields
        $this->field('id')->filterable()->sortable();
        $this->field('name')->filterable()->sortable();
        $this->field('code_ref')->filterable()->sortable();

        // Relations
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
