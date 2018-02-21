<?php

namespace App\Http\Resources\QuotationRequest;

use App\Http\Resources\Address\FullAddress;
use App\Http\Resources\Campaign\FullCampaign;
use App\Http\Resources\Contact\FullContact;
use App\Http\Resources\Document\FullDocument;
use App\Http\Resources\GenericResource;
use App\Http\Resources\Measure\FullMeasure;
use App\Http\Resources\Opportunity\FullOpportunity;
use App\Http\Resources\Organisation\FullOrganisation;
use App\Http\Resources\User\FullUser;
use Illuminate\Http\Resources\Json\Resource;
use App\Eco\Contact\Contact;
use App\Eco\Address\Address;
use App\Eco\Measure\Measure;

class FullQuotationRequest extends Resource
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
                'name' => 'Offerteverzoek ' . $this->id,
                'dateRecorded' => $this->date_recorded,
                'dateReleased' => $this->date_released,
                'dateValid' => $this->date_valid,
                'quotationText' => $this->quotation_text,
                'organisation' => FullOrganisation::make($this->whenLoaded('organisation')),
                'opportunity' => FullOpportunity::make($this->whenLoaded('opportunity')),
                'status' => GenericResource::make($this->whenLoaded('status')),
                'createdBy' => FullUser::make($this->whenLoaded('createdBy')),
                'updatedBy' => FullUser::make($this->whenLoaded('updatedBy')),
                'createdAt' => $this->created_at,
                'updatedAt' => $this->updated_at,
                'emailSentCount' => $this->relatedEmailsSent ? $this->relatedEmailsSent->count() : 0,
                'relatedEmailsSent' => $this->relatedEmailsSent,
                'documentCount' => $this->documents()->count(),
                'relatedDocuments' => FullDocument::collection($this->whenLoaded('documents')),
            ];
    }
}
