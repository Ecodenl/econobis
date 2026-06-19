<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 12-09-2018
 * Time: 16:10
 */

namespace App\Http\Controllers\Api\Hoomdossier;

use App\Eco\HousingFile\HousingFileSpecification;
use App\Eco\HousingFile\HousingFileSpecificationStatus;
use App\Eco\Measure\Measure;
use App\Eco\Opportunity\OpportunityStatus;
use App\Helpers\Delete\Models\DeleteHousingFileSpecification;
use App\Helpers\Delete\Models\DeleteOpportunity;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Response;

class EndPointWoonplanController extends EndPointHoomDossierController
{
    protected $logs = [];
    protected $specificationsInWoonplan = [];

    public function post(string $apiKey, Request $request)
    {
        $this->log('Start EndPointWoonplan');

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
//        if(!isset($dataContent->user_action_plan_advices)) {
//            $this->error('Geen "user_action_plan_advices" meegegeven', 404);
//        }
    }

    protected function doPost($dataContent)
    {
//        $this->log('Binnenkomende payload (zie laravel log)');
//        Log::info(json_encode($dataContent));
        if(!isset($dataContent->user_action_plan_advices)) {
            $this->log('Geen "user_action_plan_advices" meegegeven');
            return;
        }
        foreach($dataContent->user_action_plan_advices as $key => $userActionPlanAdvice)
        {
            if(!empty($key)){
                $this->doPostElement($userActionPlanAdvice);
            }
        }

        $specificationsInEconobis = $this->housingFile->housingFileSpecifications->pluck('id')->toArray();
        $specificationsInEconobisNotInWoonplan = array_diff($specificationsInEconobis, $this->specificationsInWoonplan);
        $this->log('specificationsInEconobis ' . implode(',', $specificationsInEconobis));
        $this->log('specificationsInWoonplan ' . implode(',', $this->specificationsInWoonplan));
        $this->log('specificationsInEconobisNotInWoonplan ' . implode(',', $specificationsInEconobisNotInWoonplan));


//        Log::info(json_encode($dataContent));
        foreach ($specificationsInEconobisNotInWoonplan as $specificationId){
            $specification = HousingFileSpecification::find($specificationId);
            // hier check of er al een kans gemaakt was,
            if($specification && $specification->opportunities){
                // zo wel  -> check of er al kansacties aanwezig is bij die kans,
                foreach ($specification->opportunities as $opportunity) {
                    if (!$opportunity->quotationRequests) {
                        // zo niet -> kans verwijderen.
                        $deleteOpportunity = new DeleteOpportunity($opportunity);
                        $deleteOpportunity->delete();
                        $this->log('Specificatie niet in woonplan. Kans ' . $opportunity->number . ' (' . $opportunity->id . ') zonder kansacties verwijderd.');
                    } else {
                        // zo wel  -> kans status is In behandeling?
                        $statusInActive = OpportunityStatus::where('code_ref', 'inactive')->first();
                        if($opportunity->status_id == $statusInActive->id){
                            // kans status is In behandeling, kans verwijderen
                            $deleteOpportunity = new DeleteOpportunity($opportunity);
                            $deleteOpportunity->delete();
                            $this->log('Specificatie niet in woonplan. Kans ' . $opportunity->number . ' (' . $opportunity->id . ') met status Inactief (in behandeling) verwijderd.');

                        } else {
                            // kans status is niet In behandeling, kans status aanpassen naar "Verwijderd in Hoomdossier"
                            $statusDeletedInHD = OpportunityStatus::where('code_ref', 'deleted_in_hd')->first();
                            $opportunity->status_id = $statusDeletedInHD->id;
                            $opportunity->save();
                            $this->log('Specificatie niet in woonplan. Kans ' . $opportunity->number . ' (' . $opportunity->id . ') bijgewerkt met status "Verwijderd in Hoomdossier"');
                        }
                    }
                }
            }
            // hier check of er nog gekoppelde kanzen zijn, (even opnieuw specificatie ophalen. Kanzen kunnen net verwijderd zijn hierboven
            $specificationReload = HousingFileSpecification::find($specification->id);
            if($specificationReload->opportunities->count() == 0){
                // zo niet -> specificatie verwijderen
                $deleteSpecifiction = new DeleteHousingFileSpecification($specificationReload);
                $deleteSpecifiction->delete();
                $this->log('Specificatie niet in woonplan. Specification ' . $specificationReload->id. ' verwijderd.');
            }
        }

        if(isset($dataContent->user_action_plan_advice_comments)) {
            $remark = '';
            $remarkCoach = '';
            foreach($dataContent->user_action_plan_advice_comments as $key => $comment)
            {
                if(!empty($key)){
                    if($key == 'resident'){
                        $remark .= $comment;
                    }
                    if($key == 'coach'){
                        $remarkCoach .= $comment;
                    }
                }
            }
//            $this->log('Opmerkingen bewoner woningdossier vervangen met: ' . $remark);
//            $this->log('Opmerkingen coach woningdossier vervangen met: ' . $remarkCoach);
            $this->log('Opmerkingen bewoner en/of coach woningdossier vervangen');
            $this->housingFile->remark = $remark;
            $this->housingFile->remark_coach = $remarkCoach;
            $this->housingFile->save();
        }

    }

