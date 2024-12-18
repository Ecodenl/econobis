<?php

namespace App\Http\Resources\Contact;

use App\Http\Resources\Address\FullAddress;
use App\Http\Resources\AddressEnergySupplier\FullAddressEnergySupplier;
use App\Http\Resources\ContactNote\FullContactNote;
use App\Http\Resources\Document\FullDocument;
use App\Http\Resources\EmailAddress\FullEmailAddress;
use App\Http\Resources\EnumWithIdAndName\FullEnumWithIdAndName;
use App\Http\Resources\FinancialOverviewContact\FullFinancialOverviewContact;
use App\Http\Resources\Invoice\FullInvoice;
use App\Http\Resources\Occupation\FullOccupationContact;
use App\Http\Resources\Order\FullOrder;
use App\Http\Resources\Organisation\FullOrganisation;
use App\Http\Resources\ParticipantProject\FullParticipantProject;
use App\Http\Resources\Person\FullPerson;
use App\Http\Resources\PhoneNumber\FullPhoneNumber;
use App\Http\Resources\PortalUser\FullPortalUser;
use App\Http\Resources\Task\GridTask;
use App\Http\Resources\User\FullUser;
use Illuminate\Http\Resources\Json\JsonResource;

class FullContact extends JsonResource
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
            'fullNameFnf' => $this->full_name_fnf,
            'memberSince' => $this->member_since,
            'memberUntil' => $this->member_until,
            'didAgreeAvg' => $this->did_agree_avg,
            'dateDidAgreeAvg' => $this->date_did_agree_avg,
            'addresses' => FullAddress::collection($this->whenLoaded('addresses')),
            'addressesNotSoftDeleted' => FullAddress::collection($this->whenLoaded('addressesNotSoftDeleted')),
            'primaryAddress' => FullAddress::make($this->whenLoaded('primaryAddress')),
            'emailAddresses' => FullEmailAddress::collection($this->whenLoaded('emailAddresses')),
            'primaryEmailAddress' => FullEmailAddress::make($this->whenLoaded('primaryEmailAddress')),
            'phoneNumbers' => FullPhoneNumber::collection($this->whenLoaded('phoneNumbers')),
            'notes' => FullContactNote::collection($this->whenLoaded('contactNotes')),
            'createdAt' => $this->created_at,
            'createdWith' => $this->created_with,
            'updatedAt' => $this->updated_at,
            'updatedWith' => $this->updated_with,
            'iban' => $this->iban,
            'ibanAttn' => $this->iban_attn,
            'liable' => $this->liable,
            'liabilityAmount' => $this->liability_amount,
            'ownerId' => $this->owner_id,
            'owner' => FullUser::make($this->whenLoaded('owner')),
            'portalUser' => FullPortalUser::make($this->whenLoaded('portalUser')),
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
            'financialOverviewContactCount' => $this->financialOverviewContactsSend()->count(),
            'relatedFinancialOverviewContacts' => FullFinancialOverviewContact::collection($this->whenLoaded('financialOverviewContactsSend')),
            //todo WM: nog wijzigen (zie bijv. FullIntake
            'documentCount' => $this->documents()->count(),
            'relatedDocuments' => FullDocument::collection($this->whenLoaded('documents')),
            'opportunityCount' => $this->opportunities()->count(),
            'relatedOpportunities' => $this->opportunities()->with('measureCategory')->get(),
            'participationCount' => $this->participations()->count(),
            'relatedParticipations' => FullParticipantProject::collection($this->whenLoaded('participations')),
            'isCollectMandate' => $this->is_collect_mandate,
            'collectMandateCode' => $this->collect_mandate_code,
            'collectMandateSignatureDate' => $this->collect_mandate_signature_date,
            'collectMandateFirstRunDate' => $this->collect_mandate_first_run_date,
            'collectMandateCollectionSchema' => $this->collect_mandate_collection_schema,
            'inspectionPersonTypeId' =>  $this->inspection_person_type_id,
            'inspectionPersonType' =>  FullEnumWithIdAndName::make($this->getInspectionPersonType()),
            'hoomAccountId' => $this->hoom_account_id,
        ];
    }
}
