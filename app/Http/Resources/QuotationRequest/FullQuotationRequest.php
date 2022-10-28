<?php

namespace App\Http\Resources\QuotationRequest;

use App\Http\Resources\Contact\FullContact;
use App\Http\Resources\Document\FullDocument;
use App\Http\Resources\GenericResource;
use App\Http\Resources\Opportunity\FullOpportunity;
use App\Http\Resources\Organisation\FullOrganisation;
use App\Http\Resources\User\FullUser;
use Illuminate\Http\Resources\Json\JsonResource;

class FullQuotationRequest extends JsonResource
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
                'name' => 'Offerteverzoek ' . $this->id,
                'dateRecorded' => $this->date_recorded,
                'dateReleased' => $this->date_released,
                'quotationText' => $this->quotation_text,
                'contact_id' => $this->contact_id,
                'organisationOrCoach' => FullContact::make($this->whenLoaded('organisationOrCoach')),
                'opportunity' => FullOpportunity::make($this->whenLoaded('opportunity')),
                'status' => GenericResource::make($this->whenLoaded('status')),
                'datePlannedToSendWfEmailStatus' => $this->date_planned_to_send_wf_email_status,
                'createdBy' => FullUser::make($this->whenLoaded('createdBy')),
                'updatedBy' => FullUser::make($this->whenLoaded('updatedBy')),
                'createdAt' => $this->created_at,
                'updatedAt' => $this->updated_at,
                'emailSentCount' => $this->relatedEmailsSent ? $this->relatedEmailsSent->count() : 0,
                'relatedEmailsSent' => $this->relatedEmailsSent,
                'documentCount' => $this->relatedDocuments ? $this->relatedDocuments->count() : 0,
                'relatedDocuments' => $this->relatedDocuments,
                'contact' => FullContact::make($this->opportunity->intake->contact),
            ];
    }
}
