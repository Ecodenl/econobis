<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 01-12-2017
 * Time: 12:09
 */

namespace App\Http\Resources\FinancialOverviewContact;


use App\Http\Controllers\Api\FinancialOverview\FinancialOverviewContactController;
use Illuminate\Http\Resources\Json\JsonResource;

class GridFinancialOverviewContact extends JsonResource
{
    public function toArray($request)
    {
        $emailedTo = $this->emailed_to;
        if( ($this->status_id === 'concept' || $this->status_id === 'to-send' ) && !$this->emailed_to )
        {
            $financialOverviewContactController = new FinancialOverviewContactController();
            $emailedTo = $financialOverviewContactController->getContactInfoForFinancialOverview($this->contact)['email'];
        }

        return [
            'id' => $this->id,
            'contactFullName' => $this->contact->full_name,
            'statusId' => $this->status_id,
            'status' => $this->status,
            'dateSent' => $this->date_sent,
            'emailedTo' => !empty($emailedTo) ? $emailedTo : 'Geen e-mail bekend',
            'allowInterimFinancialOverview' => $this->allowInterimFinancialOverview,
        ];
    }
}