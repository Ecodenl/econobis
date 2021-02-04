<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 04-01-2018
 * Time: 16:06
 */

namespace App\Jobs\FinancialOverview;


use App\Eco\Email\Email;
use App\Eco\Jobs\JobsLog;
use App\Eco\User\User;
use App\Helpers\FinancialOverview\FinancialOverviewHelper;
use App\Http\Controllers\Api\FinancialOverview\FinancialOverviewContactController;
use Carbon\Carbon;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class SendAllFinancialOverviewContacts implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * @var Email
     */
    private $validatedFinancialOverviewContacts;
    private $userId;
    private $countFinancialOverviewContacts;
    private $financialOverviewContactsOk;
    private $financialOverviewContactsError;

    public function __construct($validatedFinancialOverviewContacts, $userId)
    {
        $this->validatedFinancialOverviewContacts = $validatedFinancialOverviewContacts;
        $this->userId = $userId;

        $countFinancialOverviewContacts = $validatedFinancialOverviewContacts ? $validatedFinancialOverviewContacts->count() : 0;
        $this->countFinancialOverviewContacts = $countFinancialOverviewContacts;
        $this->financialOverviewContactsOk = 0;
        $this->financialOverviewContactsError = 0;

        $jobLog = new JobsLog();
        $jobLog->value = "Start alle waardestaten (" . ($countFinancialOverviewContacts) . ") maken/verzenden.";
        $jobLog->job_category_id = 'sent-financial-overview-contact';
        $jobLog->user_id = $userId;
        $jobLog->save();
    }

    public function handle()
    {
        //user voor observer
        Auth::setUser(User::find($this->userId));
        $financialOverviewContactController = new FinancialOverviewContactController();

        foreach ($this->validatedFinancialOverviewContacts as $financialOverviewContact) {
            $contactInfo = $financialOverviewContactController->getContactInfoForFinancialOverview($financialOverviewContact->contact);

            $jobLog = new JobsLog();
            $jobLog->value = 'Start maken en versturen waardestaat (' . ($financialOverviewContact->id) . ') voor ' . ($contactInfo['contactPerson']) . ' (' . ($financialOverviewContact->contact->id) . ').';
            $jobLog->job_category_id = 'sent-financial-overview-contact';
            $jobLog->user_id = $this->userId;
            $jobLog->save();

            // financialOverviewContact document maken (niet bij resenden, dus alleen bij in-progress).
            // We leggen ook al date_sent vast (deze wordt nl. gebruikt als datum op de waardestaat en hebben we
            // dus nodig bij maken waardestaat (PDF).
            if($financialOverviewContact->status_id === 'in-progress') {
                $financialOverviewContact->date_sent = Carbon::today();
                $financialOverviewContact->save();
                FinancialOverviewHelper::createFinancialOverviewContactDocument($financialOverviewContact);
            }
        }
        $response = [];

        foreach ($this->validatedFinancialOverviewContacts as $financialOverviewContact) {
            $contactInfo = $financialOverviewContactController->getContactInfoForFinancialOverview($financialOverviewContact->contact);

            //alleen als waardestaat goed is aangemaakt, gaan we mailen
            if ($financialOverviewContact->financialOverviewsToSend()->exists() && $financialOverviewContact->financialOverviewsToSend()->first()->financial_overview_created) {
                if($financialOverviewContact->status_id === 'in-progress') {
                    FinancialOverviewHelper::financialOverviewContactIsSending($financialOverviewContact);
                }
                if($financialOverviewContact->status_id === 'is-resending'){

                    $financialOverviewContact->date_sent = Carbon::today();
                }
                try {
                    $financialOverviewContactResponse = FinancialOverviewHelper::send($financialOverviewContact);
                    FinancialOverviewHelper::financialOverviewContactSend($financialOverviewContact);
                    array_push($response, $financialOverviewContactResponse);
                } catch (\Exception $e) {
                    Log::error($e->getMessage());
                    FinancialOverviewHelper::financialOverviewContactErrorSending($financialOverviewContact);
                }
            }else{
                if($financialOverviewContact->status_id === 'is-resending'){
                    FinancialOverviewHelper::financialOverviewContactErrorSending($financialOverviewContact);
                }
            }

            $jobLog = new JobsLog();
            $financialOverviewName = 'WS-' . ($financialOverviewContact->financialOverview->year) . '-' . ($financialOverviewContact->contact->number) . '-' . ($financialOverviewContact->financialOverview->id);

            if($financialOverviewContact->status_id === 'sent'){
                $this->financialOverviewContactsOk += 1;
                $jobLog->value = 'Maken en versturen waardestaat ' . ($financialOverviewName) . ' (' . ($financialOverviewContact->id) . ') naar ' . ($contactInfo['contactPerson']) . ' (' . ($financialOverviewContact->contact->id) . ') voltooid.';
            }else{
                $this->financialOverviewContactsError += 1;
                $jobLog->value = 'Maken en versturen waardestaat ' . ($financialOverviewName) . ' (' . $financialOverviewContact->id.') naar ' . ($contactInfo['contactPerson']) . ' (' . ($financialOverviewContact->contact->id) . ') mislukt. Status: '.$financialOverviewContact->status_id;
            }
            $jobLog->job_category_id = 'sent-financial-overview-contact';
            $jobLog->user_id = $this->userId;
            $jobLog->save();

        }

        $jobLog = new JobsLog();
        if($this->financialOverviewContactsError>0){
            $jobLog->value = "Fouten bij maken/verzenden waardestaten. Verzonden waardestaten: " . ($this->financialOverviewContactsOk) . ". Niet verzonden waardestaten: " . ($this->financialOverviewContactsError) . "." ;
        }else{
            $jobLog->value = "Alle Waardestaten (" . ($this->countFinancialOverviewContacts) . ") gemaakt en verzonden";
        }
        $jobLog->job_category_id = 'sent-financial-overview-contact';
        $jobLog->user_id = $this->userId;
        $jobLog->save();
    }

    public function failed(\Exception $exception)
    {
        $jobLog = new JobsLog();
        $jobLog->value = "Waardestaten maken/verzenden mislukt.";
        $jobLog->job_category_id = 'sent-financial-overview-contact';
        $jobLog->user_id = $this->userId;
        $jobLog->save();

        Log::error("Waardestaten maken/verzenden mislukt: " . $exception->getMessage());
    }
}