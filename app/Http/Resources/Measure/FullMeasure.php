<?php

namespace App\Http\Resources\Measure;

use App\Http\Resources\Campaign\FullCampaign;
use App\Http\Resources\Contact\FullContact;
use App\Http\Resources\GenericResource;
use App\Http\Resources\Registration\FullRegistration;
use App\Http\Resources\User\FullUser;
use Illuminate\Http\Resources\Json\Resource;

class FullMeasure extends Resource
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
            'number' => $this->number,
            'name' => $this->name,
            'description' => $this->description,
            'campaignCount' => $this->campaigns()->count(),
            'relatedCampaigns' => $this->campaigns()->get(),
        ];
    }
}
