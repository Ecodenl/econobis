<?php

namespace App\Eco\RevenuesKwh;

use App\Helpers\Project\RevenuesKwhHelper;
use Carbon\Carbon;
use Carbon\CarbonPeriod;
use DateTime;
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
//todo WM: cleanup logs
//            Log::info("Start RevenuePartsKwhCalculator|runRevenuePartsKwh voor revenuePartKwh id " . $this->revenuePartKwh->id . " : " . Carbon::now()->format("m-d-Y H:i:s.u"));
            $revenuesKwhHelper = new RevenuesKwhHelper();
//            $revenuesKwhHelper->createOrUpdateRevenueValuesKwh($valuesKwhData, $this->revenuePartKwh, $alwaysRecalculate);
//            Log::info("RevenuePartsKwhCalculator na createOrUpdateRevenueValuesKwh voor revenuePartKwh id " . $this->revenuePartKwh->id . " : " . Carbon::now()->format("m-d-Y H:i:s.u"));
            $revenuesKwhHelper->saveParticipantsOfDistributionParts($this->revenuePartKwh);
//            Log::info("RevenuePartsKwhCalculator na saveParticipantsOfDistributionParts " . $this->revenuePartKwh->id . " : " . Carbon::now()->format("m-d-Y H:i:s.u"));
            $this->calculateDeliveredKwh();
//            Log::info("RevenuePartsKwhCalculator na calculateDeliveredKwh " . $this->revenuePartKwh->id . " : " . Carbon::now()->format("m-d-Y H:i:s.u"));

            if ($this->revenuePartKwh->status === 'in-progress-update') {
                $this->revenuePartKwh->status = 'concept';
                $this->revenuePartKwh->save();
            }

            $this->countingsConceptConfirmedProcessed();
//            Log::info("Einde RevenuePartsKwhCalculator|runRevenuePartsKwh voor revenuePartKwh id " . $this->revenuePartKwh->id . " : " . Carbon::now()->format("m-d-Y H:i:s.u"));
        } else {
            Log::error("RevenuePartsKwhCalculator niet uitgevoerd voor revenuePartKwh id " . $this->revenuePartKwh->id . " i.v.m. ongeldige status: " . $this->revenuePartKwh->status);
        }


    }

    public function runCountingsRevenuesKwh()
    {
//        Log::info("Start RevenuePartsKwhCalculator|runCountingsRevenuesKwh voor revenuePartKwh id " . $this->revenuePartKwh->id . " : " . Carbon::now()->format("m-d-Y H:i:s.u"));
        $this->countingsConceptConfirmedProcessed();
//        Log::info("Einde RevenuePartsKwhCalculator|runCountingsRevenuesKwh voor revenuePartKwh id " . $this->revenuePartKwh->id . " : " . Carbon::now()->format("m-d-Y H:i:s.u"));
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

        $distributionPartsKwh = RevenueDistributionPartsKwh::where('revenue_id', $revenueId)->where('parts_id', $partsId)->get();
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