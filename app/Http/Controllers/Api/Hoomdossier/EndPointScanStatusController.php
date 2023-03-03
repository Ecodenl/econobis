<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 12-09-2018
 * Time: 16:10
 */

namespace App\Http\Controllers\Api\Hoomdossier;

use App\Eco\User\User;
use App\Eco\Webform\Webform;
use App\Http\Controllers\Controller;
use App\Notifications\HoomdossierRequestProcessed;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Notification;
use Illuminate\Support\Facades\Response;

class EndPointScanStatusController extends Controller
{
    protected $logs = [];

    /**
     * Het gevonden webform hebben we op nog een aantal plekken nodig, daarom in class opslaan
     * @var Webform|null
     */
    protected $webform = null;

    public function post(string $apiKey, Request $request)
    {
        $this->log('Test EndPointScanStatus');

        $data = $this->getDataFromRequest($request);

        try {
            \DB::transaction(function () use ($request, $apiKey, $data ) {
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

    protected function doPost(string $apiKey, Request $request, $data)
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

        $this->log('Hier check en verwerkingen inzake endpoint contact.');
    }


    protected function getDataFromRequest(Request $request)
    {
        $mapping = [
        ];

        $data = [];
        foreach ($mapping as $groupname => $fields) {
            foreach ($fields as $inputName => $outputName) {
                // Alle input standaard waarde '' meegeven.
                // Op deze manier hoeven we later alleen op lege string te checken...
                // ... ipv bijv. if(!isset() || is_null($var) || $var = '')
                $data[$groupname][$outputName] = trim($request->get($inputName, ''));
            }
        }

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