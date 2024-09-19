<?php

namespace App\Helpers\Workflow;

use App\Eco\EmailTemplate\EmailTemplate;
use App\Eco\Intake\Intake;
use App\Eco\Intake\IntakeStatus;
use App\Eco\Measure\MeasureCategory;
use App\Eco\Opportunity\Opportunity;
use App\Eco\Opportunity\OpportunityAction;
use App\Eco\Organisation\Organisation;
use App\Eco\QuotationRequest\QuotationRequest;
use App\Eco\QuotationRequest\QuotationRequestStatus;
use App\Helpers\Settings\PortalSettings;
use App\Helpers\Template\TemplateVariableHelper;
use App\Http\Resources\Email\Templates\GenericMailWithoutAttachment;
use Illuminate\Support\Facades\Mail;

class IntakeWorkflowHelper
{

    public function __construct(Intake $intake, MeasureCategory $measureCategory)
    {
        $this->intake = $intake;
        $this->opportunity = null;
        $this->quotationRequest = null;
        $this->measureCategory = $measureCategory;
        $this->cooperativeName = PortalSettings::get('cooperativeName');

    }

    public function processWorkflowCreateOpportunity()
    {
        set_time_limit(0);

        if (!$this->intake) {
            return false;
        }
        if (!$this->measureCategory) {
            return false;
        }
        if (!$this->measureCategory->uses_wf_create_opportunity) {
            return false;
        }

        $this->opportunity = Opportunity::create([
            'measure_category_id' => $this->measureCategory->id,
            'status_id' => $this->measureCategory->opportunity_status_id_wf_create_opportunity,
            'intake_id' => $this->intake->id,
            'quotation_text' => '',
            'desired_date' => null,
            'evaluation_agreed_date' => null,
        ]);
        $this->opportunity->measures()->sync($this->measureCategory->measure_id_wf_create_opportunity);

        //intake kan nu op status Afgesloten met kans gezet worden.
        $statusIdClosedWithOpportunity = IntakeStatus::where('code_ref', 'closed_with_opportunity')->first()->id;
        $this->intake->intake_status_id = $statusIdClosedWithOpportunity;

        //Indien maak offerte verzoek
        if($this->measureCategory->uses_wf_create_quotation_request){
            $processed = $this->processWorkflowCreateQuotationRequest();
            //Indien mailen offerte verzoek
            if($processed && $this->measureCategory->uses_wf_email_quotation_request){
                $this->processWorkflowEmailQuotationRequest();
            }
        }

        return true;
    }

    private function processWorkflowCreateQuotationRequest()
    {
        if (!$this->measureCategory->organisation_id_wf_create_quotation_request || $this->measureCategory->organisation_id_wf_create_quotation_request == 0 ) {
            return false;
        }
        $offerteverzoekAction = OpportunityAction::where('code_ref', 'quotation-request')->first();
        $quotationRequestStatus = QuotationRequestStatus::where('opportunity_action_id', $offerteverzoekAction->id)->where('code_ref', 'default')->first();
        if (!$quotationRequestStatus) {
            return false;
        }

        $contactOrganistation = Organisation::find($this->measureCategory->organisation_id_wf_create_quotation_request);
        if(!$contactOrganistation){
            return false;
        }
        $quotationRequest = new QuotationRequest();
        $quotationRequest->contact_id = $contactOrganistation->contact_id;
        $quotationRequest->opportunity_id = $this->opportunity->id;
        $quotationRequest->opportunity_action_id = $offerteverzoekAction->id;
        $quotationRequest->date_recorded = null;
        $quotationRequest->date_released = null;
        $quotationRequest->status_id = $quotationRequestStatus->id;
        $quotationRequest->date_planned_to_send_wf_email_status = null;
        $quotationRequest->quotation_text = '';
        $quotationRequest->quotation_amount = 0;
        $quotationRequest->save();

        return true;
    }


    private function processWorkflowEmailQuotationRequest()
    {

        $emailTemplate = EmailTemplate::find($this->measureCategory->email_template_id_wf_create_quotation_request);
        if (!$emailTemplate) {
            return false;
        }

        $organisation = Organisation::find($this->measureCategory->organisation_id_wf_create_quotation_request);
        $organisationContactperson = null;
        if(optional(optional($organisation->contact->contactPerson)->contact)->type_id == 'person'){
            $organisationContactperson = optional($organisation->contact->contactPerson)->contact;
        }
        if(!$organisationContactperson || !$organisationContactperson->primaryEmailAddress)
        {
            return false;
        }

        $mail = Mail::to($organisationContactperson->primaryEmailAddress->email);
        $this->mailWorkflow($emailTemplate, $mail, $organisationContactperson);
        return true;
    }

    public function mailWorkflow($emailTemplate, $mail, $organisationContactperson)
    {
        $subject = $emailTemplate->subject ? $emailTemplate->subject : 'Bericht van ' . $this->cooperativeName;
        $htmlBody = $emailTemplate->html_body;

        $subject = str_replace('{cooperatie_naam}', $this->cooperativeName, $subject);
        if($organisationContactperson) {
            $subject = str_replace('{contactpersoon}', $organisationContactperson->full_name, $subject);
            $subject = TemplateVariableHelper::replaceTemplateVariables($subject, 'contact', $organisationContactperson);
            $htmlBody = str_replace('{contactpersoon}', $organisationContactperson->full_name, $htmlBody);
            $htmlBody = TemplateVariableHelper::replaceTemplateVariables($htmlBody, 'contact', $organisationContactperson);
        }
        if($this->intake) {
            $subject = TemplateVariableHelper::replaceTemplateVariables($subject, 'intake', $this->intake);
            $htmlBody = TemplateVariableHelper::replaceTemplateVariables($htmlBody, 'intake', $this->intake);
            if ($this->intake->campaign) {
                $subject = TemplateVariableHelper::replaceTemplateVariables($subject, 'campagne',
                    $this->intake->campaign);
                $htmlBody = TemplateVariableHelper::replaceTemplateVariables($htmlBody, 'campagne',
                    $this->intake->campaign);
            }

        }
        if($this->opportunity) {
            $htmlBody = TemplateVariableHelper::replaceTemplateVariables($htmlBody, 'kans', $this->opportunity);
        }
        if($this->quotationRequest) {
            $htmlBody = TemplateVariableHelper::replaceTemplateVariables($htmlBody, 'offerteverzoek', $this->quotationRequest);
            $htmlBody = TemplateVariableHelper::replaceTemplateVariables($htmlBody, 'kansactie', $this->quotationRequest);
        }

        $htmlBody = TemplateVariableHelper::replaceTemplatePortalVariables($htmlBody,'portal' );
        $htmlBody = TemplateVariableHelper::replaceTemplatePortalVariables($htmlBody,'contacten_portal' );
        $htmlBody = TemplateVariableHelper::replaceTemplateCooperativeVariables($htmlBody,'cooperatie' );

        $htmlBody = TemplateVariableHelper::stripRemainingVariableTags($htmlBody);

        $htmlBody
            = '<!DOCTYPE html><html><head><meta http-equiv="content-type" content="text/html;charset=UTF-8"/><title>'
            . $subject . '</title></head>'
            . $htmlBody . '</html>';


        $mail->subject = $subject;
        $mail->html_body = $htmlBody;

        $mail->send(new GenericMailWithoutAttachment($mail, $htmlBody, $emailTemplate->default_attachment_document_id));
    }

}