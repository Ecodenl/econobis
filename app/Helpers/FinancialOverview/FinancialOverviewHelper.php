<?php

namespace App\Helpers\FinancialOverview;

use App\Eco\Contact\Contact;
use App\Eco\FinancialOverview\FinancialOverview;
use App\Eco\FinancialOverview\FinancialOverviewContact;
use App\Eco\FinancialOverview\FinancialOverviewsToSend;
use App\Eco\Mailbox\Mailbox;
use App\Eco\Project\Project;
use App\Helpers\Email\EmailHelper;
use App\Helpers\Template\TemplateVariableHelper;
use App\Http\Controllers\Api\FinancialOverview\FinancialOverviewContactController;
use App\Http\Resources\FinancialOverview\Templates\FinancialOverviewContactMail;
use App\Http\Resources\Project\GridProject;
use Barryvdh\DomPDF\Facade as PDF;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Storage;

class FinancialOverviewHelper
{
    public static function getNewProjectsForFinancialOverviewGrid(FinancialOverview $financialOverview)
    {
        $projectsQuery = self::getNewProjectsForFinancialOverviewQuery($financialOverview);
        $projects = $projectsQuery->get();

        $projects->load([
            'projectType',
        ]);

        return GridProject::collection($projects)
            ->additional(['meta' => [
                'total' => $projectsQuery->count(),
            ]
            ]);
    }

    public static function getNewProjectsForFinancialOverview(FinancialOverview $financialOverview)
    {
        $projectsQuery = self::getNewProjectsForFinancialOverviewQuery($financialOverview);
        return $projectsQuery->get();
    }

    /**
     * @param FinancialOverview $financialOverview
     * @return mixed
     */
    protected static function getNewProjectsForFinancialOverviewQuery(FinancialOverview $financialOverview)
    {
        $checkDate = Carbon::createFromDate($financialOverview->year, 1, 1)->format('Y-m-d');
        $projectsQuery = Project::where('administration_id', $financialOverview->administration_id)
            ->where(function ($query) use($checkDate) {
                $query->whereNull('date_end')
                    ->orWhere('date_end', '>=', $checkDate);
            })
            ->whereDoesntHave('financialOverviewProjects', function ($query2) use ($financialOverview) {
                $query2->whereHas('financialOverview', function ($query3) use ($financialOverview) {
                    $query3->where('administration_id', $financialOverview->administration_id)
                        ->where('year', $financialOverview->year);
                });
            });

        return $projectsQuery;
    }

    public static function createFinancialOverviewContactDocument(FinancialOverviewcontact $financialOverviewContact, $preview = false)
    {
//        self::financialOverviewContactInProgress($financialOverviewContact);

        $financialOverview = $financialOverviewContact->financialOverview;
        $contact = $financialOverviewContact->contact;

        $img = '';
        if ($financialOverview->administration->logo_filename) {
            $path = storage_path('app' . DIRECTORY_SEPARATOR . 'administrations' . DIRECTORY_SEPARATOR . $financialOverview->administration->logo_filename);
            $logo = file_get_contents($path);

            $src = 'data:' . mime_content_type($path)
                . ';charset=binary;base64,' . base64_encode($logo);
            $src = str_replace(" ", "", $src);
            $img = '<img src="' . $src . '" width="auto" height="156px"/>';
        }

        self::checkStorageDir($financialOverview->administration->id);

        $financialOverviewContactController = new FinancialOverviewContactController();
        $financialOverviewContactData = $financialOverviewContactController->getFinancialOverviewContact($financialOverview, $contact);
        $contactPerson = $financialOverviewContactController->getContactInfoForFinancialOverview($contact)['contactPerson'];
        $contactName = null;

        if ($contact->type_id == 'person') {
            $prefix = $contact->person->last_name_prefix;
            $contactName = $prefix ? $contact->person->first_name . ' ' . $prefix . ' ' . $contact->person->last_name : $contact->person->first_name . ' ' . $contact->person->last_name;
        } elseif ($contact->type_id == 'organisation') {
            $contactName = $contact->full_name;
        }
        // indien preview, dan zijn we nu klaar om PDF te tonen
        if ($preview) {
            $pdf = PDF::loadView('financial.overview.generic', [
                'financialOverview' => $financialOverview,
                'financialOverviewContactTotalProjects' => $financialOverviewContactData['financialOverviewContactTotalProjects'],
                'financialOverviewContactLoanProjects' => $financialOverviewContactData['financialOverviewContactLoanProjects'],
                'financialOverviewContactObligationProjects' => $financialOverviewContactData['financialOverviewContactObligationProjects'],
                'financialOverviewContactCapitalProjects' => $financialOverviewContactData['financialOverviewContactCapitalProjects'],
                'financialOverviewContactPcrProjects' => $financialOverviewContactData['financialOverviewContactPcrProjects'],
                'contact' => $contact,
                'contactPerson' => $contactPerson,
                'contactName' => $contactName,
                'logo' => $img,
            ]);
            return $pdf->output();
        }

        // PDF maken
        $pdf = PDF::loadView('financial.overview.generic', [
            'financialOverview' => $financialOverview,
            'financialOverviewContactTotalProjects' => $financialOverviewContactData['financialOverviewContactTotalProjects'],
            'financialOverviewContactLoanProjects' => $financialOverviewContactData['financialOverviewContactLoanProjects'],
            'financialOverviewContactObligationProjects' => $financialOverviewContactData['financialOverviewContactObligationProjects'],
            'financialOverviewContactCapitalProjects' => $financialOverviewContactData['financialOverviewContactCapitalProjects'],
            'financialOverviewContactPcrProjects' => $financialOverviewContactData['financialOverviewContactPcrProjects'],
            'contact' => $contact,
            'contactPerson' => $contactPerson,
            'contactName' => $contactName,
            'logo' => $img,
        ]);

        $name = 'WS-' . $financialOverview->year . '-' . $financialOverview->administration_id . '-' . $contact->number . '.pdf';

        $path = 'administration_' . $financialOverview->administration->id
            . DIRECTORY_SEPARATOR . 'financial-overviews' . DIRECTORY_SEPARATOR . $name;

        $filePath = (storage_path('app' . DIRECTORY_SEPARATOR . 'administrations' . DIRECTORY_SEPARATOR) . $path);

        $pdf->save($filePath);

        $financialOverviewContact->filename = $path;
        $financialOverviewContact->name = $name;
        $financialOverviewContact->save();

        self::financialOverviewContactPdfIsCreated($financialOverviewContact);

        return true;
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

        $subject = 'Waardestaat';
        $htmlBody = 'Beste ' . $contactInfo['contactPerson'] . ',';
        $htmlBody .= '<p>&nbsp;</p>';
        $htmlBody .= 'Hierbij uw waardestaat: ' . $financialOverviewContact->financialOverview->description . ' (Contactnummer: ' . $financialOverviewContact->contact->number . ').';
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



}