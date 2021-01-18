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
use App\Http\Controllers\Api\FinancialOverview\FinancialOverviewContactController;
use Barryvdh\DomPDF\Facade as PDF;
use Carbon\Carbon;
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
    private $first;
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
        //todo: nu stopt queue:work na elk verwerkte job.
        // Hier set_time_limit(0) geprobeerd, maar dat lijkt probleem niet te verhelpen, wat nu ?!
//        set_time_limit(0);

        //user voor observer
        Auth::setUser(User::find($this->userId));
        $financialOverviewContactController = new FinancialOverviewContactController();

        $html = '<style>
.page-break {
    page-break-after: always;
}
</style>';

        foreach ($this->validatedFinancialOverviewContactsSet as $financialOverviewContact) {
            $contactInfo = $financialOverviewContactController->getContactInfoForFinancialOverview($financialOverviewContact->contact);

            $jobLog = new JobsLog();
            $jobLog->value = 'Start maken waardestaat (' . ($financialOverviewContact->id) . ') voor ' . ($financialOverviewContact->contact->full_name) . ' (' . ($financialOverviewContact->contact->id) . ').';
            $jobLog->job_category_id = 'create-financial-overview-contact-post';
            $jobLog->user_id = $this->userId;
            $jobLog->save();

            $financialOverviewContact->date_sent = Carbon::today();
            $financialOverviewContact->save();

            $financialOverviewContactData = $financialOverviewContactController->getFinancialOverviewContact($financialOverviewContact, false);

            $contactPerson = $contactInfo['contactPerson'];

            if ($financialOverviewContact->contact->full_name === $contactPerson) {
                $contactPerson = null;
            }

            $contactName = null;

            if ($financialOverviewContact->contact->type_id == 'person') {
                $prefix = $financialOverviewContact->contact->person->last_name_prefix;
                $contactName = $prefix ? $financialOverviewContact->contact->person->first_name . ' ' . $prefix . ' '
                    . $financialOverviewContact->contact->person->last_name
                    : $financialOverviewContact->contact->person->first_name . ' '
                    . $financialOverviewContact->contact->person->last_name;
            } elseif ($financialOverviewContact->contact->type_id == 'organisation') {
                $contactName = $financialOverviewContact->contact->full_name;
            }

            $createdOk = FinancialOverviewHelper::createFinancialOverviewContactDocument($financialOverviewContact);
            if ($createdOk) {
                FinancialOverviewHelper::financialOverviewContactIsSending($financialOverviewContact);
                FinancialOverviewHelper::financialOverviewContactSend($financialOverviewContact);

                $img = '';
                if ($financialOverviewContact->financialOverview->administration->logo_filename) {
                    $path = storage_path('app' . DIRECTORY_SEPARATOR
                        . 'administrations' . DIRECTORY_SEPARATOR
                        . $financialOverviewContact->financialOverview->administration->logo_filename);
                    $logo = file_get_contents($path);

                    $src = 'data:' . mime_content_type($path)
                        . ';charset=binary;base64,' . base64_encode($logo);
                    $src = str_replace(" ", "", $src);
                    $img = '<img src="' . $src
                        . '" width="auto" height="156px"/>';
                }

                if (!$this->first) {
                    $html .= '<div class="page-break"></div>';
                    $this->first = false;
                }

                $financialOverviewContactReference = 'WS-' . $financialOverviewContact->financialOverview->year . '-' . $financialOverviewContact->financialOverview->administration_id . '-' . $financialOverviewContact->contact->number;
                $html .= view('financial.overview.generic')->with([
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
                    'financialOverviewContactReference' => $financialOverviewContactReference
                ])
                    ->with('logo', $img)->render();
            }
            $jobLog = new JobsLog();
            $financialOverviewName = 'WS-' . ($financialOverviewContact->financialOverview->year) . '-' . ($financialOverviewContact->financialOverview->administration->id) . '-' . ($financialOverviewContact->contact->number);

            if($createdOk && $financialOverviewContact->status_id === 'sent'){
                $this->financialOverviewContactsOk += 1;
                $jobLog->value = 'Maken waardestaat ' . ($financialOverviewName) . ' (' . ($financialOverviewContact->id) . ') voor ' . ($financialOverviewContact->contact->full_name) . ' (' . ($financialOverviewContact->contact->id) . ') voltooid.';
            }else{
                $this->financialOverviewContactsError += 1;
                $jobLog->value = 'Maken waardestaat ' . ($financialOverviewName) . ' (' . $financialOverviewContact->id.') voor ' . ($financialOverviewContact->contact->full_name) . ' (' . ($financialOverviewContact->contact->id) . ') mislukt. Status: '.$financialOverviewContact->status_id;
            }
            $jobLog->job_category_id = 'create-financial-overview-contact-post';
            $jobLog->user_id = $this->userId;
            $jobLog->save();

        }

        $financialOverviewPost = New FinancialOverviewPost();
        $financialOverviewPost->financial_overview_id = $this->financialOverviewId;
        $financialOverviewPost->filename = '';
        $financialOverviewPost->name = '';

        $financialOverviewPost->save();

        $name = 'Post-waardestaten-' . $financialOverviewPost->id . '-' . Carbon::now()->format("Y-m-d-H-i-s") . '.pdf';

        $path = 'administration_' . $financialOverviewContact->financialOverview->administration->id
            . DIRECTORY_SEPARATOR . 'financial-overviews' . DIRECTORY_SEPARATOR . $name;

        $filePath = (storage_path('app' . DIRECTORY_SEPARATOR . 'administrations' . DIRECTORY_SEPARATOR) . $path);

        libxml_use_internal_errors(true);
        $pdfOutputSave = PDF::loadHTML($html);
        $pdfOutputSave->save($filePath);
        libxml_use_internal_errors(false);

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
    }

    public function failed(\Exception $exception)
    {
        $jobLog = new JobsLog();
        $jobLog->value = "Waardestaten maken mislukt voor post (" . $this->chunkNumber . "/". $this->numberOfChunks . ")";
        $jobLog->job_category_id = 'create-financial-overview-contact-post';
        $jobLog->user_id = $this->userId;
        $jobLog->save();

        Log::error("Waardestaten maken mislukt voor post (" . $this->chunkNumber . "/". $this->numberOfChunks . ") " . $exception->getMessage());
    }
}