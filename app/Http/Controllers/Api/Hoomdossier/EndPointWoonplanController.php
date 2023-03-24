<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 12-09-2018
 * Time: 16:10
 */

namespace App\Http\Controllers\Api\Hoomdossier;

use App\Eco\HousingFile\HousingFileSpecification;
use App\Eco\Measure\Measure;
use App\Eco\Opportunity\OpportunityAction;
use App\Eco\QuotationRequest\QuotationRequest;
use App\Eco\QuotationRequest\QuotationRequestStatus;
use Carbon\Carbon;
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
        if(!isset($dataContent->user_action_plan_advices) || !is_array($dataContent->user_action_plan_advices) ) {
            $this->error('Geen "user_action_plan_advices" meegegeven', 404);
        }
    }

    protected function doPost($dataContent)
    {

        foreach($dataContent->user_action_plan_advices as $userActionPlanAdvice) {
            $this->doPostElement($userActionPlanAdvice);
        }

        $specificationsInEconobis = $this->housingFile->housingFileSpecifications->pluck('id')->toArray();
        $specificationsInEconobisNotInWoonplan = array_diff($specificationsInEconobis, $this->specificationsInWoonplan);
        $this->log('specificationsInEconobis ' . implode(',', $specificationsInEconobis));
        $this->log('specificationsInWoonplan ' . implode(',', $this->specificationsInWoonplan));
        $this->log('specificationsInEconobisNotInWoonplan ' . implode(',', $specificationsInEconobisNotInWoonplan));

        foreach ($specificationsInEconobisNotInWoonplan as $specification){
            // hier check of er al een kans gemaakt was,
            // zo niet -> specificatie verwijderen
            // zo wel  -> check of er al kansacties aanwezig is bij die kans,
            //            zo niet -> kans verwijderen.
            //            zo wel  -> kans bijwerken (waarmee?)
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
            // zo niet -> hier bijwerken specificatie.
            // zo wel  -> check of er al kansacties aanwezig is bij die kans,
            //            zo niet -> kans verwijderen.
            //            zo wel  -> kans bijwerken (waarmee?)

        } else {
            $this->log('Woningdossier specificatie via hoom koppeling NIET gevonden voor maatregel ' . $econobisMeasure->id . ' ' . $econobisMeasure->name . '. Specificatie aanmaken.');

            $measurDate = null;
            $answer = null;
            if (isset($userActionPlanAdvice->surface)) {
                $answer = $userActionPlanAdvice->surface;
            } elseif ($userActionPlanAdvice->count) {
                $answer = $userActionPlanAdvice->count;
            } else {
                $this->log('Woningdossier specificatie onbekend antwoord !?');
            }
            $statusId = null;
            $floorId = null;
            $sideId = null;
            $typeBrand = null;

            $housingFileSpecification = new HousingFileSpecification();
            $housingFileSpecification->housing_file_id = $this->housingFile->id;
            $housingFileSpecification->measure_id = $econobisMeasure->id;
            $housingFileSpecification->measure_date = $measurDate;
            $housingFileSpecification->answer = $answer;
            $housingFileSpecification->status_id = $statusId;
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

    protected function checkOpportunity($housingFileSpecification)
    {
        $bezoekAction = OpportunityAction::where('code_ref', 'visit')->first();

        $quotationRequest = QuotationRequest::where('opportunity_action_id', $bezoekAction->id)
            ->WhereHas('opportunity', function($query){
                $query->WhereHas('intake', function($query2){
                    $query2->where('contact_id', $this->contact->id)
                        ->where('campaign_id', $this->cooperation->hoom_campaign_id);
                });
            })
            ->orderby('id', 'desc')->first();
        if(!$quotationRequest) {
            $this->error('Afspraak niet gevonden in Econobis', 404);
        }

        if($dataContent->status->short === 'executed'){
            $bezoekStatusDone = QuotationRequestStatus::where('opportunity_action_id', $bezoekAction->id)->where('code_ref', 'done')->first();
            $quotationRequest->status_id = $bezoekStatusDone->id;
            $quotationRequest->save();
            $this->log('Afspraak ' .  Carbon::parse($quotationRequest->date_planned)->format('d-m-Y H:i'). ' op gedaan voor bezoek coach ' . $quotationRequest->organisationOrCoach->full_name_fnf . ' bij bewoner ' . $this->contact->full_name_fnf);
        } else {
            $StatusFromContent = (isset($dataContent->status->name) ? $dataContent->status->name : 'onbekend');
            $this->log('Afspraak ' .  Carbon::parse($quotationRequest->date_planned)->format('d-m-Y H:i'). ' niet bijgewerkt voor bezoek coach ' . $quotationRequest->organisationOrCoach->full_name_fnf . ' bij bewoner ' . $this->contact->full_name_fnf . ' i.v.m. status: '. $StatusFromContent);
        }
    }


}