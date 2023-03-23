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
use App\Eco\HousingFile\HousingFileHoomLinks;
use App\Eco\HousingFile\RoofType;
use Illuminate\Http\Request;
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
        $this->log('Test EndPointGebruik');

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
            $this->log('Payload heeft geen current data');
        }
        if(!$this->hasNew){
            $this->log('Payload heeft geen new data');
        }
    }

    protected function doPost($dataContent)
    {
//        $this->log('Binnenkomende payload (zie laravel log)');
//        Log::info(json_encode($dataContent));
        if($this->hasCurrent){
            $this->log('Payload current');
            foreach($dataContent->current as $key => $value)
            {
                if(!empty($key)){
                    $this->doPostElement($key, $value);
                }
            }
        }
        if($this->hasNew){
            $this->log('Payload new');
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

//        $this->log('Your key is: ' . $key);

        $housingFileHoomLink = HousingFileHoomLinks::where('external_hoom_short_name', $key)->first();
        if($housingFileHoomLink){
            $this->log('HousingFile hoom link found for hoom short ' . $key . '. Linked to econobis field: ' . $housingFileHoomLink->econobis_field_name . ' data-type: ' . $housingFileHoomLink->housing_file_data_type ) . '.';
        } else {
            $this->log('HousingFile hoom link NOT found for hoom short ' . $key . '.');
            $housingFileHoomLink = New HousingFileHoomLinks();
            $housingFileHoomLink->external_hoom_short_name = $key;
            $housingFileHoomLink->econobis_field_name = "";
            $housingFileHoomLink->housing_file_data_type = "";
            $housingFileHoomLink->label = '?';
            $housingFileHoomLink->import_from_hoom = false;
            $housingFileHoomLink->visible_in_econobis = false;
            $housingFileHoomLink->save();
            $this->log('HousingFile hoom link created for hoom short ' . $key . '.');
        }

        if($housingFileHoomLink->import_from_hoom == false){
            $this->log('HousingFile hoom link for hoom short ' . $key . ' not imported (value for import is False).');
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
                    $this->log('Unkown data type: ' . $housingFileHoomLink->housing_file_data_type . '. No further action for hoom short ' . $key . '.');
                    return;

            }
        } else {
            $this->log('Answer(s) are not set. No further action for hoom short ' . $key . '.');
            return;
        }
    }

    protected function doPostBasis($housingFileHoomLink, $answers): void
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
                    $unKnownRoofType = BuildingType::where('name', 'Onbekend')->first();
                    $housingFileValue = $unKnownRoofType->id;
                }
                break;
            case "is_monument":
                //1	Ja
                //2	Nee
                //0	Onbekend
                switch ($value){
                    case 1:
                        $housingFileValue = 1;
                        break;
                    case 2:
                        $housingFileValue = 0;
                        break;
                    default:
                        $housingFileValue = $value;
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
            $this->log('Woningdossing Basis waarde veld ' . $econobisFieldName . ' gewijzigd van ' . $this->housingFile->$econobisFieldName . ' naar ' . $housingFileValue . '.' );
            $this->housingFile->$econobisFieldName = $housingFileValue;
            $this->isHousingFileChanged = true;
        }
    }

    protected function doPostGebruik($housingFileHoomLink, $answers): void
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

        if($this->housingFile->$econobisFieldName != $housingFileValue){
            $this->log('Woningdossing Gebruik waarde veld ' . $econobisFieldName . ' gewijzigd van ' . $this->housingFile->$econobisFieldName . ' naar ' . $housingFileValue . ') ' );
            $this->housingFile->$econobisFieldName = $housingFileValue;
            $this->isHousingFileChanged = true;
        }
    }

    protected function doPostWoningStatus($housingFileHoomLink, $answers): void
    {
//        $econobisFieldName = $housingFileHoomLink->econobis_field_name;
        if (is_array($answers)) {
            $value =  $answers[0]->value;
            $this->log(' first answer value: ' . $value);
        } else {
            $value =  $answers->value;
            $this->log(' answer value: ' . $value);
        }

    }

}