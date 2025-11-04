<?php

namespace App\Http\Resources\QuotationRequest;

use App\Http\Resources\Contact\FullContact;
use App\Http\Resources\Contact\FullInspectionPerson;
use App\Http\Resources\GenericResource;
use App\Http\Resources\Opportunity\FullOpportunity;
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
                'datePlannedAttempt1' => $this->date_planned_attempt1,
                'datePlannedAttempt2' => $this->date_planned_attempt2,
                'datePlannedAttempt3' => $this->date_planned_attempt3,
                'datePlanned' => $this->date_planned,
                'statusApprovedClient' => $this->not_approved_client ? 'Afgekeurd' : ($this->date_approved_client ? 'Goedgekeurd' : ''),
                'dateApprovedClient' => $this->date_approved_client,
                'notApprovedClient' => $this->not_approved_client,
                'statusApprovedProjectManager' => $this->not_approved_project_manager ? 'Afgekeurd' : ($this->date_approved_project_manager ? 'Goedgekeurd' : ''),
                'dateApprovedProjectManager' => $this->date_approved_project_manager,
                'notApprovedProjectManager' => $this->not_approved_project_manager,
                'statusApprovedExternal' => $this->not_approved_external ? 'Afgekeurd' : ($this->date_approved_external ? 'Goedgekeurd' : ''),
                'dateApprovedExternal' => $this->date_approved_external,
                'notApprovedExternal' => $this->not_approved_external,
                'dateUnderReview' => $this->date_under_review,
                'dateExecuted' => $this->date_executed,
                'dateUnderReviewDetermination' => $this->date_under_review_determination,
                'statusApprovedDetermination' => $this->not_approved_determination ? 'Afgekeurd' : ($this->date_approved_determination ? 'Goedgekeurd' : ''),
                'dateApprovedDetermination' => $this->date_approved_determination,
                'notApprovedDetermination' => $this->not_approved_determination,
                'quotationText' => $this->quotation_text,
                'quotationAmount' => $this->quotation_amount,
                'costAdjustment' => $this->cost_adjustment,
                'awardAmount' => $this->award_amount,
                'amountDetermination' => $this->amount_determination,
                'organisationOrCoachId' => $this->contact_id,
                'organisationOrCoach' => FullContact::make($this->whenLoaded('organisationOrCoach')),
                'organisationsOrCoachesToSelect' => FullInspectionPerson::collection($this->getOrganisastionsOrCoachsToSelect()),
                'projectManagerId' => $this->project_manager_id,
                'projectManager' => FullContact::make($this->whenLoaded('projectManager')),
                'projectManagersToSelect' => FullInspectionPerson::collection($this->getProjectManagersToSelect()),
                'externalPartyId' => $this->external_party_id,
                'externalParty' => FullContact::make($this->whenLoaded('externalParty')),
                'externalPartiesToSelect' => FullInspectionPerson::collection($this->getExternalPartiesToSelect()),
                'opportunity' => FullOpportunity::make($this->whenLoaded('opportunity')),
                'status' => GenericResource::make($this->whenLoaded('status')),
                'opportunityAction' => GenericResource::make($this->whenLoaded('opportunityAction')),
                'datePlannedToSendWfEmailStatus' => $this->date_planned_to_send_wf_email_status,
                'createdBy' => FullUser::make($this->whenLoaded('createdBy')),
                'updatedBy' => FullUser::make($this->whenLoaded('updatedBy')),
                'createdAt' => $this->created_at,
                'updatedAt' => $this->updated_at,
                'emailSentCount' => $this->relatedEmailsSent ? $this->relatedEmailsSent->count() : 0,
                'relatedEmailsSent' => $this->relatedEmailsSent,
                'documentCount' => $this->relatedDocuments ? $this->relatedDocuments->count() : 0,
                'relatedDocuments' => $this->relatedDocuments,
                'occupantId' => $this->opportunity->intake->contact_id,
                'occupant' => FullContact::make($this->opportunity->intake->contact),
                'relatedQuotationRequestsStatuses' => $this->relatedQuotationRequestsStatuses,
                'usesPlanning' => $this->uses_planning,
                'relatedCoachEmailsSent' => $this->relatedCoachEmailsSent,
                'relatedOccupantEmailsSent' => $this->relatedOccupantEmailsSent,
                'relatedCoachAndOccupantEmailsSent' => $this->relatedCoachAndOccupantEmailsSent,
                'coachOrOrganisationNote' => $this->coach_or_organisation_note,
                'projectmanagerNote' => $this->projectmanager_note,
                'externalpartyNote' => $this->externalparty_note,
                'clientNote' => $this->client_note,
                'relatedExternalpartyAndOccupantEmailsSent' => $this->relatedExternalpartyAndOccupantEmailsSent,
                'relatedExternalpartyEmailsSent' => $this->relatedExternalpartyEmailsSent,
            ];
    }
}
