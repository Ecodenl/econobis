<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 26-10-2017
 * Time: 11:58
 */

namespace App\Http\Resources\EnumWithIdAndName;


use Illuminate\Http\Resources\Json\JsonResource;

class FullEnumWithIdAndName extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
        ];
    }
}