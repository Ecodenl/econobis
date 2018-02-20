<?php

namespace App\Http\Resources\HousingFile;

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

class FullHousingFile extends Resource
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
                'address' => FullAddress::make($this->whenLoaded('address')),
                'fullAddress' => $this->address->present()->streetAndNumber(),
                'buildingType' => GenericResource::make($this->whenLoaded('buildingType')),
                'buildYear' => $this->build_year,
                'surface' => $this->surface,
                'roofType' => GenericResource::make($this->whenLoaded('roofType')),
                'energyLabel' => GenericResource::make($this->whenLoaded('energyLabel')),
                'floors' => $this->floors,
                'energyLabelStatus' => GenericResource::make($this->whenLoaded('energyLabelStatus')),
                'isMonument' => $this->is_monument,
                'createdBy' => FullUser::make($this->whenLoaded('createdBy')),
                'updatedBy' => FullUser::make($this->whenLoaded('updatedBy')),
                'createdAt' => $this->created_at,
                'updatedAt' => $this->updated_at,
                'noteCount' => $this->notes()->count(),
                'relatedNotes' => FullTask::collection($this->whenLoaded('notes')),
                'documentCount' => $this->documents()->count(),
                'relatedDocuments' => FullDocument::collection($this->whenLoaded('documents')),
            ];
    }
}
