<?php

namespace App\Http\Resources\Order;

use App\Eco\ParticipantProject\ParticipantProject;
use App\Http\Resources\Administration\FullAdministration;
use App\Http\Resources\Contact\FullOrderContact;
use App\Http\Resources\Document\FullDocument;
use App\Http\Resources\Email\FullEmail;
use App\Http\Resources\EmailTemplate\FullEmailTemplate;
use App\Http\Resources\EnumWithIdAndName\FullEnumWithIdAndName;
use App\Http\Resources\Invoice\FullInvoice;
use App\Http\Resources\Project\FullProject;
use App\Http\Resources\Task\FullTask;
use App\Http\Resources\User\FullUser;
use Illuminate\Http\Resources\Json\JsonResource;

class FullOrder extends JsonResource
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

       $project = null;
       $participantProject = ParticipantProject::find($this->participation_id);
       if($participantProject)
       {
           $project = $participantProject->project;
       }

        return
            [
                'id' => $this->id,
                'number' => $this->number,
                'subject' => $this->subject,
                'project' => FullProject::make($project),

                'contactId' => $this->contact_id,
                'contact' => FullOrderContact::make($this->whenLoaded('contact')),

                'participationId' => $this->participation_id,

                'administrationId' => $this->administration_id,
                'administration' => FullAdministration::make($this->whenLoaded('administration')),

                'orderProducts' => FullOrderProduct::collection($this->whenLoaded('orderProducts')),

                'emailTemplateIdCollection' => $this->email_template_id_collection,
                'emailTemplateCollection' => FullEmailTemplate::make($this->whenLoaded('emailTemplateCollection')),

                'emailTemplateIdTransfer' => $this->email_template_id_transfer,
                'emailTemplateTransfer' => FullEmailTemplate::make($this->whenLoaded('emailTemplateTransfer')),

                'emailTemplateReminderId' => $this->email_template_reminder_id,
                'emailTemplateReminder' => FullEmailTemplate::make($this->whenLoaded('emailTemplateReminder')),

                'emailTemplateExhortationId' => $this->email_template_exhortation_id,
                'emailTemplateExhortation' => FullEmailTemplate::make($this->whenLoaded('emailTemplateExhortation')),

                'totalInclVatInclReduction' => $this->getTotalInclVatInclReductionAttribute(),
                'totalInclVatInclReductionPerYear' => $this->getTotalInclVatInclReductionPerYearAttribute(),
                'numberOfInvoiceReminders' => $this->number_of_invoice_reminders,
                'poNumber' => $this->po_number,
                'projectNumber' => $this->project_number,
                'IBAN' => $this->IBAN,
                'ibanAttn' => $this->iban_attn,
                'invoiceText' => $this->invoice_text,
                'dateNextInvoice' => $this->date_next_invoice,
                'dateRequested' => $this->date_requested,

                'collectionFrequencyId' => $this->collection_frequency_id,
                'collectionFrequency' => FullEnumWithIdAndName::make($this->getCollectionFrequency()),
                'paymentTypeId' => $this->payment_type_id,
                'paymentType' => FullEnumWithIdAndName::make($this->getPaymentType()),
                'statusId' => $this->status_id,
                'status' => FullEnumWithIdAndName::make($this->getStatus()),

                'invoiceCount' => $this->invoices()->count(),
                'relatedInvoices' => FullInvoice::collection($this->whenLoaded('invoices')),
                'invoicePaidCollectionCount' => $this->invoicesPaidCollection()->count(),
                'relatedInvoicesPaidCollection' => FullInvoice::collection($this->whenLoaded('invoicesPaidCollection')),
                'invoicePaidTransferCount' => $this->invoicesPaidTransfer()->count(),
                'relatedInvoicesPaidTransfer' => FullInvoice::collection($this->whenLoaded('invoicesPaidTransfer')),

                'taskCount' => $this->tasks()->count(),
                'relatedTasks' => FullTask::collection($this->whenLoaded('tasks')),

                //todo WM: nog wijzigen (zie bijv. FullIntake
                'documentCount' => $this->documents()->count(),
                'relatedDocuments' => FullDocument::collection($this->whenLoaded('documents')),

                'emailCount' => $this->emails()->count(),
                'relatedEmails' => FullEmail::collection($this->whenLoaded('emails')),

                'createdById' => $this->created_by_id,
                'createdBy' => FullUser::make($this->whenLoaded('createdBy')),
                
                'createdAt' => $this->created_at,
                'updatedAt' => $this->updated_at,

                'canCreateInvoice' => $this->can_create_invoice,
                'canEdit' => !$this->invoices()->where('invoices.status_id', 'to-send')->exists()
            ];
    }
}
