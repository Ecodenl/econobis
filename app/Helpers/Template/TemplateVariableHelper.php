<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 14-12-2017
 * Time: 11:44
 */

namespace App\Helpers\Template;


use App\Eco\Document\Document;

class TemplateVariableHelper
{
    /**
     * @param $html_body String - a string that has tags to replace
     * @param $var_prefix - the tag name, bv contact searches for {contact_
     * @param $model - the model to get the data from
     *
     * @return string - html with replaced tags
     */
    static public function replaceTemplateVariables($html_body, $var_prefix, $model){

        $regex = "/{" . $var_prefix . "_(\S*?)}/";
        if (preg_match_all($regex, $html_body, $m)) {
            foreach ($m[1] as $i => $var_name) {
                $html_body = str_replace($m[0][$i], TemplateVariableHelper::getVar($model, $var_name), $html_body);
            }
        }

        return $html_body;
    }

    /**
     * @param $html_body String - a html string
     *
     * @return String - the html string without {xxx} tags
     */
    public static function stripRemainingVariableTags($html_body)
    {
        if (preg_match_all("/{(\S*?)}/", $html_body, $m)) {
            foreach ($m[1] as $i => $varname) {
                $html_body = str_replace($m[0][$i], '', $html_body);
            }
        }

        return $html_body;
    }

    public static function getVar($model, $varname){

        switch (class_basename($model)) {
            case 'Contact':
                return TemplateVariableHelper::getContactVar($model, $varname);
                break;
            case 'User':
                return TemplateVariableHelper::getUserVar($model, $varname);
                break;
            case 'ContactGroup':
                return TemplateVariableHelper::getContactGroupVar($model, $varname);
                break;
            case 'Opportunity':
                return TemplateVariableHelper::getOpportunityVar($model, $varname);
                break;
            case 'Registration':
                return TemplateVariableHelper::getRegistrationVar($model, $varname);
                break;
            default:
                return '';
                break;
        }
    }

    public static function getContactVar($model, $varname){
        switch ($varname) {
            case 'titel':
                return optional(optional($model->person)->title)->name;
                break;
            case 'naam':
                if($model->type_id == 'person'){
                    $prefix = optional($model->person->lastNamePrefix)->name;
                    return $prefix ? $model->person->first_name . ' ' . $prefix . ' ' . $model->person->last_name : $model->person->first_name . ' ' . $model->person->last_name;
                }
                elseif($model->type_id == 'organisation'){
                    return $model->full_name;
                }
                break;
            case 'adres':
                return optional($model->primaryAddress)->street . ' ' . optional($model->primaryAddress)->number;
                break;
            case 'postcode':
                return optional($model->primaryAddress)->postal_code;
                break;
            case 'plaats':
                return optional($model->primaryAddress)->city;
                break;
            case 'telefoonnummer':
                return optional($model->primaryphoneNumber)->number;
                break;
            default:
                return '';
                break;
        }
    }

    public static function getUserVar($model, $varname){
        switch ($varname) {
            case 'naam':
                return $model->present()->fullName();
                break;
            default:
                return '';
                break;
        }
    }

    public static function getContactGroupVar($model, $varname){
        switch ($varname) {
            default:
                return '';
                break;
        }
    }

    public static function getOpportunityVar($model, $varname){
        switch ($varname) {
            default:
                return '';
                break;
        }
    }

    public static function getRegistrationVar($model, $varname){
        switch ($varname) {
            default:
                return '';
                break;
        }
    }

    static public function replaceTemplateTagVariable($base_html, $template_html, $free_text_1, $free_text_2){

        $template_html = TemplateVariableHelper::replaceTemplateFreeTextVariables($template_html, $free_text_1, $free_text_2);

        $base_html = str_replace('{template}', $template_html, $base_html);

        return $base_html;
    }

    /** replaces {vrije_text_1} and {vrije_text_2} with $free_text_1 and $free_text_2
     * @param $template_html
     * @param $free_text_1
     * @param $free_text_2
     *
     * @return mixed replaces
     */
    static public function replaceTemplateFreeTextVariables($template_html, $free_text_1, $free_text_2){


        $template_html = str_replace('{vrije_text_1}', $free_text_1, $template_html);
        $template_html = str_replace('{vrije_text_2}', $free_text_2, $template_html);

        return $template_html;
    }

    public static function replaceDocumentTemplateVariables(Document $document, $html){
        //load relations
        $document->load('contact', 'contactGroup', 'opportunity', 'registration', 'sentBy');

        //Eerst alle {tabel_} vervangen
        $html = TemplateTableHelper::replaceTemplateTables($html, $document);

        //Dan alle andere tags
        $html = TemplateVariableHelper::replaceTemplateVariables($html, 'contact', $document->contact);
        $html = TemplateVariableHelper::replaceTemplateVariables($html, 'groep', $document->contactGroup);
        $html = TemplateVariableHelper::replaceTemplateVariables($html, 'kans', $document->opportunity);
        $html = TemplateVariableHelper::replaceTemplateVariables($html, 'aanmelding', $document->registration);
        $html = TemplateVariableHelper::replaceTemplateVariables($html, 'afzender', $document->sentBy);

        //Als laatste verwijder alle niet bestaande tags
        $html = TemplateVariableHelper::stripRemainingVariableTags($html);

        return $html;
    }
}