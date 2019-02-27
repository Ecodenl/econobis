<?php

namespace App\Helpers\Invoice;

use App\Eco\EmailTemplate\EmailTemplate;
use App\Eco\Invoice\Invoice;
use App\Eco\Invoice\InvoiceDocument;
use App\Eco\Invoice\InvoicePayment;
use App\Eco\Invoice\InvoiceProduct;
use App\Eco\Mailbox\Mailbox;
use App\Eco\Order\Order;
use App\Helpers\Email\EmailHelper;
use App\Helpers\Template\TemplateVariableHelper;
use App\Http\Controllers\Api\Order\OrderController;
use App\Http\Resources\Invoice\Templates\InvoiceMail;
use Barryvdh\DomPDF\Facade as PDF;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
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
            if ($orderProduct->product->currentPrice) {
                if ($orderProduct->product->currentPrice->has_variable_price) {
                    $price = $orderProduct->variable_price;
                } else {
                    $price = $orderProduct->product->currentPrice->price;
                }
                switch ($orderProduct->product->invoice_frequency_id) {
                    case 'monthly':
                        $price = $price * 12;
                        break;
                    case 'quarterly':
                        $price = $price * 4;
                        break;
                    case 'half-year':
                        $price = $price * 2;
                        break;
                    default:
                        $price = $price;
                        break;
                }

                switch ($orderProduct->order->collection_frequency_id) {
                    case 'monthly':
                        $price = $price / 12;
                        break;
                    case 'quarterly':
                        $price = $price / 4;
                        break;
                    case 'half-year':
                        $price = $price / 2;
                        break;
                    default:
                        $price = $price;
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
            $invoiceProduct->vat_percentage = $orderProduct->product->currentPrice ? $orderProduct->product->currentPrice->vat_percentage : 0;
            $invoiceProduct->product_code = $orderProduct->product->code;
            $invoiceProduct->product_name = $orderProduct->product->name;
            $invoiceProduct->description = $orderProduct->product->invoice_text;
            $invoiceProduct->twinfield_ledger_code = $orderProduct->product->twinfield_ledger_code;

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
        if ($invoice->amount_open == 0) {
            $invoice->status_id = 'paid';
        }

        $invoice->save();
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
        self::setMailConfigByInvoice($invoice);

        if (!$preview) {
            $invoice->status_id = 'sent';
            $invoice->date_sent = Carbon::today();
            $invoice->save();
            InvoiceHelper::createInvoiceDocument($invoice);
        }

        $orderController = new OrderController();
        $contactInfo
            = $orderController->getContactInfoForOrder($invoice->order->contact);

        if ($contactInfo['email'] === 'Geen e-mail bekend') {
            if ($preview) {
                return [
                    'to' => 'Geen e-mailadres bekend',
                    'subject' => 'Geen e-mailadres bekend',
                    'htmlBody' => 'Geen e-mailadres bekend',
                ];
            }
            return false;
        }

        $subject = 'Factuur';
        $htmlBody = 'Beste ' . $contactInfo['contactPerson'] . ',';
        $htmlBody .= '<p>&nbsp;</p>';
        $htmlBody .= 'Hierbij uw factuur: ' . $invoice->number . '.';
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

        $htmlBody = TemplateVariableHelper::replaceTemplateVariables($htmlBody,
            'ik', $user);

        $htmlBody = TemplateVariableHelper::replaceTemplateVariables($htmlBody,
            'contact', $invoice->order->contact);

        $htmlBody = TemplateVariableHelper::stripRemainingVariableTags($htmlBody);

        $htmlBody
            = '<!DOCTYPE html><html><head><meta http-equiv="content-type" content="text/html;charset=UTF-8"/><title>'
            . $subject . '</title></head>'
            . $htmlBody . '</html>';

        $mail = Mail::to($contactInfo['email']);

        $subject = str_replace('{contactpersoon}', $contactInfo['contactPerson'], $subject);
        $htmlBody = str_replace('{contactpersoon}', $contactInfo['contactPerson'], $htmlBody);

        $mail->subject = $subject;
        $mail->html_body = $htmlBody;

        if ($preview) {
            return [
                'to' => $contactInfo['email'],
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


        if ($preview) {
            return [
                'to' => 'Factuur zal per post moeten worden verstuurd',
                'subject' => 'Factuur zal per post moeten worden verstuurd',
                'htmlBody' => 'Factuur zal per post moeten worden verstuurd',
            ];
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
            $htmlBody .= 'Uw heeft nog een openstaand factuur: ' . $invoice->number . '.';
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

        $pdf = PDF::loadView('invoices.generic', [
            'invoice' => $invoice,
            'contactPerson' => $contactPerson,
            'contactName' => $contactName,
            'logo' => $img,
        ]);

        if ($preview) {
            return $pdf->output();
        }

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
        $mailboxToSendFrom = Mailbox::where('primary', 1)->first();

        // Als er een mailbox aan de administratie is gekoppeld, dan deze gebruiken
        if ($invoice->administration->mailbox) {
            $mailboxToSendFrom = $invoice->administration->mailbox;
        }

        // Configuratie instellen als er een mailbox is gevonden
        if ($mailboxToSendFrom) {
            (new EmailHelper())->setConfigToMailbox($mailboxToSendFrom);
        }
    }

}