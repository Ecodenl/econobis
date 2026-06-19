<?php

namespace App\Eco\Project;

use App\Eco\ParticipantMutation\ParticipantMutationType;
use Carbon\Carbon;
use Illuminate\Support\Facades\Log;

class ProjectRevenueDistributionCalculator
{
    protected $projectRevenueDistribution;
    protected $projectTypeId;
    protected $projectLoanTypeCodeRef;
    protected $projectTypeCodeRef;

    public function __construct(ProjectRevenueDistribution $projectRevenueDistribution)
    {
        $this->projectRevenueDistribution = $projectRevenueDistribution;
        $this->projectTypeId = $this->projectRevenueDistribution->revenue->project->project_type_id;
        $this->projectLoanTypeCodeRef = $this->projectRevenueDistribution->revenue->project->projectLoanType ? $this->projectRevenueDistribution->revenue->project->projectLoanType->code_ref : '';
        $this->projectTypeCodeRef = (ProjectType::where('id', $this->projectRevenueDistribution->revenue->project->project_type_id)->first())->code_ref;
    }

    public function runRevenueEuro()
    {
        // Revenue category REVENUE EURO of REVENUE PARTICIPANT
        if($this->projectRevenueDistribution->revenue->category_id === (ProjectRevenueCategory::where('code_ref', 'revenueEuro')->first())->id
            || $this->projectRevenueDistribution->revenue->category_id === (ProjectRevenueCategory::where('code_ref', 'revenueParticipant')->first())->id) {
            if($this->projectTypeCodeRef === 'loan') {
                $this->projectRevenueDistribution->participations_loan_amount = $this->calculateParticipationsCount();
            }else{
                $this->projectRevenueDistribution->participations_amount = $this->calculateParticipationsCount();
            }
            $this->projectRevenueDistribution->payout = $this->calculatePayout();
        }

        return $this->projectRevenueDistribution;
    }
    public function runRedemptionEuro()
    {
        if($this->projectTypeCodeRef === 'loan') {
            $this->projectRevenueDistribution->participations_loan_amount = $this->calculateLoanAmountForRedemption();
            $projectRevenueDistributionPayout = $this->calculatePayout();
            if( $projectRevenueDistributionPayout > $this->projectRevenueDistribution->participation->amount_definitive) {
                $this->projectRevenueDistribution->payout = $this->projectRevenueDistribution->participation->amount_definitive;
            } else {
                $this->projectRevenueDistribution->payout = $projectRevenueDistributionPayout;
            }

        }elseif($this->projectTypeCodeRef === 'obligation'){
            $this->projectRevenueDistribution->participations_amount = $this->calculateParticipationsCount();
            $this->projectRevenueDistribution->payout = $this->calculatePayout();
        }

        return $this->projectRevenueDistribution;
    }

    public function runRevenueCapitalResult()
    {
        // Revenue category REVENUE EUR
        $this->projectRevenueDistribution->participations_amount = $this->calculateParticipationsCount();
        $this->projectRevenueDistribution->save();

        return $this->projectRevenueDistribution->payout = $this->calculateCapitalResult();
    }

