<?php

namespace App\Http\JoryResources;

use App\Eco\PortalSettings\PortalSettings;
use App\Http\Controllers\Api\PortalSettings\PortalSettingController;
use App\Http\JoryResources\Base\JoryResource;

class PortalSettingsJoryResource extends JoryResource
{
    protected $modelClass = PortalSettings::class;

    protected function checkAuthorize(): void
    {
        $portalSettingsController = new PortalSettingController();
        $portalSettingsController->authorize('view', PortalSettings::class);
    }

    protected function configureForApp(): void
    {
        // Fields
        $this->field('id')->filterable()->sortable();
        $this->field('portalActive')->filterable()->sortable();
        $this->field('portalName')->filterable()->sortable();
        $this->field('cooperativeName')->filterable()->sortable();
        $this->field('portalWebsite')->filterable()->sortable();
        $this->field('portalUrl')->filterable()->sortable();
        $this->field('responsibleUserId')->filterable()->sortable();
        $this->field('contactResponsibleOwnerUserId')->filterable()->sortable();
        $this->field('checkContactTaskResponsibleUserId')->filterable()->sortable();
        $this->field('checkContactTaskResponsibleTeamId')->filterable()->sortable();
        $this->field('emailTemplateNewAccountId')->filterable()->sortable();
        $this->field('linkPrivacyPolicy')->filterable()->sortable();
        $this->field('showNewAtCooperativeLink')->filterable()->sortable();
        $this->field('newAtCooperativeLinkText')->filterable()->sortable();
        $this->field('pcrPowerKwhConsumptionPercentage')->filterable()->sortable();
        $this->field('pcrGeneratingCapacityOneSolorPanel')->filterable()->sortable();
        $this->field('defaultContactGroupMemberId')->filterable()->sortable();
        $this->field('defaultContactGroupNoMemberId')->filterable()->sortable();
        $this->field('defaultAdministrationId')->filterable()->sortable();

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
//        $this->field('id')->filterable()->sortable();
//        $this->field('welcome_title')->filterable()->sortable();
//        $this->field('welcome_message')->filterable()->sortable();
//        $this->field('default_widget_background_color')->filterable()->sortable();
//        $this->field('default_widget_text_color')->filterable()->sortable();
//        $this->field('created_at')->filterable()->sortable();
//        $this->field('updated_at')->filterable()->sortable();
//        $this->field('deleted_at')->filterable()->sortable();

        // Relations
//        $this->relation('widgets');
    }
}
