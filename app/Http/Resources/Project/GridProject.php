<?php

namespace App\Http\Resources\Project;

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

class GridProject extends Resource
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
                'name' => $this->name,
                'projectType' => optional($this->projectType)->name,
                'projectTypeCodeRef' => optional($this->projectType)->code_ref,
                'totalParticipations' => $this->total_participations,
                'participationsDefinitive' => $this->participations_definitive,
                'amountOfLoanNeeded' => $this->amount_of_loan_needed,
                'amountDefinitive' => $this->amount_definitive,
            ];
    }
}
