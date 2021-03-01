<?php

namespace App\Helpers\FinancialOverview;

use App\Eco\DocumentTemplate\DocumentTemplate;
use App\Eco\FinancialOverview\FinancialOverview;
use App\Eco\FinancialOverview\FinancialOverviewContact;
use App\Eco\FinancialOverview\FinancialOverviewsToSend;
use App\Eco\Mailbox\Mailbox;
use App\Eco\Occupation\OccupationContact;
use App\Eco\Project\Project;
use App\Helpers\Email\EmailHelper;
use App\Helpers\Template\TemplateTableHelper;
use App\Helpers\Template\TemplateVariableHelper;
use App\Http\Controllers\Api\FinancialOverview\FinancialOverviewContactController;
use App\Http\Resources\FinancialOverview\Templates\FinancialOverviewContactMail;
use Barryvdh\DomPDF\Facade as PDF;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Storage;

class FinancialOverviewHelper
{
    public static function getNewProjectsForFinancialOverview(FinancialOverview $financialOverview)
    {
        $checkDate = Carbon::createFromDate($financialOverview->year, 1, 1)->format('Y-m-d');
        $projects = Project::where('administration_id', $financialOverview->administration_id)
            ->where(function ($query) use($checkDate) {
                $query->whereNull('date_end')
                    ->orWhere('date_end', '>=', $checkDate);
            })
            ->whereDoesntHave('financialOverviewProjects', function ($query2) use ($financialOverview) {
                $query2->whereHas('financialOverview', function ($query3) use ($financialOverview) {
                    $query3->where('administration_id', $financialOverview->administration_id)
                        ->where('year', $financialOverview->year);
                });
            })->get();

        return $projects;
    }

