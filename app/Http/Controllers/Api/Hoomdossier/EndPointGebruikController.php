<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 12-09-2018
 * Time: 16:10
 */

namespace App\Http\Controllers\Api\Hoomdossier;

use App\Eco\HousingFile\BuildingType;
use App\Eco\HousingFile\EnergyLabel;
use App\Eco\HousingFile\HousingFileHoomLink;
use App\Eco\HousingFile\HousingFileHousingStatus;
use App\Eco\HousingFile\HousingFileLog;
use App\Eco\HousingFile\RoofType;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Response;

class EndPointGebruikController extends EndPointHoomDossierController
{
    protected $logs = [];
    protected $hasCurrent = false;
    protected $hasNew = false;
    protected $isHousingFileChanged = false;

    public function post(string $apiKey, Request $request)
    {
        $this->log('Start EndPointGebruik');

        try {
            \DB::transaction(function () use ($request, $apiKey) {
                $this->initsEndPoints($apiKey);

                $dataContent = json_decode($request->getContent());
                if(!$dataContent){
                    $this->error('No payload found', 404);
                }
                if(!$dataContent->account_related){
                    $this->error('No account_related data found', 404);
                }

                $this->processAccountRelatedData($dataContent->account_related);
                $this->validatePost($dataContent);
                $this->doPost($dataContent);
            });
        } catch (HoomdossierException $e) {
            return $this->doHoomdossierException($e, $request);
        } catch (\Exception $e) {
            return $this->doGeneralException($e, $request);
        }

        $this->log('Aanroep succesvol afgerond.');

        $this->logInfo();
        return Response::json($this->logs);
    }

    protected function validatePost($dataContent)
    {
        $this->hasCurrent = isset($dataContent->current);
        $this->hasNew = isset($dataContent->new);

        if(!$this->hasCurrent){
            $this->log('Payload heeft geen "current" data');
        }
        if(!$this->hasNew){
            $this->log('Payload heeft geen "new" data');
        }
    }

    protected function doPost($dataContent)
    {
//        $this->log('Binnenkomende payload (zie laravel log)');
//        Log::info(json_encode($dataContent));
        if($this->hasCurrent){
            $this->log('Verwerk payload "current" data');
            foreach($dataContent->current as $key => $value)
            {
                if(!empty($key)){
                    $this->doPostElement($key, $value);
                }
            }
        }
        if($this->hasNew){
            $this->log('Verwerk payload "new" data');
            foreach($dataContent->new as $key => $value)
            {
                $this->doPostElement($key, $value);
            }
        }
        if($this->isHousingFileChanged) {
            // hier dan save van housingfile indien gewijzigd.
            $this->housingFile->save();
        }
    }

    /**
     * @param int|string $key
     * @param $value
     */
    protected function doPostElement(int|string $key, $value): void
    {
        // lege keys (zou niet voor moeten komen, skippen)
        if(empty($key)){
            return;
        }

        $housingFileHoomLink = HousingFileHoomLink::where('external_hoom_short_name', $key)->first();
        if($housingFileHoomLink){
            $this->log('Woningdossier hoom koppeling gevonden voor hoom short ' . $key . '. Koppeling naar econobis veld: ' . $housingFileHoomLink->econobis_field_name . ' data-type: ' . $housingFileHoomLink->housing_file_data_type ) . '.';
        } else {
            $this->log('Woningdossier hoom koppeling NIET gevonden voor hoom short ' . $key . '.');
            $housingFileHoomLink = New HousingFileHoomLink();
            $housingFileHoomLink->external_hoom_short_name = $key;
            $housingFileHoomLink->econobis_field_name = "";
            $housingFileHoomLink->housing_file_data_type = "";
            $housingFileHoomLink->label = '?';
            $housingFileHoomLink->import_from_hoom = false;
            $housingFileHoomLink->visible_in_econobis = false;
            $housingFileHoomLink->save();
            $message = 'Ontbrekende woningdossier hoom koppeling gemaakt voor hoom short ' . $key . '.';
            $this->log($message);
            HousingFileLog::create([
                'housing_file_id' => $this->housingFile->id,
                'message_text' => substr($message, 0, 256),
                'message_type' => 'gebruik',
                'user_id' => Auth::user()->id,
                'is_error' => false,
            ]);

        }

        if($housingFileHoomLink->import_from_hoom == false){
            $this->log('Woningdossier hoom koppeling voor hoom short ' . $key . ' niet geimporteerd (koppeling staat ingesteld op NIET importeren).');
            return;
        }

        // Hier gekomen dan gaan we gebruik verwerken in woningdossier per data type: Basis, Gebruik, WoningStatus
        if (isset($value->answers) && !empty($value->answers) ) {
            switch ($housingFileHoomLink->housing_file_data_type){
                case "B":
                    $this->doPostBasis($housingFileHoomLink, $value->answers);
                    break;
                case "G":
                    $this->doPostGebruik($housingFileHoomLink, $value->answers);
                    break;
                case "W":
                    $this->doPostWoningStatus($housingFileHoomLink, $value->answers);
                    break;
                default:
                    $this->log('Onbekende data type: ' . $housingFileHoomLink->housing_file_data_type . '. Geen verdere acties voor hoom short ' . $key . '.');
                    return;

            }
        } else {
            $this->log('Answer(s) zijn niet gezet. Geen verdere acties voor hoom short ' . $key . '.');
            return;
        }
    }

