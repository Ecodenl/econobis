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

            $projectTypeCodeRef = $project->projectType->code_ref;

            if($projectTypeCodeRef == 'loan'){
                $participationsOptioned =  0;
                $amountOptioned =  $request['amountOptioned'] ? number_format($request['amountOptioned'], 2, ',', '') : 0;
            }else{
                $participationsOptioned =  $request['participationsOptioned'] ? $request['participationsOptioned'] : 0;
                $amountOptioned =  ( $request['participationsOptioned'] && $project->currentBookWorth() ) ? number_format( ( $request['participationsOptioned'] * $project->currentBookWorth() ), 2, ',', '') : 0;
            }
            $transactionCostsAmount =  $request['transactionCostsAmount'] ? number_format($request['transactionCostsAmount'], 2, ',', '') : 0;

            $documentBody = str_replace('{deelname_aantal_ingeschreven}', $participationsOptioned, $documentBody);
            $documentBody = str_replace('{deelname_bedrag_ingeschreven}', $amountOptioned, $documentBody);
            $documentBody = str_replace('{deelname_transactiekosten_laatste_mutatie}', $transactionCostsAmount, $documentBody);
            $documentBody = TemplateVariableHelper::replaceTemplateVariables($documentBody, 'vertegenwoordigde', $portalUserContact);
            $documentBody = TemplateVariableHelper::replaceTemplateVariables($documentBody, 'contact', $contact);
            $documentBody = TemplateVariableHelper::replaceTemplateVariables($documentBody, 'project', $project);
            $documentBody = TemplateVariableHelper::stripRemainingVariableTags($documentBody);

        return $documentBody;
    }

}