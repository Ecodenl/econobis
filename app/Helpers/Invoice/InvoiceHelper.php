<?php

namespace App\Helpers\Invoice;

use App\Eco\EmailTemplate\EmailTemplate;
use App\Eco\Invoice\Invoice;
use App\Eco\Invoice\InvoiceDocument;
use App\Eco\Invoice\InvoiceNumber;
use App\Eco\Invoice\InvoicePayment;
use App\Eco\Invoice\InvoiceProduct;
use App\Eco\Invoice\InvoicesToSend;
use App\Eco\Mailbox\Mailbox;
use App\Eco\Order\Order;
use App\Helpers\Email\EmailHelper;
use App\Helpers\Template\TemplateVariableHelper;
use App\Http\Controllers\Api\Order\OrderController;
use App\Http\Resources\Invoice\Templates\InvoiceMail;
use Barryvdh\DomPDF\Facade as PDF;
use Carbon\Carbon;
use Exception;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Storage;

class InvoiceHelper
{
    public static function saveInvoiceProducts(Invoice &$invoice, Order $order, $preview = false)
    {

        foreach ($order->activeOrderProducts as $orderProduct) {
            if ($orderProduct->is_one_time_and_paid_product) {
                continue;
            }

            $price = 0;
            $priceInclVat = 0;
            $vatPercentage = $orderProduct->product->currentPrice ? $orderProduct->product->currentPrice->vat_percentage : 0;
            $vatFactor = (100 + $vatPercentage) / 100;
            if ($orderProduct->product->currentPrice) {
                if ($orderProduct->product->currentPrice->has_variable_price) {
                    $price        = $orderProduct->variable_price;
                    $priceInclVat = $orderProduct->variable_price * $vatFactor;
                } else {
                    $price        = $orderProduct->product->currentPrice->price;
                    $priceInclVat = $orderProduct->product->currentPrice->price_incl_vat;
                }
                switch ($orderProduct->product->invoice_frequency_id) {
                    case 'monthly':
                        $price = $price * 12;
                        $priceInclVat = $priceInclVat * 12;
                        break;
                    case 'quarterly':
                        $price = $price * 4;
                        $priceInclVat = $priceInclVat * 4;
                        break;
                    case 'half-year':
                        $price = $price * 2;
                        $priceInclVat = $priceInclVat * 2;
                        break;
                    default:
                        $price = $price;
                        $priceInclVat = $priceInclVat;
                        break;
                }

                switch ($orderProduct->order->collection_frequency_id) {
                    case 'monthly':
                        $price = $price / 12;
                        $priceInclVat = $priceInclVat / 12;
                        break;
                    case 'quarterly':
                        $price = $price / 4;
                        $priceInclVat = $priceInclVat / 4;
                        break;
                    case 'half-year':
                        $price = $price / 2;
                        $priceInclVat = $priceInclVat / 2;
                        break;
                    default:
                        $price = $price;
                        $priceInclVat = $priceInclVat;
                        break;
                }
            }

            $invoiceProduct = new InvoiceProduct();
            $invoiceProduct->product_id = $orderProduct->product_id;
            $invoiceProduct->invoice_id = $invoice->id;
            $invoiceProduct->amount = $orderProduct->amount;
            $invoiceProduct->amount_reduction = $orderProduct->amount_reduction;
            $invoiceProduct->percentage_reduction = $orderProduct->percentage_reduction;
            $invoiceProduct->price = $price;
            $invoiceProduct->price_incl_vat = $priceInclVat;
            $invoiceProduct->vat_percentage = $orderProduct->product->currentPrice ? $orderProduct->product->currentPrice->vat_percentage : 0;
            $invoiceProduct->product_code = $orderProduct->product->code;
            $invoiceProduct->product_name = $orderProduct->product->name;
            $invoiceProduct->description = $orderProduct->product->invoice_text;
            if($orderProduct->product->ledger)
            {
                $invoiceProduct->twinfield_ledger_code = $orderProduct->product->ledger->twinfield_ledger_code;
            }

            if($orderProduct->date_last_invoice){
                $dateLastInvoice = $orderProduct->date_last_invoice;
            } else if ($orderProduct->date_period_start_first_invoice) {
                $dateLastInvoice = $orderProduct->date_period_start_first_invoice;
            } else {
                $dateLastInvoice = $orderProduct->date_start;
            }

            $invoiceProduct->date_last_invoice = $dateLastInvoice;
            if (!$preview) {
                $invoiceProduct->save();
            } else {
                $invoice->invoiceProducts->add($invoiceProduct);
            }
        }

        return $invoice;

    }

