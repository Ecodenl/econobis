<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 12-09-2018
 * Time: 16:10
 */

namespace App\Http\Controllers\Api\Hoomdossier;

use App\Eco\Contact\Contact;
use App\Eco\Opportunity\OpportunityAction;
use App\Eco\QuotationRequest\QuotationRequest;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;

class EndPointAfspraakController extends EndPointHoomDossierController
{
    protected $coach = null;
    protected $logs = [];

    public function post(string $apiKey, Request $request)
    {
        $this->log('Test EndPointAfspraak');

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
        if(!$dataContent->appointment_date) {
            $this->error('Geen appointment_date meegegeven', 404);
        }
        if(!$this->cooperation->hoom_campaign_id) {
            $this->error('Geen Hoomdossier campagne voor cooperatie gevonden', 404);
        }
        if(!$dataContent->coaches) {
            $this->error('Geen coach meegegeven', 404);
        }
        $firstCoachId = $dataContent->coaches[0]->contact_id;
        $coach = Contact::find($firstCoachId);
        if(!$coach || !$coach->isCoach()) {
            $this->error('Gekoppelde coach is geen coach in Econobis', 404);
        } else {
            $this->coach = $coach;
        }
    }
    protected function doPost($dataContent)
    {
        $bezoekAction = OpportunityAction::where('code_ref', 'visit')->first();

        $quotationRequest = QuotationRequest::where('opportunity_action_id', $bezoekAction->id)
            ->where('contact_id', $this->coach->id)
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

        $quotationRequest->date_planned = Carbon::parse($dataContent->appointment_date);
        $quotationRequest->save();

        $this->log('Afspraak ' .  Carbon::parse($quotationRequest->date_planned)->format('d-m-Y H:i'). ' bijgewerkt voor bezoek coach ' . $this->coach->full_name_fnf . ' bij bewoner ' . $this->contact->full_name_fnf);
    }

}