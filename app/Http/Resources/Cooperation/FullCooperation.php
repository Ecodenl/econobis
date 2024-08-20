<?php

namespace App\Http\Resources\Cooperation;

use Illuminate\Http\Resources\Json\JsonResource;

class FullCooperation extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request
     * @return array
     */
    public function toArray($request)
    {
        // todo WM: opschonen inspection* velden
        return [
            'id' => $this->id,
            'name' => $this->name,
            'address' => $this->address,
            'postalCode' => $this->postal_code,
            'city' => $this->city,
            'kvkNumber' => $this->kvk_number,
            'btwNumber' => $this->btw_number,
            'iban' => $this->iban,
            'ibanAttn' => $this->iban_attn,
            'email' => $this->email,
            'website' => $this->website,
            'logoFilename' => $this->logo_filename,
            'logoName' => $this->logo_name,
            'hoomLink' => $this->hoom_link ? $this->hoom_link : '',
            'hoomConnectCoachLink' => $this->hoom_connect_coach_link ? $this->hoom_connect_coach_link : '',
            'hoomKey' => $this->hoom_key,
            'hoomCampaigns' => FullCooperationHoomCampaign::collection($this->whenLoaded('hoomCampaigns')),
            'sendEmail' => $this->send_email,
            'hoomEmailTemplateId' => $this->hoom_email_template_id ? $this->hoom_email_template_id : '',
            'hoomEmailTemplate' => ['name' => $this->emailTemplate ? $this->emailTemplate->name : ''],
            'hoomGroupId' => $this->hoom_group_id ? $this->hoom_group_id : '',
            'hoomMailboxId' => $this->hoom_mailbox_id ? $this->hoom_mailbox_id : '',
            'hoomGroup' => ['name' => $this->contactGroup ? $this->contactGroup->name : ''],
            'hoomMailbox' => ['name' => $this->hoomMailbox ? $this->hoomMailbox->name : ''],
            'useLaposta' => $this->use_laposta,
            'useExportAddressConsumption' => $this->use_export_address_consumption,
            'requireTwoFactorAuthentication' => $this->require_two_factor_authentication,
            'lapostaKey' => $this->laposta_key,
            'createdAt' => $this->created_at,
            'updatedAt' => $this->updated_at,
            'createdById' => $this->created_by_id,
            'createdBy' => ['fullName' => $this->updatedBy->present()->fullName()],
            'updatedById' => $this->updated_by_id,
            'updatedBy' => ['fullName' => $this->updatedBy->present()->fullName()],
            'inspectionPlannedEmailTemplateId' => $this->inspection_planned_email_template_id ? $this->inspection_planned_email_template_id : '',
            'inspectionPlannedEmailTemplate' => ['name' => $this->inspectionPlannedEmailTemplate ? $this->inspectionPlannedEmailTemplate->name : ''],
            'inspectionRecordedEmailTemplateId' => $this->inspection_recorded_email_template_id ? $this->inspection_recorded_email_template_id : '',
            'inspectionRecordedEmailTemplate' => ['name' => $this->inspectionRecordedEmailTemplate ? $this->inspectionRecordedEmailTemplate->name : ''],
            'inspectionReleasedEmailTemplateId' => $this->inspection_released_email_template_id ? $this->inspection_released_email_template_id : '',
            'inspectionReleasedEmailTemplate' => ['name' => $this->inspectionReleasedEmailTemplate ? $this->inspectionReleasedEmailTemplate->name : ''],
            'inspectionPlannedMailboxId' => $this->inspection_planned_mailbox_id ? $this->inspection_planned_mailbox_id : '',
            'inspectionPlannedMailbox' => ['name' => $this->inspectionPlannedMailbox ? $this->inspectionPlannedMailbox->name : ''],
            'createContactsForReportTable' => $this->create_contacts_for_report_table,
            'emailReportTableProblems' => $this->email_report_table_problems ? $this->email_report_table_problems : '',
            'createContactsForReportTableLastCreated' => $this->create_contacts_for_report_table_last_created,
            'createContactsForReportTableInProgress' => $this->create_contacts_for_report_table_in_progress,
            'fontFamilyDefault' => $this->font_family_default,
            'fontSizeDefault' => $this->font_size_default,
            'fontColorDefault' => $this->font_color_default,
        ];
    }
}
