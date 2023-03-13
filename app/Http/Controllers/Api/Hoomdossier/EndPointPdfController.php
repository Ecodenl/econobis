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
use App\Eco\Document\Document;
use App\Eco\Document\DocumentCreatedFrom;
use App\Eco\HousingFile\HousingFile;
use App\Eco\Team\Team;
use App\Eco\User\User;
use App\Eco\Webform\Webform;
use App\Helpers\Alfresco\AlfrescoHelper;
use App\Http\Controllers\Controller;
use App\Notifications\HoomdossierRequestProcessed;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Notification;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class EndPointPdfController extends Controller
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

    public function post(string $apiKey, Request $request)
    {
        $this->log('Test EndPointPdf');

        try {
            \DB::transaction(function () use ($request, $apiKey) {
                $data = $this->getDataFromRequest($request, $apiKey);

                $this->doPost($apiKey, $request, $data);
            });
        } catch (HoomdossierException $e) {
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
        } catch (\Exception $e) {
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

        $this->log('Aanroep succesvol afgerond.');

        $this->logInfo();
        return Response::json($this->logs);
    }

    protected function getDataFromRequest(Request $request, string $apiKey)
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

//        $contentRaw = file_get_contents('php://input');
//        $dataContent = json_decode($contentRaw);
        $dataContent = json_decode($request->getContent());
        if(!$dataContent){
            $this->error('No payload found', 404);
        }

        $data = [];
        $data['account_related']['building_id'] = trim(optional($dataContent->account_related)->building_id ?? '');
        $data['account_related']['user_id'] = trim(optional($dataContent->account_related)->user_id ?? '');
        $data['account_related']['account_id'] = trim(optional($dataContent->account_related)->account_id ?? '');
        $data['account_related']['contact_id'] = trim(optional($dataContent->account_related)->contact_id ?? '');
        $data['pdf']['contents'] =  optional($dataContent->pdf)->contents ? base64_decode( $dataContent->pdf->contents) : '';

        $this->log('Building id: ' .$data['account_related']['building_id']);
        $this->log('User id: ' . $data['account_related']['user_id']);
        $this->log('Account id: ' . $data['account_related']['account_id']);
        $this->log('Contact id: ' . $data['account_related']['contact_id']);
        $this->log('Pdf content aanwezig: ' . ($data['pdf']['contents'] != '' ? 'Ja' : 'Nee') );

        if(!$data['pdf']['contents']){
            $this->error('Pdf contents missing', 404);
        }
        if(!$data['account_related']['building_id']){
            $this->error('Building_id missing', 404);
        }
        $housingFile = HousingFile::find($data['account_related']['building_id']);
        if(!$housingFile) {
            $this->error('Housingfile ' . $data['account_related']['building_id'] . ' not found', 404);
        }

        if(!$data['account_related']['contact_id']){
            $this->error('Contact_id missing', 404);
        }
        $contact = Contact::find($data['account_related']['contact_id']);
        if(!$contact) {
            $this->error('Contact ' . $data['account_related']['contact_id'] . ' not found', 404);
        }
        if(!$data['account_related']['account_id']){
            $this->error('Account_id missing', 404);
        }

        if($contact->hoom_account_id != $data['account_related']['account_id']) {
            $this->error('Mismatch account_id ' . $data['account_related']['account_id'] . ' (Bij contact: ' . $contact->hoom_account_id . ')', 404);
        }

        $this->housingFile = $housingFile;
        $this->contact = $contact;

        return $data;
    }

    protected function doPost($data)
    {
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

        $fileName = 'Hoomdossier-rapportage-' . $this->housingFile->id . '.pdf';
        $this->log('Filename rapportage: ' . $fileName);

        $tmpFileName = Str::random(9) . '-' . $fileName;

        $document = new Document();
        $document->description = 'Hoomdossier rapportage';
        $document->document_type = 'upload';
        $document->document_group = 'general';
        $document->filename = $fileName;
        $document->contact_id = $this->contact->id;
        $document->housing_file_id = $this->housingFile->id;
        $documentCreatedFromId = DocumentCreatedFrom::where('code_ref', 'housingfile')->first()->id;
        $documentCreatedFromName = DocumentCreatedFrom::where('code_ref', 'housingfile')->first()->name;
        $document->document_created_from_id = $documentCreatedFromId;

        // voor alsnog deze Ids niet vullen
//        $document->intake_id = $intake->id;
//        $document->template_id = ??;
//        $document->campaign_id = ??;
//        $document->quotation_request_id = ??;
//        $document->measure_id = ??;

        $document->save();

        $contents = $data['pdf']['contents'];
        $filePath_tmp = Storage::disk('documents')->getDriver()->getAdapter()->applyPathPrefix($tmpFileName);

        $this->log('FilePath_tmp: ' . $filePath_tmp);
        $tmpFileName = str_replace('\\', '/', $filePath_tmp);
        $pos = strrpos($tmpFileName, '/');
        $tmpFileName = false === $pos ? $tmpFileName : substr($tmpFileName, $pos + 1);

        Storage::disk('documents')->put(DIRECTORY_SEPARATOR . $tmpFileName, $contents);

        if(\Config::get('app.ALFRESCO_COOP_USERNAME') != 'local') {
            $alfrescoHelper = new AlfrescoHelper(\Config::get('app.ALFRESCO_COOP_USERNAME'), \Config::get('app.ALFRESCO_COOP_PASSWORD'));
            $alfrescoResponse = $alfrescoHelper->createFile($filePath_tmp, $fileName, $document->getDocumentGroup()->name);
            $document->alfresco_node_id = $alfrescoResponse['entry']['id'];

            //delete file on server, still saved on alfresco.
            Storage::disk('documents')->delete($tmpFileName);
            $this->log('Woningdossier rapportage ' . $fileName . ' opgeslagen als ' . $documentCreatedFromName . ' document in Alfresco');

        } else {
            $document->filename = $tmpFileName;
            $document->alfresco_node_id = null;
            $this->log('Woningdossier rapportage ' . $tmpFileName . ' opgeslagen als ' . $documentCreatedFromName . ' document lokaal in documents storage map');
        }

        $document->save();

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

    protected function mailLog(array $data, bool $success, Webform $webform = null)
    {
        try {
            if (!$webform) {
                $this->log('Geen api configuratie gevonden.');
                return;
            }

            $users = (new User())->newCollection();
            if ($webform->responsibleUser) {
                $users->push($webform->responsibleUser);
            } elseif ($webform->responsibleTeam && $webform->responsibleTeam->users()->exists()) {
                $users = $webform->responsibleTeam->users;
            }
            Notification::send($users, new HoomdossierRequestProcessed($this->logs, $data, $success, $webform));
        } catch (\Exception $e) {
            report($e);
            $this->log('Fout bij mailen naar verantwoordelijken, fout is gerapporteerd.');
            return;
        }

        $this->log('Log is gemaild naar ' . $users->count() . ' verantwoordelijke(n).');
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

}