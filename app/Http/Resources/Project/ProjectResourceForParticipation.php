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
                'administrationId' => $this->administration ? $this->administration->id : null,
                'administrationName' => $this->administration ? $this->administration->name : null,
                'dateEntry' => $this->date_entry,
                'lastYearFinancialOverviewDefinitive' => $this->last_year_financial_overview_definitive,
                'dateInterestBearingKwh' => $this->date_interest_bearing_kwh,
                'participationWorth' => $this->participation_worth,
                'currentBookWorth' => $this->currentBookWorth(),
                'isParticipationTransferable' => $this->is_participation_transferable,
                'transactionCostsCodeRef' => $this->transaction_costs_code_ref,
                'showQuestionAboutMembership' => $this->show_question_about_membership,
                'useTransactionCostsWithMembership' => $this->use_transaction_costs_with_membership,
            ];
    }
}
