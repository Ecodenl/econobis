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
use Carbon\Carbon;
use iio\libmergepdf\Merger;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class CreateAllInvoicesPost implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * @var Email
     */
    public $timeout = 300;
    private $chunkNumber;
    private $numberOfChunks;
    private $administrationId;
    private $validatedInvoicesSet;
    private $userId;
    private $countValidatedInvoicesSet;
    private $validatedInvoicesOk;
    private $validatedInvoicesError;
    private $dateCollection;

    public function __construct($chunkNumber, $numberOfChunks, $administrationId, $validatedInvoicesSet, $userId, $dateCollection)
    {
        $this->first = true;
        $this->chunkNumber = $chunkNumber;
        $this->numberOfChunks = $numberOfChunks;
        $this->administrationId = $administrationId;
        $this->validatedInvoicesSet = $validatedInvoicesSet;
        $this->userId = $userId;
        $this->dateCollection = $dateCollection;

        $countValidatedInvoicesSet = $validatedInvoicesSet ? $validatedInvoicesSet->count() : 0;
        $this->countValidatedInvoicesSet = $countValidatedInvoicesSet;
        $this->validatedInvoicesOk = 0;
        $this->validatedInvoicesError = 0;

        $jobLog = new JobsLog();
        $jobLog->value = "Start nota's (" . ($countValidatedInvoicesSet) . ") maken voor post (" . $this->chunkNumber . "/" . $this->numberOfChunks . ").";
        $jobLog->job_category_id = 'create-invoice-post';
        $jobLog->user_id = $userId;
        $jobLog->save();
    }

    public function handle()
    {
        //user voor observer
        Auth::setUser(User::find($this->userId));

        foreach ($this->validatedInvoicesSet as $validatedInvoice) {

            $jobLog = new JobsLog();
            $jobLog->value = 'Start maken nota (' . ($validatedInvoice->id) . ') voor ' . ($validatedInvoice->order->contact->full_name) . ' (' . ($validatedInvoice->order->contact->id) . ').';
            $jobLog->job_category_id = 'create-invoice-post';
            $jobLog->user_id = $this->userId;
            $jobLog->save();

            $validatedInvoice->date_sent = Carbon::today();
            $validatedInvoice->date_collection = $this->dateCollection;
            $validatedInvoice->save();

            $pdf = InvoiceHelper::createInvoiceDocument($validatedInvoice);
            if (!empty($pdf)) {
                InvoiceHelper::invoiceIsSending($validatedInvoice);
                InvoiceHelper::invoiceSend($validatedInvoice);
            }
            $jobLog = new JobsLog();
            $dateTime = Carbon::now()->format("Y-m-d-H-i-s");
            $invoiceReference = 'Post-notas-' . $dateTime;

            if(!empty($pdf) && $validatedInvoice->status_id === 'sent'){
                $this->validatedInvoicesOk += 1;
                $jobLog->value = 'Maken nota ' . ($invoiceReference) . ' (' . ($validatedInvoice->id) . ') voor ' . ($validatedInvoice->order->contact->full_name) . ' (' . ($validatedInvoice->order->contact->id) . ') voltooid.';
            }else{
                $this->validatedInvoicesError += 1;
                $jobLog->value = 'Maken nota ' . ($invoiceReference) . ' (' . $validatedInvoice->id.') voor ' . ($validatedInvoice->order->contact->full_name) . ' (' . ($validatedInvoice->order->contact->id) . ') mislukt. Status: '.$validatedInvoice->status_id;
            }
            $jobLog->job_category_id = 'create-invoice-post';
            $jobLog->user_id = $this->userId;
            $jobLog->save();

            $createdPdfs[] = $pdf;
        }

        $invoicePost = New InvoicePost();
        $invoicePost->administration_id = $this->administrationId;
        $invoicePost->invoice_ids = implode(',', $this->validatedInvoicesSet->pluck('id')->toArray() );
        $invoicePost->contact_ids = implode(',', $this->validatedInvoicesSet->pluck('order.contact_id')->toArray() );
        $invoicePost->filename = '';
        $invoicePost->name = 'Wordt gemaakt...';

        $invoicePost->save();

        if($this->numberOfChunks > 1){
            $name = 'Post-notas-part-' . $this->chunkNumber . "-of-" . $this->numberOfChunks . "-" . $dateTime . '.pdf';
        } else {
            $name = 'Post-notas-' . $dateTime . '.pdf';
        }

        $path = 'administration_' . $validatedInvoice->administration->id
            . DIRECTORY_SEPARATOR . 'invoices' . DIRECTORY_SEPARATOR . $name;

//        todo WM: opschonen
//        $filePath = (storage_path('app' . DIRECTORY_SEPARATOR . 'administrations' . DIRECTORY_SEPARATOR) . $path);
        $filePath = Storage::disk('administrations')->path($path);

        $merger = new Merger;
        foreach ($createdPdfs as $createdPdf){
//            todo WM: opschonen
//            $merger->addFile(storage_path('app' . DIRECTORY_SEPARATOR . 'administrations' . DIRECTORY_SEPARATOR) . $createdPdf);
            $addFilePath = Storage::disk('administrations')->path($createdPdf);
            $merger->addFile($addFilePath);
        }
        $createdPdf = $merger->merge();
        file_put_contents($filePath, $createdPdf);

        $invoicePost->filename = $path;
        $invoicePost->name = $name;
        $invoicePost->save();

        $jobLog = new JobsLog();
        if($this->validatedInvoicesError>0){
            $jobLog->value = "Fouten bij maken nota's voor post (" . $this->chunkNumber . "/" . $this->numberOfChunks . ") (id: " . $invoicePost->id . "). Aangemaakte nota's: " . ($this->validatedInvoicesOk) . ". Niet aangemaakte nota's: " . ($this->validatedInvoicesError) . "." ;
        }else{
            $jobLog->value = "Nota's (" . ($this->countValidatedInvoicesSet) . ") gemaakt voor post (" . $this->chunkNumber . "/" . $this->numberOfChunks . ") (id: " . $invoicePost->id . ").";
        }
        $jobLog->job_category_id = 'create-invoice-post';
        $jobLog->user_id = $this->userId;
        $jobLog->save();

        //cleanup
        unset($this->chunkNumber);
        unset($this->numberOfChunks);
        unset($this->administrationId);
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
        $jobLog->value = "Nota's maken mislukt voor post (" . $this->chunkNumber . "/". $this->numberOfChunks . ")";
        $jobLog->job_category_id = 'create-invoice-post';
        $jobLog->user_id = $this->userId;
        $jobLog->save();

        Log::error("Nota's maken mislukt voor post (" . $this->chunkNumber . "/". $this->numberOfChunks . "): " . $exception->getMessage());
    }
}