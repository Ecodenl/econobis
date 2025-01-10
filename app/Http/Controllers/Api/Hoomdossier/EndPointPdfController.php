<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 12-09-2018
 * Time: 16:10
 */

namespace App\Http\Controllers\Api\Hoomdossier;

use App\Eco\Document\Document;
use App\Eco\Document\DocumentCreatedFrom;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class EndPointPdfController extends EndPointHoomDossierController
{
    public function post(string $apiKey, Request $request)
    {
        $this->log('Start EndPointPdf');

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
        if(!isset($dataContent->pdf) || !isset($dataContent->pdf->contents) || empty($dataContent->pdf->contents)) {
            $this->error('Geen PDF content gevonden', 404);
        }
    }
    protected function doPost($dataContent)
    {
        $fileName = 'Hoomdossier-rapportage-' . $this->housingFile->id . '.pdf';
        $this->log('Filename rapportage: ' . $fileName);

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

        $contents = base64_decode( $dataContent->pdf->contents );

        $uniqueName = Str::random(40) . '.pdf';
        $filePathAndName = "{$document->document_group}/" .
            Carbon::parse($document->created_at)->year .
            "/{$uniqueName}";
        Storage::disk('documents')->put($filePathAndName, $contents);

        $document->file_path_and_name = $filePathAndName;
        $document->alfresco_node_id = null;
        $this->log('Woningdossier rapportage ' . $fileName . ' opgeslagen als ' . $documentCreatedFromName . ' document in Bigstorage');

        $document->save();

    }

}