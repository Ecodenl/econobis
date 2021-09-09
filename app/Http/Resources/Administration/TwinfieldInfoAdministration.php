<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 26-10-2017
 * Time: 12:08
 */

namespace App\Http\Resources\Administration;


use Illuminate\Http\Resources\Json\JsonResource;

class TwinfieldInfoAdministration extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'twinfieldOfficeCode' => $this->twinfield_office_code,
            'twinfieldOrganizationCode' => $this->twinfield_organization_code,
        ];
    }
}