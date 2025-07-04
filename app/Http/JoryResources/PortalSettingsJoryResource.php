<?php

namespace App\Http\JoryResources;

use App\Eco\PortalSettings\PortalSettings;
use App\Http\Controllers\Api\PortalSettings\PortalSettingsController;
use App\Http\JoryResources\Base\JoryResource;
use Illuminate\Support\Facades\Log;

class PortalSettingsJoryResource extends JoryResource
{
    protected $modelClass = PortalSettings::class;

    protected function checkAuthorize(): void
    {
        $portalSettingsController = new PortalSettingsController();
        $portalSettingsController->authorize('view', PortalSettings::class);
    }

    protected function configureForApp(): void
    {
        // Fields
        $this->field('id')->filterable()->sortable();
        $this->field('portal_active')->filterable()->sortable();
        $this->field('portal_name')->filterable()->sortable();
        $this->field('cooperative_name')->filterable()->sortable();
        $this->field('portal_website')->filterable()->sortable();
        $this->field('portal_url')->filterable()->sortable();
        $this->field('responsible_user_id')->filterable()->sortable();
        $this->field('contact_responsible_owner_user_id')->filterable()->sortable();
        $this->field('check_contact_task_responsible_user_id')->filterable()->sortable();
        $this->field('check_contact_task_responsible_team_id')->filterable()->sortable();
        $this->field('email_template_new_account_id')->filterable()->sortable();
        $this->field('link_privacy_policy')->filterable()->sortable();
        $this->field('show_new_at_cooperative_link')->filterable()->sortable();
        $this->field('new_at_cooperative_link_text')->filterable()->sortable();
        $this->field('pcr_power_kwh_consumption_percentage')->filterable()->sortable();
        $this->field('pcr_generating_capacity_one_solor_panel')->filterable()->sortable();
        $this->field('default_contact_group_member_id')->filterable()->sortable();
        $this->field('default_contact_group_no_member_id')->filterable()->sortable();
        $this->field('default_administration_id')->filterable()->sortable();

        // Relations
        $this->relation('responsibleUser');
        $this->relation('contactResponsibleOwnerUser');
        $this->relation('checkContactTaskResponsibleUser');
        $this->relation('checkContactTaskResponsibleTeam');
        $this->relation('emailTemplateNewAccount');
        $this->relation('defaultContactGroupMember');
        $this->relation('defaultContactGroupNoMember');
        $this->relation('defaultAdministration');
    }

    protected function configureForPortal(): void
    {
        // Fields

        // Relations
    }
}