    public static function createFinancialOverviewContactDocument(FinancialOverviewcontact $financialOverviewContact, $preview = false)
    {
        $user = Auth::user();
        $pdf = null;

        $img = '';
        if ($financialOverviewContact->financialOverview->administration->logo_filename) {
            $path = storage_path('app' . DIRECTORY_SEPARATOR . 'administrations' . DIRECTORY_SEPARATOR . $financialOverviewContact->financialOverview->administration->logo_filename);
            $logo = file_get_contents($path);

            $src = 'data:' . mime_content_type($path)
                . ';charset=binary;base64,' . base64_encode($logo);
            $src = str_replace(" ", "", $src);
            $img = '<img src="' . $src . '" style="width:auto; height:156px;" alt="logo"/>';
        }

        self::checkStorageDir($financialOverviewContact->financialOverview->administration->id);

        $financialOverviewContactController = new FinancialOverviewContactController();
        $financialOverviewContactData = $financialOverviewContactController->getFinancialOverviewContact($financialOverviewContact, $preview);
        $contactPerson = $financialOverviewContactController->getContactInfoForFinancialOverview($financialOverviewContact->contact)['contactPerson'];
        $contactName = null;

        if ($financialOverviewContact->contact->type_id == 'person') {
            $title = $financialOverviewContact->contact->person->title ? $financialOverviewContact->contact->person->title->name . ' ' : '';
            $initials = $financialOverviewContact->contact->person->initials ? $financialOverviewContact->contact->person->initials : ($financialOverviewContact->contact->person->first_name ? substr($financialOverviewContact->contact->person->first_name, 0, 1).".": "");
            $prefix = $financialOverviewContact->contact->person->last_name_prefix ? $financialOverviewContact->contact->person->last_name_prefix . ' ' : '';

            $contactName = $title . ( $initials . ' ' . $prefix . $financialOverviewContact->contact->person->last_name );

        } elseif ($financialOverviewContact->contact->type_id == 'organisation') {
            $contactName = $financialOverviewContact->contact->full_name;
        }

        if($financialOverviewContact->financialOverview->administration->administration_code){
            $financialOverviewContactReference = 'WS-' . $financialOverviewContact->financialOverview->year . '-' . $financialOverviewContact->financialOverview->administration->administration_code . '-' . $financialOverviewContact->contact->number;
        } else {
            $financialOverviewContactReference = 'WS-' . $financialOverviewContact->financialOverview->year . '-' . $financialOverviewContact->contact->number . '-' . $financialOverviewContact->financialOverview->id;
        }

        $wsAdditionalInfo = self::getWsAdditionalInfo($financialOverviewContact, $contactPerson, $user);

        // indien preview, dan zijn we nu klaar om PDF te tonen
        if ($preview) {
            $pdf = PDF::loadView('financial.overview.generic', [
                'financialOverviewContact' => $financialOverviewContact,
                'financialOverviewContactTotalProjects' => $financialOverviewContactData['financialOverviewContactTotalProjects'],
                'financialOverviewContactTotalStart' => $financialOverviewContactData['financialOverviewContactTotalProjects']->sum('total_amount_start_value'),
                'financialOverviewContactTotalEnd' => $financialOverviewContactData['financialOverviewContactTotalProjects']->sum('total_amount_end_value'),
                'financialOverviewContactLoanProjects' => $financialOverviewContactData['financialOverviewContactLoanProjects'],
                'financialOverviewContactLoanTotalEnd' => $financialOverviewContactData['financialOverviewContactLoanProjects']->sum('amount_end_value'),
                'financialOverviewContactObligationProjects' => $financialOverviewContactData['financialOverviewContactObligationProjects'],
                'financialOverviewContactObligationTotalEnd' => $financialOverviewContactData['financialOverviewContactObligationProjects']->sum('amount_end_value'),
                'financialOverviewContactCapitalProjects' => $financialOverviewContactData['financialOverviewContactCapitalProjects'],
                'financialOverviewContactCapitalTotalEnd' => $financialOverviewContactData['financialOverviewContactCapitalProjects']->sum('amount_end_value'),
                'financialOverviewContactPcrProjects' => $financialOverviewContactData['financialOverviewContactPcrProjects'],
                'financialOverviewContactPcrTotalEnd' => $financialOverviewContactData['financialOverviewContactPcrProjects']->sum('amount_end_value'),
                'contactPerson' => $contactPerson,
                'contactName' => $contactName,
                'financialOverviewContactReference' => $financialOverviewContactReference,
                'logo' => $img,
                'wsAdditionalInfo' => $wsAdditionalInfo,
            ]);

            return $pdf->output();
        }

        // PDF maken
        $pdf = PDF::loadView('financial.overview.generic', [
            'financialOverviewContact' => $financialOverviewContact,
            'financialOverviewContactTotalProjects' => $financialOverviewContactData['financialOverviewContactTotalProjects'],
            'financialOverviewContactTotalStart' => $financialOverviewContactData['financialOverviewContactTotalProjects']->sum('total_amount_start_value'),
            'financialOverviewContactTotalEnd' => $financialOverviewContactData['financialOverviewContactTotalProjects']->sum('total_amount_end_value'),
            'financialOverviewContactLoanProjects' => $financialOverviewContactData['financialOverviewContactLoanProjects'],
            'financialOverviewContactLoanTotalEnd' => $financialOverviewContactData['financialOverviewContactLoanProjects']->sum('amount_end_value'),
            'financialOverviewContactObligationProjects' => $financialOverviewContactData['financialOverviewContactObligationProjects'],
            'financialOverviewContactObligationTotalEnd' => $financialOverviewContactData['financialOverviewContactObligationProjects']->sum('amount_end_value'),
            'financialOverviewContactCapitalProjects' => $financialOverviewContactData['financialOverviewContactCapitalProjects'],
            'financialOverviewContactCapitalTotalEnd' => $financialOverviewContactData['financialOverviewContactCapitalProjects']->sum('amount_end_value'),
            'financialOverviewContactPcrProjects' => $financialOverviewContactData['financialOverviewContactPcrProjects'],
            'financialOverviewContactPcrTotalEnd' => $financialOverviewContactData['financialOverviewContactPcrProjects']->sum('amount_end_value'),
            'contactPerson' => $contactPerson,
            'contactName' => $contactName,
            'financialOverviewContactReference' => $financialOverviewContactReference,
            'logo' => $img,
            'wsAdditionalInfo' => $wsAdditionalInfo,
        ]);

        $name = $financialOverviewContactReference . '.pdf';

        $path = 'administration_' . $financialOverviewContact->financialOverview->administration->id
            . DIRECTORY_SEPARATOR . 'financial-overviews' . DIRECTORY_SEPARATOR . $name;

        $filePath = (storage_path('app' . DIRECTORY_SEPARATOR . 'administrations' . DIRECTORY_SEPARATOR) . $path);

        $pdf->save($filePath);

        $financialOverviewContact->filename = $path;
        $financialOverviewContact->name = $name;
        $financialOverviewContact->save();

        self::financialOverviewContactPdfIsCreated($financialOverviewContact);

        return $path;
    }

