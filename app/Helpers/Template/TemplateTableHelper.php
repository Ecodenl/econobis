<?php
/**
 * Created by PhpStorm.
 * User: StagiarSoftware
 * Date: 18-1-2018
 * Time: 15:22
 */

namespace App\Helpers\Template;

use App\Eco\Contact\Contact;
use App\Eco\ContactGroup\ContactGroup;
use App\Eco\Document\Document;
use App\Eco\Opportunity\Opportunity;
use App\Eco\Intake\Intake;
use App\Eco\User\User;
use Illuminate\Support\Facades\View;

class TemplateTableHelper
{

    static public function replaceTemplateTables($html_body, $model){

        $regex = "/{tabel_(\S*?)}/";
        if (preg_match_all($regex, $html_body, $m)) {
            foreach ($m[1] as $i => $table_name) {
                $html_body = str_replace($m[0][$i], TemplateTableHelper::getTable($model, $table_name), $html_body);
            }
        }

        return $html_body;
    }

    public static function getTable($model, $table_name){

        switch (class_basename($model)) {
            case 'Document':
                return TemplateTableHelper::getDocumentTable($model, $table_name);
                break;
            case 'Contact':
                return TemplateTableHelper::getContactTable($model, $table_name);
                break;
            case 'User':
                return TemplateTableHelper::getUserTable($model, $table_name);
                break;
            case 'ContactGroup':
                return TemplateTableHelper::getContactGroupTable($model, $table_name);
                break;
            case 'Opportunity':
                return TemplateTableHelper::getOpportunityTable($model, $table_name);
                break;
            case 'Intake':
                return TemplateTableHelper::getIntakeTable($model, $table_name);
                break;
            default:
                return '';
                break;
        }
    }

    public static function getDocumentTable(Document $document, $table_name){
        switch ($table_name) {
            case 'contact_emails':
                return TemplateTableHelper::getTable($document->contact ,$table_name);
                break;
            default:
                return '';
                break;
        }
    }

    public static function getContactTable(Contact $contact, $table_name){
        switch ($table_name) {
            case 'contact_emails':
                $contact->load('emailAddresses');
                $html = View::make('documents.tables.contact.table_contact_emails', ['contact' => $contact])->render();
                return $html;
                break;
            default:
                return '';
                break;
        }
    }

    public static function getUserTable(User $user, $table_name){
        switch ($table_name) {
            default:
                return '';
                break;
        }
    }

    public static function getContactGroupTable(ContactGroup $contactGroup, $table_name){
        switch ($table_name) {
            default:
                return '';
                break;
        }
    }

    public static function getOpportunityTable(Opportunity $opportunity, $table_name){
        switch ($table_name) {
            default:
                return '';
                break;
        }
    }

    public static function getIntakeTable(Intake $intake, $table_name){
        switch ($table_name) {
            default:
                return '';
                break;
        }
    }
}