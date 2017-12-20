<?php

namespace App\Http\Resources\Opportunity;

use App\Http\Resources\Campaign\FullCampaign;
use App\Http\Resources\Contact\FullContact;
use App\Http\Resources\GenericResource;
use App\Http\Resources\Organisation\FullOrganisation;
use App\Http\Resources\Registration\FullRegistration;
use App\Http\Resources\User\FullUser;
use Illuminate\Http\Resources\Json\Resource;

class FullOpportunityQuotation extends Resource
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
            'id' => $this->id,
            'organisation' => FullOrganisation::make($this->whenLoaded('organisation')),
            'opportunity' => FullOpportunity::make($this->whenLoaded('opportunity')),
            'dateRequested' => $this->date_requested,
            'dateTaken' => $this->date_taken,
            'dateValidTill' => $this->date_valid_till,
            'dateRealised' => $this->date_realised,
            'createdBy' => FullUser::make($this->whenLoaded('createdBy')),
            'createdAt' => $this->created_at,
            'updatedAt' => $this->updated_at,
        ];
    }
}
