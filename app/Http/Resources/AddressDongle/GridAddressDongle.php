<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 01-12-2017
 * Time: 12:09
 */

namespace App\Http\Resources\AddressDongle;


use App\Eco\Measure\Measure;
use App\Http\Resources\GenericResource;
use Illuminate\Http\Resources\Json\JsonResource;

class GridAddressDongle extends JsonResource
{
    public function toArray($request)
    {
        return [
               'id' => $this->id,
               'fullAddress' => $this->address ? $this->address->present()->streetAndNumber() : '',
               'postalCode' => $this->address ? $this->address->postal_code : '',
               'city' => $this->address ? $this->address->city : '',
               'fullName' => $this->address ? $this->address->contact()->value('full_name') : '',
               'macNumber' => $this->mac_number,
               'typeDongle' => $this->type_dongle,
               'energyId' => $this->energy_id,
               'dateSigned' => $this->date_signed,
               'dateStart' => $this->date_start,
               'dateEnd' => $this->date_end,
//               'createdAt' => $this->created_at,
//               'updatedAt' => $this->updated_at,
            ];
    }
}