    public static function send(FinancialOverviewContact $financialOverviewContact, $preview = false)
    {
        //todo cleanup later. Dit is even voor testen van resenden bij waardestaten met error-sending.
        // met contact lastname "create-error-sending" forceren we een error-sending.
        if(!$preview
            && $financialOverviewContact
            && $financialOverviewContact->contact
            && $financialOverviewContact->contact->person
            && $financialOverviewContact->contact->person->last_name == "create-error-sending"
        )
        {
            throw new Exception("Waardestaat contact met ID " . $financialOverviewContact->id . " in error-sending gezet.");
        }

        self::setMailConfigByFinancialOverviewContact($financialOverviewContact);

        $financialOverviewContactController = new FinancialOverviewContactController();
        $contactInfo
            = $financialOverviewContactController->getContactInfoForFinancialOverview($financialOverviewContact->contact);
        if ($contactInfo['email'] === 'Geen e-mail bekend') {
            if ($preview) {
                return [
                    'to' => 'Geen e-mailadres bekend',
                    'bcc' => 'Geen bcc e-mailadres bekend',
                    'subject' => 'Geen e-mailadres bekend',
                    'htmlBody' => 'Geen e-mailadres bekend',
                ];
            }
            return false;
        }
        $contactName = null;

        if ($financialOverviewContact->contact->type_id == 'person') {
            $prefix = $financialOverviewContact->contact->person->last_name_prefix;
            $contactName = $prefix ? $financialOverviewContact->contact->person->first_name . ' ' . $prefix . ' ' . $financialOverviewContact->contact->person->last_name : $financialOverviewContact->contact->person->first_name . ' ' . $financialOverviewContact->contact->person->last_name;
        } elseif ($financialOverviewContact->contact->type_id == 'organisation') {
            $contactName = $financialOverviewContact->contact->full_name;
        }

        if($financialOverviewContact->financialOverview->administration->administration_code){
            $financialOverviewContactReference = 'WS-' . $financialOverviewContact->financialOverview->year . '-' . $financialOverviewContact->financialOverview->administration->administration_code . '-' . $financialOverviewContact->contact->number;
        } else {
            $financialOverviewContactReference = 'WS-' . $financialOverviewContact->financialOverview->year . '-' . $financialOverviewContact->contact->number . '-' . $financialOverviewContact->financialOverview->id;
        }

        $subject = 'Waardestaat';
        $htmlBody = 'Beste ' . ($contactInfo['contactPerson'] ? $contactInfo['contactPerson'] : $contactName) . ',';
        $htmlBody .= '<p>&nbsp;</p>';
        $htmlBody .= 'Hierbij uw waardestaat: ' . $financialOverviewContact->financialOverview->description . '<br />';
        $htmlBody .= '(Referentie: ' . $financialOverviewContactReference . ').';
        $htmlBody .= '<p>&nbsp;</p>';
        $htmlBody .= 'Met vriendelijke groet,';
        $htmlBody .= '<p></p>';
        $htmlBody .= $financialOverviewContact->financialOverview->administration->name;

        $emailTemplate = $financialOverviewContact->financialOverview->administration->emailTemplateFinancialOverview;
        if ($emailTemplate) {
            $subject = $emailTemplate->subject
                ? $emailTemplate->subject : $subject;
            $htmlBody = $emailTemplate->html_body;

        }

        $user = Auth::user();

        $subject = TemplateVariableHelper::replaceTemplateVariables($subject,'ik', $user);
        $subject = TemplateVariableHelper::replaceTemplateVariables($subject,'contact', $financialOverviewContact->contact);
//        $subject = TemplateVariableHelper::replaceTemplateVariables($subject,'order', $invoice->order);
//        $subject = TemplateVariableHelper::replaceTemplateVariables($subject,'nota', $invoice);

        $htmlBody = TemplateVariableHelper::replaceTemplateVariables($htmlBody,'ik', $user);
        $htmlBody = TemplateVariableHelper::replaceTemplateVariables($htmlBody,'contact', $financialOverviewContact->contact);
//        $htmlBody = TemplateVariableHelper::replaceTemplateVariables($htmlBody,'order', $invoice->order);
//        $htmlBody = TemplateVariableHelper::replaceTemplateVariables($htmlBody,'nota', $invoice);

        $htmlBody = TemplateVariableHelper::stripRemainingVariableTags($htmlBody);

        $htmlBody
            = '<!DOCTYPE html><html><head><meta http-equiv="content-type" content="text/html;charset=UTF-8"/><title>'
            . $subject . '</title></head>'
            . $htmlBody . '</html>';

        $mail = Mail::to($contactInfo['email']);

//        $bcc = $financialOverviewContact->financialOverview->administration->email_bcc_financial_overviews;
//        if($bcc)
//        {
//            $mail->bcc($financialOverviewContact->financialOverview->administration->email_bcc_financial_overviews);
//        }

        $subject = str_replace('{contactpersoon}', $contactInfo['contactPerson'], $subject);
        $htmlBody = str_replace('{contactpersoon}', $contactInfo['contactPerson'], $htmlBody);

        $mail->subject = $subject;
        $mail->html_body = $htmlBody;

        if ($preview) {
            return [
                'to' => $contactInfo['email'],
//                'bcc' => $bcc,
                'subject' => $mail->subject,
                'htmlBody' => $mail->html_body,
            ];
        } else {
            $mail->send(new FinancialOverviewContactMail($mail, $htmlBody,
                Storage::disk('administrations')->getDriver()->getAdapter()
                    ->applyPathPrefix($financialOverviewContact->filename),
                $financialOverviewContact->name));

            $financialOverviewContact->emailed_to = $contactInfo['email'];
            $financialOverviewContact->save();
        }

        return $financialOverviewContact;
    }