    /**
     * @param $userActionPlanAdvices
     * @param $defaultEconobisMeasure
     */
    protected function doPostElement($userActionPlanAdvice): void
    {
        // lege keys (zou niet voor moeten komen, skippen)
        if(empty($userActionPlanAdvice)){
            return;
        }

        $defaultEconobisMeasure = Measure::where('external_hoom_id', 'overig-uit-hoomdossier')->first();
        $hoomMeasureId = $userActionPlanAdvice->measure_id;
        $econobisMeasure = Measure::where('external_hoom_id', $hoomMeasureId)->first();
        if ($econobisMeasure) {
            $this->log('Maatregel hoom koppeling gevonden voor hoom measure id ' . $hoomMeasureId . '. Koppeling naar econobis maatregel: ' . $econobisMeasure->id . ' ' . $econobisMeasure->name . '.');
        } else {
            $this->log('Maatregel hoom koppeling NIET gevonden voor hoom measure id ' . $hoomMeasureId . '. Specificatie gekoppeld aan Overig uit Hoomdossier.');
            $econobisMeasure = $defaultEconobisMeasure;
        }

        $housingFileSpecification = HousingFileSpecification::where('housing_file_id', $this->housingFile->id)->where('measure_id', $econobisMeasure->id)->first();
        if ($housingFileSpecification) {
            $this->log('Woningdossier specificatie via hoom koppeling gevonden voor maatregel ' . $econobisMeasure->id . ' ' . $econobisMeasure->name . '. Specificatie bijwerken.');
            // hier check of er al een kans gemaakt was,
            if($housingFileSpecification->opportunities){
                // zo wel  -> check of er al kansacties aanwezig is bij die kans,
                foreach ($housingFileSpecification->opportunities as $opportunity) {
                    if (!$opportunity->quotationRequests) {
                        // zo niet -> kans verwijderen.
                        $deleteOpportunity = new DeleteOpportunity($opportunity);
                        $deleteOpportunity->delete();
                        $this->log('Specificatie ' . $housingFileSpecification->id . 'Kans ' . $opportunity->number . ' (' . $opportunity->id . ') verwijderd.');
                    } else {
                        // zo wel  -> kans bijwerken (waarmee?)
                        $this->log('Specificatie ' . $housingFileSpecification->id . 'Kans ' . $opportunity->number . ' (' . $opportunity->id . ') bijwerken.');
                    }
                }
            }
            // zo niet  -> specificatie bijwerken
            $answer = null;
            if (isset($userActionPlanAdvice->surface)) {
                $answer = $userActionPlanAdvice->surface;
            } elseif (isset($userActionPlanAdvice->count)) {
                $answer = $userActionPlanAdvice->count;
            } else {
                $this->log('Woningdossier specificatie zonder specifiek antwoord !?');
            }
            $housingFileSpecification->answer = $answer;
            $housingFileSpecification->external_hoom_name = isset($userActionPlanAdvice->name) ? $userActionPlanAdvice->name : '';
            $housingFileSpecification->type_of_execution = isset($userActionPlanAdvice->execute_self) ? ($userActionPlanAdvice->execute_self ? 'Z' : 'L') : null;;
            $housingFileSpecification->savings_gas = isset($userActionPlanAdvice->savings_gas) ? $userActionPlanAdvice->savings_gas : 0;
            $housingFileSpecification->savings_electricity = isset($userActionPlanAdvice->savings_electricity) ? $userActionPlanAdvice->savings_electricity : 0;
            $housingFileSpecification->co2_savings = isset($userActionPlanAdvice->co2_savings) ? $userActionPlanAdvice->co2_savings : 0;
            $housingFileSpecification->save();
            $this->log('Specificatie ' . $housingFileSpecification->id  . ' bijwerken.');

        } else {
            $this->log('Woningdossier specificatie via hoom koppeling NIET gevonden voor maatregel ' . $econobisMeasure->id . ' ' . $econobisMeasure->name . '. Specificatie aanmaken.');

            $measureDate = null;
            $answer = null;
            if (isset($userActionPlanAdvice->surface)) {
                $answer = $userActionPlanAdvice->surface;
            } elseif (isset($userActionPlanAdvice->count)) {
                $answer = $userActionPlanAdvice->count;
            } else {
                $this->log('Woningdossier specificatie onbekend antwoord !?');
            }
            $statusId = HousingFileSpecificationStatus::where('code_ref', 'desirable')->first()->id;
            $floorId = null;
            $sideId = null;
            $typeBrand = null;

            $housingFileSpecification = new HousingFileSpecification();
            $housingFileSpecification->housing_file_id = $this->housingFile->id;
            $housingFileSpecification->measure_id = $econobisMeasure->id;
            $housingFileSpecification->measure_date = $measureDate;
            $housingFileSpecification->answer = $answer;
            $housingFileSpecification->status_id = $statusId;
            $housingFileSpecification->external_hoom_name = isset($userActionPlanAdvice->name) ? $userActionPlanAdvice->name : '';
            $housingFileSpecification->type_of_execution = isset($userActionPlanAdvice->execute_self) ? ($userActionPlanAdvice->execute_self ? 'Z' : 'L') : null;;
            $housingFileSpecification->savings_gas = isset($userActionPlanAdvice->savings_gas) ? $userActionPlanAdvice->savings_gas : 0;
            $housingFileSpecification->savings_electricity = isset($userActionPlanAdvice->savings_electricity) ? $userActionPlanAdvice->savings_electricity : 0;
            $housingFileSpecification->co2_savings = isset($userActionPlanAdvice->co2_savings) ? $userActionPlanAdvice->co2_savings : 0;
            $housingFileSpecification->floor_id = $floorId;
            $housingFileSpecification->side_id = $sideId;
            $housingFileSpecification->type_brand = $typeBrand;
            $housingFileSpecification->save();
            $this->log('Woningdossier specificatie via hoom koppeling  gemaakt voor maatregel ' . $econobisMeasure->id . ' ' . $econobisMeasure->name . '.');

            // hier klaar met deze specificatie

        }

        // array met specifcation ids in dit woonplan bijhouden
        $this->specificationsInWoonplan[] =$housingFileSpecification->id;
    }

}