<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 26-10-2017
 * Time: 15:23
 */

namespace App\Http\Resources\User;


use App\Http\Resources\LastNamePrefix\FullLastNamePrefix;
use Illuminate\Http\Resources\Json\Resource;

class FullUser extends Resource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'firstName' => $this->first_name,
            'lastNamePrefixId' => $this->last_name_prefix_id,
            'lastNamePrefix' => FullLastNamePrefix::make($this->whenLoaded('lastNamePrefix')),
            'lastName' => $this->last_name,
            'email' => $this->email,
            'phoneNumber' => $this->phone_number,
            'mobile' => $this->mobile,
            'occupation' => $this->occupation,
            'lastVisit' => $this->last_visit,
            'visitCount' => $this->visit_count,
            'createdAt' => $this->created_at,
            'updatedAt' => $this->updated_at,
        ];
    }

}