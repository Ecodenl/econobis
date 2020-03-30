<?php

namespace App\Http\JoryResources;

use App\Http\JoryResources\Base\JoryResource;
use App\Eco\Project\Project;
use Illuminate\Support\Facades\Auth;

class ProjectJoryResource extends JoryResource
{
    protected $modelClass = Project::class;

    protected function configureForApp(): void
    {
    }

    protected function configureForPortal(): void
    {
        // Fields
        $this->field('amount_definitive')->filterable()->sortable();
        $this->field('amount_granted')->filterable()->sortable();
        $this->field('amount_interessed')->filterable()->sortable();
        $this->field('amount_of_loan_needed')->filterable()->sortable();
        $this->field('min_amount_loan')->filterable()->sortable();
        $this->field('max_amount_loan')->filterable()->sortable();
        $this->field('amount_of_loan_needed')->filterable()->sortable();
        $this->field('amount_optioned')->filterable()->sortable();
        $this->field('code')->filterable()->sortable();
        $this->field('date_end')->filterable()->sortable();
        $this->field('date_end_registrations')->filterable()->sortable();
        $this->field('date_production')->filterable()->sortable();
        $this->field('date_start')->filterable()->sortable();
        $this->field('date_start_registrations')->filterable()->sortable();
        $this->field('description')->filterable()->sortable();
        $this->field('id')->filterable()->sortable();
        $this->field('max_participations')->filterable()->sortable();
        $this->field('min_participations')->filterable()->sortable();
        $this->field('name')->filterable()->sortable();
        $this->field('participation_worth')->filterable()->sortable();
        $this->field('participations_definitive')->filterable()->sortable();
        $this->field('participations_granted')->filterable()->sortable();
        $this->field('participations_interessed')->filterable()->sortable();
        $this->field('participations_optioned')->filterable()->sortable();
        $this->field('total_participations')->filterable()->sortable();
        $this->field('postal_code')->filterable()->sortable();
        $this->field('project_type_id')->filterable()->sortable();
        $this->field('postalcode_link')->filterable()->sortable();
        $this->field('link_agree_terms')->filterable()->sortable();
        $this->field('link_understand_info')->filterable()->sortable();

        // Relations
        $this->relation('projectType');
    }
}
