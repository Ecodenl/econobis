<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 04-01-2018
 * Time: 11:32
 */

namespace App\Http\Controllers\Api\Document;

use App\Eco\Document\Document;

use App\Helpers\Alfresco\AlfrescoHelper;
use App\Helpers\RequestInput\RequestInput;
use App\Helpers\Template\TemplateVariableHelper;
use App\Http\Controllers\Controller;
use App\Http\RequestQueries\Document\Grid\RequestQuery;
use App\Http\Resources\Document\FullDocument;
use App\Http\Resources\Document\GridDocument;
use Barryvdh\DomPDF\Facade as PDF;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class DocumentController extends Controller
{

    public function grid(RequestQuery $requestQuery)
    {
        $this->authorize('view', Document::class);

        $documents = $requestQuery->get();

        $documents->load(['contact']);

        return GridDocument::collection($documents)
            ->additional(['meta' => [
                'total' => $requestQuery->total(),
            ]
            ]);
    }

    public function show(Document $document)
    {
        $this->authorize('view', Document::class);

        $document->load('contact', 'intake', 'contactGroup', 'sentBy', 'createdBy', 'template', 'opportunity.measure', 'opportunity.status');

        return FullDocument::make($document);
    }

    public function store(RequestInput $requestInput, Request $request)
    {
        $this->authorize('create', Document::class);

        $data = $requestInput
            ->string('description')->next()
            ->string('documentType')->validate('required')->alias('document_type')->next()
            ->string('documentGroup')->validate('required')->alias('document_group')->next()
            ->string('filename')->next()
            ->string('freeText1')->alias('free_text_1')->next()
            ->string('freeText2')->alias('free_text_2')->next()
            ->integer('contactId')->validate('exists:contacts,id')->onEmpty(null)->alias('contact_id')->next()
            ->integer('intakeId')->validate('exists:intakes,id')->onEmpty(null)->alias('intake_id')->next()
            ->integer('contactGroupId')->validate('exists:contact_groups,id')->onEmpty(null)->alias('contact_group_id')->next()
            ->integer('opportunityId')->validate('exists:opportunities,id')->onEmpty(null)->alias('opportunity_id')->next()
            ->integer('sentById')->validate('exists:users,id')->onEmpty(null)->alias('sent_by_id')->next()
            ->integer('templateId')->validate('exists:document_templates,id')->onEmpty(null)->alias('template_id')->next()
            ->integer('campaignId')->validate('exists:campaigns,id')->onEmpty(null)->alias('campaign_id')->next()
            ->integer('housingFileId')->validate('exists:housing_files,id')->onEmpty(null)->alias('housing_file_id')->next()
            ->integer('quotationRequestId')->validate('exists:quotation_requests,id')->onEmpty(null)->alias('quotation_request_id')->next()
            ->integer('measureId')->validate('exists:measures,id')->onEmpty(null)->alias('measure_id')->next()
            ->integer('taskId')->validate('exists:tasks,id')->onEmpty(null)->alias('task_id')->next()
            ->integer('productionProjectId')->validate('exists:production_projects,id')->onEmpty(null)->alias('production_project_id')->next()
            ->get();

        $document = new Document();
        $document->fill($data);
        $document->save();

        //store the actual file in Alfresco
        $user = Auth::user();

        $alfrescoHelper = new AlfrescoHelper($user->email, $user->alfresco_password);

        if($data['document_type'] == 'internal'){

            $pdf = $this->create($document);

            $time = Carbon::now();

            $name = '';
            $document->contact && $name .=  '-' . str_replace(' ', '', $document->contact->full_name);
            $document->intake && $name .= '-intake-' . $document->intake->id;
            $document->contactGroup && $name .= '-' . str_replace(' ', '', $document->contactGroup->name);
            $document->opportunity && $name .= '-' . $document->opportunity->number;

            $document->filename = $time->format('Ymd') . $name . '.pdf';
            $document->save();

            $filePath = (storage_path('app' . DIRECTORY_SEPARATOR . 'documents/' . $document->filename));
            file_put_contents($filePath, $pdf);

            $alfrescoResponse = $alfrescoHelper->createFile($filePath, $document->filename, $document->getDocumentGroup()->name);

            $document->alfresco_node_id = $alfrescoResponse['entry']['id'];
            $document->save();

            Storage::disk('documents')->delete($document->filename);
        }
        else{
            $file = $request->file('attachment');

            if($file == null || !$file->isValid()) abort('422', 'Error uploading file');


            $file_tmp = $file->store('', 'documents');
            $filePath_tmp = Storage::disk('documents')->getDriver()->getAdapter()->applyPathPrefix($file_tmp);



            $alfrescoResponse = $alfrescoHelper->createFile($filePath_tmp, $file->getClientOriginalName(), $document->getDocumentGroup()->name);

            $document->filename = $file->getClientOriginalName();
            $document->alfresco_node_id = $alfrescoResponse['entry']['id'];
            $document->save();

            Storage::disk('documents')->delete($file_tmp);
        }

        return FullDocument::make($document->fresh());
    }

    public function update(RequestInput $requestInput, Document $document) {

        $this->authorize('create', Document::class);

        $data = $requestInput
            ->string('description')->next()
            ->string('documentType')->validate('required')->alias('document_type')->next()
            ->string('documentGroup')->validate('required')->alias('document_group')->next()
            ->string('freeText1')->alias('free_text_1')->next()
            ->string('freeText2')->alias('free_text_2')->next()
            ->integer('contactId')->validate('exists:contacts,id')->onEmpty(null)->alias('contact_id')->next()
            ->integer('intakeId')->validate('exists:intakes,id')->onEmpty(null)->alias('intake_id')->next()
            ->integer('contactGroupId')->validate('exists:contact_groups,id')->onEmpty(null)->alias('contact_group_id')->next()
            ->integer('opportunityId')->validate('exists:opportunities,id')->onEmpty(null)->alias('opportunity_id')->next()
            ->integer('sentById')->validate('exists:users,id')->onEmpty(null)->alias('sent_by_id')->next()
            ->integer('templateId')->validate('exists:document_templates,id')->onEmpty(null)->alias('template_id')->next()
            ->integer('campaignId')->validate('exists:campaigns,id')->onEmpty(null)->alias('campaign_id')->next()
            ->integer('housingFileId')->validate('exists:housing_files,id')->onEmpty(null)->alias('housing_file_id')->next()
            ->integer('quotationRequestId')->validate('exists:quotation_requests,id')->onEmpty(null)->alias('quotation_request_id')->next()
            ->integer('measureId')->validate('exists:measures,id')->onEmpty(null)->alias('measure_id')->next()
            ->integer('taskId')->validate('exists:tasks,id')->onEmpty(null)->alias('task_id')->next()
            ->integer('productionProjectId')->validate('exists:production_projects,id')->onEmpty(null)->alias('production_project_id')->next()
            ->get();

        $document->fill($data);
        $document->save();

        $document->load('contact', 'contactGroup', 'opportunity', 'intake.address');

        return FullDocument::make($document);
    }

    public function destroy(Document $document)
    {
        $this->authorize('create', Document::class);

        $document->forceDelete();
    }

    public function create(Document $document){

        //load template parts
        $document->load('template.footer', 'template.baseTemplate', 'template.header');

        if($document->template) {
            $html = $document->template->header
                ? $document->template->header->html_body : '';

            if ($document->template->baseTemplate) {
                $html .= TemplateVariableHelper::replaceTemplateTagVariable($document->template->baseTemplate->html_body,
                    $document->template->html_body, $document->free_text_1,
                    $document->free_text_2);
            } else {
                $html .= TemplateVariableHelper::replaceTemplateFreeTextVariables($document->template->html_body,
                    $document->free_text_1, $document->free_text_2);
            }

            $html .= $document->template->footer
                ? $document->template->footer->html_body : '';

            $html
                = TemplateVariableHelper::replaceDocumentTemplateVariables($document,
                $html);
        }
        else{
            $html = 'Dit bestand is leeg';
        }
        $pdf = PDF::loadView('documents.generic', [
            'html' => $html,
            ]);

        return $pdf->output();
    }

    public function download(Document $document){

        $this->authorize('view', Document::class);

        $user = Auth::user();

        $alfrescoHelper = new AlfrescoHelper($user->email, $user->alfresco_password);

        return $alfrescoHelper->downloadFile($document->alfresco_node_id);
    }
}