    protected function calculateCapitalResult()
    {
        $projectRevenue = $this->projectRevenueDistribution->revenue;
        $totalResult = $projectRevenue->revenue;

        $totalParticipations = $this->projectRevenueDistribution->where('revenue_id', $projectRevenue->id)->sum('participations_amount');

        if(!$totalParticipations) return 0;

        // --- IN POSSESSION OF --- //
        if ($this->projectRevenueDistribution->revenue->distribution_type_id == 'inPossessionOf') {
            $participationsAmount = $this->projectRevenueDistribution->participations_amount;
            $payout = $totalResult / $totalParticipations * $participationsAmount;
        }
        // --- HOW LONG IN POSSESSION --- //
        if ($this->projectRevenueDistribution->revenue->distribution_type_id == 'howLongInPossession') {
            $dateBegin = Carbon::parse($this->projectRevenueDistribution->revenue->date_begin);
            $dateEnd = Carbon::parse($this->projectRevenueDistribution->revenue->date_end)->addDay();

            $totalParticipations = 0;
            $totalParticipationsDays = 0;
            foreach ($this->projectRevenueDistribution->where('revenue_id', $projectRevenue->id)->get() as $distribution){
                $totalParticipations += $distribution->participations_amount;

                $mutations = $distribution->participation->mutationsDefinitive;
                foreach ($mutations as $mutation) {
                    $dateEntry = $mutation->date_entry;

                    if($dateEntry <= $dateEnd) {
                        // If date entry is before date begin then date entry is equal to date begin
                        if ($dateEntry < $dateBegin) $dateEntry = $dateBegin;

                        $daysOfPeriod = $dateEnd->diffInDays($dateEntry, true);
                        $totalParticipationsDays = $totalParticipationsDays + ($daysOfPeriod * $mutation->quantity);
                    }
                }
            }

            $distributionParticipationsDays = 0;
            $mutations = $this->projectRevenueDistribution->participation->mutationsDefinitive;
            foreach ($mutations as $mutation) {
                $dateEntry = $mutation->date_entry;

                if($dateEntry <= $dateEnd) {
                    // If date entry is before date begin then date entry is equal to date begin
                    if ($dateEntry < $dateBegin) $dateEntry = $dateBegin;

                    $daysOfPeriod = $dateEnd->diffInDays($dateEntry, true);
                    $distributionParticipationsDays = $distributionParticipationsDays + ($daysOfPeriod * $mutation->quantity);
                }
            }
            $distributionFactor = $distributionParticipationsDays / $totalParticipationsDays;
            $payout = $totalResult * $distributionFactor;
        }

        // Return total delivered kwh for per distribution
        return number_format($payout, 2, '.', '');
    }

    protected function calculatePayout()
    {
        // --- Redemption (Aflossing) dan altijd In bezit op --- //
        if($this->projectRevenueDistribution->revenue->category_id === (ProjectRevenueCategory::where('code_ref', 'redemptionEuro')->first())->id) {
            // Project type OBLIGATION of LOAN
            if ($this->projectTypeCodeRef === 'obligation' || $this->projectTypeCodeRef === 'loan')
            {
                return $this->calculatePayoutInPossessionOf();
            }
        }

        // --- IN POSSESSION OF --- //
        if ($this->projectRevenueDistribution->revenue->distribution_type_id == 'inPossessionOf') {
            // Project type OBLIGATION
            if ($this->projectTypeCodeRef === 'obligation' )
            {
                return $this->calculatePayoutInPossessionOf();
            }
        }

        // --- HOW LONG IN POSSESSION --- //
        // Project type OBLIGATION, CAPITAL, PCR and LOAN
        if ($this->projectRevenueDistribution->revenue->distribution_type_id == 'howLongInPossession' || $this->projectTypeCodeRef === 'loan') {
            if($this->projectRevenueDistribution->revenue->key_amount_first_percentage) {
                return $this->calculatePayoutHowLongInPossessionWithFilledKeyAmount();
            }

            return $this->calculatePayoutHowLongInPossession();
        }
        return 0;
    }