    protected function doPostBasis($housingFileHoomLink, $answers): void
    {
        $econobisFieldName = $housingFileHoomLink->econobis_field_name;
        if (is_array($answers)) {
                $value =  $answers[0]->value;
                $this->log(' Meerdere answers, eerste waarde: ' . $value);
        } else {
            $value =  $answers->value;
            $this->log(' answer waarde: ' . $value);
        }

        switch ($econobisFieldName){
            case "building_type_id":
                $buildingType = BuildingType::where('external_hoom_id', $value)->first();
                if($buildingType && $buildingType->external_hoom_id){
                    $housingFileValue = $buildingType->id;
                } else {
                    $unKnownBuildingType = BuildingType::where('name', 'Onbekend')->first();
                    $housingFileValue = $unKnownBuildingType->id;
                }
                break;
            case "roof_type_id":
                $roofType = RoofType::where('external_hoom_id', $value)->first();
                if($roofType && $roofType->external_hoom_id){
                    $housingFileValue = $roofType->id;
                } else {
                    $unKnownRoofType = RoofType::where('name', 'Onbekend')->first();
                    $housingFileValue = $unKnownRoofType->id;
                }
                break;
            case "is_monument":
                //1	Ja
                //2	Nee
                //0	Onbekend
                switch ($value){
                    case 1:
                        $housingFileValue = "1";
                        break;
                    case 2:
                        $housingFileValue = "0";
                        break;
                    default:
                        $housingFileValue = "2";
                        break;
                }
                break;
            case "is_house_for_sale":
                // bought (Koopwoning)
                // rented (Huurwoning corporatie)
                // rented-private (Particuliere huur)
                switch ($value){
                    case 'bought':
                        $housingFileValue = "1";
                        break;
                    case 'rented':
                    case 'rented-private':
                        $housingFileValue = "0";
                        break;
                    default:
                        $housingFileValue = "2";
                        break;
                }
                break;
            case "energy_label_id":
                $energyLabel = EnergyLabel::where('external_hoom_id', $value)->first();
                if($energyLabel && $energyLabel->external_hoom_id){
                    $housingFileValue = $energyLabel->id;
                } else {
                    $unKnownEnergyLabel = EnergyLabel::where('name', 'Onbekend')->first();
                    $housingFileValue = $unKnownEnergyLabel->id;
                }
                break;
            default:
                $housingFileValue = $value;
                break;
        }

        if($this->housingFile->$econobisFieldName != $housingFileValue){
            $this->log('Woningdossier Basis waarde veld ' . $econobisFieldName . ' gewijzigd van ' . $this->housingFile->$econobisFieldName . ' naar ' . $housingFileValue . '.' );
            $this->housingFile->$econobisFieldName = $housingFileValue;
            $this->isHousingFileChanged = true;
        }
    }

    protected function doPostGebruik($housingFileHoomLink, $answers): void
    {
        $econobisFieldName = $housingFileHoomLink->econobis_field_name;
        if (is_array($answers)) {
            $value =  $answers[0]->value;
            $this->log(' Meerdere answers, eerste waarde: ' . $value);
        } else {
            $value =  $answers->value;
            $this->log(' answer waarde: ' . $value);
        }

        switch ($econobisFieldName){
            default:
                $housingFileValue = $value;
                break;
        }

        if($this->housingFile->$econobisFieldName != $housingFileValue){
            $this->log('Woningdossier Gebruik waarde veld ' . $econobisFieldName . ' gewijzigd van ' . $this->housingFile->$econobisFieldName . ' naar ' . $housingFileValue . '.' );
            $this->housingFile->$econobisFieldName = $housingFileValue;
            $this->isHousingFileChanged = true;
        }
    }

    protected function doPostWoningStatus($housingFileHoomLink, $answers): void
    {
        $econobisFieldName = $housingFileHoomLink->econobis_field_name;
        if (is_array($answers)) {
            $value =  $answers[0]->value;
            $this->log(' first answer value: ' . $value);
        } else {
            $value =  $answers->value;
            $this->log(' answer value: ' . $value);
        }

        switch ($econobisFieldName){
            default:
                $housingFileValue = $value;
                break;
        }

        $housingFileHousingStatus = HousingFileHousingStatus::where('housing_file_id', $this->housingFile->id)->where('housing_file_hoom_links_id', $housingFileHoomLink->id)->first();
        if($housingFileHousingStatus){
            $this->log('Woningdossier Woningstatus gevonden voor hoom short ' . $housingFileHoomLink->external_hoom_short_name . '.');
            $housingFileOldValue = $housingFileHousingStatus->status;
            $housingFileHousingStatus->status = $housingFileValue;
//            $housingFileHousingStatus->number_or_m2 = $housingFileNumericValue;
            $housingFileHousingStatus->save();
            $this->log('Woningdossier Woningstatus waarde veld ' . $housingFileHoomLink->external_hoom_short_name . ' gewijzigd van ' . $housingFileOldValue . ' naar ' . $housingFileValue . '.' );
        } else {
            $this->log('Woningdossier Woningstatus NIET gevonden voor hoom short ' . $housingFileHoomLink->external_hoom_short_name . '.');
            $housingFileHousingStatus = new HousingFileHousingStatus();
            $housingFileHousingStatus->housing_file_id = $this->housingFile->id;
            $housingFileHousingStatus->housing_file_hoom_links_id = $housingFileHoomLink->id;
            $housingFileHousingStatus->status = $housingFileValue;
//            $housingFileHousingStatus->number_or_m2 = $housingFileNumericValue;
            $housingFileHousingStatus->save();
            $this->log('Woningdossier Woningstatus gemaakt voor hoom short ' . $housingFileHoomLink->external_hoom_short_name . ' met waarde ' . $housingFileValue);
        }

    }

}