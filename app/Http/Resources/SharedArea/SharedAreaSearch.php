<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 26-10-2017
 * Time: 12:08
 */

namespace App\Http\Resources\SharedArea;


use Illuminate\Http\Resources\Json\JsonResource;

class SharedAreaSearch extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'areaCode' => $this->area_code,
            'areaName'=> $this->area_name . " (gemeente: " . $this->municipality_name. ", wijk: " . $this->district_name . ")",
        ];
    }
}