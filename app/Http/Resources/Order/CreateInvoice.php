<?php

namespace App\Http\Resources\Order;

use App\Http\Resources\Email\FullEmail;
use App\Http\Resources\EnumWithIdAndName\FullEnumWithIdAndName;
use App\Http\Resources\GenericResource;
use App\Http\Resources\Order\FullOrder;
use App\Http\Resources\Task\FullTask;
use App\Http\Resources\User\FullUser;
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
