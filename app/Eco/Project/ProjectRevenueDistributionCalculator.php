<?php

namespace App\Eco\Project;


use App\Eco\ParticipantMutation\ParticipantMutationStatus;

class ProjectRevenueDistributionCalculator
{

    protected $projectRevenueDistribution;

    public function __construct(ProjectRevenueDistribution $projectRevenueDistribution)
    {
        $this->projectRevenueDistribution = $projectRevenueDistribution;
    }

    protected function inPossessionOf()
    {
        $amount = $this->inPossessionOfCount();
        $currentBookWorth = $this->projectRevenueDistribution->revenue->project->currentBookWorth();
        $participationValue = $currentBookWorth * $amount;

        if(!$currentBookWorth) return 0;

        $dateBegin = $this->projectRevenueDistribution->revenue->date_begin;
        $dateEnd = $this->projectRevenueDistribution->revenue->date_end;

        if(!$dateBegin || !$dateEnd) return 0;

        $daysOfPeriod =  $dateEnd->diffInDays($dateBegin);

        // If key amount first percentage is filled and is greater participationValue, then split calculation with the two percentages
        if($this->projectRevenueDistribution->revenue->key_amount_first_percentage && $participationValue > $this->projectRevenueDistribution->revenue->key_amount_first_percentage) {
            $payoutTillKeyAmount = ($this->projectRevenueDistribution->revenue->key_amount_first_percentage * $this->projectRevenueDistribution->revenue->pay_percentage) / 100 / 365 * $daysOfPeriod;
            $payoutAboveKeyAmount = (($participationValue - $this->projectRevenueDistribution->revenue->key_amount_first_percentage) * $this->projectRevenueDistribution->revenue->pay_percentage_valid_from_key_amount) / 100 / 365 * $daysOfPeriod;

            $payout = $payoutTillKeyAmount + $payoutAboveKeyAmount;
        } else {
            $payout = ($participationValue * $this->projectRevenueDistribution->revenue->pay_percentage) / 100 / 365 * $daysOfPeriod;
        }

        return number_format($payout, 2);
    }

    public function inPossessionOfCount()
    {
        $dateReference = $this->projectRevenueDistribution->revenue->date_reference;
        $mutationStatus = ParticipantMutationStatus::where('code_ref', 'final')->first();

        $mutations = $this->projectRevenueDistribution->participation->mutations()->where('status_id', $mutationStatus->id)->whereDate('date_entry', '<=', $dateReference)->get();

        $participationsCount = 0;

        foreach($mutations as $mutation) {
            $participationsCount += $mutation->quantity;
        }

        return $participationsCount;
    }

    public function run()
    {
        $this->projectRevenueDistribution->participations_amount = $this->inPossessionOfCount();
        $this->projectRevenueDistribution->payout = $this->inPossessionOf();

        return $this->projectRevenueDistribution;
    }
}