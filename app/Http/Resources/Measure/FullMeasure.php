<?php

namespace App\Http\Resources\Measure;

use App\Http\Resources\GenericResource;
use App\Http\Resources\HousingFile\FullHousingFileSpecification;
use App\Http\Resources\Opportunity\FullOpportunity;
use App\Http\Resources\Organisation\FullOrganisation;
use App\Http\Resources\User\FullUser;
use Illuminate\Http\Resources\Json\JsonResource;

class FullMeasure extends JsonResource
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
            'name_default' => $this->name_default,
            'name_custom' => $this->name_custom,
            'description' => $this->description,
            'visible' => $this->visible,
            'createdAt' => $this->created_at,
            'createdBy' => FullUser::make($this->whenLoaded('createdBy')),
            'updatedAt' => $this->updated_at,
            'updatedBy' => FullUser::make($this->whenLoaded('updatedBy')),
            'measureCategory' => GenericResource::make($this->whenLoaded('measureCategory')),
            'faqs' => $this->faqs()->get(),
            'suppliers' => FullOrganisation::collection($this->whenLoaded('deliveredByOrganisations')),
            'opportunities' => FullOpportunity::collection($this->whenLoaded('opportunities')),
            'housingFileSpecifications' => FullHousingFileSpecification::collection($this->whenLoaded('housingFileSpecifications')),
            'relatedDocuments' => $this->relatedDocuments,
            'documentCount' => $this->relatedDocuments ? $this->relatedDocuments->count() : 0,
        ];
    }
}
