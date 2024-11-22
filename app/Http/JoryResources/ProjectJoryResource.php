<?php

namespace App\Http\JoryResources;

use App\Http\JoryResources\Base\JoryResource;
use App\Eco\Project\Project;
use Illuminate\Support\Facades\Auth;

class ProjectJoryResource extends JoryResource
{
    protected $modelClass = Project::class;

    protected function checkAuthorize(): void
    {
        // TODO: Implement checkAuthorize() method.
    }

    protected function configureForApp(): void
    {
        // Fields
        $this->field('amount_definitive')->filterable()->sortable();
        $this->field('amount_granted')->filterable()->sortable();
        $this->field('amount_interessed')->filterable()->sortable();
        $this->field('project_loan_type')->filterable()->sortable();
        $this->field('amount_of_loan_needed')->filterable()->sortable();
        $this->field('min_amount_loan')->filterable()->sortable();
        $this->field('max_amount_loan')->filterable()->sortable();
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
        $this->field('check_postalcode_link')->filterable()->sortable();
        $this->field('disable_change_contact_name_on_portal')->filterable()->sortable();
        $this->field('postalcode_link')->filterable()->sortable();
        $this->field('link_agree_terms')->filterable()->sortable();
        $this->field('link_understand_info')->filterable()->sortable();
        $this->field('link_project_info')->filterable()->sortable();
        $this->field('show_question_about_membership')->filterable()->sortable();
        $this->field('use_transaction_costs_with_membership')->filterable()->sortable();

        // Relations
        $this->relation('projectType');
    }

    protected function configureForPortal(): void
    {
        // Fields
        $this->field('administration_id')->filterable()->sortable();
        $this->field('amount_definitive')->filterable()->sortable();
        $this->field('amount_granted')->filterable()->sortable();
        $this->field('amount_interessed')->filterable()->sortable();
        $this->field('amount_of_loan_needed')->filterable()->sortable();
        $this->field('min_amount_loan')->filterable()->sortable();
        $this->field('max_amount_loan')->filterable()->sortable();
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
        $this->field('is_sce_project')->filterable()->sortable();
        $this->field('check_postalcode_link')->filterable()->sortable();
        $this->field('disable_change_contact_name_on_portal')->filterable()->sortable();
        $this->field('postalcode_link')->filterable()->sortable();
        $this->field('link_agree_terms')->filterable()->sortable();
        $this->field('link_understand_info')->filterable()->sortable();
        $this->field('link_project_info')->filterable()->sortable();
        $this->field('show_question_about_membership')->filterable()->sortable();
        $this->field('use_transaction_costs_with_membership')->filterable()->sortable();
        $this->field('uses_mollie')->filterable()->sortable();
        $this->field('text_registration_finished')->filterable()->sortable();
        $this->field('text_transaction_costs')->filterable()->sortable();
        $this->field('transaction_costs_code_ref')->filterable()->sortable();
        $this->field('transaction_costs_amount_min')->filterable()->sortable();
        $this->field('transaction_costs_amount_max')->filterable()->sortable();
        $this->field('transaction_costs_amount')->filterable()->sortable();
        $this->field('transaction_costs_percentage')->filterable()->sortable();
        $this->field('transaction_costs_amount_2')->filterable()->sortable();
        $this->field('transaction_costs_percentage_2')->filterable()->sortable();
        $this->field('transaction_costs_amount_3')->filterable()->sortable();
        $this->field('transaction_costs_percentage_3')->filterable()->sortable();

        // Attributes
        $this->field('current_book_worth')->filterable()->sortable();

        // Relations
        $this->relation('administration');
        $this->relation('projectType');
        $this->relation('documentAgreeTerms');
        $this->relation('documentUnderstandInfo');
        $this->relation('documentProjectInfo');
    }
}
