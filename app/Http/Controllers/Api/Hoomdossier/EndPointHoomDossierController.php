<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 12-09-2018
 * Time: 16:10
 */

namespace App\Http\Controllers\Api\Hoomdossier;

use App\Eco\Contact\Contact;
use App\Eco\Cooperation\Cooperation;
use App\Eco\HousingFile\HousingFile;
use App\Eco\Team\Team;
use App\Eco\User\User;
use App\Eco\Webform\Webform;
use App\Http\Controllers\Controller;
use App\Notifications\HoomdossierRequestProcessed;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Notification;
use Illuminate\Support\Facades\Response;

class EndPointHoomDossierController extends Controller
{
    protected $logs = [];

    /**
     * Het gevonden webform hebben we op nog een aantal plekken nodig, daarom in class opslaan
     * @var Webform|null
     */
    protected $webform = null;
    protected $cooperation;

    protected $housingFile;
    protected $contact;

    protected function initsEndPoints(string $apiKey)
    {
        // Geëncrypte strings kunnen variëren, daarom alle models ophalen en op gedecrypte key filteren
        $webform = Webform::all()->first(function ($webform) use ($apiKey) {
            if ($webform->api_key != $apiKey) return false;
            if ($webform->date_start && $webform->date_start->gt((new Carbon())->startOfDay())) return false;
            if ($webform->date_end && $webform->date_end->lt((new Carbon())->startOfDay())) return false;
            return true;
        });
        if (!$webform) {
            $this->log('Endpoint configuratie met code ' . $apiKey . ' is niet gevonden.');
            $this->error('Endpoint not found', 404);
        } else {
            $this->webform = $webform;
            $this->log('Endpoint met id ' . $webform->id . ' gevonden bij code ' . $apiKey . '.');
        }
        $this->checkMaxRequests($webform);

        $this->cooperation = Cooperation::first();

        if(!$this->cooperation || !$this->cooperation->hoom_link){
            $this->error('Cooperation doesn\'t have Hoomdossier synchronisation', 404);
        }

        $responsibleUser = User::find($this->webform->responsible_user_id);
        if($responsibleUser){
            Auth::setUser($responsibleUser);
            $this->log('Verantwoordelijke gebruiker : ' . $this->webform->responsible_user_id);
        }else{
            $responsibleTeam = Team::find($this->webform->responsible_team_id);
            if($responsibleTeam && $responsibleTeam->users ){
                $teamFirstUser = $responsibleTeam->users->first();
                Auth::setUser($teamFirstUser);
                $this->log('Verantwoordelijke gebruiker : ' . $teamFirstUser->id);
            }else{
                $this->log('Verantwoordelijke gebruiker : onbekend');
            }
        }
    }

    protected function processAccountRelatedData($dataAccountRelated)
    {
        $data = [];
        $buildingId = trim($dataAccountRelated->building_id ?? '');
        $userId = trim($dataAccountRelated->user_id ?? '');
        $accountId = trim($dataAccountRelated->account_id ?? '');
        $contactId = trim($dataAccountRelated->contact_id ?? '');

        $this->log('Building id: ' . $buildingId ?? '');
        $this->log('User id: ' . $userId);
        $this->log('Account id: ' . $accountId);
        $this->log('Contact id: ' . $contactId);

        if(!$buildingId){
            $this->error('Building_id missing', 404);
        }
        if(!$contactId){
            $this->error('Contact_id missing', 404);
        }
        $contact = Contact::find($contactId);
        if(!$contact) {
            $this->error('Contact ' . $contactId . ' not found', 404);
        }
        if(!$accountId){
            $this->error('Account_id missing', 404);
        }

        if($contact->hoom_account_id != $accountId) {
            $this->error('Mismatch account_id ' . $accountId . ' (Hoom account id for contact in Econobis: ' . ( $contact->hoom_account_id ? $contact->hoom_account_id : "empty"). ')', 404);
        }

        $housingFile = HousingFile::where('hoom_building_id', $buildingId)->first();
        if(!$housingFile) {
            $housingFile = optional($contact->primaryAddress)->housingfile;
            if(!$housingFile){
                if($contact->primaryAddress){
                    $housingFile = new HousingFile();
                    $housingFile->address_id = $contact->primaryAddress->id;
                    $housingFile->hoom_building_id = $buildingId;
                    $housingFile->number_of_residents = 0;
                    $housingFile->revenue_solar_panels = 0;
                    $housingFile->is_house_for_sale = 0;
                    $housingFile->is_monument = 0;
                    $housingFile->remark = '';
                    $housingFile->remark_coach = '';
                    $housingFile->save();
                    $this->log('Nieuw woningdossier ' . $housingFile->id . ' aangemaakt voor contact ' . $contactId . ' ' . $contact->full_name);
                } else {
                    $this->error('Geen woningdossier gevonden voor contact ' . $contactId . ' ' . $contact->full_name . '. Geen nieuwe woningdossier aangemaakt ivm ontbreken primair adres.');
                }
            } else {
                $housingFile->hoom_building_id = $buildingId;
                $housingFile->save();
                $this->log('Woningdossier ' . $housingFile->id . ' gevonden voor contact ' . $contactId . ' ' . $contact->full_name . '. Koppeling met building id '. $buildingId . ' vastgelegd.');
            }
        } else {
            $this->log('Woningdossier ' . $housingFile->id . ' gevonden bij building_id ' . $buildingId);
        }

        $this->housingFile = $housingFile;
        $this->contact = $contact;

        return $data;
    }

