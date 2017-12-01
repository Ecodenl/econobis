<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 01-12-2017
 * Time: 12:09
 */

namespace App\Http\Resources\Registration;


use Illuminate\Http\Resources\Json\Resource;

class GridRegistration extends Resource
{
    public function toArray($request)
    {
        return
            [
                'id' => $this->id,
                'fullName' => $this->address->contact->full_name,
                'sourceNames' => $this->sources->pluck('name'),
                'status' => optional($this->status)->name,
                'measuresRequestedNames' => $this->address->measures_requested->pluck('name'),
            ];
    }
}