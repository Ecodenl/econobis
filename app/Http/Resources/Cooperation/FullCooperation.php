<?php

namespace App\Http\Resources\Cooperation;

use App\Http\Resources\User\FullUser;
use Illuminate\Http\Resources\Json\Resource;

class FullCooperation extends Resource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request
     * @return array
     */
    public function toArray($request)
    {
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
            'hoomLink' => $this->hoom_link,
            'hoomKey' => $this->hoom_key,
            'hoomEmailTemplateId' => $this->hoom_email_template_id ? $this->hoom_email_template_id : '',
            'hoomEmailTemplate' => ['name' => $this->emailTemplate ? $this->emailTemplate->name : ''],
            'hoomGroupId' => $this->hoom_group_id ? $this->hoom_group_id : '',
            'hoomGroup' => ['name' => $this->contactGroup ? $this->contactGroup->name : ''],
            'createdAt' => $this->created_at,
            'updatedAt' => $this->updated_at,
            'createdById' => $this->created_by_id,
            'createdBy' => ['fullName' => $this->updatedBy->present()->fullName()],
            'updatedById' => $this->updated_by_id,
            'updatedBy' => ['fullName' => $this->updatedBy->present()->fullName()],
        ];
    }
}
