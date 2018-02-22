<?php

namespace App\Http\Resources\Occupation;

use App\Http\Resources\Organisation\FullOrganisation;
use App\Http\Resources\Person\FullPerson;
use Illuminate\Http\Resources\Json\Resource;

class FullOccupationPerson extends Resource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'person' => FullPerson::make($this->whenLoaded('person')),
            'organisation' => FullOrganisation::make($this->whenLoaded('organisation')),
            'occupation' => FullOccupation::make($this->whenLoaded('occupation')),
            'startDate' => $this->start_date,
            'endDate' => $this->end_date,
            'primary' => $this->primary,
        ];
    }
}
