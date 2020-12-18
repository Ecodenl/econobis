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
            'postal_code' => $this->postal_code,
            'city' => $this->city,
            'kvk_number' => $this->kvk_number,
            'btw_number' => $this->btw_number,
            'iban' => $this->iban,
            'ibanAttn' => $this->iban_attn,
            'email' => $this->email,
            'website' => $this->website,
            'logo_filename' => $this->logo_filename,
            'logo_name' => $this->logo_name,
            'hoom_link' => $this->hoom_link,
            'hoom_key' => $this->hoom_key,
            'hoom_email_template_id' => $this->hoom_email_template_id,
            'hoom_group_id' => $this->hoom_group_id,
            'createdAt' => $this->created_at,
            'updatedAt' => $this->updated_at,
            'createdById' => $this->created_by_id,
            'createdBy' => FullUser::make($this->whenLoaded('createdBy')),
            'updatedById' => $this->updated_by_id,
            'updatedBy' => FullUser::make($this->whenLoaded('updatedBy')),
        ];
    }
}