    public static function saveInvoiceStatus(Invoice $invoice)
    {
        //Indien nota definitief verwerkt wordt of verzonden, dan doen we hier geen statuswijziging.
        if($invoice->status_id !== 'in-progress'
            && $invoice->status_id !== 'is-sending'
            && $invoice->status_id !== 'error-making'
            && $invoice->status_id !== 'error-sending'
            && $invoice->status_id !== 'is-resending')
        {
            if($invoice->status_id === 'paid'){
                if($invoice->twinfield_number){
                    $invoice->status_id = 'exported';
                }else{
                    $invoice->status_id = 'sent';
                }
            }else{
                if ($invoice->amount_open == 0) {
                    $invoice->status_id = 'paid';
                }
            }

            $invoice->save();
        }

    }

    public static function saveInvoiceDatePaid(Invoice $invoice, $datePaid)
    {
        $invoicePayment = new InvoicePayment();
        $invoicePayment->date_paid = $datePaid;
        $invoicePayment->amount = $invoice->amount_open;
        $invoicePayment->invoice_id = $invoice->id;
        $invoicePayment->save();

        if ($invoice->amount_open == 0) {
            $invoice->status_id = 'paid';
        }

        $invoice->save();

        return $invoice;
    }

    public static function send(Invoice $invoice, $preview = false)
    {
        //todo cleanup later. Dit is even voor testen van resenden bij nota's met error-sending.
        // met contact lastname "create-error-sending" forceren we een error-sending.
        if(!$preview
            && $invoice
            && $invoice->order
            && $invoice->order->contact
            && $invoice->order->contact->person
            && $invoice->order->contact->person->last_name == "create-error-sending"
        )
        {
            throw new Exception("Nota met ID " . $invoice->id . " in error-sending gezet.");
        }

        self::setMailConfigByInvoice($invoice);

        $orderController = new OrderController();
        $contactInfo
            = $orderController->getContactInfoForOrder($invoice->order->contact);

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

        $subject = 'Nota';
        $htmlBody = 'Beste ' . $contactInfo['contactPerson'] . ',';
        $htmlBody .= '<p>&nbsp;</p>';
        $htmlBody .= 'Hierbij uw nota: ' . $invoice->number . '.';
        $htmlBody .= '<p>&nbsp;</p>';
        $htmlBody .= 'Met vriendelijke groet,';
        $htmlBody .= '<p></p>';
        $htmlBody .= $invoice->administration->name;

        $emailTemplate = null;

        if ($invoice->payment_type_id === 'collection') {
            $emailTemplate = $invoice->order->emailTemplateCollection;
        } else {
            $emailTemplate = $invoice->order->emailTemplateTransfer;
        }

        if ($emailTemplate) {
            $subject = $emailTemplate->subject
                ? $emailTemplate->subject : $subject;
            $htmlBody = $emailTemplate->html_body;

        }

        $user = Auth::user();

        $htmlBody = TemplateVariableHelper::replaceTemplateVariables($htmlBody,'ik', $user);
        $htmlBody = TemplateVariableHelper::replaceTemplateVariables($htmlBody,'contact', $invoice->order->contact);
        $htmlBody = TemplateVariableHelper::replaceTemplateVariables($htmlBody,'order', $invoice->order);
        $htmlBody = TemplateVariableHelper::replaceTemplateVariables($htmlBody,'nota', $invoice);

        $htmlBody = TemplateVariableHelper::stripRemainingVariableTags($htmlBody);

        $htmlBody
            = '<!DOCTYPE html><html><head><meta http-equiv="content-type" content="text/html;charset=UTF-8"/><title>'
            . $subject . '</title></head>'
            . $htmlBody . '</html>';

        $mail = Mail::to($contactInfo['email']);

        $bcc = $invoice->administration->email_bcc_notas;
        if($bcc)
        {
            $mail->bcc($invoice->administration->email_bcc_notas);
        }

        $subject = str_replace('{contactpersoon}', $contactInfo['contactPerson'], $subject);
        $htmlBody = str_replace('{contactpersoon}', $contactInfo['contactPerson'], $htmlBody);

        $mail->subject = $subject;
        $mail->html_body = $htmlBody;

        if ($preview) {
            return [
                'to' => $contactInfo['email'],
                'bcc' => $bcc,
                'subject' => $mail->subject,
                'htmlBody' => $mail->html_body,
            ];
        } else {
            $mail->send(new InvoiceMail($mail, $htmlBody,
                Storage::disk('administrations')->getDriver()->getAdapter()
                    ->applyPathPrefix($invoice->document->filename),
                $invoice->document->name));

            $invoice->emailed_to = $contactInfo['email'];
            $invoice->save();
        }

        return $invoice;
    }

