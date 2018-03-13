<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 04-01-2018
 * Time: 11:49
 */

namespace App\Http\Resources\PostalCodeLink;

use App\Http\Resources\User\FullUser;
use Illuminate\Http\Resources\Json\Resource;

class FullPostalCodeLink extends Resource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'postalCodeMain' => $this->postalcode_main,
            'postalCodeLink' => $this->postalcode_link,
            'postalCodes' => FullPostalCodeLink::collection($this->whenLoaded('postalCodes')),
        ];
    }
}