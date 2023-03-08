<?php

namespace App\Http\JoryResources;


use App\Eco\QuotationRequest\QuotationRequestStatus;
use App\Http\Controllers\Api\QuotationRequest\QuotationRequestStatusController;
use App\Http\JoryResources\Base\JoryResource;

class QuotationRequestStatusJoryResource extends JoryResource
{
    protected $modelClass = QuotationRequestStatus::class;

    protected function checkAuthorize(): void
    {
        $quotationRequestStatusController = new QuotationRequestStatusController();
        $quotationRequestStatusController->authorize('view', QuotationRequestStatus::class);
    }

    protected function configureForApp(): void
    {
        $this->field('id')->filterable()->sortable();
        $this->field('name')->filterable()->sortable();
        $this->field('uses_wf')->filterable()->sortable();
        $this->field('email_template_id_wf')->filterable()->sortable();
        $this->field('number_of_days_to_send_email')->filterable()->sortable();
        $this->field('created_at')->filterable()->sortable();
        $this->field('updated_at')->filterable()->sortable();
        $this->field('order')->filterable()->sortable();

        // Relations
        $this->relation('emailTemplateWorkflow');
    }

    protected function configureForPortal(): void
    {
        $this->field('id')->filterable()->sortable();
        $this->field('name')->filterable()->sortable();
        $this->field('opportunity_action_id')->filterable()->sortable();
        $this->field('order')->filterable()->sortable();
    }
}