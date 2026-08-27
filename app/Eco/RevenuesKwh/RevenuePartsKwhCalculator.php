<?php

namespace App\Eco\RevenuesKwh;

use App\Helpers\Project\RevenuesKwhHelper;
use Illuminate\Support\Facades\Log;

class RevenuePartsKwhCalculator
{
    protected $revenuePartKwh;
    protected $revenuesKwh;

    public function __construct(RevenuePartsKwh $revenuePartKwh)
    {
        $this->revenuePartKwh = $revenuePartKwh;
        $this->revenuesKwh = $revenuePartKwh->revenuesKwh;
    }

    public function runRevenuePartsKwh()
    {
        if($this->revenuePartKwh->status == 'in-progress-update') {
            $revenuesKwhHelper = new RevenuesKwhHelper();
            $revenuesKwhHelper->saveParticipantsOfDistributionParts($this->revenuePartKwh);
            $this->calculateDeliveredKwh();

            if ($this->revenuePartKwh->status === 'in-progress-update') {
                $this->revenuePartKwh->status = 'concept';
                $this->revenuePartKwh->save();
            }

            $this->countingsConceptConfirmedProcessed();
        } else {
            Log::error("RevenuePartsKwhCalculator niet uitgevoerd voor revenuePartKwh id " . $this->revenuePartKwh->id . " i.v.m. ongeldige status: " . $this->revenuePartKwh->status);
        }


    }

    public function runCountingsRevenuesKwh()
    {
        $this->countingsConceptConfirmedProcessed();
    }

    protected function calculateDeliveredKwh()
    {
        $revenueId = $this->revenuePartKwh->revenue_id;
        $partsId = $this->revenuePartKwh->id;

        $totalSumOfParticipationsAndDaysConcept = $this->revenuePartKwh->conceptDistributionValuesKwh()->sum('quantity_multiply_by_days');
        $totalDeliveredKwhConfirmed = $this->revenuePartKwh->confirmedValuesKwh()->sum('delivered_kwh');
        $totalDeliveredKwhConcept = $this->revenuePartKwh->conceptValuesKwh()->sum('delivered_kwh');
        $totalDeliveredKwhToDivide = $totalDeliveredKwhConcept - $totalDeliveredKwhConfirmed;

        foreach ($this->revenuePartKwh->conceptDistributionValuesKwh as $conceptDistributionValuesKwh) {

            // delivered_kwh = (totaal delivered to divide / $totalSumOfParticipationsAndDaysConcept) * quantity_multiply_by_days
            if ($totalSumOfParticipationsAndDaysConcept != 0) {
                $delivered_kwh = round(($totalDeliveredKwhToDivide / $totalSumOfParticipationsAndDaysConcept) * $conceptDistributionValuesKwh->quantity_multiply_by_days, 6);
            } else {
                $delivered_kwh = 0;
            }
            $conceptDistributionValuesKwh->delivered_kwh = $delivered_kwh;
            $conceptDistributionValuesKwh->save();
        }

        $distributionPartsKwh = RevenueDistributionPartsKwh::where('revenue_id', $revenueId)->where('parts_id', $partsId)->where('status', 'concept')->get();
        foreach ($distributionPartsKwh as $distributionPartKwh) {
            $totalDeliveredKwh = RevenueDistributionValuesKwh::where('revenue_id', $revenueId)->where('distribution_id', $distributionPartKwh->distribution_id)->where('parts_id', $partsId)->sum('delivered_kwh');
            $distributionPartKwh->delivered_kwh = $totalDeliveredKwh;
            $distributionPartKwh->save();
        }
    }

    protected function countingsConceptConfirmedProcessed(): void
    {
        foreach ($this->revenuesKwh->distributionKwh as $distributionKwh) {
            $distributionKwh->delivered_total_concept = $distributionKwh->distributionValuesKwh->where('status', 'concept')->sum('delivered_kwh');
            $distributionKwh->delivered_total_confirmed = $distributionKwh->distributionValuesKwh->where('status', 'confirmed')->sum('delivered_kwh');
            $distributionKwh->delivered_total_processed = $distributionKwh->distributionValuesKwh->where('status', 'processed')->sum('delivered_kwh');
            $distributionKwh->save();
        }
        $distributionPartsKwh = RevenueDistributionPartsKwh::where('revenue_id', $this->revenuePartKwh->revenue_id)->where('parts_id', $this->revenuePartKwh->id)->get();
        $this->revenuePartKwh->delivered_total_concept = $distributionPartsKwh->where('status', 'concept')->sum('delivered_kwh');
        $this->revenuePartKwh->delivered_total_confirmed = $distributionPartsKwh->where('status', 'confirmed')->sum('delivered_kwh');
        $this->revenuePartKwh->delivered_total_processed = $distributionPartsKwh->where('status', 'processed')->sum('delivered_kwh');
        $this->revenuePartKwh->save();

        $distributionAllPartsKwh = RevenueDistributionPartsKwh::where('revenue_id', $this->revenuePartKwh->revenue_id)->get();
        $this->revenuesKwh->delivered_total_concept = $distributionAllPartsKwh->where('status', 'concept')->sum('delivered_kwh');
        $this->revenuesKwh->delivered_total_confirmed = $distributionAllPartsKwh->where('status', 'confirmed')->sum('delivered_kwh');
        $this->revenuesKwh->delivered_total_processed = $distributionAllPartsKwh->where('status', 'processed')->sum('delivered_kwh');
        $this->revenuesKwh->save();
    }

}