    public static function sendNotification(Invoice $invoice)
    {
        $orderController = new OrderController();
        $contactInfo = $orderController->getContactInfoForOrder($invoice->order->contact);

        if ($invoice->date_reminder_3) {
            InvoiceHelper::sendNotificationEmail($invoice->order->emailTemplateExhortation, $invoice);
            $invoice->date_exhortation = Carbon::today();
            $invoice->email_exhortation = $contactInfo['email'];
        } elseif ($invoice->date_reminder_2) {
            InvoiceHelper::sendNotificationEmail($invoice->order->emailTemplateReminder, $invoice);
            $invoice->date_reminder_3 = Carbon::today();
            $invoice->email_reminder_3 = $contactInfo['email'];
        } elseif ($invoice->date_reminder_1) {
            InvoiceHelper::sendNotificationEmail($invoice->order->emailTemplateReminder, $invoice);
            $invoice->date_reminder_2 = Carbon::today();
            $invoice->email_reminder_2 = $contactInfo['email'];
        } else {
            InvoiceHelper::sendNotificationEmail($invoice->order->emailTemplateReminder, $invoice);
            $invoice->date_reminder_1 = Carbon::today();
            $invoice->email_reminder_1 = $contactInfo['email'];
        }

        $invoice->save();

        return $invoice;
    }

    public static function sendNotificationEmail(EmailTemplate $emailTemplate = null, Invoice $invoice)
    {
        self::setMailConfigByInvoice($invoice);

        $orderController = new OrderController();
        $contactInfo = $orderController->getContactInfoForOrder($invoice->order->contact);

        if ($contactInfo['email'] === 'Geen e-mail bekend') {
            return false;
        }

        $mail = Mail::to($contactInfo['email']);

        $subject = 'Betalingsherinnering';

        if (!$emailTemplate) {
            $htmlBody = 'Beste ' . $contactInfo['contactPerson'] . ',';
            $htmlBody .= '<p>&nbsp;</p>';
            $htmlBody .= 'Uw heeft nog een openstaand nota: ' . $invoice->number . '.';
            $htmlBody .= '<p>&nbsp;</p>';
            $htmlBody .= 'Met vriendelijke groet,';
            $htmlBody .= '<p></p>';
            $htmlBody .= $invoice->administration->name;
        } else {
            $subject = $emailTemplate->subject ? $emailTemplate->subject : $subject;
            $htmlBody = $emailTemplate->html_body;
        }

        $user = Auth::user();

        $htmlBody = TemplateVariableHelper::replaceTemplateVariables($htmlBody,
            'ik', $user);

        $htmlBody = TemplateVariableHelper::replaceTemplateVariables($htmlBody,
            'contact', $invoice->order->contact);

        $htmlBody = TemplateVariableHelper::stripRemainingVariableTags($htmlBody);

        $htmlBody = '<!DOCTYPE html><html><head><meta http-equiv="content-type" content="text/html;charset=UTF-8"/><title>'
            . $subject . '</title></head>'
            . $htmlBody . '</html>';

        $subject = str_replace('{contactpersoon}', $contactInfo['contactPerson'], $subject);
        $htmlBody = str_replace('{contactpersoon}', $contactInfo['contactPerson'], $htmlBody);

        $mail->subject = $subject;
        $mail->html_body = $htmlBody;

        $mail->send(new InvoiceMail($mail, $htmlBody, Storage::disk('administrations')->getDriver()->getAdapter()->applyPathPrefix($invoice->document->filename), $invoice->document->name));

        return true;
    }

