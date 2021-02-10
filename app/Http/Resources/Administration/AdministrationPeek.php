<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 26-10-2017
 * Time: 12:08
 */

namespace App\Http\Resources\Administration;


use Illuminate\Http\Resources\Json\Resource;

class AdministrationPeek extends Resource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'administrationCode' => $this->administration_code,
            'emailTemplateIdCollection' => $this->email_template_id_collection,
            'emailTemplateIdTransfer' => $this->email_template_id_transfer,
            'emailTemplateReminderId' => $this->email_template_reminder_id,
            'emailTemplateExhortationId' => $this->email_template_exhortation_id,
            'emailTemplateFinancialOverviewId' => $this->email_template_financial_overview_id,
            'lastYearFinancialOverviewDefinitive' => $this->last_year_financial_overview_definitive,
        ];
    }
}