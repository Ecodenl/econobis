<?php

namespace App\Http\Resources\ProductionProject;

use App\Http\Resources\Address\FullAddress;
use App\Http\Resources\Campaign\FullCampaign;
use App\Http\Resources\Contact\FullContact;
use App\Http\Resources\Document\FullDocument;
use App\Http\Resources\GenericResource;
use App\Http\Resources\Measure\FullMeasure;
use App\Http\Resources\Opportunity\FullOpportunity;
use App\Http\Resources\Task\FullTask;
use App\Http\Resources\User\FullUser;
use Illuminate\Http\Resources\Json\Resource;
use App\Eco\Contact\Contact;
use App\Eco\Address\Address;
use App\Eco\Measure\Measure;

class GridProductionProject extends Resource
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
        return
            [
                'id' => $this->id,
                'code' => $this->code,
                'description' => $this->description,
                'totalParticipations' => $this->total_participations,
                'powerKwhAvailable' => $this->power_kwh_available,
                'issuedParticipations' => $this->issued_participations,
                'issuableParticipations' => $this->issuable_participations,
                'issuedParticipationsPercentage' => $this->issued_participations_percentage,
            ];
    }
}
