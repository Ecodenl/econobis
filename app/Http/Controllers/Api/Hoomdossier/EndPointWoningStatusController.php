<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 12-09-2018
 * Time: 16:10
 */

namespace App\Http\Controllers\Api\Hoomdossier;

use App\Eco\Opportunity\OpportunityAction;
use App\Eco\QuotationRequest\QuotationRequest;
use App\Eco\QuotationRequest\QuotationRequestStatus;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;

class EndPointWoningStatusController extends EndPointHoomDossierController
{
    protected $logs = [];

    public function post(string $apiKey, Request $request)
    {
        $this->log('Start EndPointWoningStatus');

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
        if(!isset($dataContent->status) || !isset($dataContent->status->short)) {
            $this->error('Geen status meegegeven', 404);
        }
        if(!$this->cooperation->hoom_campaign_id) {
            $this->error('Geen Hoomdossier campagne voor cooperatie gevonden', 404);
        }
    }
    protected function doPost($dataContent)
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
            $this->log('Afspraak ' .  ($quotationRequest->date_planned ? Carbon::parse($quotationRequest->date_planned)->format('d-m-Y H:i') : 'onbekend') . ' op gedaan voor bezoek coach ' . ($quotationRequest->organisationOrCoach ? $quotationRequest->organisationOrCoach->full_name_fnf : 'onbekend') . ' bij bewoner ' . $this->contact->full_name_fnf);
        } else {
            $StatusFromContent = (isset($dataContent->status->name) ? $dataContent->status->name : 'onbekend');
            $this->log('Afspraak ' .  ($quotationRequest->date_planned ? Carbon::parse($quotationRequest->date_planned)->format('d-m-Y H:i') : 'onbekend') . ' niet bijgewerkt voor bezoek coach ' . ($quotationRequest->organisationOrCoach ? $quotationRequest->organisationOrCoach->full_name_fnf : 'onbekend') . ' bij bewoner ' . ($this->contact ? $this->contact->full_name_fnf : 'onbekend') . ' i.v.m. status: '. $StatusFromContent);
        }
    }

}