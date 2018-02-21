<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 04-01-2018
 * Time: 11:32
 */

namespace App\Http\Controllers\Api\DocumentTemplate;

use App\Eco\DocumentTemplate\DocumentTemplate;
use App\Helpers\RequestInput\RequestInput;
use App\Http\Controllers\Controller;
use App\Http\RequestQueries\DocumentTemplate\Grid\RequestQuery;
use App\Http\Resources\DocumentTemplate\DocumentTemplatePeek;
use App\Http\Resources\DocumentTemplate\FullDocumentTemplate;
use App\Http\Resources\DocumentTemplate\GridDocumentTemplate;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;


class DocumentTemplateController extends Controller
{

    public function grid(RequestQuery $requestQuery)
    {
        $this->authorize('view', DocumentTemplate::class);

        $documentTemplates = $requestQuery->get();

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
            ->string('htmlBody')->alias('html_body')->next()
            ->string('name')->next()
            ->string('documentTemplateTypeId')->validate('required')->alias('template_type')->next()
            ->string('documentGroupId')->alias('document_group')->next()
            ->string('baseTemplateId')->validate('exists:document_templates,id')->onEmpty(null)->alias('base_template_id')->next()
            ->string('headerTemplateId')->validate('exists:document_templates,id')->onEmpty(null)->alias('header_id')->next()
            ->string('footerTemplateId')->validate('exists:document_templates,id')->onEmpty(null)->alias('footer_id')->next()
            ->boolean('active')->validate('required')->next()
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
            ->string('htmlBody')->alias('html_body')->next()
            ->string('name')->next()
            ->string('documentGroupId')->alias('document_group')->next()
            ->string('baseTemplateId')->validate('exists:document_templates,id')->onEmpty(null)->alias('base_template_id')->next()
            ->string('headerTemplateId')->validate('exists:document_templates,id')->onEmpty(null)->alias('header_id')->next()
            ->string('footerTemplateId')->validate('exists:document_templates,id')->onEmpty(null)->alias('footer_id')->next()
            ->boolean('active')->validate('required')->next()
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

        //Kijk of er foreign keys zijn
        $documentNames = DocumentTemplate::where('base_template_id', $documentTemplate->id)->orWhere('header_id', $documentTemplate->id)->orWhere('footer_id', $documentTemplate->id)->pluck('name')->toArray();
        if($documentNames){
            abort('409','Ontkoppel eerst de volgende templates: ' . implode(', ', $documentNames));
        }

        //anders verwijder de pivot rollen records en het record zelf
        $documentTemplate->roles()->detach();
        $documentTemplate->forceDelete();
    }

    public function peekGeneral()
    {
        $userRoles = Auth::user()->roles()->pluck('name')->toArray();

        $documentTemplates = DocumentTemplate::where('template_type', 'general')->where('active', true)->with('roles')->get();

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
        $documentTemplates = DocumentTemplate::where('template_type', '!=', 'general')->where('active', true)->get();

        return DocumentTemplatePeek::collection($documentTemplates);
    }
}