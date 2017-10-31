<?php

namespace App\Http\Resources\Contact;

use App\Http\Resources\Account\FullAccount;
use App\Http\Resources\Address\FullAddress;
use App\Http\Resources\ContactNote\FullContactNote;
use App\Http\Resources\EmailAddress\FullEmailAddress;
use App\Http\Resources\EnumWithIdAndName\FullEnumWithIdAndName;
use App\Http\Resources\Person\FullPerson;
use App\Http\Resources\PhoneNumber\FullPhoneNumber;
use App\Http\Resources\User\FullUser;
use Illuminate\Http\Resources\Json\Resource;

class FullContact extends Resource
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
            'status' => FullEnumWithIdAndName::make($this->getStatus()),
            'type' => FullEnumWithIdAndName::make($this->getType()),
            'person' => FullPerson::make($this->whenLoaded('person')),
            'account' => FullAccount::make($this->whenLoaded('account')),
            'fullName' => $this->full_name,
            'memberSince' => $this->member_since,
            'memberUntil' => $this->member_until,
            'newsletter' => $this->newsletter,
            'addresses' => FullAddress::collection($this->whenLoaded('addresses')),
            'emailAddresses' => FullEmailAddress::collection($this->whenLoaded('emailAddresses')),
            'phoneNumbers' => FullPhoneNumber::collection($this->whenLoaded('phoneNumbers')),
            'notes' => FullContactNote::collection($this->whenLoaded('notes')),
            'createdAt' => $this->created_at,
            'updatedAt' => $this->updated_at,
            'iban' => $this->iban,
            'liable' => $this->liable,
            'liabilityAmount' => $this->liability_amount,
            'owner' => FullUser::make($this->whenLoaded('owner')),
            'createdBy' => FullUser::make($this->whenLoaded('createdBy')),
            'updatedBy' => FullUser::make($this->whenLoaded('updatedBy')),
        ];
    }
}