    protected function error(string $string, int $statusCode = 422)
    {
        throw new HoomdossierException($string, $statusCode);
    }

    protected function log(string $text)
    {
        $this->logs[] = $text;
    }

    protected function checkMaxRequests($webform)
    {
        $lastRequests = $webform->last_requests;

        // Eerst oude requests opschonen
        // Timestamp van een minuut geleden. Timestamps ouder dan deze worden eruit gegooid.
        $expireTimestamp = (new Carbon())->subMinute()->timestamp;
        $lastRequests = array_filter($lastRequests, function ($value) use ($expireTimestamp) {
            return $value > $expireTimestamp;
        });
        // Huidige request toevoegen, en opslaan.
        $lastRequests[] = (new Carbon())->timestamp;
        $webform->last_requests = array_values($lastRequests);
        $webform->save();

        // Checken of het max aantal is overschreden.
        if (count($lastRequests) > $webform->max_requests_per_minute) {
            $this->error('Maximum aantal aanroepen per minuut is bereikt.');
        }
    }

    /**
     * @param HoomdossierException $e
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    protected function doHoomdossierException(HoomdossierException $e, Request $request): \Illuminate\Http\JsonResponse
    {
// Er is een bewuste fout vanuit het verwerken van de aanroep onstaan
        // Deze kan worden weergegeven in het log.
        // Doordat er een fout is ontstaan tijdens de transaction, worden alle DB wijzigingen teruggedraaid.
        $this->log('Fout opgetreden: ' . $e->getMessage());
        $this->log('Gehele API aanroep is ongedaan gemaakt!');

        // Log wegschrijven naar laravel logbestand
        $this->logInfo();

        // Log emailen naar verantwoordelijke(n)
        $this->mailLog($request->all(), false, $this->webform);

        // Logregels weegeven ter info voor degene die de functie aanroept
        return Response::json($this->logs, $e->getStatusCode());
    }

    /**
     * @param \Exception $e
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    protected function doGeneralException(\Exception $e, Request $request): \Illuminate\Http\JsonResponse
    {
// Er is een onbekende fout opgetreden, dit is een systeemfout en willen we dus niet weergeven.
        // Log dus aanvullen met 'Onbekende fout'
        // Doordat er een fout is ontstaan tijdens de transaction, worden alle DB wijzigingen teruggedraaid.
        $this->log('Onbekende fout opgetreden.');
        $this->log('Gehele API aanroep is ongedaan gemaakt!');

        // Log wegschrijven naar laravel logbestand
        $this->logInfo();

        // Exception onderwater raporteren zonder 'er uit te klappen'
        // Zo is de error terug te vinden in de logs en evt Slack
        report($e);
        $this->log('Error is gerapporteerd.');

        // Log emailen naar verantwoordelijke(n)
        $this->mailLog($request->all(), false, $this->webform);

        // Logregels weegeven ter info voor degene die de functie aanroept
        return Response::json($this->logs, 500);
    }

    protected function logInfo()
    {
        // Extra regels toevoegen voor leesbaarheid log
        $logs = $this->logs;
        array_unshift($logs, "=====================================================");
        $logs[] = "\n";
        Log::info(implode("\n", $logs));
        $this->log('Log is gelogd naar het applicatielog.');
    }

    protected function mailLog(array $data, bool $success, Webform $webform = null)
    {
        try {
            if (!$webform) {
                $this->log('Geen api configuratie gevonden.');
                return;
            }

            $users = (new User())->newCollection();

            if($webform->mail_error_report == 1) {
                if ($webform->email_address_error_report == "") {
                    if ($webform->responsibleUser) {
                        $users->push($webform->responsibleUser);
                    } elseif ($webform->responsibleTeam && $webform->responsibleTeam->users()->exists()) {
                        $users = $webform->responsibleTeam->users;
                    }
                } else {
                    $dummyUser = new User();
                    $dummyUser->email = $webform->email_address_error_report;

                    $users->push($dummyUser);
                }

                Notification::send($users, new HoomdossierRequestProcessed($this->logs, $data, $success, $webform));
            }

        } catch (\Exception $e) {
            report($e);
            $this->log('Fout bij mailen naar verantwoordelijken, fout is gerapporteerd.');
            return;
        }

        $this->log('Log is gemaild naar ' . $users->count() . ' verantwoordelijke(n).');
    }

}