    protected function calculatePayoutInPossessionOf()
    {
        if($this->projectTypeCodeRef === 'loan') {
            $amount = $this->projectRevenueDistribution->participations_loan_amount;
        }else{
            $amount = $this->projectRevenueDistribution->participations_amount;
        }
        if($this->projectRevenueDistribution->revenue->category_id === (ProjectRevenueCategory::where('code_ref', 'redemptionEuro')->first())->id) {
            if($this->projectTypeCodeRef === 'loan') {
                $participationValue = $amount;
            }else{
                $participation_worth = $this->projectRevenueDistribution->revenue->project->participation_worth;
                $participationValue = $participation_worth;
            }
        }else{
            $currentBookWorth = $this->projectRevenueDistribution->revenue->project->currentBookWorth();
            if($this->projectTypeCodeRef === 'loan') {
                $participationValue = $amount;
            }else{
                $participationValue = $currentBookWorth;
            }
        }

        if ($this->projectRevenueDistribution->revenue->pay_amount) {
            $payout = $this->projectRevenueDistribution->revenue->pay_amount;
            if($payout > $participationValue ) {
                $payout = $participationValue;
            }
        }elseif($this->projectRevenueDistribution->revenue->category_id === (ProjectRevenueCategory::where('code_ref', 'redemptionEuro')->first())->id) {
                $payout = ($participationValue * $this->projectRevenueDistribution->revenue->pay_percentage) / 100;
        }else{
            $dateBegin = Carbon::parse($this->projectRevenueDistribution->revenue->date_begin);
            $dateEnd = Carbon::parse($this->projectRevenueDistribution->revenue->date_end)->addDay();
            $daysOfYear = $this->daysOfYear($dateBegin, $dateEnd);

            if (!$dateBegin || !$dateEnd){
                $payout = 0;
            }else{
                $daysOfPeriod = $dateEnd->diffInDays($dateBegin, true);
                // If key amount first percentage is filled and is greater participationValue, then split calculation with the two percentages
                if ($this->projectRevenueDistribution->revenue->key_amount_first_percentage && $participationValue > $this->projectRevenueDistribution->revenue->key_amount_first_percentage) {
                    $payoutTillKeyAmount = ($this->projectRevenueDistribution->revenue->key_amount_first_percentage * $this->projectRevenueDistribution->revenue->pay_percentage) / 100 / ($dateBegin->isLeapYear() ? 366 : 365) * $daysOfPeriod;
                    $payoutAboveKeyAmount = (($participationValue - $this->projectRevenueDistribution->revenue->key_amount_first_percentage) * $this->projectRevenueDistribution->revenue->pay_percentage_valid_from_key_amount) / 100 / ($dateBegin->isLeapYear() ? 366 : 365) * $daysOfPeriod;

                    $payout = $payoutTillKeyAmount + $payoutAboveKeyAmount;
                } else {
                    $payout = ($participationValue * $this->projectRevenueDistribution->revenue->pay_percentage) / 100 / $daysOfYear * $daysOfPeriod;
                }
            }
        }

        if($this->projectTypeCodeRef !== 'loan') {
            $payout = floatval( number_format($payout, 10, '.', '') ) * $amount;
        }

        return number_format($payout, 2, '.', '');
    }

    protected function calculatePayoutHowLongInPossession()
    {
        $currentBookWorth = $this->projectRevenueDistribution->revenue->project->currentBookWorth();

        $dateBegin = Carbon::parse($this->projectRevenueDistribution->revenue->date_begin);
        $dateEnd = Carbon::parse($this->projectRevenueDistribution->revenue->date_end)->addDay();
        $daysOfYear = $this->daysOfYear($dateBegin, $dateEnd);

        if (!$dateBegin || !$dateEnd) return 0;

        $mutations = $this->projectRevenueDistribution->participation->mutationsDefinitive;

        $payout = 0;

        foreach ($mutations as $mutation) {
            $dateEntry = $mutation->date_entry;

            // If date entry is before date begin then date entry is equal to date begin
            if($dateEntry < $dateBegin) $dateEntry = $dateBegin;

            $daysOfPeriod = $dateEnd->diffInDays($dateEntry, true);

            if($this->projectTypeCodeRef === 'loan') {
                $mutationValue = $mutation->amount;
            }else{
                $mutationValue = $currentBookWorth;
            }

            if($dateEntry > $dateEnd){
                $mutationValue = 0;
            }

            if($this->projectTypeCodeRef == 'loan') {
                $payout += ($mutationValue * $this->projectRevenueDistribution->revenue->pay_percentage) / 100
                    / $daysOfYear * $daysOfPeriod;
            }else {

                $payout += ($mutationValue * $this->projectRevenueDistribution->revenue->pay_percentage) / 100
                    / $daysOfYear * $daysOfPeriod * $mutation->quantity;
            }

        }

        return number_format($payout, 2, '.', '');
    }

    protected function calculatePayoutHowLongInPossessionWithFilledKeyAmount()
    {
        $currentBookWorth = $this->projectRevenueDistribution->revenue->project->currentBookWorth();

        $keyAmountFirstPercentage = $this->projectRevenueDistribution->revenue->key_amount_first_percentage;

        $dateBegin = Carbon::parse($this->projectRevenueDistribution->revenue->date_begin);
        $dateEnd = Carbon::parse($this->projectRevenueDistribution->revenue->date_end)->addDay();
        $daysOfYear = $this->daysOfYear($dateBegin, $dateEnd);

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

            $daysOfPeriod = $dateEnd->diffInDays($dateEntry, true);

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


            $payoutTillKeyAmount = ($currentMutationValues->modification_before_key_amount * $this->projectRevenueDistribution->revenue->pay_percentage) / 100 / $daysOfYear * $daysOfPeriod;
            $payoutAboveKeyAmount = ($currentMutationValues->modification_above_key_amount * $this->projectRevenueDistribution->revenue->pay_percentage_valid_from_key_amount) / 100 / $daysOfYear * $daysOfPeriod;

            $payout += $payoutTillKeyAmount + $payoutAboveKeyAmount;
        }

