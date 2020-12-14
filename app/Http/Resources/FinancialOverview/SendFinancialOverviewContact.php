<?php

namespace App\Http\Resources\FinancialOverview;

use App\Http\Resources\Email\FullEmail;
use App\Http\Resources\EnumWithIdAndName\FullEnumWithIdAndName;
use App\Http\Resources\GenericResource;
use App\Http\Resources\Order\FullOrder;
use App\Http\Resources\Task\FullTask;
use App\Http\Resources\User\FullUser;
use Illuminate\Http\Resources\Json\Resource;

class SendFinancialOverviewContact extends Resource
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
