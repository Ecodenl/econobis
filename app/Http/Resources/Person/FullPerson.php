<?php

namespace App\Http\Resources\Person;

use App\Eco\LastNamePrefix\LastNamePrefix;
use App\Http\Resources\Organisation\FullOrganisation;
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

        $lastNamePrefixId = null;

        if($this->last_name_prefix){
            if(LastNamePrefix::where('name', $this->last_name_prefix)->exists()){
                $lastNamePrefixId = LastNamePrefix::where('name', $this->last_name_prefix)->get()[0]->id;
            }
        }

        return [
            'id' => $this->id,
            'contactId' => $this->contact_id,
            'titleId' => $this->title_id,
            'title' => FullTitle::make($this->whenLoaded('title')),
            'initials' => $this->initials,
            'firstName' => $this->first_name,
            'lastNamePrefixId' => $lastNamePrefixId,
            'lastNamePrefix' => $this->last_name_prefix,
            'lastName' => $this->last_name,
            'fullName' => $this->present()->fullName(),
            'organisationId' => $this->organisation_id,
            'organisation' => FullOrganisation::make($this->whenLoaded('organisation')),
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
