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

    public function __construct($validatedInvoices, $userId, $dateCollection, $administration, $paymentTypeId)
    {
        $this->validatedInvoices = $validatedInvoices;
        $this->userId = $userId;
        $this->dateCollection = $dateCollection;
        $this->administration = $administration;
        $this->paymentTypeId = $paymentTypeId;

        $jobLog = new JobsLog();
        $jobLog->value = "Start alle nota's verzenden.";
        $jobLog->user_id = $userId;
        $jobLog->save();
    }

    public function handle()
    {
        //user voor observer
        Auth::setUser(User::find($this->userId));

        foreach ($this->validatedInvoices as $invoice) {
            //invoice document maken (niet bij resenden)
            // We leggen ook al date_sent en date_collection vast (deze wordt nl. gebruikt als notadatum op de nota en hebben we
            // dus nodig bij maken nota (PDF).
            if($invoice->status_id !== 'is-resending'){
                $invoice->date_sent = Carbon::today();
                $invoice->date_collection = $this->dateCollection;
                $invoice->save();
                InvoiceHelper::createInvoiceDocument($invoice);
            }
        }

        foreach ($this->validatedInvoices as $invoice) {
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
            }
        }

        if ($this->paymentTypeId === 'collection') {
            // haal niet goed aangemaakte notas uit list voor SEPA file
            $validatedInvoices = $this->validatedInvoices->reject(function ($invoice) {
                return ($invoice->invoicesToSend()->exists()
                    && !$invoice->invoicesToSend()->first()->invoice_created);
            });

            $sepaHelper = new SepaHelper($this->administration, $validatedInvoices);
            $sepa = $sepaHelper->generateSepaFile();
//            return $sepaHelper->downloadSepa($sepa);
        }

        $jobLog = new JobsLog();
        $jobLog->value = "Alle nota's verzonden.";
        $jobLog->user_id = $this->userId;
        $jobLog->save();
    }

    public function failed(\Exception $exception)
    {
        $jobLog = new JobsLog();
        $jobLog->value = "Nota's maken mislukt.";
        $jobLog->user_id = $this->userId;
        $jobLog->save();

        Log::error("Nota's maken mislukt:" . $exception->getMessage());
    }
}