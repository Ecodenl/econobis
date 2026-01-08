<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 04-01-2018
 * Time: 14:20
 */

namespace App\Http\Resources\PortalSettings;


use Illuminate\Http\Resources\Json\JsonResource;

class FullPortalSettings extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'portalActive' => $this->portal_active,
            'portalName' => $this->portal_name,
            'cooperativeName' => $this->cooperative_name,
            'portalLoginInfoText' => $this->portal_login_info_text,
            'portalWebsite' => $this->portal_website,
            'portalUrl' => $this->portal_url,
            'responsibleUserId' => $this->responsible_user_id,
            'contactResponsibleOwnerUserId' => $this->contact_responsible_owner_user_id,
            'checkContactTaskResponsibleUserId' => $this->check_contact_task_responsible_user_id,
            'checkContactTaskResponsibleTeamId' => $this->check_contact_task_responsible_team_id,
            'emailTemplateNewAccountId' => $this->email_template_new_account_id,
            'linkPrivacyPolicy' => $this->link_privacy_policy,
            'showNewAtCooperativeLink' => $this->show_new_at_cooperative_link,
            'newAtCooperativeLinkText' => $this->new_at_cooperative_link_text,
            'showAllowRequestForDelete' => $this->show_allow_request_for_delete,
            'allowRequestForDeleteButtonText' => $this->allow_request_for_delete_button_text,
            'pcrPowerKwhConsumptionPercentage' => $this->pcr_power_kwh_consumption_percentage,
            'pcrGeneratingCapacityOneSolorPanel' => $this->pcr_generating_capacity_one_solor_panel,
            'defaultContactGroupMemberId' => $this->default_contact_group_member_id,
            'defaultContactGroupNoMemberId' => $this->default_contact_group_no_member_id,
            'defaultAdministrationId' => $this->default_administration_id,
////            'relatie' => FullRelatie::collection($this->whenLoaded('relatie')),
        ];
    }
}