    public static function checkStorageDir($administration_id)
    {
        //Check if storage map exists
        $storageDir = Storage::disk('administrations')->getDriver()->getAdapter()->getPathPrefix() . DIRECTORY_SEPARATOR . 'administration_' . $administration_id . DIRECTORY_SEPARATOR . 'financial-overviews';

        if (!is_dir($storageDir)) {
            mkdir($storageDir, 0777, true);
        }
    }

    public static function setMailConfigByFinancialOverviewContact(FinancialOverviewContact $financialOverviewContact)
    {
        // Standaard vanuit primaire mailbox mailen
        $mailboxToSendFrom = Mailbox::getDefault();;

        // Als er een mailbox aan de administratie is gekoppeld, dan deze gebruiken
        if ($financialOverviewContact->financialOverview->administration->mailbox) {
            $mailboxToSendFrom = $financialOverviewContact->financialOverview->administration->mailbox;
        }

        // Configuratie instellen als er een mailbox is gevonden
        if ($mailboxToSendFrom) {
            (new EmailHelper())->setConfigToMailbox($mailboxToSendFrom);
        }
    }

    public static function financialOverviewContactInProgress(FinancialOverviewContact $financialOverviewContact)
    {
        //Waardestaat moet nog status to-send hebben en mag niet al voorkomen in tabel financialOverviewsToSend
        if($financialOverviewContact->status_id !== 'to-send')
        {
            abort(404, "Waardestaat met ID " . $financialOverviewContact->id . " heeft geen status Te verzenden");
        }
        else
        {
            if($financialOverviewContact->financialOverviewsToSend)
            {
                abort(404, "Waarde met ID " . $financialOverviewContact->id . " is al aangevraagd om te verzenden");
            }

            // We zetten waardestaat voorlopig in progress zolang we bezig met maken (en evt. verzenden) van deze waardestaat.
            $financialOverviewContact->status_id = 'in-progress';
            $financialOverviewContact->save();

            $financialOverviewsToSend = new FinancialOverviewsToSend();
            $financialOverviewContact->financialOverviewsToSend()->save($financialOverviewsToSend);
        }
    }
    public static function financialOverviewContactIsSending(FinancialOverviewContact $financialOverviewContact)
    {
        //Waardestaat moet nog status in-progress hebben
        if($financialOverviewContact->status_id === 'in-progress')
        {
            $financialOverviewContact->status_id = 'is-sending';
            $financialOverviewContact->save();
        }
    }
    public static function financialOverviewContactIsResending(FinancialOverviewContact $financialOverviewContact)
    {
        //Waardestaat moet nog status in-progress hebben
        if($financialOverviewContact->status_id === 'error-sending')
        {
            $financialOverviewContact->status_id = 'is-resending';
            $financialOverviewContact->save();
        }
    }
    public static function financialOverviewContactSend(FinancialOverviewContact $financialOverviewContact)
    {
        //Waardestaat moet nog status is-sending hebben
        if($financialOverviewContact->status_id === 'is-sending' || $financialOverviewContact->status_id === 'is-resending')
        {
            //Haal waardestaat uit tabel financial-overviews-to-send
            $financialOverviewContact->financialOverviewsToSend()->delete();
            //Status sent
            $financialOverviewContact->status_id = 'sent';
            $financialOverviewContact->save();
        }
    }
    public static function financialOverviewContactPdfIsCreated(FinancialOverviewContact $financialOverviewContact)
    {
        $financialOverviewsToSend = $financialOverviewContact->financialOverviewsToSend()->first();
        $financialOverviewsToSend->financial_overview_created = true;
        $financialOverviewContact->financialOverviewsToSend()->save($financialOverviewsToSend);
    }
    public static function financialOverviewContactPdfIsNotCreated(FinancialOverviewContact $financialOverviewContact)
    {
        //Waardestaat moet nog status in-progress hebben
        if($financialOverviewContact->status_id === 'in-progress')
        {
            //Haal waardestaat weer uit tabel financial-overviews-to-send
            $financialOverviewContact->financialOverviewsToSend()->delete();
            //Status terug naar to-send
            $financialOverviewContact->status_id = 'to-send';
            $financialOverviewContact->date_sent = null;
            $financialOverviewContact->save();
        }
    }
    public static function financialOverviewContactErrorSending(FinancialOverviewContact $financialOverviewContact)
    {
        //Waardestaat moet nog status is-sending hebben
        if($financialOverviewContact->status_id === 'is-sending' || $financialOverviewContact->status_id === 'is-resending')
        {
            //Status naar error-send
            $financialOverviewContact->status_id = 'error-sending';
            $financialOverviewContact->save();
        }
    }

