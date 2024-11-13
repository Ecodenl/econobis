<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 04-01-2018
 * Time: 11:32
 */

namespace App\Http\Controllers\Api\DocumentTemplate;

use App\Eco\DocumentTemplate\DocumentTemplate;
use App\Helpers\Delete\Models\DeleteDocumentTemplate;
use App\Helpers\RequestInput\RequestInput;
use App\Http\Controllers\Controller;
use App\Http\RequestQueries\DocumentTemplate\Grid\RequestQuery;
use App\Http\Resources\DocumentTemplate\DocumentTemplatePeek;
use App\Http\Resources\DocumentTemplate\FullDocumentTemplate;
use App\Http\Resources\DocumentTemplate\GridDocumentTemplate;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;


class DocumentTemplateController extends Controller
{

    public function grid(RequestQuery $requestQuery)
    {
        $this->authorize('view', DocumentTemplate::class);

        $documentTemplates = $requestQuery->get()->sortBy('name');

        return GridDocumentTemplate::collection($documentTemplates)
            ->additional(['meta' => [
                'total' => $requestQuery->total(),
            ]
            ]);
    }

    public function show(DocumentTemplate $documentTemplate)
    {
        $this->authorize('view', DocumentTemplate::class);

        $documentTemplate->load('baseTemplate', 'header', 'footer', 'createdBy', 'roles');

        return FullDocumentTemplate::make($documentTemplate);
    }


    public function store(RequestInput $requestInput, Request $request)
    {
        $this->authorize('create', DocumentTemplate::class);

        $data = $requestInput
            ->string('characteristic')->next()
            ->string('name')->next()
            ->string('documentTemplateTypeId')->validate('required')->alias('template_type')->next()
            ->string('documentGroupId')->alias('document_group')->next()
            ->string('baseTemplateId')->validate('exists:document_templates,id')->onEmpty(null)->alias('base_template_id')->next()
            ->string('headerTemplateId')->validate('exists:document_templates,id')->onEmpty(null)->alias('header_id')->next()
            ->string('footerTemplateId')->validate('exists:document_templates,id')->onEmpty(null)->alias('footer_id')->next()
            ->boolean('active')->validate('required')->next()
            ->string('htmlBody')->alias('html_body')->next()
            ->boolean('allowChangeHtmlBody')->alias('allow_change_html_body')->next()
            ->get();

        $documentTemplate = new DocumentTemplate();
        $documentTemplate->fill($data);
        $documentTemplate->save();

        $roleIds = explode(',', $request->roleIds);

        if ($roleIds[0] == '') {
            $roleIds = [];
        }

        $documentTemplate->roles()->sync($roleIds);

        return FullDocumentTemplate::make($documentTemplate->fresh());
    }

    public function update(RequestInput $requestInput, Request $request, DocumentTemplate $documentTemplate) {

        $this->authorize('create', DocumentTemplate::class);

        $data = $requestInput
            ->string('characteristic')->next()
            ->string('name')->next()
            ->string('documentGroupId')->alias('document_group')->next()
            ->string('baseTemplateId')->validate('exists:document_templates,id')->onEmpty(null)->alias('base_template_id')->next()
            ->string('headerTemplateId')->validate('exists:document_templates,id')->onEmpty(null)->alias('header_id')->next()
            ->string('footerTemplateId')->validate('exists:document_templates,id')->onEmpty(null)->alias('footer_id')->next()
            ->boolean('active')->validate('required')->next()
            ->string('htmlBody')->alias('html_body')->next()
            ->boolean('allowChangeHtmlBody')->alias('allow_change_html_body')->next()
            ->get();

        $documentTemplate->fill($data);
        $documentTemplate->save();

        $roleIds = explode(',', $request->roleIds);

        if ($roleIds[0] == '') {
            $roleIds = [];
        }

        $documentTemplate->roles()->sync($roleIds);

        return FullDocumentTemplate::make($documentTemplate->fresh());

    }

    public function destroy(DocumentTemplate $documentTemplate)
    {
        $this->authorize('create', DocumentTemplate::class);

        try {
            DB::beginTransaction();

            $deleteDocumentTemplate = new DeleteDocumentTemplate($documentTemplate);
            $result = $deleteDocumentTemplate->delete();

            if(count($result) > 0){
                DB::rollBack();
                abort(412, implode(";", array_unique($result)));
            }

            DB::commit();
        } catch (\PDOException $e) {
            DB::rollBack();
            Log::error($e->getMessage());
            abort(501, 'Er is helaas een fout opgetreden.');
        }
    }

    public function duplicate(DocumentTemplate $documentTemplate)
    {
        $newTemplate = $documentTemplate->replicate();
        $newTemplate->save();

        foreach($documentTemplate->roles as $role){
            $newTemplate->roles()->attach($role);
        }

        return $this->show($newTemplate);
    }

    public function peekGeneral()
    {
        $userRoles = Auth::user()->roles()->pluck('name')->toArray();

        $documentTemplates = DocumentTemplate::where('template_type', 'general')->where('active', true)->with('roles')->get()->sortBy('name', SORT_NATURAL|SORT_FLAG_CASE);

        $validDocumentTemplates = collect();

        //check if user has atleast one of the roles given by the template
        foreach($documentTemplates as $key => $documentTemplate){
          $intersect = array_intersect($userRoles, $documentTemplate->roles()->pluck('name')->toArray());
               if(sizeof($intersect) > 0){
                   $validDocumentTemplates->push($documentTemplate);
               }
        }

        return DocumentTemplatePeek::collection($validDocumentTemplates);
    }

    public function peekNotGeneral()
    {
        $documentTemplates = DocumentTemplate::where('template_type', '!=', 'general')->where('active', true)->get()->sortBy('name', SORT_NATURAL|SORT_FLAG_CASE);

        return DocumentTemplatePeek::collection($documentTemplates);
    }
}