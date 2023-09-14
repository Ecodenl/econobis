<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 04-01-2018
 * Time: 16:06
 */

namespace App\Jobs\Invoice;


use App\Eco\Email\Email;
use App\Eco\Jobs\JobsLog;
use App\Eco\User\User;
use App\Helpers\Invoice\InvoiceHelper;
use App\Helpers\Sepa\SepaHelper;
use App\Http\Controllers\Api\Order\OrderController;
use Carbon\Carbon;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class SendAllInvoices implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * @var Email
     */
    private $validatedInvoices;
    private $userId;
    private $dateCollection;
    private $administration;
    private $paymentTypeId;
    private $countInvoices;
    private $invoicesOk;
    private $invoicesError;

    public function __construct($validatedInvoices, $userId, $dateCollection, $administration, $paymentTypeId)
    {
        $this->validatedInvoices = $validatedInvoices;
        $this->userId = $userId;
        $this->dateCollection = $dateCollection;
        $this->administration = $administration;
        $this->paymentTypeId = $paymentTypeId;

        $countInvoices = $validatedInvoices ? $validatedInvoices->count() : 0;
        $this->countInvoices = $countInvoices;
        $this->invoicesOk = 0;
        $this->invoicesError = 0;

        $jobLog = new JobsLog();
        $jobLog->value = "Start alle nota's (". $countInvoices .") definitief maken/verzenden.";
        $jobLog->job_category_id = 'sent-invoice';
        $jobLog->user_id = $userId;
        $jobLog->save();
    }

    public function handle()
    {
        //user voor observer
        Auth::setUser(User::find($this->userId));
        $orderController = new OrderController();

        foreach ($this->validatedInvoices as $invoice) {
            $contactInfo = $orderController->getContactInfoForOrder($invoice->order->contact);

            $jobLog = new JobsLog();
            $jobLog->value = 'Start definitief maken en versturen nota ('.$invoice->id.') naar '.$contactInfo['contactPerson'].' ('.$invoice->order->contact_id.').';
            $jobLog->job_category_id = 'sent-invoice';
            $jobLog->user_id = $this->userId;
            $jobLog->save();

            // invoice document maken (niet bij resenden, dus alleen bij in-progress) en alleen indien $invoice->invoice_number nog 0 is.
            // We leggen ook al date_sent en date_collection vast (deze wordt nl. gebruikt als notadatum op de nota en hebben we
            // dus nodig bij maken nota (PDF).
            if($invoice->status_id === 'in-progress' && $invoice->invoice_number === 0 ){
                $invoice->date_sent = Carbon::today();
                $invoice->date_collection = $this->dateCollection;
                $invoice->save();
                InvoiceHelper::createInvoiceDocument($invoice);
            }
        }
        $response = [];

        foreach ($this->validatedInvoices as $invoice) {
            $contactInfo = $orderController->getContactInfoForOrder($invoice->order->contact);

            //alleen als nota goed is aangemaakt, gaan we mailen
            if ($invoice->invoicesToSend()->exists() && $invoice->invoicesToSend()->first()->invoice_created) {
                if($invoice->status_id === 'in-progress') {
                    InvoiceHelper::invoiceIsSending($invoice);
                }
                if($invoice->status_id === 'is-resending'){
                    $invoice->date_sent = Carbon::today();
                    $invoice->date_collection = $this->dateCollection;
                }
                try {
                    $invoiceResponse = InvoiceHelper::send($invoice);
                    InvoiceHelper::invoiceSend($invoice);
                    array_push($response, $invoiceResponse);
                } catch (\Exception $e) {
                    Log::error($e->getMessage());
                    InvoiceHelper::invoiceErrorSending($invoice);
                }
            }else{
                if($invoice->status_id === 'is-resending'){
                    InvoiceHelper::invoiceErrorSending($invoice);
                }
            }

            $jobLog = new JobsLog();
            if($invoice->status_id === 'sent'){
                $this->invoicesOk += 1;
                $jobLog->value = 'Definitief maken en versturen nota '.$invoice->number.' ('.$invoice->id.') naar '.$contactInfo['contactPerson'].' ('.$invoice->order->contact_id.') voltooid.';
            }else{
                $this->invoicesError += 1;
                $jobLog->value = 'Definitief maken en versturen nota '.$invoice->number.' ('.$invoice->id.') naar '.$contactInfo['contactPerson'].' ('.$invoice->order->contact_id.') mislukt. Status: '.$invoice->status_id;
            }
            $jobLog->job_category_id = 'sent-invoice';
            $jobLog->user_id = $this->userId;
            $jobLog->save();

        }

        if ($this->paymentTypeId === 'collection') {
            // haal niet goed aangemaakte notas uit list voor SEPA file
            $validatedInvoices = $this->validatedInvoices->reject(function ($invoice) {
                return ($invoice->invoicesToSend()->exists()
                    && !$invoice->invoicesToSend()->first()->invoice_created);
            });

            $sepaHelper = new SepaHelper($this->administration, $validatedInvoices);
// sent invoice now in queue (jobs), so download sepa when done not possible anymore
//            $sepa = $sepaHelper->generateSepaFile();
//            return $sepaHelper->downloadSepa($sepa);
            $sepaHelper->generateSepaFile();
        }

        $jobLog = new JobsLog();
        if($this->invoicesError>0){
            $jobLog->value = "Fouten bij definitief maken/verzenden nota's. Verzonden nota's: ".$this->invoicesOk.". Niet verzonden nota's: ".$this->invoicesError."." ;
        }else{
            $jobLog->value = "Alle nota's (".$this->countInvoices.") definitief gemaakt en verzonden";
        }
        $jobLog->job_category_id = 'sent-invoice';
        $jobLog->user_id = $this->userId;
        $jobLog->save();
    }

    public function failed(\Throwable $exception)
    {
        $jobLog = new JobsLog();
        $jobLog->value = "Nota's definitief maken/verzenden mislukt.";
        $jobLog->job_category_id = 'sent-invoice';
        $jobLog->user_id = $this->userId;
        $jobLog->save();

        Log::error("Nota's definitief maken/verzenden mislukt: " . $exception->getMessage());
    }
}