    public static function createInvoiceDocument(Invoice $invoice, $preview = false)
    {

        $img = '';
        if ($invoice->administration->logo_filename) {
            $path = storage_path('app' . DIRECTORY_SEPARATOR . 'administrations' . DIRECTORY_SEPARATOR . $invoice->administration->logo_filename);
            $logo = file_get_contents($path);

            $src = 'data:' . mime_content_type($path)
                . ';charset=binary;base64,' . base64_encode($logo);
            $src = str_replace(" ", "", $src);
            $img = '<img src="' . $src . '" width="auto" height="156px"/>';
        }

        InvoiceHelper::checkStorageDir($invoice->administration->id);

        $orderController = new OrderController();
        $contactPerson = $orderController->getContactInfoForOrder($invoice->order->contact)['contactPerson'];

        if ($invoice->order->contact->full_name === $contactPerson) {
            $contactPerson = null;
        }

        $contactName = null;

        if ($invoice->order->contact->type_id == 'person') {
            $prefix = $invoice->order->contact->person->last_name_prefix;
            $contactName = $prefix ? $invoice->order->contact->person->first_name . ' ' . $prefix . ' ' . $invoice->order->contact->person->last_name : $invoice->order->contact->person->first_name . ' ' . $invoice->order->contact->person->last_name;
        } elseif ($invoice->order->contact->type_id == 'organisation') {
            $contactName = $invoice->order->contact->full_name;
        }
        // indien preview, dan zijn we nu klaar om PDF te tonen
        if ($preview) {
            $pdf = PDF::loadView('invoices.generic', [
                'invoice' => $invoice,
                'contactPerson' => $contactPerson,
                'contactName' => $contactName,
                'logo' => $img,
            ]);
            return $pdf->output();
        }

        // indien geen preview, dan gaan nu definitief notanummer bepalen
        $currentYear = Carbon::now()->year;

        // Haal new notanummer op (voor dit jaar en administratie)
        $newInvoiceNumber = InvoiceHelper::newInvoiceNumber($currentYear, $invoice->administration_id);

        if(Invoice::where('administration_id', $invoice->administration_id)->where('invoice_number', '=', $newInvoiceNumber)->whereYear('created_at', '=', $currentYear)->exists())
        {
            Log::error("Voor nota met ID " . $invoice->id . " kon geen nieuw notanummer bepaald worden.");
            self::invoicePdfIsNotCreated($invoice);
            return false;
        }else{
            $invoice->invoice_number = $newInvoiceNumber;
            $invoice->number = 'F' . $currentYear . '-' . $newInvoiceNumber;
            $invoice->save();
        }

        // nu we nieuw notanummer hebben kunnen we PDF maken
        $pdf = PDF::loadView('invoices.generic', [
            'invoice' => $invoice,
            'contactPerson' => $contactPerson,
            'contactName' => $contactName,
            'logo' => $img,
        ]);

        $name = $invoice->number . '.pdf';

        $path = 'administration_' . $invoice->administration->id
            . DIRECTORY_SEPARATOR . 'invoices' . DIRECTORY_SEPARATOR . $name;

        $filePath = (storage_path('app' . DIRECTORY_SEPARATOR . 'administrations' . DIRECTORY_SEPARATOR) . $path);

        $pdf->save($filePath);

        $invoiceDocument = new InvoiceDocument();
        $invoiceDocument->invoice_id = $invoice->id;
        $invoiceDocument->filename = $path;
        $invoiceDocument->name = $name;
        $invoiceDocument->save();

        self::invoicePdfIsCreated($invoice);

        return true;
    }

