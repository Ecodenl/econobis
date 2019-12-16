<?php

namespace App\Http\JoryResources;


use App\Http\JoryResources\Base\JoryResource;

class EmailTemplateJoryResource extends JoryResource
{
    protected function configureForApp(): void
    {
        $this->field('id')->filterable()->sortable();
        $this->field('name')->filterable()->sortable();

        $this->field('subject')->filterable()->sortable();
        $this->field('created_by_id')->filterable()->sortable();
        $this->field('created_at')->filterable()->sortable();
        $this->field('updated_at')->filterable()->sortable();
        $this->field('deleted_at')->filterable()->sortable();
        $this->field('html_body')->filterable()->sortable();
    }

    protected function configureForPortal(): void
    {
        // TODO: Implement configureForPortal() method.
    }
}