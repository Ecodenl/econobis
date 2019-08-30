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
        $this->field('max_participations_youth')->filterable()->sortable();
        $this->field('min_participations')->filterable()->sortable();
        $this->field('name')->filterable()->sortable();
        $this->field('participation_worth')->filterable()->sortable();
        $this->field('participations_definitive')->filterable()->sortable();
        $this->field('participations_granted')->filterable()->sortable();
        $this->field('participations_interessed')->filterable()->sortable();
        $this->field('participations_optioned')->filterable()->sortable();
        $this->field('postal_code')->filterable()->sortable();
        $this->field('project_type_id')->filterable()->sortable();

        // Relations
//        $this->relation('administration');
//        $this->relation('created_by');
//        $this->relation('documents');
//        $this->relation('emails');
//        $this->relation('owned_by');
//        $this->relation('participant_mutations');
//        $this->relation('participants_project');
//        $this->relation('participants_project_definitive');
//        $this->relation('project_revenues');
//        $this->relation('project_status');
//        $this->relation('project_type');
//        $this->relation('project_value_courses');
//        $this->relation('requires_contact_groups');
//        $this->relation('revision_history');
//        $this->relation('tasks');
//        $this->relation('updated_by');
    }

    public function afterQueryBuild($query, $count = false): void
    {
        if(Auth::isPortalUser()){
            $query->whereAuthorizedForPortalUser();
        }
    }
}
