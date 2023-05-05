<?php

namespace App\Http\Resources\HousingFile;

//use App\Eco\HousingFile\HousingFileHoomLink;
use Illuminate\Http\Resources\Json\JsonResource;

class FullHousingFileHoomHousingStatus extends JsonResource
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
// todo WM: cleanup indien niet nodig
//        $housingFileHoomLink = HousingFileHoomLink::where('external_hoom_short_name', $this->external_hoom_short_name)->first();

        return
            [
                'id' => $this->id,
                'hoomStatusValue' => $this->hoom_status_value,
                'hoomStatusName' => $this->hoom_status_name,
// todo WM: cleanup indien niet nodig
//                'externalHoomShortName' => $this->external_hoom_short_name,
//                'label' => $housingFileHoomLink ? $housingFileHoomLink->label : '',
//                'visibleInEconobis' => $housingFileHoomLink ? $housingFileHoomLink->visible_in_econobis : false,
            ];
    }
}
