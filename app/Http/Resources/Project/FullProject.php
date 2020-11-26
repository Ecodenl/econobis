<?php

namespace App\Http\Resources\Project;

use App\Http\Resources\Administration\FullAdministration;
use App\Http\Resources\ContactGroup\FullContactGroup;
use App\Http\Resources\Document\FullDocument;
use App\Http\Resources\DocumentTemplate\FullDocumentTemplate;
use App\Http\Resources\EmailTemplate\FullEmailTemplate;
use App\Http\Resources\GenericResource;
use App\Http\Resources\ParticipantProject\FullParticipantProject;
use App\Http\Resources\Task\GridTask;
use App\Http\Resources\User\FullUser;
use Illuminate\Http\Resources\Json\Resource;

class FullProject extends Resource
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
                'name' => $this->name,
                'code' => $this->code,
                'description' => $this->description,
                'ownedById' => $this->owned_by_id,
                'ownedBy' => FullUser::make($this->whenLoaded('ownedBy')),
                'projectStatusId' => $this->project_status_id,
                'projectStatus' => GenericResource::make($this->whenLoaded('projectStatus')),
                'dateStart' => $this->date_start,
                'dateEnd' => $this->date_end,
                'dateProduction' => $this->date_production,
                'dateStartRegistrations' => $this->date_start_registrations,
                'dateEndRegistrations' => $this->date_end_registrations,
                'dateEntry' => $this->date_entry,
                'dateInterestBearing' => $this->date_interest_bearing,
                'dateInterestBearingRedemption' => $this->date_interest_bearing_redemption,
                'dateInterestBearingKwh' => $this->date_interest_bearing_kwh,
                'kwhStartHighNextRevenue' => $this->kwh_start_high_next_revenue,
                'kwhStartLowNextRevenue' => $this->kwh_start_low_next_revenue,
                'projectTypeId' => $this->project_type_id,
                'projectType' => GenericResource::make($this->whenLoaded('projectType')),
                'postalCode' => $this->postal_code,
                'address' => $this->address,
                'city' => $this->city,
                'ean' => $this->ean,
                'eanManager' => $this->ean_manager,
                'warrantyOrigin' => $this->warranty_origin,
                'eanSupply' => $this->ean_supply,
                'participationWorth' => $this->participation_worth,
                'powerKwAvailable' => $this->power_kw_available,
                'maxParticipations' => $this->max_participations,
                'taxReferral' => $this->tax_referral,
                'totalParticipations' => $this->total_participations,
                'minParticipations' => $this->min_participations,
                'isMembershipRequired' => $this->is_membership_required,
                'isParticipationTransferable' => $this->is_participation_transferable,
                'createdAt' => $this->created_at,
                'createdById' => $this->created_by_id,
                'createdBy' => FullUser::make($this->whenLoaded('createdBy')),
                'updatedById' => $this->updated_by_id,
                'updatedBy' => FullUser::make($this->whenLoaded('updatedBy')),
                'updatedAt' => $this->updated_at,
                'valueCourses' => FullProjectValueCourse::collection($this->whenLoaded('projectValueCourses')),
                'currentBookWorth' => $this->currentBookWorth(),
                'revenues' => GridProjectRevenue::collection($this->whenLoaded('projectRevenues')),
                'participants' => FullParticipantProject::collection($this->whenLoaded('participantsProject')),
                'typeId' => $this->project_type_id,
                'amountOfParticipants' => $this->participantsProject()->count(),
                'taskCount' => $this->tasks()->count(),
                'relatedTasks' => GridTask::collection($this->whenLoaded('tasks')),
                'documentCount' => $this->documents()->count(),
                'relatedDocuments' => FullDocument::collection($this->whenLoaded('documents')),
                'emailInboxCount' => $this->relatedEmailsInbox ? $this->relatedEmailsInbox->count() : 0,
                'relatedEmailsInbox' => $this->relatedEmailsInbox,
                'emailSentCount' => $this->relatedEmailsSent ? $this->relatedEmailsSent->count() : 0,
                'relatedEmailsSent' => $this->relatedEmailsSent,
                'currentParticipations' => $this->getCurrentParticipations(),
                'postalcodeLink' => $this->postalcode_link,
                'administrationId' => $this->administration_id,
                'administration' => FullAdministration::make($this->whenLoaded('administration')),
                'hasPaymentInvoices' => $this->getHasPaymentInvoices(),
                'requiresContactGroups' => GenericResource::make($this->whenLoaded('requiresContactGroups')),
                'amountOfLoanNeeded' => $this->amount_of_loan_needed,
                'minAmountLoan' => $this->min_amount_loan,
                'maxAmountLoan' => $this->max_amount_loan,
                'participationsDefinitive' => $this->participations_definitive,
                'participationsGranted' => $this->participations_granted,
                'participationsOptioned' => $this->participations_optioned,
                'participationsInteressed' => $this->participations_interessed,
                'amountDefinitive' => $this->amount_definitive,
                'amountGranted' => $this->amount_granted,
                'amountOptioned' => $this->amount_optioned,
                'amountInteressed' => $this->amount_interessed,
                'documentTemplateAgreementId' => $this->document_template_agreement_id,
                'documentTemplateAgreement' => FullDocumentTemplate::make($this->whenLoaded('documentTemplateAgreement')),
                'emailTemplateAgreementId' => $this->email_template_agreement_id,
                'emailTemplateAgreement' => FullEmailTemplate::make($this->whenLoaded('emailTemplateAgreement')),
                'linkAgreeTerms' => $this->link_agree_terms,
                'linkUnderstandInfo' => $this->link_understand_info,
                'showQuestionAboutMembership' => $this->show_question_about_membership,
                'questionAboutMembershipGroupId' => $this->question_about_membership_group_id,
                'questionAboutMembershipGroup' => FullContactGroup::make($this->whenLoaded('questionAboutMembershipGroup')),
                'textIsMember' => $this->text_is_member,
                'textIsNoMember' => $this->text_is_no_member,
                'textBecomeMember' => $this->text_become_member,
                'memberGroupId' => $this->member_group_id,
                'memberGroup' => FullContactGroup::make($this->whenLoaded('memberGroup')),
                'textBecomeNoMember' => $this->text_become_no_member,
                'noMemberGroupId' => $this->no_member_group_id,
                'noMemberGroup' => FullContactGroup::make($this->whenLoaded('noMemberGroup')),

            ];
    }
}
