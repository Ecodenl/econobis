<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 04-01-2018
 * Time: 16:06
 */

namespace App\Jobs\Invoice;


use App\Eco\Email\Email;
use App\Eco\Invoice\InvoicePost;
use App\Eco\Jobs\JobsLog;
use App\Eco\User\User;
use App\Helpers\Invoice\InvoiceHelper;
//use App\Http\Controllers\Api\Invoice\InvoiceContactController;
use Carbon\Carbon;
use iio\libmergepdf\Merger;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class CreateAllInvoicesPost implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * @var Email
     */
    public $timeout = 300;
    private $chunkNumber;
    private $numberOfChunks;
    private $validatedInvoicesSet;
    private $userId;
    private $countValidatedInvoicesSet;
    private $validatedInvoicesOk;
    private $validatedInvoicesError;
    private $invoiceId;

    public function __construct($chunkNumber, $numberOfChunks, $invoiceId, $validatedInvoicesSet, $userId)
    {
        $this->first = true;
        $this->chunkNumber = $chunkNumber;
        $this->numberOfChunks = $numberOfChunks;
        $this->invoiceId = $invoiceId;
        $this->validatedInvoicesSet = $validatedInvoicesSet;
        $this->userId = $userId;

        $countValidatedInvoicesSet = $validatedInvoicesSet ? $validatedInvoicesSet->count() : 0;
        $this->countValidatedInvoicesSet = $countValidatedInvoicesSet;
        $this->validatedInvoicesOk = 0;
        $this->validatedInvoicesError = 0;

        $jobLog = new JobsLog();
        $jobLog->value = "Start notas (" . ($countValidatedInvoicesSet) . ") maken voor post (" . $this->chunkNumber . "/" . $this->numberOfChunks . ").";
        $jobLog->job_category_id = 'create-invoices-post';
        $jobLog->user_id = $userId;
        $jobLog->save();
    }

    public function handle()
    {
        //user voor observer
        Auth::setUser(User::find($this->userId));

        foreach ($this->validatedInvoicesSet as $validatedInvoice) {

            $jobLog = new JobsLog();
            $jobLog->value = 'Start maken waardestaat (' . ($validatedInvoice->id) . ') voor ' . ($validatedInvoice->order->contact->full_name) . ' (' . ($validatedInvoice->order->contact->id) . ').';
            $jobLog->job_category_id = 'create-invoices-post';
            $jobLog->user_id = $this->userId;
            $jobLog->save();

            $validatedInvoice->date_sent = Carbon::today();
            //todo: moet er nog weer in
//            $validatedInvoice->date_collection = $request->input('dateCollection');
            $validatedInvoice->save();

            $pdf = InvoiceHelper::createInvoiceDocument($validatedInvoice);
            if (!empty($pdf)) {
                InvoiceHelper::invoiceIsSending($validatedInvoice);
                InvoiceHelper::invoiceSend($validatedInvoice);
            }
            $jobLog = new JobsLog();
            $notaReference = 'Post-notas-' . Carbon::now()->format("Y-m-d-H-i-s");

            if(!empty($pdf) && $validatedInvoice->status_id === 'sent'){
                $this->validatedInvoicesOk += 1;
                $jobLog->value = 'Maken nota ' . ($notaReference) . ' (' . ($validatedInvoice->id) . ') voor ' . ($validatedInvoice->order->contact->full_name) . ' (' . ($validatedInvoice->order->contact->id) . ') voltooid.';
            }else{
                $this->validatedInvoicesError += 1;
                $jobLog->value = 'Maken nota ' . ($notaReference) . ' (' . $validatedInvoice->id.') voor ' . ($validatedInvoice->order->contact->full_name) . ' (' . ($validatedInvoice->order->contact->id) . ') mislukt. Status: '.$validatedInvoice->status_id;
            }
            $jobLog->job_category_id = 'create-invoices-post';
            $jobLog->user_id = $this->userId;
            $jobLog->save();

            $createdPdfs[] = $pdf;
        }

        $invoicePost = New InvoicePost();
        $invoicePost->invoice_id = $this->invoiceId;
        $invoicePost->invoice_contact_ids = implode(',', $this->validatedInvoicesSet->pluck('id')->toArray() );
        $invoicePost->filename = '';
        $invoicePost->name = 'Wordt gemaakt...';

        $invoicePost->save();

        $name = 'Post-notas-' . Carbon::now()->format("Y-m-d-H-i-s") . '.pdf';

        $path = 'administration_' . $validatedInvoice->administration->id
            . DIRECTORY_SEPARATOR . 'notas' . DIRECTORY_SEPARATOR . $name;

        $filePath = (storage_path('app' . DIRECTORY_SEPARATOR . 'administrations' . DIRECTORY_SEPARATOR) . $path);

        //todo: hier gaat nog iets fout
        $merger = new Merger;
        foreach ($createdPdfs as $createdPdf){
            Log::info(storage_path('app' . DIRECTORY_SEPARATOR . 'administrations' . DIRECTORY_SEPARATOR) . $createdPdf);
            $merger->addFile(storage_path('app' . DIRECTORY_SEPARATOR . 'administrations' . DIRECTORY_SEPARATOR) . $createdPdf);
        }
        $createdPdf = $merger->merge();
        file_put_contents($filePath, $createdPdf);

        $invoicePost->filename = $path;
        $invoicePost->name = $name;
        $invoicePost->save();

        $jobLog = new JobsLog();
        if($this->validatedInvoicesError>0){
            $jobLog->value = "Fouten bij maken notas voor post (" . $this->chunkNumber . "/" . $this->numberOfChunks . ") (id: " . $invoicePost->id . "). Aangemaakte waardestaten: " . ($this->validatedInvoicesOk) . ". Niet aangemaakte waardestaten: " . ($this->validatedInvoicesError) . "." ;
        }else{
            $jobLog->value = "Notas (" . ($this->countValidatedInvoicesSet) . ") gemaakt voor post (" . $this->chunkNumber . "/" . $this->numberOfChunks . ") (id: " . $InvoicePost->id . ").";
        }
        $jobLog->job_category_id = 'create-invoice-contact-post';
        $jobLog->user_id = $this->userId;
        $jobLog->save();

        //cleanup
        unset($this->chunkNumber);
        unset($this->numberOfChunks);
        unset($this->validatedInvoicesSet);
        unset($this->userId);
        unset($this->countValidatedInvoicesSet);
        unset($this->validatedInvoicesOk);
        unset($this->validatedInvoicesError);
        gc_collect_cycles();

    }

    public function failed(\Throwable $exception)
    {
        $jobLog = new JobsLog();
        $jobLog->value = "Notas maken mislukt voor post (" . $this->chunkNumber . "/". $this->numberOfChunks . ")";
        $jobLog->job_category_id = 'create-invoice-contact-post';
        $jobLog->user_id = $this->userId;
        $jobLog->save();

        Log::error("Notas maken mislukt voor post (" . $this->chunkNumber . "/". $this->numberOfChunks . "): " . $exception->getMessage());
    }
}