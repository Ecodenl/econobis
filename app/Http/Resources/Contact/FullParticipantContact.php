<?php

namespace App\Http\Resources\Contact;

use App\Http\Resources\Address\FullAddress;
use App\Http\Resources\ContactEnergySupplier\FullContactEnergySupplier;
use App\Http\Resources\ContactNote\FullContactNote;
use App\Http\Resources\Document\FullDocument;
use App\Http\Resources\EmailAddress\FullEmailAddress;
use App\Http\Resources\EnumWithIdAndName\FullEnumWithIdAndName;
use App\Http\Resources\Invoice\FullInvoice;
use App\Http\Resources\Occupation\FullOccupationContact;
use App\Http\Resources\Order\FullOrder;
use App\Http\Resources\Organisation\FullOrganisation;
use App\Http\Resources\ParticipantProject\FullParticipantProject;
use App\Http\Resources\Person\FullPerson;
use App\Http\Resources\PhoneNumber\FullPhoneNumber;
use App\Http\Resources\Task\GridTask;
use App\Http\Resources\User\FullUser;
use Illuminate\Http\Resources\Json\Resource;

class FullParticipantContact extends Resource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'number' => $this->number,
            'statusId' => $this->status_id,
            'status' => FullEnumWithIdAndName::make($this->getStatus()),
            'typeId' => $this->type_id,
            'type' => FullEnumWithIdAndName::make($this->getType()),
            'person' => FullPerson::make($this->whenLoaded('person')),
            'organisation' => FullOrganisation::make($this->whenLoaded('organisation')),
            'fullName' => $this->full_name,
            'memberSince' => $this->member_since,
            'memberUntil' => $this->member_until,
            'newsletter' => $this->newsletter,
            'didAgreeAvg' => $this->did_agree_avg,
            'addresses' => FullAddress::collection($this->whenLoaded('addresses')),
            'addressesNotSoftDeleted' => FullAddress::collection($this->whenLoaded('addressesNotSoftDeleted')),
            'primaryAddress' => FullAddress::make($this->whenLoaded('primaryAddress')),
            'emailAddresses' => FullEmailAddress::collection($this->whenLoaded('emailAddresses')),
            'primaryEmailAddress' => FullEmailAddress::make($this->whenLoaded('primaryEmailAddress')),
            'primaryContactEnergySupplier' => FullContactEnergySupplier::make($this->whenLoaded('primaryContactEnergySupplier')),
        ];
    }
}
