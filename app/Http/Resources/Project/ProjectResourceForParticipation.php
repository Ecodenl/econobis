<?php

namespace App\Http\Resources\Project;

use Illuminate\Http\Resources\Json\JsonResource;

class ProjectResourceForParticipation extends JsonResource
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
                'name' => $this->name,
                'typeCodeRef' => $this->projectType->code_ref,
                'loanTypeCodeRef' => $this->projectLoanType ? $this->projectLoanType->code_ref : null,
                'administrationId' => $this->administration ? $this->administration->id : null,
                'administrationName' => $this->administration ? $this->administration->name : null,
                'dateEntry' => $this->date_entry,
                'lastYearFinancialOverviewDefinitive' => $this->last_year_financial_overview_definitive,
                'dateInterestBearing' => $this->date_interest_bearing,
                'dateInterestBearingKwh' => $this->date_interest_bearing_kwh,
                'participationWorth' => $this->participation_worth,
                'currentBookWorth' => $this->currentBookWorth(),
                'isParticipationTransferable' => $this->is_participation_transferable,
                'transactionCostsCodeRef' => $this->transaction_costs_code_ref,
                'transactionCostsAmountMin' => $this->transaction_costs_amount_min,
                'transactionCostsAmountMax' => $this->transaction_costs_amount_max,
                'transactionCostsAmount' => $this->transaction_costs_amount,
                'transactionCostsPercentage' => $this->transaction_costs_percentage,
                'transactionCostsAmount2' => $this->transaction_costs_amount_2,
                'transactionCostsPercentage2' => $this->transaction_costs_percentage_2,
                'transactionCostsAmount3' => $this->transaction_costs_amount_3,
                'transactionCostsPercentage3' => $this->transaction_costs_percentage_3,
                'showQuestionAboutMembership' => $this->show_question_about_membership,
                'useTransactionCostsWithMembership' => $this->use_transaction_costs_with_membership,
            ];
    }
}
