<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 14-12-2017
 * Time: 11:44
 */

namespace App\Helpers\Template;


use App\Eco\Document\Document;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;

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
            case 'Intake':
                return TemplateVariableHelper::getIntakeVar($model, $varname);
                break;
            case 'ProductionProject':
                return TemplateVariableHelper::getProductionProjectVar($model, $varname);
                break;
            case 'ParticipantProductionProject':
                return TemplateVariableHelper::getParticipantProductionProjectVar($model, $varname);
                break;
            case 'ProductionProjectRevenue':
                return TemplateVariableHelper::getProductionProjectRevenueVar($model, $varname);
                break;
            case 'ProductionProjectRevenueDistribution':
                return TemplateVariableHelper::getProductionProjectRevenueDistributionVar($model, $varname);
                break;
            case 'Campaign':
                return '';
                break;
            case 'HousingFile':
                return '';
                break;
            case 'QuotationRequest':
                return TemplateVariableHelper::getQuotationRequestVar($model, $varname);
                break;
            case 'Measure':
                return '';
                break;
            case 'Task':
                return '';
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
            case 'voornaam':
                if($model->type_id == 'person'){
                    return $model->person->first_name;
                }
                elseif($model->type_id == 'organisation'){
                    return '';
                }
                break;
            case 'achternaam':
                if($model->type_id == 'person'){
                    $prefix = optional($model->person->lastNamePrefix)->name;
                    return $prefix ? $prefix . ' ' . $model->person->last_name : $model->person->last_name;
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
            case 'energieleverancier':
                return optional($model->primaryContactEnergySupplier)->energySupplier->name;
            default:
                return '';
                break;
        }
    }

    public static function getUserVar($model, $varname){
        switch ($varname) {
            case 'voornaam':
                return $model->first_name;
                break;
            case 'achternaam':
                return $model->present()->fullLastName();
                break;
            case 'telefoon':
                return $model->phone_number;
                break;
            case 'email':
                return $model->email;
                break;
            default:
                return '';
                break;
        }
    }


    public static function getContactGroupVar($model, $varname){
        switch ($varname) {
            case 'naam':
                return $model->name;
                break;
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

    public static function getIntakeVar($model, $varname){
        switch ($varname) {
            default:
                return '';
                break;
        }
    }

    public static function getProductionProjectVar($model, $varname){
        switch ($varname) {
            case 'naam':
                return $model->name;
                break;
            case 'omschrijving':
                return $model->description;
                break;
            case 'start_project':
                return $model->date_start ? Carbon::parse($model->date_start)->format('d/m/Y') : null;
                break;
            case 'start_productie':
                return $model->date_production ? Carbon::parse($model->date_production)->format('d/m/Y') : null;
                break;
            case 'start_inschrijving':
                return $model->date_start_registrations ? Carbon::parse($model->date_start_registrations)->format('d/m/Y') : null;
                break;
            case 'eind_inschrijving':
                return $model->date_end_registrations ? Carbon::parse($model->date_end_registrations)->format('d/m/Y') : null;
                break;
            case 'postcode':
                return $model->postal_code;
                break;
            case 'adres':
                return $model->address;
                break;
            case 'plaats':
                return $model->city;
                break;
            case 'ean':
                return $model->ean;
                break;
            case 'ean_netbeheer':
                return $model->ean_manager;
                break;
            case 'garantie_oorsprong':
                return $model->warranty_origin;
                break;
            case 'ean_levering':
                return $model->ean_supply;
                break;
            case 'participatie_waarde':
                return $model->participation_worth;
                break;
            case 'opgesteld_vermogen':
                return $model->power_kwh_available;
                break;
            case 'max_participaties':
                return $model->max_participations;
                break;
            case 'aanwijzing_belastingsdienst':
                return $model->tax_referral;
                break;
            case 'max_participaties_jeugd':
                return $model->max_participations_youth;
                break;
            case 'min_participaties':
                return $model->min_participations;
                break;
            case 'uitgegeven_participaties':
                return $model->issued_participations;
                break;
            case 'participaties_in_optie':
                return $model->participations_in_option;
                break;
            case 'uit_te_geven_participaties':
                return $model->issuable_participations;
                break;
            case 'aantal_participanten':
                return $model->participantsProductionProject->count();
                break;
            default:
                return '';
                break;
        }
    }

    public static function getParticipantProductionProjectVar($model, $varname){
        switch ($varname) {
            case 'contact_naam':
                return $model->contact->full_name;
                break;
            case 'status':
                return $model->participantProductionProjectStatus->name;
                break;
            case 'productie_project':
                return $model->productionProject->name;
                break;
            case 'inschrijf_datum':
                return $model->date_register ? Carbon::parse($model->date_register)->format('d/m/Y') : null;
                break;
            case 'aangevraagd':
                return $model->participations_requested;
                break;
            case 'toegekend':
                return $model->participations_granted;
                break;
            case 'verkocht':
                return $model->participations_sold;
                break;
            case 'huidig':
                return $model->participations_current;
                break;
            case 'waarde_totaal':
                return $model->participations_worth_total;
                break;
            case 'restverkoop':
                return $model->participations_rest_sale;
                break;
            case 'contract_verstuurd':
                return $model->date_contract_send ? Carbon::parse($model->date_contract_send)->format('d/m/Y') : null;
                break;
            case 'contract_retour':
                return $model->date_contract_retour ? Carbon::parse($model->date_contract_retour)->format('d/m/Y') : null;
                break;
            case 'betaald_op':
                return $model->date_payed ? Carbon::parse($model->date_payed)->format('d/m/Y') : null;
                break;
            case 'iban_betaald':
                return $model->iban_payed;
                break;
            case 'akkoord_regelement':
                return $model->did_accept_agreement ? 'Ja' : 'Nee';
                break;
            case 'iban_tnv':
                return $model->iban_attn;
                break;
            case 'geschonken_door':
                return optional($model->giftedByContact)->full_name;
                break;
            case 'wettelijke_vertegenwoordiger':
                return optional($model->legalRepContact)->full_name;
                break;
            case 'iban_uitkeren':
                return $model->iban_payout;
                break;
            case 'iban_uitkeren_tnv':
                return $model->iban_payout_attn;
                break;
            case 'einddatum':
                return $model->date_end ? Carbon::parse($model->date_end)->format('d/m/Y') : null;
                break;
            case 'uitkeren_op':
                return $model->participantProductionProjectPayoutType->name;
                break;
            default:
                return '';
                break;
        }
    }

    public static function getProductionProjectRevenueVar($model, $varname){
        switch ($varname) {
            case 'kwh_start':
                return $model->kwh_start;
                break;
            case 'kwh_eind':
                return $model->kwh_end;
                break;
            case 'datum_uitgekeerd':
                return $model->date_payed ? Carbon::parse($model->date_payed)->format('d/m/Y') : null;
                break;
            default:
                return '';
                break;
        }
    }

    public static function getProductionProjectRevenueDistributionVar($model, $varname){
        switch ($varname) {
            case 'adres':
                return $model->address;
                break;
            case 'postcode':
                return $model->postal_code;
                break;
            case 'woonplaats':
                return $model->city;
                break;
            case 'status':
                return $model->status;
                break;
            case 'participaties':
                return $model->participations_amount;
                break;
            case 'bedrag':
                return $model->payout;
                break;
            case 'uitkeren_op':
                return $model->payout_type;
                break;
            case 'datum_uitkeren':
                return $model->date_payout ? Carbon::parse($model->date_payout)->format('d/m/Y') : null;
                break;
            case 'energieleverancier':
                return $model->energy_supplier_name;
                break;
            default:
                return '';
                break;
        }
    }

    public static function getQuotationRequestVar($model, $varname){
        switch ($varname) {
            case 'organisatie_naam':
                return $model->organisation->name;
                break;
            case 'organisatie_adres':
                return optional($model->organisation->contact->primaryAddress)->street . ' ' . optional($model->organisation->contact->primaryAddress)->number;
                break;
            case 'organisatie_plaats':
                return optional($model->organisation->contact->primaryAddress)->city;
                break;
            case 'organisatie_email':
                return optional($model->organisation->contact->primaryEmailAddress)->email;
                break;
            case 'organisatie_telefoonnummer':
                return optional($model->organisation->contact->primaryPhoneNumber)->number;
                break;
            case 'organisatie_primair_contact':
                return optional(optional(optional($model->organisation->contactPerson)->person)->contact)->full_name;
                break;
            case 'contact_naam':
                return optional(optional($model->opportunity)->intake)->contact->full_name;
                break;
            case 'contact_adres':
                return optional(optional(optional($model->opportunity)->intake)->contact->primaryAddress)->street . ' ' . optional(optional(optional($model->opportunity)->intake)->contact->primaryAddress)->number;
                break;
            case 'contact_woonplaats':
                return optional(optional(optional($model->opportunity)->intake)->contact->primaryAddress)->city;
                break;
            case 'contact_postcode':
                return optional(optional(optional($model->opportunity)->intake)->contact->primaryAddress)->postal_code;
                break;
            case 'contact_email':
                return optional(optional(optional($model->opportunity)->intake)->contact->primaryEmailAddress)->email;
                break;
            case 'contact_telefoonnummer':
                return optional(optional(optional($model->opportunity)->intake)->contact->primaryPhoneNumber)->number;
                break;
            case 'maatregel':
                return optional(optional($model->opportunity)->measureCategory)->name;
                break;
            case 'tekst':
                return $model->quotation_text;
                break;
            case 'gemaakt_op':
                return $model->created_at ? Carbon::parse($model->created_at)->format('d/m/Y') : null;
                break;
            case 'gemaakt_door':
                return optional($model->createdBy)->present()->fullName();
                break;
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
        $document->load('contact', 'contactGroup', 'opportunity', 'intake', 'sentBy', 'campaign', 'housingFile', 'quotationRequest', 'measure', 'task', 'productionProject', 'participant');

        //Eerst alle {tabel_} vervangen
        $html = TemplateTableHelper::replaceTemplateTables($html, $document);

        //Dan alle andere tags
        $html = TemplateVariableHelper::replaceTemplateVariables($html, 'contact', $document->contact);
        $html = TemplateVariableHelper::replaceTemplateVariables($html, 'groep', $document->contactGroup);
        $html = TemplateVariableHelper::replaceTemplateVariables($html, 'kans', $document->opportunity);
        $html = TemplateVariableHelper::replaceTemplateVariables($html, 'intake', $document->intake);
        $html = TemplateVariableHelper::replaceTemplateVariables($html, 'afzender', $document->sentBy);
        $html = TemplateVariableHelper::replaceTemplateVariables($html, 'ik', Auth::user());
        $html = TemplateVariableHelper::replaceTemplateVariables($html, 'campagne', $document->campaign);
        $html = TemplateVariableHelper::replaceTemplateVariables($html, 'woningdossier', $document->housingFile);
        $html = TemplateVariableHelper::replaceTemplateVariables($html, 'offerteverzoek', $document->quotationRequest);
        $html = TemplateVariableHelper::replaceTemplateVariables($html, 'maatregel', $document->measure);
        $html = TemplateVariableHelper::replaceTemplateVariables($html, 'taak', $document->task);
        $html = TemplateVariableHelper::replaceTemplateVariables($html, 'productie_project', $document->productionProject);
        $html = TemplateVariableHelper::replaceTemplateVariables($html, 'participant', $document->participant);

        //Als laatste verwijder alle niet bestaande tags
        $html = TemplateVariableHelper::stripRemainingVariableTags($html);

        return $html;
    }
}