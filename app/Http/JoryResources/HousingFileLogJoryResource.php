<?php

namespace App\Http\JoryResources;

use App\Eco\HousingFile\HousingFileLog;
use App\Http\Controllers\Api\HousingFile\HousingFileLogController;
use App\Http\JoryResources\Base\JoryResource;

class HousingFileLogJoryResource extends JoryResource
{
    protected $modelClass = HousingFileLog::class;

    protected function checkAuthorize(): void
    {
        $jobsLogController = new HousingFileLogController();
        $jobsLogController->authorize('view', HousingFileLog::class);
    }

    protected function configureForApp(): void
    {
        // Fields
        $this->field('id')->filterable()->sortable();
        $this->field('housing_file_id')->filterable()->sortable();
        $this->field('message_text')->filterable()->sortable();
        $this->field('message_type')->filterable()->sortable();
        $this->field('user_id')->filterable()->sortable();
        $this->field('is_error')->filterable()->sortable();
        $this->field('created_at')->filterable()->sortable();
        $this->field('updated_at')->filterable()->sortable();

        // Custom attribute
        $this->field('housing_file_log_message_type_name');
    }

    protected function configureForPortal(): void
    {
    }
}
