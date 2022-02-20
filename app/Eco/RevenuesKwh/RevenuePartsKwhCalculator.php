<?php

namespace App\Eco\RevenuesKwh;

use App\Helpers\Project\RevenuesKwhHelper;
use Carbon\Carbon;
use Carbon\CarbonPeriod;

class RevenuePartsKwhCalculator
{
    protected $revenuePartsKwh;

    public function __construct(RevenuePartsKwh $revenuePartKwh)
    {
        $this->revenuePartsKwh = $revenuePartKwh;
    }

    public function runRevenueKwh($valuesKwhData)
    {
        if($this->revenuePartsKwh->status == 'concept') {
            $this->revenuePartsKwh->conceptSimulatedValuesKwh()->delete();
            $this->revenuePartsKwh->newOrConceptDistributionPartsKwh()->delete();
            $this->revenuePartsKwh->newOrConceptDistributionValuesKwh()->delete();
            $revenuesKwhHelper = new RevenuesKwhHelper();
            $revenuesKwhHelper->createOrUpdateRevenueValuesKwh($valuesKwhData, $this->revenuePartsKwh);
            $revenuesKwhHelper->createOrUpdateRevenueValuesKwhSimulate($this->revenuePartsKwh);
            $revenuesKwhHelper->saveParticipantsOfDistributionParts($this->revenuePartsKwh);
            $this->calculateDeliveredKwh();
        }
        $this->countingsConceptConfirmedProcessed();

    }
    protected function calculateDeliveredKwh()
    {
        $revenueId = $this->revenuePartsKwh->revenue_id;
        $partDateBegin = Carbon::parse($this->revenuePartsKwh->date_begin)->format('Y-m-d');
        $partDateEnd = Carbon::parse($this->revenuePartsKwh->date_end)->format('Y-m-d');

        // Iterate over the period
        $period = CarbonPeriod::create(Carbon::parse($partDateBegin)->format('Y-m-d'), Carbon::parse($partDateEnd)->format('Y-m-d'));
        foreach ($period as $date) {

            $dateRegistration = $date->format('Y-m-d');

            $revenueValuesKwh = RevenueValuesKwh::where('revenue_id', $revenueId)->where('date_registration', $dateRegistration)->first();
            if ($revenueValuesKwh) {
                $conceptDistributionValuesKwh = $this->revenuePartsKwh->conceptDistributionValuesKwh->where('revenue_values_id', $revenueValuesKwh->id);
                $totalSumOfParticipationsConcept = $conceptDistributionValuesKwh->sum('participations_quantity');

                foreach ($this->revenuePartsKwh->distributionPartsKwh as $distributionPartsKwh) {

                    $distributionValuesKwhConfirmed = $distributionPartsKwh->distributionKwh->distributionValuesKwh->where('revenue_values_id', $revenueValuesKwh->id)->whereIn('status', ['confirmed']);
                    $totalDeliveredKwhConfirmed = $distributionValuesKwhConfirmed->sum('delivered_kwh');
                    $distributionValuesKwhProcessed = $distributionPartsKwh->distributionKwh->distributionValuesKwh->where('revenue_values_id', $revenueValuesKwh->id)->whereIn('status', ['processed']);
                    $totalDeliveredKwhProcessed = $distributionValuesKwhProcessed->sum('delivered_kwh');

                    $totalDeliveredValuesKwh = $revenueValuesKwh->delivered_kwh - $totalDeliveredKwhConfirmed - $totalDeliveredKwhProcessed;

                    $distributionValuesKwhConcept = $distributionPartsKwh->distributionKwh->distributionValuesKwh->where('revenue_values_id', $revenueValuesKwh->id)->whereNotIn('status', ['confirmed', 'processed']);
                    foreach ($distributionValuesKwhConcept as $distributionValueKwhConcept) {
                        //totaal deliverd * (participations_quantity / $totalSumOfParticipations)
                        if ($totalSumOfParticipationsConcept != 0) {
                            $delivered_kwh = round($totalDeliveredValuesKwh * ($distributionValueKwhConcept->participations_quantity / $totalSumOfParticipationsConcept), 6);
                        } else {
                            $delivered_kwh = 0;
                        }
                        $distributionValueKwhConcept->delivered_kwh = $delivered_kwh;
                        $distributionValueKwhConcept->save();
                    }
                }
            }
        }

        foreach ($this->revenuePartsKwh->distributionPartsKwh as $distributionPartsKwh) {
            $totalDeliveredKwh = $distributionPartsKwh->distributionKwh->distributionValuesKwh->where('parts_id', $distributionPartsKwh->parts_id)->sum('delivered_kwh');
            $distributionPartsKwh->delivered_kwh = $totalDeliveredKwh;
            $distributionPartsKwh->save();
        }
    }

    protected function countingsConceptConfirmedProcessed(): void
    {
        foreach ($this->revenuePartsKwh->revenuesKwh->distributionKwh as $distributionKwh) {
            $distributionKwh->delivered_total_concept = $distributionKwh->distributionValuesKwh->where('status', '==', 'concept')->sum('delivered_kwh');
            $distributionKwh->delivered_total_confirmed = $distributionKwh->distributionValuesKwh->where('status', '==', 'confirmed')->sum('delivered_kwh');
            $distributionKwh->delivered_total_processed = $distributionKwh->distributionValuesKwh->where('status', '==', 'processed')->sum('delivered_kwh');
            $distributionKwh->save();
        }

        $this->revenuePartsKwh->delivered_total_concept = $this->revenuePartsKwh->distributionPartsKwh->where('status', '==', 'concept')->sum('delivered_kwh');
        $this->revenuePartsKwh->delivered_total_confirmed = $this->revenuePartsKwh->distributionPartsKwh->where('status', '==', 'confirmed')->sum('delivered_kwh');
        $this->revenuePartsKwh->delivered_total_processed = $this->revenuePartsKwh->distributionPartsKwh->where('status', '==', 'processed')->sum('delivered_kwh');
        $this->revenuePartsKwh->save();

        $this->revenuePartsKwh->revenuesKwh->delivered_total_concept = $this->revenuePartsKwh->revenuesKwh->distributionPartsKwh->where('status', '==', 'concept')->sum('delivered_kwh');
        $this->revenuePartsKwh->revenuesKwh->delivered_total_confirmed = $this->revenuePartsKwh->revenuesKwh->distributionPartsKwh->where('status', '==', 'confirmed')->sum('delivered_kwh');
        $this->revenuePartsKwh->revenuesKwh->delivered_total_processed = $this->revenuePartsKwh->revenuesKwh->distributionPartsKwh->where('status', '==', 'processed')->sum('delivered_kwh');
        $this->revenuePartsKwh->revenuesKwh->save();
    }

}