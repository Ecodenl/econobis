<?php

namespace App\Http\Resources\HousingFile;

use App\Eco\HousingFile\HousingFileHoomHousingStatus;
use App\Eco\HousingFile\HousingFileHoomLink;
use App\Http\Resources\GenericResource;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\Resources\Json\JsonResource;

class FullHousingFileHousingStatus extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request
     *
     * @return array
     */
    public function toArray($request)
    {

        $housingFileHoomLinks = HousingFileHoomLink::find($this->housing_file_hoom_links_id);
        $housingFileHoomHousingStatus = HousingFileHoomHousingStatus::where('external_hoom_short_name', $housingFileHoomLinks->external_hoom_short_name)->where('hoom_status_value', $this->status)->first();

        return
            [
                'id' => $this->id,
                'housingFileHoomLink' => GenericResource::make($this->whenLoaded('housingFileHoomLink')),
                'statusId' => $this->status,
                'status' => $housingFileHoomHousingStatus ? FullHousingFileHoomHousingStatus::make($housingFileHoomHousingStatus) : new Collection(),
//                'numberOrM2' => $this->number_or_m2,
                'createdAt' => $this->created_at,
                'updatedAt' => $this->updated_at,
            ];
    }
}
