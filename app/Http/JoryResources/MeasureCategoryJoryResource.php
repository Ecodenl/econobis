<?php

namespace App\Http\JoryResources;


use App\Eco\Measure\MeasureCategory;
use App\Http\Controllers\Api\Measure\MeasureCategoryController;
use App\Http\JoryResources\Base\JoryResource;

class MeasureCategoryJoryResource extends JoryResource
{
    protected $modelClass = MeasureCategory::class;

    protected function checkAuthorize(): void
    {
        $measureCategoryController = new MeasureCategoryController();
        $measureCategoryController->authorize('view', MeasureCategory::class);
    }

    protected function configureForApp(): void
    {
        $this->field('id')->filterable()->sortable();
        $this->field('name')->filterable()->sortable();
        $this->field('uses_wf_create_opportunity')->filterable()->sortable();
        $this->field('measure_id_wf_create_opportunity')->filterable()->sortable();
        $this->field('opportunity_status_id_wf_create_opportunity')->filterable()->sortable();
        $this->field('uses_wf_create_quotation_request')->filterable()->sortable();
        $this->field('organisation_id_wf_create_quotation_request')->filterable()->sortable();
        $this->field('uses_wf_email_quotation_request')->filterable()->sortable();
        $this->field('email_template_id_wf_create_quotation_request')->filterable()->sortable();
        $this->field('calendar_background_color')->filterable()->sortable();
        $this->field('calendar_text_color')->filterable()->sortable();
        $this->field('created_at')->filterable()->sortable();
        $this->field('updated_at')->filterable()->sortable();

        // Relations
        $this->relation('measureWorkflowCreateOpportunity');
        $this->relation('opportunityStatusWorkflowCreateOpportunity');
        $this->relation('organisationWorkflowCreateQuotationRequest');
        $this->relation('emailTemplateWorkflowCreateQuotationRequest');
    }

    protected function configureForPortal(): void
    {
        // TODO: Implement configureForPortal() method.
    }
}