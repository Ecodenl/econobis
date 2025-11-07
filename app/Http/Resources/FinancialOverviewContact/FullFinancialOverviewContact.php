<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 04-01-2018
 * Time: 14:20
 */

namespace App\Http\Resources\FinancialOverviewContact;


use App\Http\Resources\Contact\FullContact;
use App\Http\Resources\FinancialOverview\FullFinancialOverview;
use Illuminate\Http\Resources\Json\JsonResource;

class FullFinancialOverviewContact extends JsonResource
{
    public function toArray($request)
    {

        return [
            'id' => $this->id,
            'financialOverviewId' => $this->financial_overview_id,
            'contactId' => $this->contact_id,
            'statusId' => $this->status_id,
            'status' => $this->status,
            'name' => $this->name,
            'filename' => $this->filename,
            'dateSent' => $this->date_sent,
            'emailedTo' => $this->emailed_to,
            'createdAt' => $this->created_at,
            'updatedAt' => $this->updated_at,
            'allowInterimFinancialOverview' => $this->allowInterimFinancialOverview,
            'contact' => FullContact::make($this->whenLoaded('contact')),
            'financialOverview' => FullFinancialOverview::make($this->whenLoaded('financialOverview')),
        ];
    }
}