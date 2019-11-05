<?php
/**
 * Created by PhpStorm.
 * User: StagiarSoftware
 * Date: 27-9-2019
 * Time: 15:20
 */

namespace App\Helpers\Document;

use App\Eco\Contact\Contact;
use App\Eco\DocumentTemplate\DocumentTemplate;
use App\Eco\Project\Project;
use App\Helpers\Template\TemplateVariableHelper;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class DocumentHelper
{
    /**
     * @param Contact $contact
     * @param Project $project
     *
     * @return string
     */
    public static function getDocumentBody(Contact $contact, Project $project, DocumentTemplate $documentTemplate, Request $request)
    {
            $documentTemplate->load('footer', 'baseTemplate', 'header');

            $portalUser = Auth::user();
            $portalUserContact = $portalUser ? $portalUser->contact : null;

            $documentBody = $documentTemplate->header ? $documentTemplate->header->html_body : '';

            if ($documentTemplate->baseTemplate) {
                $documentBody .= TemplateVariableHelper::replaceTemplateTagVariable($documentTemplate->baseTemplate->html_body,
                    $documentTemplate->html_body, '', '');
            } else {
                $documentBody .= TemplateVariableHelper::replaceTemplateFreeTextVariables($documentTemplate->html_body,
                    '', '');
            }
            $documentBody .= $documentTemplate->footer ? $documentTemplate->footer->html_body : '';

            $documentBody = TemplateVariableHelper::replaceTemplateVariables($documentBody, 'vertegenwoordigde', $portalUserContact);
            $documentBody = TemplateVariableHelper::replaceTemplateVariables($documentBody, 'contact', $contact);
            $documentBody = TemplateVariableHelper::replaceTemplateVariables($documentBody, 'project', $project);
            $documentBody = TemplateVariableHelper::stripRemainingVariableTags($documentBody);

        return $documentBody;
    }

}