    public static function checkStorageDir($administration_id)
    {
        //Check if storage map exists
        $storageDir = Storage::disk('administrations')->getDriver()->getAdapter()->getPathPrefix() . DIRECTORY_SEPARATOR . 'administration_' . $administration_id . DIRECTORY_SEPARATOR . 'invoices';

        if (!is_dir($storageDir)) {
            mkdir($storageDir, 0777, true);
        }
    }

    public static function setMailConfigByInvoice(Invoice $invoice)
    {
        // Standaard vanuit primaire mailbox mailen
        $mailboxToSendFrom = Mailbox::getDefault();;

        // Als er een mailbox aan de administratie is gekoppeld, dan deze gebruiken
        if ($invoice->administration->mailbox) {
            $mailboxToSendFrom = $invoice->administration->mailbox;
        }

        // Configuratie instellen als er een mailbox is gevonden
        if ($mailboxToSendFrom) {
            (new EmailHelper())->setConfigToMailbox($mailboxToSendFrom);
        }
    }

    public static function invoiceInProgress(Invoice $invoice)
    {
        //Nota moet nog status to-send hebben en mag niet al voorkomen in tabel invoicesToSend
        if($invoice->status_id !== 'to-send')
        {
            abort(404, "Nota met ID " . $invoice->id . " heeft geen status Te verzenden");
        }
        else
        {
            if($invoice->invoicesToSend)
            {
                abort(404, "Nota met ID " . $invoice->id . " is al aangevraagd om te verzenden");
            }

            // We zetten nota voorlopig in progress zolang we bezig met maken (en evt. verzenden) van deze nota.
            $invoice->status_id = 'in-progress';
            $invoice->save();

            $invoicesToSend = new InvoicesToSend();
            $invoice->invoicesToSend()->save($invoicesToSend);
        }
    }
    public static function invoiceIsSending(Invoice $invoice)
    {
        //Nota moet nog status in-progress hebben
        if($invoice->status_id === 'in-progress')
        {
            $invoice->status_id = 'is-sending';
            $invoice->save();
        }
    }
    public static function invoiceIsResending(Invoice $invoice)
    {
        //Nota moet nog status in-progress hebben
        if($invoice->status_id === 'error-sending')
        {
            $invoice->status_id = 'is-resending';
            $invoice->save();
        }
    }
    public static function invoiceSend(Invoice $invoice)
    {
        //Nota moet nog status is-sending hebben
        if($invoice->status_id === 'is-sending' || $invoice->status_id === 'is-resending')
        {
            //Haal nota uit tabel invoices-to-send
            $invoice->invoicesToSend()->delete();
            //Status sent
            $invoice->status_id = 'sent';
            $invoice->save();
        }
    }
    public static function invoicePdfIsCreated(Invoice $invoice)
    {
        $invoicesToSend = $invoice->invoicesToSend()->first();
        $invoicesToSend->invoice_created = true;
        $invoice->invoicesToSend()->save($invoicesToSend);
    }
    public static function invoicePdfIsNotCreated(Invoice $invoice)
    {
        //Nota moet nog status in-progress hebben
        if($invoice->status_id === 'in-progress')
        {
            //Haal nota weer uit tabel invoices-to-send
            $invoice->invoicesToSend()->delete();
            //Status terug naar to-send
            $invoice->status_id = 'to-send';
            $invoice->date_sent = null;
            $invoice->save();
        }
    }
    public static function invoiceErrorSending(Invoice $invoice)
    {
        //Nota moet nog status is-sending hebben
        if($invoice->status_id === 'is-sending' || $invoice->status_id === 'is-resending')
        {
            //Status naar error-send
            $invoice->status_id = 'error-sending';
            $invoice->save();
        }
    }

    private static function newInvoiceNumber($year, $administrationId){

        $invoiceNumber = InvoiceNumber::firstOrNew(
            [
                'number_type' => "invoice",
                'number_year' => $year,
                'administration_id' => $administrationId
            ]
        );
        $invoiceNumber->last_used_number = ($invoiceNumber->last_used_number + 1);
        $invoiceNumber->save();

        return $invoiceNumber->last_used_number;
    }

}