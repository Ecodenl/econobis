<?php

namespace App\Http\Resources\ProductionProject;

use App\Http\Resources\GenericResource;
use App\Http\Resources\ParticipantProductionProject\FullParticipantProductionProject;
use App\Http\Resources\User\FullUser;
use Illuminate\Http\Resources\Json\Resource;

class FullProductionProject extends Resource
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
                'name' => $this->name,
                'code' => $this->code,
                'description' => $this->description,
                'ownedById' => $this->owned_by_id,
                'ownedBy' => FullUser::make($this->whenLoaded('ownedBy')),
                'productionProjectStatusId' => $this->production_project_status_id,
                'productionProjectStatus' => GenericResource::make($this->whenLoaded('productionProjectStatus')),
                'dateStart' => $this->date_start,
                'dateProduction' => $this->date_production,
                'dateStartRegistrations' => $this->date_start_registrations,
                'dateEndRegistrations' => $this->date_end_registrations,
                'productionProjectTypeId' => $this->production_project_type_id,
                'productionProjectType' => GenericResource::make($this->whenLoaded('productionProjectType')),
                'postalCode' => $this->postal_code,
                'address' => $this->address,
                'city' => $this->city,
                'ean' => $this->ean,
                'eanManager' => $this->ean_manager,
                'warrantyOrigin' => $this->warranty_origin,
                'eanSupply' => $this->ean_supply,
                'participationWorth' => $this->participation_worth,
                'powerKwhAvailable' => $this->power_kwh_available,
                'maxParticipations' => $this->max_participations,
                'taxReferral' => $this->tax_referral,
                'maxParticipationsYouth' => $this->max_participations_youth,
                'totalParticipations' => $this->total_participations,
                'minParticipations' => $this->min_participations,
                'issuedParticipations' => $this->issued_participations,
                'isMembershipRequired' => $this->is_membership_required,
                'participationsInOption' => $this->participations_in_options,
                'isParticipationTransferable' => $this->is_participation_transferable,
                'issuableParticipations' => $this->issuable_participations,
                'createdAt' => $this->created_at,
                'createdById' => $this->created_by_id,
                'createdBy' => FullUser::make($this->whenLoaded('createdBy')),
                'valueCourses' => FullProductionProjectValueCourse::collection($this->whenLoaded('productionProjectValueCourses')),
                'revenues' => FullProductionProjectRevenue::collection($this->whenLoaded('productionProjectRevenues')),
                'participants' => FullParticipantProductionProject::collection($this->whenLoaded('participantsProductionProject')),
                'participationsWorthTotal' => $this->participations_worth_total,
                'amountOfParticipants' => $this->participantsProductionProject->count(),
            ];
    }
}
