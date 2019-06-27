<?php

namespace App\Eco\Project;

class ProjectRevenueDistributionCalculator
{
    protected $projectRevenueDistribution;
    protected $mutationStatusFinal;
    protected $projectTypeCodeRef;

    public function __construct(ProjectRevenueDistribution $projectRevenueDistribution)
    {
        $this->projectRevenueDistribution = $projectRevenueDistribution;
        $this->projectTypeCodeRef = (ProjectType::where('id', $this->projectRevenueDistribution->revenue->project->project_type_id)->first())->code_ref;
    }

    public function run()
    {
        // Revenue category REVENUE EURO
        if($this->projectRevenueDistribution->revenue->category_id === (ProjectRevenueCategory::where('code_ref', 'revenueEuro')->first())->id) {
            $this->projectRevenueDistribution->participations_amount = $this->calculateParticipationsCount();
            $this->projectRevenueDistribution->payout = $this->calculatePayout();
        }

        // Revenue category REVENUE KWH
        if($this->projectRevenueDistribution->revenue->category_id === (ProjectRevenueCategory::where('code_ref', 'revenueKwh')->first())->id) {
            $this->projectRevenueDistribution->delivered_total = $this->calculateDeliveredTotal();
            $this->projectRevenueDistribution->payout_kwh = $this->projectRevenueDistribution->revenue->payout_kwh;
        }

        return $this->projectRevenueDistribution;
    }

    protected function calculateDeliveredTotal()
    {
        $projectRevenue = $this->projectRevenueDistribution->revenue;
        $totalParticipations = $projectRevenue->project->participations_definitive;
        $participant = $this->projectRevenueDistribution->participation;

        if(!$totalParticipations) return 0;

        return round((($projectRevenue->kwh_end
                    - $projectRevenue->kwh_start)
                / $totalParticipations)
            * $participant->participations_definitive, 2);

    }

    protected function calculatePayout()
    {
        // Project type OBLIGATION, CAPITAL and PCR
        if ($this->projectRevenueDistribution->revenue->distribution_type_id == 'inPossessionOf') return $this->calculatePayoutInPossessionOf();

        // Project type OBLIGATION, CAPITAL, PCR and LOAN
        if ($this->projectRevenueDistribution->revenue->distribution_type_id == 'howLongInPossession' || $this->projectTypeCodeRef === 'loan') {
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

        $dateBegin = $this->projectRevenueDistribution->revenue->date_begin;
        $dateEnd = $this->projectRevenueDistribution->revenue->date_end;

        if (!$dateBegin || !$dateEnd) return 0;

        $mutations = $this->projectRevenueDistribution->participation->mutationsDefinitive;

        $payout = 0;

        foreach ($mutations as $mutation) {
            $dateEntry = $mutation->date_entry;

            // If date entry is before date begin then date entry is equal to date begin
            if($dateEntry < $dateBegin) $dateEntry = $dateBegin;

            $daysOfPeriod = $dateEnd->diffInDays($dateEntry);

            if($this->projectTypeCodeRef === 'obligation' || $this->projectTypeCodeRef === 'capital' || $this->projectTypeCodeRef === 'postalcode_link_capital') {
                $mutationValue = $currentBookWorth * $mutation->quantity;
            }

            if($this->projectTypeCodeRef === 'loan') {
                $mutationValue = $mutation->amount;
            }

            if($dateEntry > $dateEnd) $mutationValue = 0;

            $payout += ($mutationValue * $this->projectRevenueDistribution->revenue->pay_percentage) / 100 / 365 * $daysOfPeriod;

        }

        return number_format($payout, 2);
    }

    protected function calculatePayoutHowLongInPossessionWithFilledKeyAmount()
    {
        $currentBookWorth = $this->projectRevenueDistribution->revenue->project->currentBookWorth();

        $keyAmountFirstPercentage = $this->projectRevenueDistribution->revenue->key_amount_first_percentage;


        $dateBegin = $this->projectRevenueDistribution->revenue->date_begin;
        $dateEnd = $this->projectRevenueDistribution->revenue->date_end;

        if (!$dateBegin || !$dateEnd) return 0;

        $mutations = $this->projectRevenueDistribution->participation->mutationsDefinitive;

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

            $dateEntry = $mutation->date_entry;

            // If date entry is before date begin then date entry is equal to date begin
            if($dateEntry < $dateBegin) $dateEntry = $dateBegin;

            $daysOfPeriod = $dateEnd->diffInDays($dateEntry);

            if($this->projectTypeCodeRef === 'obligation' || $this->projectTypeCodeRef === 'capital' || $this->projectTypeCodeRef === 'postalcode_link_capital') {
                $mutationValue = $currentBookWorth * $mutation->quantity;
            }

            if($this->projectTypeCodeRef === 'loan') {
                $mutationValue = $mutation->amount;
            }

            if($dateEntry > $dateEnd) $mutationValue = 0;

            $currentMutationValues->total = $currentMutationValues->total + $mutationValue;
            $currentMutationValues->before_key_amount = $currentMutationValues->total  <= $keyAmountFirstPercentage ? $currentMutationValues->total : $keyAmountFirstPercentage;
            $currentMutationValues->above_key_amount = $currentMutationValues->total < $keyAmountFirstPercentage ? 0 : $currentMutationValues->total - $keyAmountFirstPercentage;
            $currentMutationValues->modification_before_key_amount = $currentMutationValues->before_key_amount - $beforeKeyAmountOriginal;
            $currentMutationValues->modification_above_key_amount = $currentMutationValues->above_key_amount - $aboveKeyAmountOriginal;


            $payoutTillKeyAmount = ($currentMutationValues->modification_before_key_amount * $this->projectRevenueDistribution->revenue->pay_percentage) / 100 / 365 * $daysOfPeriod;
            $payoutAboveKeyAmount = ($currentMutationValues->modification_above_key_amount * $this->projectRevenueDistribution->revenue->pay_percentage_valid_from_key_amount) / 100 / 365 * $daysOfPeriod;

            $payout += $payoutTillKeyAmount + $payoutAboveKeyAmount;
        }

        return number_format($payout, 2);
    }

    protected function calculateParticipationsCount()
    {
        $mutations = $this->projectRevenueDistribution->participation->mutationsDefinitive();

        if ($this->projectRevenueDistribution->revenue->distribution_type_id == 'inPossessionOf') {
            $dateReference = $this->projectRevenueDistribution->revenue->date_reference;

            $mutations->whereDate('date_entry', '<=', $dateReference);
        }

        $participationsCount = 0;

        if($this->projectTypeCodeRef === 'obligation' || $this->projectTypeCodeRef === 'capital' || $this->projectTypeCodeRef === 'postalcode_link_capital') {
            $measureType = 'quantity';
        }

        if($this->projectTypeCodeRef === 'loan') {
            $measureType = 'amount';
        }

        foreach ($mutations->get() as $mutation) {
           $participationsCount += $mutation[$measureType] ;
        }

        return $participationsCount;
    }


}