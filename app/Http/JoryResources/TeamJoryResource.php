<?php

namespace App\Http\JoryResources;

use App\Eco\Team\Team;
use App\Http\JoryResources\Base\JoryResource;

class TeamJoryResource extends JoryResource
{
    protected $modelClass = Team::class;

    protected function checkAuthorize(): void
    {
        // TODO: Implement checkAuthorize() method.
    }

    protected function configureForApp(): void
    {
        // Fields
        $this->field('id')->filterable()->sortable();
        $this->field('name')->filterable()->sortable();

        // Relations
    }

    protected function configureForPortal(): void
    {
    }
}
