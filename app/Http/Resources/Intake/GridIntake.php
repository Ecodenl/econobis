<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 01-12-2017
 * Time: 12:09
 */

namespace App\Http\Resources\Intake;


use App\Http\Resources\Campaign\CampaignByIntake;
use Illuminate\Http\Resources\Json\Resource;

class GridIntake extends Resource
{
    public function toArray($request)
    {
           return [
                'id' => $this->id,
                'createdAt' => $this->created_at,
                'fullName' => $this->contact()->value('full_name'),
                'fullAddress' => $this->address ? $this->address->present()->streetAndNumber() : '',
                'campaign' => CampaignByIntake::make($this->whenLoaded('campaign')),
                'measuresRequestedNames' => $this->measuresRequested()->pluck('name'),
                'status' => optional($this->status)->name,
                'contactId' => $this->contact->id,
            ];
    }
}