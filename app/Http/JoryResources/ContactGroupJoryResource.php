<?php

namespace App\Http\JoryResources;

use \App\Eco\ContactGroup\ContactGroup;
use App\Http\JoryResources\Base\JoryResource;

class ContactGroupJoryResource extends JoryResource
{
    protected $modelClass = ContactGroup::class;

    protected function checkAuthorize(): void
    {
        // TODO: Implement checkAuthorize() method.
    }

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
