<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 01-12-2017
 * Time: 12:09
 */

namespace App\Http\Resources\Administration;


use App\Http\Resources\GenericResource;
use Illuminate\Http\Resources\Json\JsonResource;

class GridAdministration extends JsonResource
{
    public function toArray($request)
    {
           return [
                'id' => $this->id,
                'name' => $this->name,
                'administration' => $this->administration_code,
                'address' => $this->address,
                'postalCode' => $this->postal_code,
                'city' => $this->city,
                'country' => GenericResource::make($this->whenLoaded('country')),
            ];
    }
}