    /**
     * @param FinancialOverviewContact $financialOverviewContact
     * @param $contactPerson
     * @param \Illuminate\Contracts\Auth\Authenticatable $user
     * @return String
     */
    public static function getWsAdditionalInfo(FinancialOverviewContact $financialOverviewContact, $contactPerson, \Illuminate\Contracts\Auth\Authenticatable $user): string
    {
        $documentTemplateId = $financialOverviewContact->financialOverview ? $financialOverviewContact->financialOverview->document_template_financial_overview_id : 0;
        $documentTemplate = DocumentTemplate::find($documentTemplateId);

        $contact = $financialOverviewContact->contact;

        if (!$documentTemplate) {
            $wsAdditionalInfo = '';
        } else {
            $documentTemplate->load('footer', 'baseTemplate', 'header');
            $wsAdditionalInfo = $documentTemplate->header ? $documentTemplate->header->html_body : '';

            if ($documentTemplate->baseTemplate) {
                $wsAdditionalInfo .= TemplateVariableHelper::replaceTemplateTagVariable($documentTemplate->baseTemplate->html_body,
                    $documentTemplate->html_body, '', '');
            } else {
                $wsAdditionalInfo .= TemplateVariableHelper::replaceTemplateFreeTextVariables($documentTemplate->html_body,
                    '', '');
            }

            $wsAdditionalInfo .= $documentTemplate->footer ? $documentTemplate->footer->html_body : '';
            $wsAdditionalInfo = str_replace('{contactpersoon}', $contactPerson, $wsAdditionalInfo);

            $wsAdditionalInfo = TemplateTableHelper::replaceTemplateTables($wsAdditionalInfo, $contact);
            $wsAdditionalInfo = TemplateVariableHelper::replaceTemplateVariables($wsAdditionalInfo, 'contact', $contact);
            $wsAdditionalInfo = TemplateVariableHelper::replaceTemplatePortalVariables($wsAdditionalInfo, 'portal');
            $wsAdditionalInfo = TemplateVariableHelper::replaceTemplatePortalVariables($wsAdditionalInfo, 'contacten_portal');
            $wsAdditionalInfo = TemplateVariableHelper::replaceTemplateCooperativeVariables($wsAdditionalInfo, 'cooperatie');

            //wettelijk vertegenwoordiger
            if (OccupationContact::where('contact_id', $contact->id)->where('occupation_id', 7)->exists()) {
                $wettelijkVertegenwoordiger = OccupationContact::where('contact_id', $contact->id)
                    ->where('occupation_id', 7)->first()->primaryContact;
                $wsAdditionalInfo
                    = TemplateVariableHelper::replaceTemplateVariables($wsAdditionalInfo, 'wettelijk_vertegenwoordiger',
                    $wettelijkVertegenwoordiger);
            }
            $wsAdditionalInfo
                = TemplateVariableHelper::replaceTemplateVariables($wsAdditionalInfo, 'ik', $user);
            $wsAdditionalInfo
                = TemplateVariableHelper::replaceTemplateVariables($wsAdditionalInfo, 'administratie', $financialOverviewContact->financialOverview->administration);

            $wsAdditionalInfo
                = TemplateVariableHelper::stripRemainingVariableTags($wsAdditionalInfo);
        }
        return $wsAdditionalInfo;
    }


}