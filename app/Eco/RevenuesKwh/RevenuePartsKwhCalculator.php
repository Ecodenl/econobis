<?php

namespace App\Eco\RevenuesKwh;

use App\Helpers\Project\RevenuesKwhHelper;
use Carbon\Carbon;
use Carbon\CarbonPeriod;
use DateTime;
use Illuminate\Support\Facades\Log;

class RevenuePartsKwhCalculator
{
    protected $revenuePartsKwh;
    protected $revenuesKwh;

    public function __construct(RevenuePartsKwh $revenuePartKwh)
    {
        $this->revenuePartsKwh = $revenuePartKwh;
        $this->revenuesKwh = $revenuePartKwh->revenuesKwh;
    }

    public function runRevenuePartsKwh($valuesKwhData, $oldDateEnd)
    {
        if($this->revenuePartsKwh->status == 'in-progress-update') {
            Log::info("Start RevenuePartsKwhCalculator|runRevenuePartsKwh voor revenuePartKwh id " . $this->revenuePartsKwh->id . " : " . Carbon::now()->format("m-d-Y H:i:s.u"));
// todo WM: cleanup
//
//            $this->revenuePartsKwh->newOrConceptDistributionPartsKwh()->delete();
//            $this->revenuePartsKwh->newOrConceptDistributionValuesKwh()->delete();
            $revenuesKwhHelper = new RevenuesKwhHelper();
            $revenuesKwhHelper->createOrUpdateRevenueValuesKwh($valuesKwhData, $this->revenuePartsKwh, $oldDateEnd);
            Log::info("RevenuePartsKwhCalculator na aanmaak simulate values voor revenuePartKwh id " . $this->revenuePartsKwh->id . " : " . Carbon::now()->format("m-d-Y H:i:s.u"));
            $revenuesKwhHelper->saveParticipantsOfDistributionParts($this->revenuePartsKwh);
            $this->calculateDeliveredKwh();

            if ($this->revenuePartsKwh->status === 'in-progress-update') {
                $this->revenuePartsKwh->status = 'concept';
                $this->revenuePartsKwh->save();
            }

            $this->countingsConceptConfirmedProcessed();
            Log::info("Einde RevenuePartsKwhCalculator|runRevenuePartsKwh voor revenuePartKwh id " . $this->revenuePartsKwh->id . " : " . Carbon::now()->format("m-d-Y H:i:s.u"));
        } else {
            Log::error("RevenuePartsKwhCalculator niet uitgevoerd voor revenuePartKwh id " . $this->revenuePartsKwh->id . " i.v.m. ongeldige status: " . $this->revenuePartsKwh->status);
        }


    }

    public function runCountingsRevenuesKwh()
    {
        Log::info("Start RevenuePartsKwhCalculator|runCountingsRevenuesKwh voor revenuePartKwh id " . $this->revenuePartsKwh->id . " : " . Carbon::now()->format("m-d-Y H:i:s.u"));
        $this->countingsConceptConfirmedProcessed();
        Log::info("Einde RevenuePartsKwhCalculator|runCountingsRevenuesKwh voor revenuePartKwh id " . $this->revenuePartsKwh->id . " : " . Carbon::now()->format("m-d-Y H:i:s.u"));
    }

    protected function calculateDeliveredKwh()
    {
        $revenueId = $this->revenuePartsKwh->revenue_id;
        $partsId = $this->revenuePartsKwh->id;

        $totalSumOfParticipationsAndDaysConcept = $this->revenuePartsKwh->conceptDistributionValuesKwh()->get()->sum('quantity_multiply_by_days');
        $totalDeliveredKwhConfirmed = $this->revenuePartsKwh->confirmedValuesKwh()->get()->sum('delivered_kwh');
        $totalDeliveredKwhConcept = $this->revenuePartsKwh->conceptValuesKwh()->get()->sum('delivered_kwh');
        $totalDeliveredKwhToDivide = $totalDeliveredKwhConcept - $totalDeliveredKwhConfirmed;

        foreach ($this->revenuePartsKwh->conceptDistributionValuesKwh as $conceptDistributionValuesKwh) {

            // delivered_kwh = (totaal delivered to divide / $totalSumOfParticipationsAndDaysConcept) * quantity_multiply_by_days
            if ($totalSumOfParticipationsAndDaysConcept != 0) {
                $delivered_kwh = round(($totalDeliveredKwhToDivide / $totalSumOfParticipationsAndDaysConcept) * $conceptDistributionValuesKwh->quantity_multiply_by_days, 6);
            } else {
                $delivered_kwh = 0;
            }
            $conceptDistributionValuesKwh->delivered_kwh = $delivered_kwh;
            $conceptDistributionValuesKwh->save();
        }

        $distributionPartsKwh = RevenueDistributionPartsKwh::where('revenue_id', $revenueId)->where('parts_id', $partsId)->get();
        foreach ($distributionPartsKwh as $distributionPartKwh) {
            $totalDeliveredKwh = RevenueDistributionValuesKwh::where('revenue_id', $revenueId)->where('distribution_id', $distributionPartKwh->distribution_id)->where('parts_id', $partsId)->sum('delivered_kwh');
            $distributionPartKwh->delivered_kwh = $totalDeliveredKwh;
            $distributionPartKwh->save();
        }
    }

    protected function countingsConceptConfirmedProcessed(): void
    {
//todo WM: @@nog doen of anders?!
//
//        foreach ($this->revenuePartsKwh->revenuesKwh->distributionKwh as $distributionKwh) {
//            $distributionKwh->delivered_total_concept = $distributionKwh->distributionValuesKwh->where('status', 'concept')->sum('delivered_kwh');
//            $distributionKwh->delivered_total_confirmed = $distributionKwh->distributionValuesKwh->where('status', 'confirmed')->sum('delivered_kwh');
//            $distributionKwh->delivered_total_processed = $distributionKwh->distributionValuesKwh->where('status', 'processed')->sum('delivered_kwh');
//            $distributionKwh->save();
//        }
        $distributionPartsKwh = RevenueDistributionPartsKwh::where('revenue_id', $this->revenuePartsKwh->revenue_id)->where('parts_id', $this->revenuePartsKwh->id)->get();
        $this->revenuePartsKwh->delivered_total_concept = $distributionPartsKwh->where('status', 'concept')->sum('delivered_kwh');
        $this->revenuePartsKwh->delivered_total_confirmed = $distributionPartsKwh->where('status', 'confirmed')->sum('delivered_kwh');
        $this->revenuePartsKwh->delivered_total_processed = $distributionPartsKwh->where('status', 'processed')->sum('delivered_kwh');
        $this->revenuePartsKwh->save();

        $distributionAllPartsKwh = RevenueDistributionPartsKwh::where('revenue_id', $this->revenuePartsKwh->revenue_id)->get();
        $this->revenuePartsKwh->revenuesKwh->delivered_total_concept = $distributionAllPartsKwh->where('status', 'concept')->sum('delivered_kwh');
        $this->revenuePartsKwh->revenuesKwh->delivered_total_confirmed = $distributionAllPartsKwh->where('status', 'confirmed')->sum('delivered_kwh');
        $this->revenuePartsKwh->revenuesKwh->delivered_total_processed = $distributionAllPartsKwh->where('status', 'processed')->sum('delivered_kwh');
        $this->revenuePartsKwh->revenuesKwh->save();
    }

}