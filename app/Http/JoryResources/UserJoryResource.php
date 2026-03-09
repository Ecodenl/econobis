<?php

namespace App\Http\JoryResources;

use App\Eco\User\User;
use App\Http\JoryResources\Base\JoryResource;

class UserJoryResource extends JoryResource
{
    protected $modelClass = User::class;

    protected function checkAuthorize(): void
    {
        // TODO: Implement checkAuthorize() method.
    }

    protected function configureForApp(): void
    {
        // Fields
        $this->field('id')->filterable()->sortable();

        // Presents werkt dit?
        $this->field('full_name')->filterable()->sortable();

        // Relations
    }

    protected function configureForPortal(): void
    {
    }
}
