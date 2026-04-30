<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 26-10-2017
 * Time: 12:08
 */

namespace App\Http\Resources\Contact;


use App\Http\Resources\Address\AddressForContactPeek;
use Illuminate\Http\Resources\Json\JsonResource;

class ContactWithAddressPeek extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'fullName' => $this->full_name . ' (' . $this->number . ')',
            'primaryAddressId' => $this->primary_address_id,
            'addresses' => AddressForContactPeek::collection($this->whenLoaded('addressesWithoutOld')),
            'lastYearFinancialOverviewSent' => $this->last_year_financial_overview_sent,
        ];
    }
}