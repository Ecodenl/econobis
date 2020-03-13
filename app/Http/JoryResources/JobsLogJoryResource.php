<?php

namespace App\Http\JoryResources;

use App\Eco\Jobs\JobsLog;
use App\Http\JoryResources\Base\JoryResource;

class JobsLogJoryResource extends JoryResource
{
    protected $modelClass = JobsLog::class;

    protected function configureForApp(): void
    {
        // Fields
        $this->field('id')->filterable()->sortable();
        $this->field('value')->filterable()->sortable();
        $this->field('user_id')->filterable()->sortable();
        $this->field('created_at')->filterable()->sortable();
        $this->field('updated_at')->filterable()->sortable();
        $this->field('job_category_id')->filterable()->sortable();

        // Custom attribute
        $this->field('job_category_name');
    }

    protected function configureForPortal(): void
    {
    }
}
