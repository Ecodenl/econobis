<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 01-12-2017
 * Time: 12:09
 */

namespace App\Http\Resources\Administration;


use App\Http\Resources\GenericResource;
use Illuminate\Http\Resources\Json\Resource;

class GridAdministration extends Resource
{
    public function toArray($request)
    {
           return [
                'id' => $this->id,
                'name' => $this->name,
                'administration' => $this->administration_number,
                'address' => $this->address,
                'postalCode' => $this->postal_code,
                'city' => $this->city,
                'country' => GenericResource::make($this->whenLoaded('country')),
            ];
    }
}