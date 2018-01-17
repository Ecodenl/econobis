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
        $documentTemplates = $requestQuery->get();

        return GridDocumentTemplate::collection($documentTemplates)
            ->additional(['meta' => [
                'total' => $requestQuery->total(),
            ]
            ]);
    }

    public function show(DocumentTemplate $documentTemplate)
    {
        $documentTemplate->load('baseTemplate', 'header', 'footer', 'createdBy');

        return FullDocumentTemplate::make($documentTemplate);
    }


    public function store(RequestInput $requestInput, Request $request)
    {
        $data = $requestInput
            ->string('characteristic')->next()
            ->string('htmlBody')->validate('required')->alias('html_body')->next()
            ->string('name')->next()
            ->string('documentTemplateType')->validate('required')->alias('template_type')->next()
            ->string('documentGroup')->alias('document_group')->next()
            ->string('baseTemplateId')->validate('required|exists:document_templates,id')->alias('base_template_id')->next()
            ->string('headerTemplateId')->validate('required|exists:document_templates,id')->alias('header_id')->next()
            ->string('footerTemplateId')->validate('required|exists:document_templates,id')->alias('footer_id')->next()
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

        $data = $requestInput
            ->string('characteristic')->next()
            ->string('htmlBody')->validate('required')->alias('html_body')->next()
            ->string('name')->next()
            ->string('documentGroup')->alias('document_group')->next()
            ->string('baseTemplateId')->validate('required|exists:document_templates,id')->alias('base_template_id')->next()
            ->string('headerTemplateId')->validate('required|exists:document_templates,id')->alias('header_id')->next()
            ->string('footerTemplateId')->validate('required|exists:document_templates,id')->alias('footer_id')->next()
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
        //Kijk of er foreign keys zijn
        $documentNames = DocumentTemplate::where('base_template_id', $documentTemplate->id)->orWhere('header_id', $documentTemplate->id)->orWhere('footer_id', $documentTemplate->id)->pluck('name')->toArray();
        if($documentNames){
            abort('409','Ontkoppel eerst de volgende templates: ' . implode(', ', $documentNames));
        }

        //anders verwijder de pivot rollen records en het record zelf
        $documentTemplate->roles()->detach();
        $documentTemplate->forceDelete();
    }

    public function peek()
    {
        $userRole = Auth::user()->roles()->value('name');

        $documentTemplates = DocumentTemplate::with('roles')->get();

        foreach($documentTemplates as $key => $documentTemplate){
            if(!in_array($userRole, $documentTemplate->roles()->pluck('name')->toArray())){
              $documentTemplates->forget($key);
            }
        }

        return DocumentTemplatePeek::collection($documentTemplates);
    }
}