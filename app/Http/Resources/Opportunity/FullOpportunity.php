<?php

namespace App\Http\Resources\Opportunity;

use App\Http\Resources\Campaign\FullCampaign;
use App\Http\Resources\Contact\FullContact;
use App\Http\Resources\GenericResource;
use App\Http\Resources\Registration\FullRegistration;
use App\Http\Resources\User\FullUser;
use Illuminate\Http\Resources\Json\Resource;

class FullOpportunity extends Resource
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
            'measure' => GenericResource::make($this->whenLoaded('measure')),
            'contact' => FullContact::make($this->whenLoaded('contact')),
            'number' => $this->number,
            'reaction' => GenericResource::make($this->whenLoaded('reaction')),
            'status' => GenericResource::make($this->whenLoaded('status')),
            'registration' => FullRegistration::make($this->whenLoaded('registration')),
            'campaign' => GenericResource::make($this->whenLoaded('campaign')),
            'quotationText' => $this->quotation_text,
            'quotations' => FullOpportunityQuotation::collection($this->whenLoaded('quotations')),
            'desiredDate' => $this->desired_date,
            'createdBy' => FullUser::make($this->whenLoaded('createdBy')),
            'ownedBy' => FullUser::make($this->whenLoaded('ownedBy')),
            'createdAt' => $this->created_at,
            'updatedAt' => $this->updated_at,
            'relatedOpportunities' => $this->relatedOpportunities(),
            'amountRelatedOpportunities' => count($this->relatedOpportunities()),
            'taskCount' => $this->tasks()->count(),
            'relatedTasks' => $this->tasks()->get(),
            'documentCount' => $this->documents()->count(),
            'relatedDocuments' => $this->documents()->get(),
        ];
    }
}
