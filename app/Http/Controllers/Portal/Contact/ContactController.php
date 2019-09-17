<?php


namespace App\Http\Controllers\Portal\Contact;


use App\Eco\Contact\Contact;
use App\Eco\DocumentTemplate\DocumentTemplate;
use App\Eco\Project\Project;
use App\Helpers\Template\TemplateVariableHelper;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ContactController extends Controller
{
    public function update(Contact $contact, Request $request)
    {
        dd($contact);
        dd($request);
    }

    public function previewDocument(Contact $contact, Project $project, Request $request)
    {
        //load template parts todo Deze moeten we nog uit instellingen halen!!!
        $documentTemplate = DocumentTemplate::find(6);
        $documentTemplate->load('footer', 'baseTemplate', 'header');

        $portalUser = Auth::user();
        $portalUserContact = $portalUser ? $portalUser->contact : null;

        $documentBody = $documentTemplate->header ? $documentTemplate->header->html_body : '';

        if ($documentTemplate->baseTemplate) {
            $documentBody .= TemplateVariableHelper::replaceTemplateTagVariable($documentTemplate->baseTemplate->html_body,
                $documentTemplate->html_body, '','');
        } else {
            $documentBody .= TemplateVariableHelper::replaceTemplateFreeTextVariables($documentTemplate->html_body,
                '', '');
        }
        $documentBody .= $documentTemplate->footer ? $documentTemplate->footer->html_body : '';

        // todo occuptionContact nog toevoegen aan TemplateVariableHelper
        //        $documentBody = TemplateVariableHelper::replaceTemplateVariables($documentBody,'occupationContact', $portalUserContact);
        $documentBody = TemplateVariableHelper::replaceTemplateVariables($documentBody,'contact', $contact);
        $documentBody = TemplateVariableHelper::replaceTemplateVariables($documentBody,'project', $project);
        $documentBody = TemplateVariableHelper::stripRemainingVariableTags($documentBody);

        return $documentBody;
    }


}