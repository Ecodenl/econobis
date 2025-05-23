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
use Illuminate\Http\Resources\Json\JsonResource;
use App\Eco\Contact\Contact;
use App\Eco\Address\Address;
use App\Eco\Measure\Measure;

class FullHousingFile extends JsonResource
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
                'postalCode' => $this->address->postal_code,
                'city' => $this->address->city,
                'buildingType' => GenericResource::make($this->whenLoaded('buildingType')),
                'buildYear' => $this->build_year,
                'isHouseForSale' => $this->is_house_for_sale,
                'surface' => $this->surface,
                'roofType' => GenericResource::make($this->whenLoaded('roofType')),
                'energyLabel' => GenericResource::make($this->whenLoaded('energyLabel')),
                'floors' => $this->floors,
                'energyLabelStatus' => GenericResource::make($this->whenLoaded('energyLabelStatus')),
                'isMonument' => $this->is_monument,
                'remark' => $this->remark,
                'remarkCoach' => $this->remark_coach,
                'hoomBuildingId' => $this->hoom_building_id,
                'wallSurface' => $this->wall_surface,
                'totalWindowSurface' => $this->total_window_surface,
                'frameType' => GenericResource::make($this->whenLoaded('frameType')),
                'floorSurface' => $this->floor_surface,
                'revenueSolarPanels' => $this->revenue_solar_panels,
                'pitchedRoofSurface' => $this->pitched_roof_surface,
                'flatRoofSurface' => $this->flat_roof_surface,
                'cookType' => GenericResource::make($this->whenLoaded('cookType')),
                'heatSource' => GenericResource::make($this->whenLoaded('heatSource')),
                'waterComfort' => GenericResource::make($this->whenLoaded('waterComfort')),
                'pitchedRoofHeating' => GenericResource::make($this->whenLoaded('pitchedRoofHeating')),
                'flatRoofHeating' => GenericResource::make($this->whenLoaded('flatRoofHeating')),
                'hr3pGlassFrameCurrentGlass' => GenericResource::make($this->whenLoaded('hr3pGlassFrameCurrentGlass')),
                'glassInLeadReplaceRoomsHeated' => GenericResource::make($this->whenLoaded('glassInLeadReplaceRoomsHeated')),
                'numberOfResidents' => $this->number_of_residents,
                'boilerSettingComfortHeat' => GenericResource::make($this->whenLoaded('boilerSettingComfortHeat')),
                'amountGas' => $this->amount_gas,
                'amountElectricity' => $this->amount_electricity,
                'wozValue' => $this->woz_value,
                'createdBy' => FullUser::make($this->whenLoaded('createdBy')),
                'updatedBy' => FullUser::make($this->whenLoaded('updatedBy')),
                'createdAt' => $this->created_at,
                'updatedAt' => $this->updated_at,
                'noteCount' => $this->notes()->count(),
                'relatedNotes' => FullTask::collection($this->whenLoaded('notes')),
                'documentCount' => $this->relatedDocuments ? $this->relatedDocuments->count() : 0,
                'relatedDocuments' => $this->relatedDocuments,
                'housingFileSpecifications' => FullHousingFileSpecification::collection($this->whenLoaded('housingFileSpecifications')),
                'housingFileHousingStatuses' => FullHousingFileHousingStatus::collection($this->whenLoaded('housingFileHousingStatuses')),
            ];
    }
}
