<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 04-01-2018
 * Time: 16:06
 */

namespace App\Jobs\FinancialOverview;


use App\Eco\Email\Email;
use App\Eco\FinancialOverview\FinancialOverviewPost;
use App\Eco\Jobs\JobsLog;
use App\Eco\User\User;
use App\Helpers\FinancialOverview\FinancialOverviewHelper;
use Carbon\Carbon;
use iio\libmergepdf\Merger;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class CreateAllFinancialOverviewContactsPost implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * @var Email
     */
    public $timeout = 300;
    private $chunkNumber;
    private $numberOfChunks;
    private $financialOverviewId;
    private $validatedFinancialOverviewContactsSet;
    private $userId;
    private $countFinancialOverviewContacts;
    private $financialOverviewContactsOk;
    private $financialOverviewContactsError;

    public function __construct($chunkNumber, $numberOfChunks, $financialOverviewId, $validatedFinancialOverviewContactsSet, $userId)
    {
        $this->first = true;
        $this->chunkNumber = $chunkNumber;
        $this->numberOfChunks = $numberOfChunks;
        $this->financialOverviewId = $financialOverviewId;
        $this->validatedFinancialOverviewContactsSet = $validatedFinancialOverviewContactsSet;
        $this->userId = $userId;

        $countFinancialOverviewContacts = $validatedFinancialOverviewContactsSet ? $validatedFinancialOverviewContactsSet->count() : 0;
        $this->countFinancialOverviewContacts = $countFinancialOverviewContacts;
        $this->financialOverviewContactsOk = 0;
        $this->financialOverviewContactsError = 0;

        $jobLog = new JobsLog();
        $jobLog->value = "Start waardestaten (" . ($countFinancialOverviewContacts) . ") maken voor post (" . $this->chunkNumber . "/" . $this->numberOfChunks . ").";
        $jobLog->job_category_id = 'create-financial-overview-contact-post';
        $jobLog->user_id = $userId;
        $jobLog->save();
    }

    public function handle()
    {
        //user voor observer
        Auth::setUser(User::find($this->userId));

        foreach ($this->validatedFinancialOverviewContactsSet as $financialOverviewContact) {

            $jobLog = new JobsLog();
            $jobLog->value = 'Start maken waardestaat (' . ($financialOverviewContact->id) . ') voor ' . ($financialOverviewContact->contact->full_name) . ' (' . ($financialOverviewContact->contact->id) . ').';
            $jobLog->job_category_id = 'create-financial-overview-contact-post';
            $jobLog->user_id = $this->userId;
            $jobLog->save();

            $financialOverviewContact->date_sent = Carbon::today();
            $financialOverviewContact->save();

            $pdf = FinancialOverviewHelper::createFinancialOverviewContactDocument($financialOverviewContact);
            if (!empty($pdf)) {
                FinancialOverviewHelper::financialOverviewContactIsSending($financialOverviewContact);
                FinancialOverviewHelper::financialOverviewContactSend($financialOverviewContact);
            }
            $jobLog = new JobsLog();
            $dateTime = Carbon::now()->format("Y-m-d-H-i-s");

            if($financialOverviewContact->financialOverview->administration->administration_code){
                $financialOverviewContactReference = 'WS-' . $financialOverviewContact->financialOverview->year . '-' . $financialOverviewContact->financialOverview->administration->administration_code . '-' . $financialOverviewContact->contact->number;
            } else {
                $financialOverviewContactReference = 'WS-' . $financialOverviewContact->financialOverview->year . '-' . $financialOverviewContact->contact->number . '-' . $financialOverviewContact->financialOverview->id;
            }

            if(!empty($pdf) && $financialOverviewContact->status_id === 'sent'){
                $this->financialOverviewContactsOk += 1;
                $jobLog->value = 'Maken waardestaat ' . ($financialOverviewContactReference) . ' (' . ($financialOverviewContact->id) . ') voor ' . ($financialOverviewContact->contact->full_name) . ' (' . ($financialOverviewContact->contact->id) . ') voltooid.';
            }else{
                $this->financialOverviewContactsError += 1;
                $jobLog->value = 'Maken waardestaat ' . ($financialOverviewContactReference) . ' (' . $financialOverviewContact->id.') voor ' . ($financialOverviewContact->contact->full_name) . ' (' . ($financialOverviewContact->contact->id) . ') mislukt. Status: '.$financialOverviewContact->status_id;
            }
            $jobLog->job_category_id = 'create-financial-overview-contact-post';
            $jobLog->user_id = $this->userId;
            $jobLog->save();

            $createdPdfs[] = $pdf;
        }

        $financialOverviewPost = New FinancialOverviewPost();
        $financialOverviewPost->financial_overview_id = $this->financialOverviewId;
        $financialOverviewPost->financial_overview_contact_ids = implode(',', $this->validatedFinancialOverviewContactsSet->pluck('id')->toArray() );
        $financialOverviewPost->filename = '';
        $financialOverviewPost->name = 'Wordt gemaakt...';

        $financialOverviewPost->save();

        if($this->numberOfChunks > 1){
            $name = 'Post-waardestaten-' . $financialOverviewPost->id . '-part-' . $this->chunkNumber . "-of-" . $this->numberOfChunks . "-" . $dateTime . '.pdf';
        } else {
            $name = 'Post-waardestaten-' . $financialOverviewPost->id . '-' . $dateTime . '.pdf';
        }

        $path = 'administration_' . $financialOverviewContact->financialOverview->administration->id
            . DIRECTORY_SEPARATOR . 'financial-overviews' . DIRECTORY_SEPARATOR . $name;

        $filePath = (storage_path('app' . DIRECTORY_SEPARATOR . 'administrations' . DIRECTORY_SEPARATOR) . $path);

        $merger = new Merger;
        foreach ($createdPdfs as $createdPdf){
            $merger->addFile(storage_path('app' . DIRECTORY_SEPARATOR . 'administrations' . DIRECTORY_SEPARATOR) . $createdPdf);
        }
        $createdPdf = $merger->merge();
        file_put_contents($filePath, $createdPdf);

        $financialOverviewPost->filename = $path;
        $financialOverviewPost->name = $name;
        $financialOverviewPost->save();

        $jobLog = new JobsLog();
        if($this->financialOverviewContactsError>0){
            $jobLog->value = "Fouten bij maken waardestaten voor post (" . $this->chunkNumber . "/" . $this->numberOfChunks . ") (id: " . $financialOverviewPost->id . "). Aangemaakte waardestaten: " . ($this->financialOverviewContactsOk) . ". Niet aangemaakte waardestaten: " . ($this->financialOverviewContactsError) . "." ;
        }else{
            $jobLog->value = "Waardestaten (" . ($this->countFinancialOverviewContacts) . ") gemaakt voor post (" . $this->chunkNumber . "/" . $this->numberOfChunks . ") (id: " . $financialOverviewPost->id . ").";
        }
        $jobLog->job_category_id = 'create-financial-overview-contact-post';
        $jobLog->user_id = $this->userId;
        $jobLog->save();

        //cleanup
        unset($this->chunkNumber);
        unset($this->numberOfChunks);
        unset($this->financialOverviewId);
        unset($this->validatedFinancialOverviewContactsSet);
        unset($this->userId);
        unset($this->countFinancialOverviewContacts);
        unset($this->financialOverviewContactsOk);
        unset($this->financialOverviewContactsError);
        gc_collect_cycles();

    }

    public function failed(\Throwable $exception)
    {
        $jobLog = new JobsLog();
        $jobLog->value = "Waardestaten maken mislukt voor post (" . $this->chunkNumber . "/". $this->numberOfChunks . ")";
        $jobLog->job_category_id = 'create-financial-overview-contact-post';
        $jobLog->user_id = $this->userId;
        $jobLog->save();

        Log::error("Waardestaten maken mislukt voor post (" . $this->chunkNumber . "/". $this->numberOfChunks . "): " . $exception->getMessage());
    }
}