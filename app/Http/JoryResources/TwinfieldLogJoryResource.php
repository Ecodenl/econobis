<?php

namespace App\Http\JoryResources;

use App\Eco\Twinfield\TwinfieldLog;
use App\Http\Controllers\Api\TwinfieldLog\TwinfieldLogController;
use App\Http\JoryResources\Base\JoryResource;
use Illuminate\Support\Facades\Log;

class TwinfieldLogJoryResource extends JoryResource
{
    protected $modelClass = TwinfieldLog::class;

    protected function checkAuthorize(): void
    {
        Log::info('Test TwinfieldLog checkAuthorize');
        $jobsLogController = new TwinfieldLogController();
        $jobsLogController->authorize('view', TwinfieldLog::class);
    }

    protected function configureForApp(): void
    {
        // Fields
        $this->field('id')->filterable()->sortable();
        $this->field('invoice_id')->filterable()->sortable();
        $this->field('contact_id')->filterable()->sortable();
        $this->field('message_text')->filterable()->sortable();
        $this->field('message_type')->filterable()->sortable();
        $this->field('user_id')->filterable()->sortable();
        $this->field('is_error')->filterable()->sortable();
        $this->field('created_at')->filterable()->sortable();
        $this->field('updated_at')->filterable()->sortable();

        // Custom attribute
        $this->field('twinfield_log_message_type_name');
    }

    protected function configureForPortal(): void
    {
    }
}
