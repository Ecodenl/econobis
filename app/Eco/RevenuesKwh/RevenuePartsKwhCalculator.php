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
            $this->revenuePartsKwh->conceptSimulatedValuesKwh($oldDateEnd)->delete();
            $this->revenuePartsKwh->inProgressUpdateDistributionPartsKwh()->delete();
            $this->revenuePartsKwh->newOrConceptDistributionValuesKwh()->delete();
            $revenuesKwhHelper = new RevenuesKwhHelper();
            $revenuesKwhHelper->createOrUpdateRevenueValuesKwh($valuesKwhData, $this->revenuePartsKwh);
            $revenuesKwhHelper->createOrUpdateRevenueValuesKwhSimulate($this->revenuePartsKwh);
            Log::info("RevenuePartsKwhCalculator na aanmaak simulate values voor revenuePartKwh id " . $this->revenuePartsKwh->id . " : " . Carbon::now()->format("m-d-Y H:i:s.u"));
            $revenuesKwhHelper->saveParticipantsOfDistributionParts($this->revenuePartsKwh);
            $this->calculateDeliveredKwh();

            $distributionsPartsKwh = $this->revenuePartsKwh->distributionPartsKwh;
            foreach($distributionsPartsKwh as $distributionPartsKwh) {
                if ($distributionPartsKwh->status === 'in-progress-update') {
                    $distributionPartsKwh->status = 'concept';
                    $distributionPartsKwh->save();
                }
                if ($distributionPartsKwh->distributionKwh->status === 'in-progress-update') {
                    $distributionPartsKwh->distributionKwh->status = 'concept';
                    $distributionPartsKwh->distributionKwh->save();
                }
            }
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
        $partDateBegin = Carbon::parse($this->revenuePartsKwh->date_begin)->format('Y-m-d');
        $partDateEnd = Carbon::parse($this->revenuePartsKwh->date_end)->format('Y-m-d');

        $distributionIds = $this->revenuePartsKwh->distributionPartsKwh->pluck('distribution_id')->toArray();
        // Iterate over the period
        $period = CarbonPeriod::create(Carbon::parse($partDateBegin)->format('Y-m-d'), Carbon::parse($partDateEnd)->format('Y-m-d'));
        foreach ($period as $date) {

            $dateRegistration = $date->format('Y-m-d');

            $revenueValuesKwh = RevenueValuesKwh::where('revenue_id', $revenueId)->where('date_registration', $dateRegistration)->first();
            if ($revenueValuesKwh) {
                $totalSumOfParticipationsConcept = RevenueDistributionValuesKwh::where('revenue_id', $revenueId)->where('parts_id', $partsId)->where('revenue_values_id', $revenueValuesKwh->id)->where('status', 'concept')->sum('participations_quantity');

                foreach ($distributionIds as $distributionId) {

                    $totalDeliveredKwhConfirmed = RevenueDistributionValuesKwh::where('revenue_id', $revenueId)->where('distribution_id', $distributionId)->where('revenue_values_id', $revenueValuesKwh->id)->whereIn('status', ['confirmed', 'processed'])->sum('delivered_kwh');
                    $totalDeliveredValuesKwh = $revenueValuesKwh->delivered_kwh - $totalDeliveredKwhConfirmed;

                    $distributionValuesKwhConcept = RevenueDistributionValuesKwh::where('revenue_id', $revenueId)->where('distribution_id', $distributionId)->where('revenue_values_id', $revenueValuesKwh->id)->where('status', 'concept')->get();
                    foreach ($distributionValuesKwhConcept as $distributionValueKwhConcept) {
                        //totaal deliverd * (participations_quantity / $totalSumOfParticipations)
                        if ($totalSumOfParticipationsConcept != 0) {
                            $delivered_kwh = round($totalDeliveredValuesKwh * ($distributionValueKwhConcept->participations_quantity / $totalSumOfParticipationsConcept), 6);
                        } else {
                            $delivered_kwh = 0;
                        }
                        if($distributionValueKwhConcept->delivered_kwh != $delivered_kwh){
                            $distributionValueKwhConcept->delivered_kwh = $delivered_kwh;
                            $distributionValueKwhConcept->save();
                        }
                    }
                }
            }
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
        foreach ($this->revenuePartsKwh->revenuesKwh->distributionKwh as $distributionKwh) {
            $distributionKwh->delivered_total_concept = $distributionKwh->distributionValuesKwh->where('status', 'concept')->sum('delivered_kwh');
            $distributionKwh->delivered_total_confirmed = $distributionKwh->distributionValuesKwh->where('status', 'confirmed')->sum('delivered_kwh');
            $distributionKwh->delivered_total_processed = $distributionKwh->distributionValuesKwh->where('status', 'processed')->sum('delivered_kwh');
            $distributionKwh->save();
        }
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