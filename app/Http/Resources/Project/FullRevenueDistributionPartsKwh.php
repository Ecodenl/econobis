<?php

namespace App\Http\Resources\Project;

use App\Http\Resources\EnumWithIdAndName\FullEnumWithIdAndName;
use Illuminate\Http\Resources\Json\JsonResource;

class FullRevenueDistributionPartsKwh extends JsonResource
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
                'revenueId' => $this->revenue_id,
                'contactId' => $this->distributionKwh->contact_id,
                'contactType' => FullEnumWithIdAndName::make($this->distributionKwh->contact->getType()),
                'contactName' => $this->distributionKwh->contact->full_name,
                'contactPrimaryEmailAddress' => $this->distributionKwh->contact->primaryEmailAddress,
                'address' => $this->distributionKwh->address,
                'postalCode' => $this->distributionKwh->postal_code,
                'city' => $this->distributionKwh->city,
                'energySupplierName' => $this->energySupplier ? $this->energySupplier->name : '',
                'status' => $this->status,
                'participationsQuantityAtStart' => $this->participations_quantity_at_start,
                'participationsQuantity' => $this->participations_quantity,
                'deliveredKwh' => $this->delivered_kwh,
                'deliveredTotalString' => $this->delivered_total_string,
                'notReportedDeliveredKwhString' => $this->not_reported_delivered_kwh_string,
                'kwhReturn' => $this->kwh_return,
                'deliveredTotalThisPartString' => $this->delivered_total_this_part_string,
                'kwhReturnThisPart' => $this->kwh_return_this_part,
                'remarks' => $this->remarks,
                'isVisible' => $this->is_visible,
                'isEnergySupplierSwitch' => $this->is_energy_supplier_switch,
                'isEndParticipation' => $this->is_end_participation,
                'isEndYearPeriod' => $this->is_end_year_period,
                'isEndTotalPeriod' => $this->is_end_total_period,
                'previousVisiblePartNotReportedDateBegin' => $this->previous_visible_part_not_reported_date_begin,
                'isPreviousVisiblePartReported' => $this->is_previous_visible_part_reported,
                'dateParticipantReport' => $this->date_participant_report,
                'beginDateParticipantReport' => $this->begin_date_participant_report,
                'endDateParticipantReport' => $this->end_date_participant_report,
                'dateEnergySupplierReport' => $this->date_energy_supplier_report,
            ];
    }
}
