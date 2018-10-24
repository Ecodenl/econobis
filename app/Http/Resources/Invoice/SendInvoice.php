<?php

namespace App\Http\Resources\Invoice;

use App\Http\Resources\Email\FullEmail;
use App\Http\Resources\EnumWithIdAndName\FullEnumWithIdAndName;
use App\Http\Resources\GenericResource;
use App\Http\Resources\Order\FullOrder;
use App\Http\Resources\Task\FullTask;
use App\Http\Resources\User\FullUser;
use Illuminate\Http\Resources\Json\Resource;

class SendInvoice extends Resource
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
                'invoiceNumber' => $this->invoice_number,
                'number' => $this->number,
                'emailToAddress' => $this->emailToAddress ? $this->emailToAddress : 'Geen e-mail bekend',
                'orderId' => $this->order_id,
                'contactName' => $this->order->contact->full_name,
            ];
    }
}
