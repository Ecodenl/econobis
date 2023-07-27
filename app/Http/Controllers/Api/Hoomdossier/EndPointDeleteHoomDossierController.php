<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 12-09-2018
 * Time: 16:10
 */

namespace App\Http\Controllers\Api\Hoomdossier;

use App\Eco\Opportunity\OpportunityStatus;
use App\Helpers\Delete\Models\DeleteHousingFile;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Response;

class EndPointDeleteHoomDossierController extends EndPointHoomDossierController
{
    protected $logs = [];

    public function post(string $apiKey, Request $request)
    {
        $this->log('Start EndPointDeleteHoomDossier');

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
    }

    protected function doPost($dataContent)
    {
        // check of er nog specificaties onder behandeling zijn bij woningdossier:
        $allowDelete = true;
        $statusInActive = OpportunityStatus::where('code_ref', 'inactive')->first();
        $specifications = $this->housingFile->housingFileSpecifications;
        foreach ($specifications as $specification) {
            if( $specification->opportunities()->where('status_id', '!=', $statusInActive->id)->exists() ){
                $allowDelete = false;
                break;
            }
        }
        if(!$allowDelete){
            $this->error('Woningdossier heeft kansen die in behandeling zijn. Woningdossier niet verwijderd in Econobis', 404);
        }

        $deleteHousingFile = new DeleteHousingFile($this->housingFile);
        $result = $deleteHousingFile->delete();

        if(count($result) > 0){
            $this->error(implode(";", array_unique($result)), 412);
        } else {
            $this->log('Woningdossier met building id ' . $this->housingFile->hoom_building_id . ' in Econobis verwijderd.');
        }
    }

}