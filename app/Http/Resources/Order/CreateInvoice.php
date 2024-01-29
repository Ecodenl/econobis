<?php

namespace App\Http\Resources\Order;

use Illuminate\Http\Resources\Json\JsonResource;

class CreateInvoice extends JsonResource
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
                'number' => $this->number,
                'emailToAddress' => $this->emailToAddress ? $this->emailToAddress : 'Geen e-mail bekend',
                'contactName' => $this->contact->full_name,
                'totalInclVatInclReduction' => $this->getTotalInclVatInclReductionAttribute(),
            ];
    }
}
