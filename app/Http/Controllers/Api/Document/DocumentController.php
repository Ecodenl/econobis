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

        $document->load('task', 'order', 'contact', 'intake', 'contactGroup', 'sentBy', 'createdBy', 'template', 'opportunity.measureCategory', 'opportunity.status', 'project', 'participant.contact', 'participant.project');

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
            ->integer('projectId')->validate('exists:projects,id')->onEmpty(null)->alias('project_id')->next()
            ->integer('participantId')->validate('exists:participation_project,id')->onEmpty(null)->alias('participation_project_id')->next()
            ->integer('orderId')->validate('exists:orders,id')->onEmpty(null)->alias('order_id')->next()
            ->get();

        $document = new Document();
        $document->fill($data);
        $document->save();

        //store the actual file in Alfresco
        $user = Auth::user();

        $alfrescoHelper = new AlfrescoHelper(\Config::get('app.ALFRESCO_COOP_USERNAME'), \Config::get('app.ALFRESCO_COOP_PASSWORD'));

        if($data['document_type'] == 'internal'){

            $pdf = $this->create($document);

            $time = Carbon::now();

            $name = '';
            $document->contact && $name .= str_replace(' ', '', $this->translateToValidCharacterSet($document->contact->full_name)) . '_';
            $document->intake && $name .= $this->translateToValidCharacterSet($document->intake->contact->full_name) . '_';
            $document->contactGroup && $name .= str_replace(' ', '', $this->translateToValidCharacterSet($document->contactGroup->name)) . '_';
            $document->opportunity && $name .= $document->opportunity->number . '_';
            $document->housingFile && $name .= str_replace(' ', '', $this->translateToValidCharacterSet($document->housingFile->address->contact->full_name)) . '_';
            $document->campaign && $name .= str_replace(' ', '', $this->translateToValidCharacterSet($document->campaign->name)) . '_';
            $document->measure && $name .= str_replace(' ', '', $this->translateToValidCharacterSet($document->measure->name)) . '_';
            $document->task && $name .= $document->task->id . '_';
            $document->quotationRequest && $name .= str_replace(' ', '', $this->translateToValidCharacterSet($document->quotationRequest->organisation->contact->full_name)) . '_';
            $document->project && $name .= str_replace(' ', '', $this->translateToValidCharacterSet($document->project->name)) . '_';
            $document->participant && $name .= str_replace(' ', '', $this->translateToValidCharacterSet($document->participant->contact->full_name)) . '_';
            $document->order && $name .= str_replace(' ', '', $document->order->number) . '_';

            //max length name 25
            $name = substr($name, 0, 25);

            $document->filename = $name . substr($document->getDocumentGroup()->name, 0, 1) . (Document::where('document_group', $document->getDocumentGroup())->count() + 1) . '_' .  $time->format('Ymd') . '.pdf';
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
            ->integer('projectId')->validate('exists:projects,id')->onEmpty(null)->alias('project_id')->next()
            ->integer('participantId')->validate('exists:participation_project,id')->onEmpty(null)->alias('participation_project_id')->next()
            ->integer('orderId')->validate('exists:orders,id')->onEmpty(null)->alias('order_id')->next()
            ->get();

        $document->fill($data);
        $document->save();

        $document->load('contact', 'intake', 'order', 'contactGroup', 'sentBy', 'createdBy', 'template', 'opportunity.measureCategory', 'opportunity.status', 'project', 'participant.contact', 'participant.project');

        return FullDocument::make($document);
    }

    public function destroy(Document $document)
    {
        $this->authorize('create', Document::class);

        //delete file in Alfresco(to trashbin)
        $user = Auth::user();
        $alfrescoHelper = new AlfrescoHelper(\Config::get('app.ALFRESCO_COOP_USERNAME'), \Config::get('app.ALFRESCO_COOP_PASSWORD'));

        $alfrescoHelper->deleteFile($document->alfresco_node_id);

        $document->delete();
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

        $alfrescoHelper = new AlfrescoHelper(\Config::get('app.ALFRESCO_COOP_USERNAME'), \Config::get('app.ALFRESCO_COOP_PASSWORD'));

        return $alfrescoHelper->downloadFile($document->alfresco_node_id);
    }

    protected function translateToValidCharacterSet($field){

        $field = iconv('UTF-8', 'ASCII//TRANSLIT', $field);
        $field = preg_replace('/[^A-Za-z0-9 -]/', '', $field);

        return $field;
    }
}