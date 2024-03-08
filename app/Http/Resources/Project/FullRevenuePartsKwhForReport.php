<?php

namespace App\Http\Resources\Project;

use Illuminate\Http\Resources\Json\JsonResource;

class FullRevenuePartsKwhForReport extends JsonResource
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
                'defaultDocumentName' => $this->getDefaultDocumentName(),
                'distributionForReportEnergySupplier' => $this->getDistributionForReportEnergySupplier(),
            ];
    }
}
