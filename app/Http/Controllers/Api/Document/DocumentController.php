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
use Barryvdh\DomPDF\Facade\Pdf;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

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

    public function peek(){
        $this->authorize('view', Document::class);

        $documents = Document::select('id', 'filename', 'created_at');
        $teamDocumentCreatedFromIds = Auth::user()->getDocumentCreatedFromIds();
        if($teamDocumentCreatedFromIds){
            $documents->whereIn('document_created_from_id', $teamDocumentCreatedFromIds);
        }
        $teamContactIds = Auth::user()->getTeamContactIds();
        if ($teamContactIds){
            $documents->where(function ($documents) use($teamContactIds) {
                $documents->whereIn('documents.contact_id', $teamContactIds);
                $documents->orWhereNull('documents.contact_id');
            });

        }

        return $documents->orderByDesc('created_at')->get();
    }

    public function defaultEmailDocumentsPeek(){
        return Document::select('id', 'filename')->where('document_group', 'default-email-attachment')->get();
    }

    public function show(Document $document)
    {
        $this->authorize('view', Document::class);
        $this->checkDocumentAutorized($document);

        $document->load(
            'administration',
            'task',
            'order',
            'administration',
            'contact',
            'intake',
            'contactGroup',
            'opportunity',
            'quotationRequest',
            'housingFile',
            'campaign',
            'measure',
            'sentBy',
            'createdBy',
            'documentCreatedFrom',
            'template',
            'opportunity.measureCategory',
            'opportunity.status',
            'order',
            'project',
            'participant',
            'participant.contact',
            'participant.project');

        return FullDocument::make($document);
    }

    public function store(RequestInput $requestInput, Request $request)
    {
        $this->authorize('create', Document::class);

        $data = $requestInput
            ->string('description')->next()
            ->integer('documentCreatedFromId')->alias('document_created_from_id')->next()
            ->string('documentType')->validate('required')->alias('document_type')->next()
            ->string('documentGroup')->validate('required')->alias('document_group')->next()
            ->string('filename')->next()
            ->integer('templateId')->validate('exists:document_templates,id')->onEmpty(null)->alias('template_id')->next()
            ->string('htmlBody')->whenMissing(null)->onEmpty(null)->alias('html_body')->next()
            ->string('freeText1')->alias('free_text_1')->next()
            ->string('freeText2')->alias('free_text_2')->next()
            ->integer('contactId')->validate('exists:contacts,id')->onEmpty(null)->alias('contact_id')->next()
            ->integer('intakeId')->validate('exists:intakes,id')->onEmpty(null)->alias('intake_id')->next()
            ->integer('contactGroupId')->validate('exists:contact_groups,id')->onEmpty(null)->alias('contact_group_id')->next()
            ->integer('opportunityId')->validate('exists:opportunities,id')->onEmpty(null)->alias('opportunity_id')->next()
            ->integer('sentById')->validate('exists:users,id')->onEmpty(null)->alias('sent_by_id')->next()
            ->integer('campaignId')->validate('exists:campaigns,id')->onEmpty(null)->alias('campaign_id')->next()
            ->integer('housingFileId')->validate('exists:housing_files,id')->onEmpty(null)->alias('housing_file_id')->next()
            ->integer('quotationRequestId')->validate('exists:quotation_requests,id')->onEmpty(null)->alias('quotation_request_id')->next()
            ->integer('measureId')->validate('exists:measures,id')->onEmpty(null)->alias('measure_id')->next()
            ->integer('taskId')->validate('exists:tasks,id')->onEmpty(null)->alias('task_id')->next()
            ->integer('projectId')->validate('exists:projects,id')->onEmpty(null)->alias('project_id')->next()
            ->integer('participantId')->validate('exists:participation_project,id')->onEmpty(null)->alias('participation_project_id')->next()
            ->integer('orderId')->validate('exists:orders,id')->onEmpty(null)->alias('order_id')->next()
            ->integer('administrationId')->validate('exists:administrations,id')->onEmpty(null)->alias('administration_id')->next()
            ->get();

        $data['show_on_portal'] = (bool) $request->input('showOnPortal') && $request->input('showOnPortal') !== 'false';

        $document = new Document();
        $document->fill($data);
        $document->save();

        //store the actual file in Alfresco
//        $user = Auth::user();

        if($data['document_type'] == 'internal'){

            $pdfContent = $this->create($document);
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
            $document->quotationRequest && $document->quotationRequest->organisationOrCoach && $name .= str_replace(' ', '', $this->translateToValidCharacterSet($document->quotationRequest->organisationOrCoach->full_name)) . '_';
            $document->project && $name .= str_replace(' ', '', $this->translateToValidCharacterSet($document->project->name)) . '_';
            $document->participant && $name .= str_replace(' ', '', $this->translateToValidCharacterSet($document->participant->contact->full_name)) . '_';
            $document->order && $name .= str_replace(' ', '', $document->order->number) . '_';

            //max length name 25
            $name = substr($name, 0, 25);

            $fileName = $name
                . substr($document->getDocumentGroup()->name, 0, 1)
                . (Document::where('document_group', $document->getDocumentGroup())->count() + 1)
                . '_'
                .  $time->format('Ymd')
                . '.pdf';
            $uniqueName = Str::uuid() . '.pdf';
            $filePathAndName = "{$document->document_group}/" .
                Carbon::parse($document->created_at)->year .
                "/{$uniqueName}";
            Storage::disk('documents')->put($filePathAndName, $pdfContent);

            $document->file_path_and_name = $filePathAndName;
            $document->filename = $fileName;
            $document->alfresco_node_id = null;
            $document->save();

        } else {

            $file = $request->file('attachment');
            if($file == null || !$file->isValid()) {
                abort('422', 'Error uploading file');
            }

            $uniqueName = Str::uuid() . '.' . $file->getClientOriginalExtension();
            $filePath = Storage::disk('documents')->putFileAs(
                "{$document->document_group}/" . Carbon::now()->year,
                $file,
                $uniqueName
            );

            $document->file_path_and_name = $filePath;
            $document->filename = $file->getClientOriginalName();
            $document->alfresco_node_id = null;
            $document->save();

        }

        return FullDocument::make($document->fresh());
    }

    public function update(RequestInput $requestInput, Request $request, Document $document) {

        $this->authorize('create', Document::class);

        $data = $requestInput
            ->string('description')->next()
            ->string('htmlBody')->whenMissing(null)->onEmpty(null)->alias('html_body')->next()
            ->string('freeText1')->alias('free_text_1')->next()
            ->string('freeText2')->alias('free_text_2')->next()
            ->integer('contactId')->validate('exists:contacts,id')->onEmpty(null)->alias('contact_id')->next()
            ->integer('intakeId')->validate('exists:intakes,id')->onEmpty(null)->alias('intake_id')->next()
            ->integer('contactGroupId')->validate('exists:contact_groups,id')->onEmpty(null)->alias('contact_group_id')->next()
            ->integer('opportunityId')->validate('exists:opportunities,id')->onEmpty(null)->alias('opportunity_id')->next()
            ->integer('sentById')->validate('exists:users,id')->onEmpty(null)->alias('sent_by_id')->next()
            ->integer('campaignId')->validate('exists:campaigns,id')->onEmpty(null)->alias('campaign_id')->next()
            ->integer('housingFileId')->validate('exists:housing_files,id')->onEmpty(null)->alias('housing_file_id')->next()
            ->integer('quotationRequestId')->validate('exists:quotation_requests,id')->onEmpty(null)->alias('quotation_request_id')->next()
            ->integer('measureId')->validate('exists:measures,id')->onEmpty(null)->alias('measure_id')->next()
            ->integer('taskId')->validate('exists:tasks,id')->onEmpty(null)->alias('task_id')->next()
            ->integer('projectId')->validate('exists:projects,id')->onEmpty(null)->alias('project_id')->next()
            ->integer('participantId')->validate('exists:participation_project,id')->onEmpty(null)->alias('participation_project_id')->next()
            ->integer('orderId')->validate('exists:orders,id')->onEmpty(null)->alias('order_id')->next()
            ->integer('administrationId')->validate('exists:administrations,id')->onEmpty(null)->alias('administration_id')->next()
            ->get();

        $data['show_on_portal'] = (bool) $request->input('showOnPortal') && $request->input('showOnPortal') !== 'false';

        $document->fill($data);
        $document->save();

        $document->load('contact', 'intake', 'order', 'contactGroup', 'sentBy', 'createdBy', 'documentCreatedFrom', 'template', 'opportunity.measureCategory', 'opportunity.status', 'project', 'participant.contact', 'participant.project');

        return FullDocument::make($document);
    }

    public function destroy(Document $document)
    {
        $this->authorize('create', Document::class);

        // indien document niet in alfresco maar document was gemaakt in a storage map (file_path_and_name ingevuld), dan ook verwijderen in die storage map.
        if ($document->alfresco_node_id == null && $document->file_path_and_name != null) {
            Storage::disk('documents')->delete($document->file_path_and_name);
        } else {
            //delete file in Alfresco(to trashbin)
//            $user = Auth::user();
            if(\Config::get('app.ALFRESCO_COOP_USERNAME') != 'local' && $document->alfresco_node_id) {
                $alfrescoHelper = new AlfrescoHelper(\Config::get('app.ALFRESCO_COOP_USERNAME'), \Config::get('app.ALFRESCO_COOP_PASSWORD'));
                $alfrescoHelper->deleteFile($document->alfresco_node_id);
            }
        }

        $document->delete();
    }

    public function create(Document $document){

        //load template parts
        $document->load('template.footer', 'template.baseTemplate', 'template.header');

        if($document->template) {

            if($document->html_body && $document->html_body != ''){
                $html = TemplateVariableHelper::replaceTemplateFreeTextVariables($document->html_body,
                    $document->free_text_1, $document->free_text_2);

            } else {
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

            }

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
        $this->checkDocumentAutorized($document);

        // indien document was gemaakt in a storage map (file_path_and_name ingevuld), dan halen we deze op uit die storage map.
        if ($document->file_path_and_name != null) {

            $filePath = Storage::disk('documents')->path($document->file_path_and_name);
            $path = Storage::disk('documents')->path($document->file_path_and_name);
            if (!file_exists($path)) {
                Log::error("Document niet gevonden: " . $path);
                abort(404, 'Document niet gevonden.');
            }
            $finfo = finfo_open(FILEINFO_MIME_TYPE);
            $mime = finfo_file($finfo, $path);
            finfo_close($finfo);
//            Log::info("MIME-type gedetecteerd: " . $mime);


            return response()->download($filePath, $document->filename, [
                'Cache-Control' => 'no-cache, must-revalidate',
                'Pragma' => 'no-cache',
                'Expires' => '0',
                'X-Filename' => $document->filename,
                'Access-Control-Expose-Headers' => 'X-Filename',
            ]);

            // anders indien alfresco_node_id ingevuld, dan halen we deze op uit Alfreso.
        } elseif ($document->alfresco_node_id != null) {
            $alfrescoHelper = new AlfrescoHelper(\Config::get('app.ALFRESCO_COOP_USERNAME'), \Config::get('app.ALFRESCO_COOP_PASSWORD'));
            return $alfrescoHelper->downloadFile($document->alfresco_node_id);
        }

        return null;
    }

    public function downLoadRawDocument(Document $document)
    {
        // indien document was gemaakt in a storage map (file_path_and_name ingevuld), dan halen we deze op uit die storage map.
        if ($document->file_path_and_name != null) {
            $path = Storage::disk('documents')->path($document->file_path_and_name);

            if (!file_exists($path)) {
                Log::error("Document niet gevonden: " . $path);
                abort(404, 'Document niet gevonden.');
            }

            $content = file_get_contents($path);
            $mime = mime_content_type($path);

            return [
                'content' => $content,
                'filename' => $document->filename,
                'mime' => $mime,
            ];
        } elseif ($document->alfresco_node_id != null) {
            $alfrescoHelper = new AlfrescoHelper(\Config::get('app.ALFRESCO_COOP_USERNAME'), \Config::get('app.ALFRESCO_COOP_PASSWORD'));
//            return $alfrescoHelper->downloadFile($document->alfresco_node_id);
            $content = $alfrescoHelper->downloadFile($document->alfresco_node_id);
            return [
                'content' => $content,
                'filename' => $document->filename,
            ];
        }

        return null;
    }

    protected function translateToValidCharacterSet($field)
    {
        $fieldUtf8Decoded = mb_convert_encoding($field, 'ISO-8859-1', 'UTF-8');
        $replaceFrom = mb_convert_encoding('ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØÙÚÛÜÝßàáâãäåæçèéêëìíîïðñòóôõöøùúûüýÿ', 'ISO-8859-1', 'UTF-8');
        $replaceTo = mb_convert_encoding('AAAAAAACEEEEIIIIDNOOOOOOUUUUYsaaaaaaaceeeeiiiionoooooouuuuyy', 'ISO-8859-1', 'UTF-8');
        $field = strtr( $fieldUtf8Decoded, $replaceFrom, $replaceTo );
        $field = preg_replace('/[^A-Za-z0-9 -]/', '', $field);

        return $field;
    }

    /**
     * @param Document $document
     */
    protected function checkDocumentAutorized(Document $document): void
    {
        $teamDocumentCreatedFromIds = Auth::user()->getDocumentCreatedFromIds();
        if ($teamDocumentCreatedFromIds && !in_array($document->document_created_from_id, $teamDocumentCreatedFromIds)) {
            abort(403, 'Niet geautoriseerd.');
        }
        if($document->contact){
            $teamContactIds = Auth::user()->getTeamContactIds();
            if ($teamContactIds && !in_array($document->contact_id, $teamContactIds)) {
                abort(403, 'Niet geautoriseerd.');
            }
        }

    }
}