        return number_format($payout, 2, '.', '');
    }
    protected function calculateLoanAmountForRedemption()
    {
        if($this->projectLoanTypeCodeRef && $this->projectLoanTypeCodeRef === 'annuitair'){
            // Annuïtair
            $mutationTypes = ParticipantMutationType::whereIn('code_ref', ['first_deposit', 'deposit', 'withDrawal', 'redemption'])->where('project_type_id', $this->projectTypeId)->pluck('id')->toArray();
            $mutations = $this->projectRevenueDistribution->participation->mutationsDefinitive()->whereIn('type_id', $mutationTypes)->whereDate('date_entry', '<=', $this->projectRevenueDistribution->revenue->date_reference);
        } else {
            // Lineair
            $mutationTypes = ParticipantMutationType::whereIn('code_ref', ['first_deposit', 'deposit', 'withDrawal'])->where('project_type_id', $this->projectTypeId)->pluck('id')->toArray();
            $mutations = $this->projectRevenueDistribution->participation->mutationsDefinitive()->whereIn('type_id', $mutationTypes);
        }

        $loanCount = 0;
        $measureType = 'amount';
        foreach ($mutations->get() as $mutation) {
            $loanCount += $mutation[$measureType];
        }

        return $loanCount;
    }


    protected function calculateParticipationsCount()
    {
        $mutations = $this->projectRevenueDistribution->participation->mutationsDefinitive();

        if ($this->projectRevenueDistribution->revenue->distribution_type_id == 'inPossessionOf') {
            $dateReference = $this->projectRevenueDistribution->revenue->date_reference;
            $mutations->whereDate('date_entry', '<=', $dateReference);
        } else {
            $dateEnd = Carbon::parse($this->projectRevenueDistribution->revenue->date_end)->addDay();

            $mutations->whereDate('date_entry', '<=', $dateEnd);
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

    /**
     * @param string $dateBegin
     * @param string $dateEnd
     */
    protected function daysOfYear($dateBegin, $dateEnd)
    {
        $dateBeginIsLeapYear = $dateBegin->isLeapYear();
        $dateEndIsLeapYear = $dateEnd->isLeapYear();

//  Determine if 29 feb (leapyear) is in period
//  jaar startdatum = jaar einddatum?
//      =>	Ja	jaar startdatum leapyear?
//      	=>	Ja	29-2-jaar startdatum > startdatum en < eindatum
//          	=>	Ja	leapperiode
//				=>	Nee	geen leapperiode
//			=>	nee	geen leapperiode
//
//    	=>	Nee	jaar startdatum leapyear?
//        	=>	Ja	29-2-jaar startdatum > startdatum en < eindatum
//          	=>	Ja	leapperiode
//				=>	Nee	geen leapperiode
//			=>	Nee	jaar einddatum leapyear?
//          	=>	Ja	29-2-jaar einddatum > startdatum en < eindatum
//                  =>	Ja	leapperiode
//					=>	Nee	geen leapperiode
//				=>	nee 	geen leapperiode

        $hasPeriod29February = false;
        if ($dateBegin->year == $dateEnd->year) {
            // Period is not cross-annual period
            if ($dateBeginIsLeapYear) {
                $date29February = Carbon::createFromDate($dateBegin->year, 2, 29);
                if ($date29February->between($dateBegin, $dateEnd)) {
                    $hasPeriod29February = true;
                }
            }
        } else {
            // Period is cross-annual period
            if ($dateBeginIsLeapYear) {
                $date29February = Carbon::createFromDate($dateBegin->year, 2, 29);
                if ($date29February->between($dateBegin, $dateEnd)) {
                    $hasPeriod29February = true;
                }
            } else {
                if ($dateEndIsLeapYear) {
                    $date29February = Carbon::createFromDate($dateEnd->year, 2, 29);
                    if ($date29February->between($dateBegin, $dateEnd)) {
                        $hasPeriod29February = true;
                    }
                }
            }
        }
        return $hasPeriod29February ? 366 : 365;
    }

}