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
use App\Http\Resources\ParticipantProductionProject\FullParticipantProductionProject;
use App\Http\Resources\Person\FullPerson;
use App\Http\Resources\PhoneNumber\FullPhoneNumber;
use App\Http\Resources\Task\GridTask;
use App\Http\Resources\User\FullUser;
use Illuminate\Http\Resources\Json\Resource;

class FullContactWithGroups extends Resource
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
            'phoneNumbers' => FullPhoneNumber::collection($this->whenLoaded('phoneNumbers')),
            'notes' => FullContactNote::collection($this->whenLoaded('contactNotes')),
            'createdAt' => $this->created_at,
            'updatedAt' => $this->updated_at,
            'iban' => $this->iban,
            'ibanAttn' => $this->iban_attn,
            'liable' => $this->liable,
            'liabilityAmount' => $this->liability_amount,
            'ownerId' => $this->owner_id,
            'owner' => FullUser::make($this->whenLoaded('owner')),
            'contactEnergySuppliers' => FullContactEnergySupplier::collection($this->whenLoaded('contactEnergySuppliers')),
            'primaryContactEnergySupplier' => FullContactEnergySupplier::make($this->whenLoaded('primaryContactEnergySupplier')),
            'primaryOccupations' => FullOccupationContact::collection($this->whenLoaded('primaryOccupations')),
            'contactPerson' => FullOccupationContact::make($this->whenLoaded('contactPerson')),
            'occupations' => FullOccupationContact::collection($this->whenLoaded('occupations')),
            'createdById' => $this->created_by_id,
            'createdBy' => FullUser::make($this->whenLoaded('createdBy')),
            'updatedById' => $this->updated_by_id,
            'updatedBy' => FullUser::make($this->whenLoaded('updatedBy')),
            'intakeCount' => $this->intakes()->count(),
            'orderCount' => $this->orders()->count(),
            'relatedOrders' => FullOrder::collection($this->whenLoaded('orders')),
            'invoiceCount' => $this->invoices()->count(),
            'relatedInvoices' => FullInvoice::collection($this->whenLoaded('invoices')),
            'housingFileCount' => $this->housingFiles()->count(),
            'groupCount' => $this->groups()->count(),
            'taskCount' => $this->tasks()->count(),
            'relatedTasks' => GridTask::collection($this->whenLoaded('tasks')),
            'noteCount' => $this->notes()->count(),
            'relatedNotes' => GridTask::collection($this->whenLoaded('notes')),
            'emailInboxCount' => $this->relatedEmailsInbox ? $this->relatedEmailsInbox->count() : 0,
            'relatedEmailsInbox' => $this->relatedEmailsInbox,
            'emailSentCount' => $this->relatedEmailsSent ? $this->relatedEmailsSent->count() : 0,
            'relatedEmailsSent' => $this->relatedEmailsSent,
            'documentCount' => $this->documents()->count(),
            'relatedDocuments' => FullDocument::collection($this->whenLoaded('documents')),
            'opportunityCount' => $this->opportunities()->count(),
            'relatedOpportunities' => $this->opportunities()->with('measureCategory')->get(),
            'participationCount' => $this->participations()->count(),
            'relatedParticipations' => FullParticipantProductionProject::collection($this->whenLoaded('participations')),
            'visibleGroups' => $this->getVisibleGroups(),
        ];
    }
}
