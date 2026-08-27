<?php

namespace App\Http\Resources\FinancialOverviewContact;

use Illuminate\Http\Resources\Json\JsonResource;

class SendFinancialOverviewContact extends JsonResource
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
                'emailed_to' => $this->emailed_to ? $this->emailed_to : 'Geen e-mail bekend',
                'contactNumber' => $this->contact->number,
                'contactName' => $this->contact->full_name,
            ];
    }
}
