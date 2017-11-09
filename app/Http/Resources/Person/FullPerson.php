<?php

namespace App\Http\Resources\Person;

use App\Http\Resources\Account\FullAccount;
use App\Http\Resources\LastNamePrefix\FullLastNamePrefix;
use App\Http\Resources\Occupation\FullOccupation;
use App\Http\Resources\PersonType\FullPersonType;
use App\Http\Resources\Title\FullTitle;
use Illuminate\Http\Resources\Json\Resource;

class FullPerson extends Resource
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
            'contactId' => $this->contact_id,
            'titleId' => $this->title_id,
            'title' => FullTitle::make($this->whenLoaded('title')),
            'firstName' => $this->first_name,
            'lastNamePrefixId' => $this->last_name_prefix_id,
            'lastNamePrefix' => FullLastNamePrefix::make($this->whenLoaded('lastNamePrefix')),
            'lastName' => $this->last_name,
            'fullName' => $this->present()->fullName(),
            'accountId' => $this->account_id,
            'account' => FullAccount::make($this->whenLoaded('account')),
            'occupationId' => $this->occupation_id,
            'occupation' => FullOccupation::make($this->whenLoaded('occupation')),
            'typeId' => $this->type_id,
            'type' => FullPersonType::make($this->whenLoaded('type')),
            'dateOfBirth' => $this->date_of_birth,
            'createdAt' => $this->created_at,
            'updatedAt' => $this->updated_at,
            'firstNamePartner' => $this->first_name_partner,
            'lastNamePartner' => $this->last_name_partner,
            'dateOfBirthPartner' => $this->date_of_birth_partner,
            'primary' => $this->primary,
        ];
    }
}
