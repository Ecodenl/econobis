<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 26-10-2017
 * Time: 12:08
 */

namespace App\Http\Resources\Person;


use Illuminate\Http\Resources\Json\JsonResource;

class PersonPeek extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'fullName' => $this->present()->fullName(),
        ];
    }
}