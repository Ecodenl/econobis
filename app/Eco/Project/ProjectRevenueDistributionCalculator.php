<?php

namespace App\Eco\Project;


use App\Eco\ParticipantMutation\ParticipantMutationStatus;

class ProjectRevenueDistributionCalculator
{
    protected $projectRevenueDistribution;
    protected $mutationStatusFinal;

    public function __construct(ProjectRevenueDistribution $projectRevenueDistribution)
    {
        $this->projectRevenueDistribution = $projectRevenueDistribution;
        $this->mutationStatusFinal = ParticipantMutationStatus::where('code_ref', 'final')->first();
    }

    protected function calculatePayout()
    {
        if ($this->projectRevenueDistribution->revenue->distribution_type_id == 'inPossessionOf') return $this->calculatePayoutInPossessionOf();

        if ($this->projectRevenueDistribution->revenue->distribution_type_id == 'howLongInPossession') {
            if($this->projectRevenueDistribution->revenue->key_amount_first_percentage) {
                return $this->calculatePayoutHowLongInPossessionWithFilledKeyAmount();
            }

            return $this->calculatePayoutHowLongInPossession();
        }
    }

    protected function calculatePayoutInPossessionOf()
    {
        $amount = $this->projectRevenueDistribution->participations_amount;
        $currentBookWorth = $this->projectRevenueDistribution->revenue->project->currentBookWorth();
        $participationValue = $currentBookWorth * $amount;

        if (!$currentBookWorth) return 0;

        $dateBegin = $this->projectRevenueDistribution->revenue->date_begin;
        $dateEnd = $this->projectRevenueDistribution->revenue->date_end;

        if (!$dateBegin || !$dateEnd) return 0;

        $daysOfPeriod = $dateEnd->diffInDays($dateBegin);

        // If key amount first percentage is filled and is greater participationValue, then split calculation with the two percentages
        if ($this->projectRevenueDistribution->revenue->key_amount_first_percentage && $participationValue > $this->projectRevenueDistribution->revenue->key_amount_first_percentage) {
            $payoutTillKeyAmount = ($this->projectRevenueDistribution->revenue->key_amount_first_percentage * $this->projectRevenueDistribution->revenue->pay_percentage) / 100 / 365 * $daysOfPeriod;
            $payoutAboveKeyAmount = (($participationValue - $this->projectRevenueDistribution->revenue->key_amount_first_percentage) * $this->projectRevenueDistribution->revenue->pay_percentage_valid_from_key_amount) / 100 / 365 * $daysOfPeriod;

            $payout = $payoutTillKeyAmount + $payoutAboveKeyAmount;
        } else {
            $payout = ($participationValue * $this->projectRevenueDistribution->revenue->pay_percentage) / 100 / 365 * $daysOfPeriod;
        }

        return number_format($payout, 2);
    }

    protected function calculatePayoutHowLongInPossession()
    {
        $currentBookWorth = $this->projectRevenueDistribution->revenue->project->currentBookWorth();

        if (!$currentBookWorth) return 0;

        $dateBegin = $this->projectRevenueDistribution->revenue->date_begin;
        $dateEnd = $this->projectRevenueDistribution->revenue->date_end;

        if (!$dateBegin || !$dateEnd) return 0;

        $mutations = $this->projectRevenueDistribution->participation->mutations()->where('status_id', $this->mutationStatusFinal->id)->get();

        $payout = 0;

        foreach ($mutations as $mutation) {
            $dateEntry = $mutation->date_entry;

            // If date entry is before date begin then date entry is equal to date begin
            if($dateEntry < $dateBegin) $dateEntry = $dateBegin;

            $daysOfPeriod = $dateEnd->diffInDays($dateEntry);

            $mutationValue = $currentBookWorth * $mutation->quantity;

            $payout += ($mutationValue * $this->projectRevenueDistribution->revenue->pay_percentage) / 100 / 365 * $daysOfPeriod;
        }

        return number_format($payout, 2);
    }

    protected function calculatePayoutHowLongInPossessionWithFilledKeyAmount()
    {
        $currentBookWorth = $this->projectRevenueDistribution->revenue->project->currentBookWorth();
        $keyAmountFirstPercentage = $this->projectRevenueDistribution->revenue->key_amount_first_percentage;

        if (!$currentBookWorth) return 0;

        $dateBegin = $this->projectRevenueDistribution->revenue->date_begin;
        $dateEnd = $this->projectRevenueDistribution->revenue->date_end;

        if (!$dateBegin || !$dateEnd) return 0;

        $mutations = $this->projectRevenueDistribution->participation->mutations()->where('status_id', $this->mutationStatusFinal->id)->get();

        $payout = 0;

        $currentMutationValues = new \stdClass();
        $currentMutationValues->total = 0;
        $currentMutationValues->before_key_amount = 0;
        $currentMutationValues->above_key_amount = 0;
        $currentMutationValues->modification_before_key_amount = 0;
        $currentMutationValues->modification_above_key_amount = 0;

        foreach ($mutations as $mutation) {
            $beforeKeyAmountOriginal = $currentMutationValues->before_key_amount;
            $aboveKeyAmountOriginal = $currentMutationValues->above_key_amount;

            $mutationValue = $currentBookWorth * $mutation->quantity;

            $currentMutationValues->total = $currentMutationValues->total + $mutationValue;
            $currentMutationValues->before_key_amount = $currentMutationValues->total  <= $keyAmountFirstPercentage ? $currentMutationValues->total : $keyAmountFirstPercentage;
            $currentMutationValues->above_key_amount = $currentMutationValues->total < $keyAmountFirstPercentage ? 0 : $currentMutationValues->total - $keyAmountFirstPercentage;
            $currentMutationValues->modification_before_key_amount = $currentMutationValues->before_key_amount - $beforeKeyAmountOriginal;
            $currentMutationValues->modification_above_key_amount = $currentMutationValues->above_key_amount - $aboveKeyAmountOriginal;

            $dateEntry = $mutation->date_entry;

            // If date entry is before date begin then date entry is equal to date begin
            if($dateEntry < $dateBegin) $dateEntry = $dateBegin;

            $daysOfPeriod = $dateEnd->diffInDays($dateEntry);

            $payoutTillKeyAmount = ($currentMutationValues->modification_before_key_amount * $this->projectRevenueDistribution->revenue->pay_percentage) / 100 / 365 * $daysOfPeriod;
            $payoutAboveKeyAmount = ($currentMutationValues->modification_above_key_amount * $this->projectRevenueDistribution->revenue->pay_percentage_valid_from_key_amount) / 100 / 365 * $daysOfPeriod;

            $payout += $payoutTillKeyAmount + $payoutAboveKeyAmount;
        }

        return number_format($payout, 2);
    }

    protected function calculateParticipationsQuantity()
    {
        $mutations = $this->projectRevenueDistribution->participation->mutations()->where('status_id', $this->mutationStatusFinal->id);

        if ($this->projectRevenueDistribution->revenue->distribution_type_id == 'inPossessionOf') {
            $dateReference = $this->projectRevenueDistribution->revenue->date_reference;

            $mutations->whereDate('date_entry', '<=', $dateReference);
        }

        $participationsCount = 0;

        foreach ($mutations->get() as $mutation) {
            $participationsCount += $mutation->quantity;
        }

        return $participationsCount;
    }

    public function run()
    {
        $this->projectRevenueDistribution->participations_amount = $this->calculateParticipationsQuantity();
        $this->projectRevenueDistribution->payout = $this->calculatePayout();

        return $this->projectRevenueDistribution;
    }
}