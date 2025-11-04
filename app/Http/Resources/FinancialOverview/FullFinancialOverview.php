<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 04-01-2018
 * Time: 11:49
 */

namespace App\Http\Resources\FinancialOverview;

use App\Http\Resources\GenericResource;
use Illuminate\Http\Resources\Json\JsonResource;

class FullFinancialOverview extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'description' => $this->description,
            'administrationId' => $this->administration_id,
            'administration' => GenericResource::make($this->whenLoaded('administration')),
            'documentTemplateFinancialOverviewId' => $this->document_template_financial_overview_id,
            'documentTemplateFinancialOverview' => GenericResource::make($this->whenLoaded('document_templates')),
            'year' => $this->year,
            'definitive' => $this->definitive,
            'statusId' => $this->status_id,
            'date' => $this->date_processed,
            'hasInterimFinancialOverviewContacts' => $this->has_interim_financial_overview_contacts,
        ];
    }
}