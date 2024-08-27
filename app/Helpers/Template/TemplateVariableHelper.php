<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 14-12-2017
 * Time: 11:44
 */

namespace App\Helpers\Template;


use App\Eco\Document\Document;
use App\Eco\Project\ProjectLoanType;
use App\Eco\Project\ProjectRevenueDistributionType;
use App\Eco\RevenuesKwh\RevenueValuesKwh;
use App\Helpers\Settings\PortalSettings;
use App\Eco\ParticipantMutation\ParticipantMutationStatus;
use App\Eco\ParticipantMutation\ParticipantMutationType;
use App\Eco\Project\ProjectValueCourse;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Crypt;

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
        //First we check @als{mergveld balblabal als@
        $regex = "/@als{" . $var_prefix . "_(\S*)?}((.|\s)*?)als@/";
        if (preg_match_all($regex, $html_body, $m)) {
            foreach ($m[1] as $i => $var_name) {
                $var = TemplateVariableHelper::getVar($model, $var_name);
                //als de variabele bestaat dan gooien we de @als als@ structuur weg
                if($var !== null && $var !== ''){
                    $html_body = str_replace($m[0][$i], $m[2][$i], $html_body);
                }
                // anders gooien we de structuur + inhoud weg
                else{
                    $html_body = str_replace($m[0][$i], "", $html_body);
                }
            }
        }

        //Check @alsniet{mergveld balblabal alsniet@
        $regex = "/@alsniet{" . $var_prefix . "_(\S*)?}((.|\s)*?)alsniet@/";
        if (preg_match_all($regex, $html_body, $m)) {
            foreach ($m[1] as $i => $var_name) {
                $var = TemplateVariableHelper::getVar($model, $var_name);
                //als de variabele bestaat dan gooien we de @als als@ structuur weg
                if($var === null || $var === ''){
                    $html_body = str_replace($m[0][$i], $m[2][$i], $html_body);
                }
                // anders gooien we de structuur + inhoud weg
                else{
                    $html_body = str_replace($m[0][$i], "", $html_body);
                }
            }
        }

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
        $dateShort = Carbon::now()->format('d-m-Y');

        $dateLong = Carbon::now()->isoFormat('D MMMM YYYY');

        $html_body = str_replace('{huidige_datum_kort}', $dateShort, $html_body);
        $html_body = str_replace('{huidige_datum_lang}', $dateLong, $html_body);

        if (preg_match_all("/{(\S*?)}/", $html_body, $m)) {
            foreach ($m[1] as $i => $varname) {
                $html_body = str_replace($m[0][$i], '', $html_body);
            }
        }

        return $html_body;
    }

    public static function getVar($model, $varname){

        $classBaseName = class_basename($model);
        if($classBaseName == 'Collection')
        {
            $classBaseName = class_basename($model->first());
        }

        switch ($classBaseName) {
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
            case 'Project':
                return TemplateVariableHelper::getProjectVar($model, $varname);
                break;
            case 'ParticipantProject':
                return TemplateVariableHelper::getParticipantProjectVar($model, $varname);
                break;
            case 'ParticipantMutation':
                return TemplateVariableHelper::getParticipantMutationVar($model, $varname);
                break;
            case 'ProjectRevenue':
                return TemplateVariableHelper::getProjectRevenueVar($model, $varname);
                break;
            case 'ProjectRevenueDistribution':
                return TemplateVariableHelper::getProjectRevenueDistributionVar($model, $varname);
                break;
            case 'RevenuesKwh':
                return TemplateVariableHelper::getRevenuesKwhVar($model, $varname);
                break;
            case 'RevenuePartsKwh':
                return TemplateVariableHelper::getRevenuePartsKwhVar($model, $varname);
                break;
            case 'RevenueDistributionKwh':
                return TemplateVariableHelper::getRevenueDistributionKwhVar($model, $varname);
                break;
            case 'RevenueDistributionPartsKwh':
                return TemplateVariableHelper::getRevenueDistributionPartsKwhVar($model, $varname);
                break;
            case 'Campaign':
                return TemplateVariableHelper::getCampaignVar($model, $varname);
                break;
            case 'HousingFile':
                return TemplateVariableHelper::getHousingFileVar($model, $varname);
                break;
            case 'QuotationRequest':
                return TemplateVariableHelper::getQuotationRequestVar($model, $varname);
                break;
            case 'Measure':
                return '';
                break;
            case 'Task':
                return TemplateVariableHelper::getTaskVar($model, $varname);
                break;
            case 'Order':
                return TemplateVariableHelper::getOrderVar($model, $varname);
                break;
            case 'Invoice':
                return TemplateVariableHelper::getInvoiceVar($model, $varname);
                break;
            case 'Administration':
                return TemplateVariableHelper::getAdministrationVar($model, $varname);
                break;
            case 'FinancialOverviewContact':
                return TemplateVariableHelper::getFinancialOverviewContactVar($model, $varname);
                break;
            default:
                return '';
                break;
        }
    }

    public static function getContactVar($model, $varname){
        switch ($varname) {
            case 'nummer':
                return $model->number;
                break;
            case 'titel':
                return optional(optional($model->person)->title)->name;
                break;
            case 'titel_adres':
                return optional(optional($model->person)->title)->address;
            case 'titel_aanhef':
                return optional(optional($model->person)->title)->salutation;
            case 'naam':
                if($model->type_id == 'person'){
                    $prefix = $model->person->last_name_prefix;
                    return $prefix ? $model->person->first_name . ' ' . $prefix . ' ' . $model->person->last_name : $model->person->first_name . ' ' . $model->person->last_name;
                }
                elseif($model->type_id == 'organisation'){
                    return $model->full_name;
                }
                break;
            case 'naam_officieel':
                if($model->type_id == 'person'){
                    $initials = $model->person->initials ? $model->person->initials : ($model->person->first_name ? substr($model->person->first_name, 0, 1).".": "");
                    $prefix = $model->person->last_name_prefix;
                    return $prefix ? $initials . ' ' . $prefix . ' ' . $model->person->last_name : $initials . ' ' . $model->person->last_name;
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
                    $prefix = $model->person->last_name_prefix;
                    return $prefix ? $prefix . ' ' . $model->person->last_name : $model->person->last_name;
                }
                elseif($model->type_id == 'organisation'){
                    return $model->full_name;
                }
                break;
            case 'voorletters':
                if($model->type_id == 'person'){
                    return $model->person->initials;
                }
                elseif($model->type_id == 'organisation'){
                    return '';
                }
                break;
            case 'geboortedatum':
                if($model->type_id == 'person'){
                    return $model->person->date_of_birth ? Carbon::parse($model->person->date_of_birth)->format('d-m-Y') : null;;
                }
                elseif($model->type_id == 'organisation'){
                    return '';
                }
                break;
            case 'adres':
                return optional($model->primaryAddress)->street . ' ' . optional($model->primaryAddress)->number . (optional($model->primaryAddress)->addition ? ('-' . optional($model->primaryAddress)->addition) : '');
                break;
            case 'postcode':
                return optional($model->primaryAddress)->postal_code;
                break;
            case 'plaats':
                return optional($model->primaryAddress)->city;
                break;
            case 'land':
                return optional(optional($model->primaryAddress)->country)->name;
                break;
            case 'landcode':
                return optional($model->primaryAddress)->country_id;
                break;
            case 'telefoonnummer':
                return optional($model->primaryphoneNumber)->number;
                break;
            case 'email':
                return optional($model->primaryEmailAddress)->email;
                break;
            case 'energieleverancier':
                return optional(optional(optional($model->primaryAddress)->currentAddressEnergySupplierElectricity)->energySupplier)->name;
                break;
            case 'energieleverancier_klantnummer':
                return optional(optional($model->primaryAddress)->currentAddressEnergySupplierElectricity)->es_number;
                break;
            case 'energieleverancier_ean_elektra':
                return optional($model->primaryAddress)->ean_electricity;
                break;
            case 'energieleverancier_klant_sinds':
                return optional(optional($model->primaryAddress)->currentAddressEnergySupplierElectricity)->member_since ? Carbon::parse(optional(optional($model->primaryAddress)->currentAddressEnergySupplierElectricity)->member_since)->format('d-m-Y') : null;;
                break;
            case 'energieleverancier_klant_einddatum':
                return optional(optional($model->primaryAddress)->currentAddressEnergySupplierElectricity)->end_date ? Carbon::parse(optional(optional($model->primaryAddress)->currentAddressEnergySupplierElectricity)->end_date)->format('d-m-Y') : null;;
                break;
            case 'energieleverancier_mogelijke_overstap':
                return optional(optional($model->primaryAddress)->currentAddressEnergySupplierElectricity)->switch_date ? Carbon::parse(optional(optional($model->primaryAddress)->currentAddressEnergySupplierElectricity)->switch_date)->format('d-m-Y') : null;;
                break;
            case 'kvk':
                if($model->type_id == 'organisation'){
                    $kvk = $model->organisation->chamber_of_commerce_number;
                }
                else{
                    $kvk = '';
                }
                return $kvk;
                break;
            case 'btwnr':
                if($model->type_id == 'organisation'){
                    $btwnr = $model->organisation->vat_number;
                }
                else{
                    $btwnr = '';
                }
                return $btwnr;
                break;
            case 'organisatie_statutaire_naam':
                if($model->type_id == 'organisation') {
                    return $model->organisation->statutory_name;
                }
                else{
                    return '';
                }
                break;
            case 'organisatie_primair_contact':
                if($model->type_id == 'organisation') {
                    return optional(optional($model->contactPerson)->contact)->full_name;
                }
                else{
                    return '';
                }
                break;
            case 'organisatie_primair_contact_voornaam':
                if($model->type_id == 'organisation') {
                    if(optional(optional($model->contactPerson)->contact)->type_id == 'person'){
                        return optional(optional($model->contactPerson)->contact)->person->first_name;
                    }
                    elseif(optional(optional($model->contactPerson)->contact)->type_id == 'organisation'){
                        return '';
                    }
                }
                else{
                    return '';
                }

                break;
            case 'organisatie_primair_contact_achternaam':
                if($model->type_id == 'organisation') {
                    if(optional(optional($model->contactPerson)->contact)->type_id == 'person'){
                        $prefix = optional(optional($model->contactPerson)->contact)->person->last_name_prefix;
                        return $prefix ? $prefix . ' ' . optional(optional($model->organisation->contact->contactPerson)->contact)->person->last_name : optional(optional($model->organisation->contact->contactPerson)->contact)->person->last_name;
                    }
                    elseif(optional(optional($model->contactPerson)->contact)->type_id == 'organisation'){
                        return optional(optional($model->contactPerson)->contact)->full_name;
                    }
                }
                else{
                    return '';
                }

                break;
            case 'iban':
                return $model->iban;
                break;
            case 'iban_gedeeltelijk':
                if($model->iban && strlen($model->iban)>13)
                {
                    $numberOfHiddenCharacters = strlen($model->iban) - 11;
                    $partialHiddenIban = substr($model->iban, 0, 7);
                    while($numberOfHiddenCharacters > 0) {
                        $partialHiddenIban = $partialHiddenIban . '*';
                        $numberOfHiddenCharacters--;
                    }
                    return $partialHiddenIban . substr($model->iban, -4);
                } else {
                    return '';
                }
                break;
            case 'iban_tnv':
                return $model->iban_attn;
                break;
            case 'partner_voornaam':
                if($model->type_id == 'person'){
                    return $model->person->first_name_partner;
                }
                elseif($model->type_id == 'organisation'){
                    return '';
                }
                break;
            case 'partner_achternaam':
                if($model->type_id == 'person'){
                    return $model->person->last_name_partner;
                }
                elseif($model->type_id == 'organisation'){
                    return '';
                }
                break;
            case 'portal_registratie_link':
                if($model->portal_registration_code)
                {
                    $link = 'https://' . PortalSettings::get("portalUrl") . '/#/activeer-registratie/' . $model->portal_registration_code . '/' . optional($model->primaryEmailAddress)->email;
                }else{
                    $link = '';
                }
                return $link;
                break;
            case 'portal_email':
                return $model->portalUser ? $model->portalUser->email : '';
                break;
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
            case 'functie':
                return $model->occupation;
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
            case 'id':
                return $model->id;
                break;
            case 'id_encrypted':
                return Crypt::encrypt($model->id);
                break;
            case 'contact_naam':
                return optional($model->intake)->contact->full_name;
                break;
            case 'contact_adres':
                return optional(optional($model->intake)->contact->primaryAddress)->street . ' ' . optional(optional($model->intake)->contact->primaryAddress)->number . (optional(optional($model->intake)->contact->primaryAddress)->addition ? ('-' . optional(optional($model->intake)->contact->primaryAddress)->addition) : '');
                break;
            case 'contact_postcode':
                return optional(optional($model->intake)->contact->primaryAddress)->postal_code;
                break;
            case 'contact_plaats':
                return optional(optional($model->intake)->contact->primaryAddress)->city;
                break;
            case 'contact_email':
                return optional(optional($model->intake)->contact->primaryEmailAddress)->email;
                break;
            case 'maatregel_categorie':
                return optional($model->measureCategory)->name;
                break;
            case 'maatregel_specifiek':
                return implode(', ', $model->measures->pluck('name' )->toArray() ) ;
                break;
            case 'toelichting':
            case 'maatregel_toelichting':
                return $model->quotation_text;
                break;
            case 'uitvoering_gepland':
                return $model->desired_date ? Carbon::parse($model->desired_date)->format('d-m-Y') : null;
                break;
            case 'status':
                return $model->status ? $model->status->name : '';
                break;
            case 'datum_evaluatie':
                return $model->evaluation_agreed_date ? Carbon::parse($model->evaluation_agreed_date)->format('d-m-Y') : null;
                break;
//            case 'akkoord':
//                break;
            case 'evaluatie_uitgevoerd':
                return  $model->evaluationRealised ? $model->evaluationRealised->name : 'Onbekend';
                break;
            case 'evaluatie_tevreden':
                return  $model->evaluationStatisfied ? $model->evaluationStatisfied->name : 'Onbekend';
                break;
            case 'evaluatie_aanbevelen':
                return  $model->evaluationRecommendOrganisation ? $model->evaluationRecommendOrganisation->name : 'Onbekend';
                break;
            case 'evaluatie_opmerking':
                return $model->evaluation_note;
                break;
            case 'nummer':
                return $model->number;
                break;
//            case 'offerteverzoek_bedrijf':
//                break;
//            case 'offerteverzoek_contactpersoon':
//                break;
//            case 'offerteverzoek_status':
//                break;
//            case 'offerteverzoek_uitgebracht':
//                break;
//            case 'offerteverzoek_geldig_tot':
//                break;
//            case 'offerteverzoek_gemaakt_op':
//                break;

            default:
                return '';
                break;
        }
    }

    public static function getIntakeVar($model, $varname){
        switch ($varname) {
            case 'id':
                return $model->id;
                break;
            case 'id_encrypted':
                return Crypt::encrypt($model->id);
                break;
            case 'contact_naam':
                return $model->contact->full_name;
                break;
            case 'contact_adres':
                return optional($model->address)->street . ' ' . optional($model->address)->number . (optional($model->address)->addition ? ('-' . optional($model->address)->addition) : '');
                break;
            case 'contact_postcode':
                return optional($model->address)->postal_code;
                break;
            case 'contact_plaats':
                return optional($model->address)->city;
                break;
            case 'contact_email':
                return optional($model->contact->primaryEmailAddress)->email;
                break;
            case 'interesses':
                return implode(', ', $model->measuresRequested->pluck('name' )->toArray() ) ;
                break;
            case 'interesses_tabel':
                $tabel = "
                <table style='width:auto; border-collapse: collapse;'>
                  <tr>
                    <th style='border: 1px solid #000000; text-align: left; padding: 8px; background-color: #dddddd;'>Interesses</th>
                </tr>";
                foreach($model->measuresRequested as $measureRequested){
                    $tabel .= "
                    <tr>
                      <td style='border: 1px solid #000000; text-align: left; padding: 8px; font-weight: normal'>" . ( $measureRequested->name ? $measureRequested->name : '' ) . "</td>
                    </tr>";
                }
                $tabel .= "</table>";
                return $tabel;
                break;
            case 'opmerkingen_bewoner':
                return $model->note;
                break;
            case 'gemaakt_op':
                return $model->created_at ? Carbon::parse($model->created_at)->format('d-m-Y') : null;
                break;
            default:
                return '';
                break;
        }
    }

    public static function getTaskVar($model, $varname){
        switch ($varname) {
            case 'contact_naam':
                return optional($model->contact)->full_name;
                break;
//            case 'contact_adres':
//                return optional(optional($model->contact)->primaryAddress)->street . ' ' . optional(optional($model->contact)->primaryAddress)->number . (optional(optional($model->contact)->primaryAddress)->addition ? ('-' . optional(optional($model->contact)->primaryAddress)->addition) : '');
//                break;
//            case 'contact_postcode':
//                return optional(optional($model->contact)->primaryAddress)->postal_code;
//                break;
//            case 'contact_plaats':
//                return optional(optional($model->contact)->primaryAddress)->city;
//                break;
            case 'contact_email':
                return optional(optional($model->contact)->primaryEmailAddress)->email;
                break;
            case 'contact_telefoonnummer':
                return optional(optional($model->contact)->primaryphoneNumber)->number;
                break;
            case 'type':
                return $model->type->name;
                break;
            case 'notitie':
                return $model->note;
                break;
            case 'datum_afhandelen':
                return $model->date_planned_start ? Carbon::parse($model->date_planned_start)->format('d-m-Y') : null;
                break;
            case 'begin_tijd':
                return $model->start_time_planned ? Carbon::parse($model->start_time_planned)->format('H:i') : null;
                break;
            case 'einddatum':
                return $model->date_planned_finish ? Carbon::parse($model->date_planned_finish)->format('d-m-Y') : null;
                break;
            case 'eind_tijd':
                return $model->end_time_planned ? Carbon::parse($model->end_time_planned)->format('H:i') : null;
                break;
            case 'afgehandeld':
                return $model->finished ? 'Ja' : 'Nee';
                break;
            case 'verantwoordelijke':
                if($model->responsible_user_id) {
                    return optional($model->responsibleUser)->present()->fullName;
                }elseif($model->responsible_team_id) {
                    return optional($model->responsibleTeam)->name;
                }else{
                    return '';
                }
                break;
            case 'datum_gereed':
                return $model->date_finished ? Carbon::parse($model->date_finished)->format('d-m-Y') : null;
                break;
            case 'afgerond_door':
                return optional(optional($model->finishedBy)->present())->fullName;
                break;
            default:
                return '';
                break;
        }
    }

    public static function getProjectVar($model, $varname){
        $projectTypeCodeRef = $model->projectType->code_ref;

        switch ($varname) {
            case 'naam':
                return $model->name;
                break;
            case 'omschrijving':
                return $model->description;
                break;
            case 'start_project':
                return $model->date_start ? Carbon::parse($model->date_start)->format('d-m-Y') : null;
                break;
            case 'start_productie':
                return $model->date_production ? Carbon::parse($model->date_production)->format('d-m-Y') : null;
                break;
            case 'start_inschrijving':
                return $model->date_start_registrations ? Carbon::parse($model->date_start_registrations)->format('d-m-Y') : null;
                break;
            case 'eind_inschrijving':
                return $model->date_end_registrations ? Carbon::parse($model->date_end_registrations)->format('d-m-Y') : null;
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
            case 'nominale_waarde':
            case 'participatie_waarde':
                return number_format($model->participation_worth, 2, ',', '');
                break;
            case 'huidige_boekwaarde':
            case 'huidige_hoofdsom':
                return number_format($model->currentBookWorth(), 2, ',', '');
                break;
            case 'huidige_overdrachtswaarde':
                return number_format($model->currentTransferWorth(), 2, ',', '');
                break;
            case 'opgesteld_vermogen':
                return $model->power_kw_available;
                break;
            case 'total_participations':
            case 'totaal_aantal_participaties_nodig':
                return $model->total_participations;
                break;
            case 'max_participaties':
                return $model->max_participations;
                break;
            case 'min_participaties':
                return $model->min_participations;
                break;
            case 'type_lening':
                if($projectTypeCodeRef == 'loan') {
                    return ProjectLoanType::find($model->loan_type_id)->name;
                }else{
                    return "";
                }
            case 'amount_of_loan_needed':
            case 'bedrag_lening_nodig':
                return $model->amount_of_loan_needed;
                break;
            case 'min_bedrag_lening':
                return $model->min_amount_loan;
                break;
            case 'max_bedrag_lening':
                return $model->max_amount_loan;
                break;
            case 'aanwijzing_belastingdienst':
                return $model->tax_referral;
                break;
            case 'aantal_interesse':
                return  $model->participations_interessed;
                break;
            case 'aantal_ingeschreven':
                return  $model->participations_optioned;
                break;
            case 'aantal_toegekend':
                return  $model->participations_granted;
                break;
            case 'aantal_definitief':
                return  $model->participations_definitive;
                break;
            case 'uit_te_geven_participaties':
                return  $model->total_participations - $model->participations_definitive;
                break;
            case 'bedrag_interesse':
                if($projectTypeCodeRef == 'loan') {
                    $amount = number_format($model->amount_interessed, 2, ',', '');
                }else{
                    $amount = number_format(($model->participations_interessed * $model->currentBookWorth()), 2, ',', '');
                }
                return $amount;
                break;
            case 'bedrag_ingeschreven':
                if($projectTypeCodeRef == 'loan') {
                    $amount = number_format($model->amount_optioned, 2, ',', '');
                }else{
                    $amount = number_format(($model->participations_optioned * $model->currentBookWorth()), 2, ',', '');
                }
                return $amount;
                break;
            case 'bedrag_toegekend':
                if($projectTypeCodeRef == 'loan') {
                    $amount = number_format($model->amount_granted, 2, ',', '');
                }else{
                    $amount = number_format(($model->participations_granted * $model->currentBookWorth()), 2, ',', '');
                }
                return $amount;
                break;
            case 'bedrag_definitief':
                if($projectTypeCodeRef == 'loan') {
                    $amount = number_format($model->amount_definitive, 2, ',', '');
                }else{
                    $amount = number_format(($model->participations_definitive * $model->currentBookWorth()), 2, ',', '');
                }
                return $amount;
                break;
            case 'transactiekosten_naam_op_de_portal':
                return $model->text_transaction_costs;
                break;
            case 'aantal_participanten':
                return $model->participantsProject->count();
                break;
            case 'postcoderoos':
                return $model->postalcode_link;
                break;
            default:
                return '';
                break;
        }
    }

    public static function getParticipantProjectVar($model, $varname){
        $projectTypeCodeRef = $model->project->projectType->code_ref;
        $mutationDepositTypes = ParticipantMutationType::where('project_type_id', $model->project->project_type_id)->whereIn('code_ref', ['first_deposit', 'deposit'])->get()->pluck('id');
        $mutationWithDrawalTypes = ParticipantMutationType::where('project_type_id', $model->project->project_type_id)->whereIn('code_ref', ['withDrawal'])->get()->pluck('id');
        switch ($varname) {
            case 'contact_naam':
                return $model->contact->full_name;
                break;
            case 'contact_voornaam':
                if($model->contact->type_id == 'person'){
                    return $model->contact->person->first_name;
                }
                elseif($model->contact->type_id == 'organisation'){
                    return '';
                }
                break;
            case 'contact_achternaam':
                if($model->contact->type_id == 'person'){
                    $prefix = $model->contact->person->last_name_prefix;
                    return $prefix ? $prefix . ' ' . $model->contact->person->last_name : $model->contact->person->last_name;
                }
                elseif($model->contact->type_id == 'organisation'){
                    return $model->contact->full_name;
                }
                break;
            case 'contact_voorletters':
                if($model->contact->type_id == 'person'){
                    return $model->contact->person->initials;
                }
                elseif($model->contact->type_id == 'organisation'){
                    return '';
                }
                break;
            case 'contact_geboortedatum':
                if($model->contact->type_id == 'person'){
                    return $model->contact->person->date_of_birth ? Carbon::parse($model->contact->person->date_of_birth)->format('d-m-Y') : null;;
                }
                elseif($model->contact->type_id == 'organisation'){
                    return '';
                }
                break;
            case 'contact_adres':
                return optional($model->address)->street . ' ' . optional($model->address)->number . (optional($model->address)->addition ? ('-' . optional($model->address)->addition) : '');
                break;
            case 'contact_postcode':
                return optional($model->address)->postal_code;
                break;
            case 'contact_plaats':
                return optional($model->address)->city;
                break;
            case 'contact_iban':
                return $model->contact->iban;
                break;
            case 'contact_iban_tnv':
                return $model->contact->iban_attn;
                break;
            case 'contact_partner_voornaam':
                if($model->contact->type_id == 'person'){
                    return $model->contact->person->first_name_partner;
                }
                elseif($model->type_id == 'organisation'){
                    return '';
                }
                break;
            case 'contact_partner_achternaam':
                if($model->contact->type_id == 'person'){
                    return $model->contact->person->last_name_partner;
                }
                elseif($model->type_id == 'organisation'){
                    return '';
                }
                break;
            case 'contact_telefoonnummer':
                return optional(optional($model->contact)->primaryphoneNumber)->number;
                break;
            case 'contact_email':
                return optional(optional($model->contact)->primaryEmailAddress)->email;
                break;
            case 'contact_energieleverancier':
                return optional(optional(optional($model->address)->currentAddressEnergySupplierElectricity)->energySupplier)->name;
                break;
            case 'contact_energieleverancier_klantnummer':
                return optional(optional($model->address)->currentAddressEnergySupplierElectricity)->es_number;
                break;
            case 'contact_energieleverancier_ean_elektra':
                return optional($model->address)->ean_electricity;
                break;
            case 'statussen':
                return implode(', ', array_map(function ($status) {
                    try{
                        $statusName = $status->name;
                    }catch (\Exception $e)
                    {
                        $statusName = $status['name'];
                    }
                    return $statusName;
                }, $model->UniqueMutationStatuses)) ;
                break;
            case 'project':
                return $model->project->name;
                break;
            case 'jaarlijks_verbruik':
                return $model->power_kwh_consumption;
                break;
            case 'inschrijf_datum':
                return $model->date_register ? Carbon::parse($model->date_register)->format('d-m-Y') : null;
                break;
            case 'aantal_interesse':
                return  $model->participations_interessed;
                break;
            case 'aantal_ingeschreven':
                return  $model->participations_optioned;
                break;
            case 'aantal_toegekend':
                return  $model->participations_granted;
                break;
            case 'aantal_definitief':
                return  $model->participations_definitive;
                break;
            case 'huidig_aantal_participaties':
                if($projectTypeCodeRef != 'loan') {
                    return  $model->participations_definitive;
                }else{
                    return 0;
                }
                break;
            case 'huidig_aantal_obligaties':
                if($projectTypeCodeRef == 'obligation') {
                    return  $model->participations_definitive;
                }else{
                    return 0;
                }
                break;
            case 'bedrag_interesse':
                if($projectTypeCodeRef == 'loan') {
                    $amount = number_format($model->amount_interessed, 2, ',', '');
                }else{
                    $amount = number_format(($model->participations_interessed * $model->project->currentBookWorth()), 2, ',', '');
                }
                return $amount;
                break;
            case 'bedrag_ingeschreven':
                if($projectTypeCodeRef == 'loan') {
                    $amount = number_format($model->amount_optioned, 2, ',', '');
                }else{
                    $amount = number_format(($model->participations_optioned * $model->project->currentBookWorth()), 2, ',', '');
                }
                return $amount;
                break;
            case 'bedrag_toegekend':
                if($projectTypeCodeRef == 'loan') {
                    $amount = number_format($model->amount_granted, 2, ',', '');
                }else{
                    $amount = number_format(($model->participations_granted * $model->project->currentBookWorth()), 2, ',', '');
                }
                return $amount;
                break;
            case 'bedrag_definitief':
                if($projectTypeCodeRef == 'loan') {
                    $amount = number_format($model->amount_definitive, 2, ',', '');
                }else{
                    $amount = number_format(($model->participations_definitive * $model->project->currentBookWorth()), 2, ',', '');
                }
                return $amount;
                break;
            case 'saldo_kapitaal_rekening':
            case 'huidig_saldo_kapitaal_rekening':
                return number_format($model->participations_capital_worth, 2, ',', '');
                break;
            case 'saldo_lening_rekening':
            case 'huidig_saldo_lening_rekening':
                return number_format($model->amount_definitive, 2, ',', '');
                break;
            case 'totale_opbrengsten':
                return number_format($model->participationsReturnsTotal, 2, ',', '');
                break;
            case 'waarde_totaal':
            case 'huidige_totale_waarde':
                return number_format($model->participations_definitive_worth, 2, ',', '');
                break;
            case 'nominale_waarde':
                // deze waarde is bij project vastgelegd!
                return number_format($model->project->participation_worth, 2, ',', '');
                break;
            case 'huidige_boekwaarde':
            case 'huidige_hoofdsom':
                // deze waarde wordt bij project bepaald!
                return number_format($model->project->currentBookWorth(), 2, ',', '');
                break;
            case 'totale_opbrengsten_kwh':
                return number_format($model->participationsReturnsKwhTotal, 2, ',', '');
                break;
            case 'totale_teruggave_eb':
            case 'totale_indicatie_teruggave_energie_belasting':
                return number_format($model->participationsIndicationOfRestitutionEnergyTaxTotal, 2, ',', '');
                break;
            case 'akkoord_reglement':
                return $model->did_accept_agreement ? 'Ja' : 'Nee';
                break;
            case 'geschonken_door':
            case 'schenker_naam':
                if($model->giftedByContact) {
                    if ($model->giftedByContact->type_id == 'person') {
                        $prefix = $model->giftedByContact->person->last_name_prefix;
                        return $prefix ? $model->giftedByContact->person->first_name . ' ' . $prefix . ' ' . $model->giftedByContact->person->last_name
                            : $model->giftedByContact->person->first_name . ' ' . $model->giftedByContact->person->last_name;
                    } elseif ($model->giftedByContact->type_id == 'organisation') {
                        return $model->giftedByContact->full_name;
                    }
                }
                else{
                    return '';
                }
                break;
            case 'geschonken_door_voorletters':
            case 'schenker_voorletters':
                if($model->giftedByContact) {
                    if ($model->giftedByContact->type_id == 'person') {
                        return $model->giftedByContact->person->initials;
                    } else {
                        return '';
                    }
                }
                else {
                    return '';
                }
                break;
            case 'geschonken_door_voornaam':
            case 'schenker_voornaam':
                if($model->giftedByContact) {
                    if($model->giftedByContact->type_id == 'person'){
                        return $model->giftedByContact->person->first_name;
                    }
                    elseif($model->giftedByContact->type_id == 'organisation'){
                        return '';
                    }
                }
                else{
                    return '';
                }
                break;
            case 'geschonken_door_achternaam':
            case 'schenker_achternaam':
                if($model->giftedByContact) {
                    if($model->giftedByContact->type_id == 'person'){
                        $prefix = $model->giftedByContact->person->last_name_prefix;
                        return $prefix ? $prefix . ' ' . $model->giftedByContact->person->last_name : $model->giftedByContact->person->last_name;
                    }
                    elseif($model->giftedByContact->type_id == 'organisation'){
                        return $model->giftedByContact->full_name;
                    }
                }
                else{
                    return '';
                }
                break;
            case 'wettelijke_vertegenwoordiger':
                if($model->contact->legalRepContact && $model->contact->legalRepContact->contact) {
                    if ($model->contact->legalRepContact->contact->type_id == 'person') {
                        $prefix = $model->contact->legalRepContact->contact->person->last_name_prefix;
                        return $prefix ? $model->contact->legalRepContact->contact->person->first_name . ' ' . $prefix . ' ' . $model->contact->legalRepContact->contact->person->last_name
                            : $model->contact->legalRepContact->contact->person->first_name . ' ' . $model->contact->legalRepContact->contact->person->last_name;
                    } elseif ($model->contact->legalRepContact->contact->type_id == 'organisation') {
                        return $model->contact->legalRepContact->contact->full_name;
                    }
                }
                else{
                    return '';
                }
                break;
            case 'wettelijke_vertegenwoordiger_voornaam':
                if($model->contact->legalRepContact && $model->contact->legalRepContact->contact) {
                    if($model->contact->legalRepContact->contact->type_id == 'person'){
                        return $model->contact->legalRepContact->contact->person->first_name;
                    }
                    elseif($model->contact->legalRepContact->contact->type_id == 'organisation'){
                        return '';
                    }
                }
                else{
                    return '';
                }
                break;
            case 'wettelijke_vertegenwoordiger_achternaam':
                if($model->contact->legalRepContact && $model->contact->legalRepContact->contact) {
                    if($model->contact->legalRepContact->contact->type_id == 'person'){
                        $prefix = $model->contact->legalRepContact->contact->person->last_name_prefix;
                        return $prefix ? $prefix . ' ' . $model->contact->legalRepContact->contact->person->last_name : $model->contact->legalRepContact->contact->person->last_name;
                    }
                    elseif($model->contact->legalRepContact->contact->type_id == 'organisation'){
                        return $model->contact->legalRepContact->contact->full_name;
                    }
                }
                else{
                    return '';
                }
                break;


            case 'bedrag_overdracht_interesse':
                if ($projectTypeCodeRef == 'loan') {
                    return 0;
                } else {
                    $mutationStatusIds = (ParticipantMutationStatus::whereIn('code_ref', ['interest', 'option', 'granted', 'final'])->pluck('id')->toArray());
                    // mutations zijn gesorteerd op ID, descending. Dus eerste is de laatste!
                    $lastMutation = $model->mutations->whereNotNull('date_interest')->whereIn('status_id', $mutationStatusIds)->whereIn('type_id', $mutationWithDrawalTypes)->first();
                    return $lastMutation ? number_format( ($model->project->currentTransferWorth() * $lastMutation->quantity_interest * -1), 2, ',', '') : 0;
                }
                break;

            case 'bedrag_overdracht_ingeschreven':
                if ($projectTypeCodeRef == 'loan') {
                    return 0;
                } else {
                    $mutationStatusIds = (ParticipantMutationStatus::whereIn('code_ref', ['option', 'granted', 'final'])->pluck('id')->toArray());
                    $lastMutation = $model->mutations->whereNotNull('date_interest')->whereIn('status_id', $mutationStatusIds)->whereIn('type_id', $mutationWithDrawalTypes)->first();
                    return $lastMutation ? number_format( ($model->project->currentTransferWorth() * $lastMutation->quantity_option * -1), 2, ',', '') : 0;
                }
                break;

            case 'bedrag_overdracht_toegekend':
                if ($projectTypeCodeRef == 'loan') {
                    return 0;
                } else {
                    $mutationStatusIds = (ParticipantMutationStatus::whereIn('code_ref', ['granted', 'final'])->pluck('id')->toArray());
                    $lastMutation = $model->mutations->whereNotNull('date_interest')->whereIn('status_id', $mutationStatusIds)->whereIn('type_id', $mutationWithDrawalTypes)->first();
                    return $lastMutation ? number_format( ($model->project->currentTransferWorth() * $lastMutation->quantity_granted * -1), 2, ',', '') : 0;
                }
                break;

            case 'bedrag_overdracht_definitief':
                if ($projectTypeCodeRef == 'loan') {
                    return 0;
                } else {
                    $mutationStatusIds = (ParticipantMutationStatus::whereIn('code_ref', ['final'])->pluck('id')->toArray());
                    $lastMutation = $model->mutations->whereNotNull('date_interest')->whereIn('status_id', $mutationStatusIds)->whereIn('type_id', $mutationWithDrawalTypes)->first();
                    return $lastMutation ? number_format( ($model->project->currentTransferWorth() * $lastMutation->quantity_final * -1), 2, ',', '') : 0;
                }
                break;

            case 'iban_uitkeren':
                return $model->iban_payout ? $model->iban_payout : $model->contact->iban;
                break;
            case 'iban_uitkeren_tnv':
                return $model->iban_payout_attn ? $model->iban_payout_attn : $model->contact->iban_attn;
                break;
            case 'uitkeren_op':
                return $model->participantProjectPayoutType ? $model->participantProjectPayoutType->name : '';
                break;
            case 'iban_uitkeren_gedeeltelijk':
                $ibanPayout = $model->iban_payout ? $model->iban_payout : $model->contact->iban;
                if($ibanPayout && strlen($ibanPayout)>13)
                {
                    $numberOfHiddenCharacters = strlen($ibanPayout) - 11;
                    $partialHiddenIban = substr($ibanPayout, 0, 6);
                    while($numberOfHiddenCharacters > 0) {
                        $partialHiddenIban = $partialHiddenIban . '*';
                        $numberOfHiddenCharacters--;
                    }
                    return $partialHiddenIban . substr($ibanPayout, -4);
                } else {
                    return '';
                }
                break;

            case 'beeindigd_op':
                return $model->date_terminated ? Carbon::parse($model->date_terminated)->format('d-m-Y') : null;
                break;

            case 'aantal_inleg_mutatie_interesse':
                if($projectTypeCodeRef == 'loan'){
                    return 0;
                }else{
                    $mutationStatus = (ParticipantMutationStatus::where('code_ref', 'interest')->first())->id;
                    return $model->mutations->where('status_id', $mutationStatus)->whereIn('type_id', $mutationDepositTypes)->sum('quantity');
                }
                break;
            case 'aantal_inleg_mutatie_ingeschreven':
                if($projectTypeCodeRef == 'loan'){
                    return 0;
                }else{
                    $mutationStatus = (ParticipantMutationStatus::where('code_ref', 'option')->first())->id;
                    return $model->mutations->where('status_id', $mutationStatus)->whereIn('type_id', $mutationDepositTypes)->sum('quantity');
                }
                break;
            case 'aantal_inleg_mutatie_toegekend':
                if($projectTypeCodeRef == 'loan'){
                    return 0;
                }else{
                    $mutationStatus = (ParticipantMutationStatus::where('code_ref', 'granted')->first())->id;
                    return $model->mutations->where('status_id', $mutationStatus)->whereIn('type_id', $mutationDepositTypes)->sum('quantity');
                }
                break;
            case 'aantal_inleg_mutatie_definitief':
                if($projectTypeCodeRef == 'loan'){
                    return 0;
                }else{
                    $mutationStatus = (ParticipantMutationStatus::where('code_ref', 'final')->first())->id;
                    return $model->mutations->where('status_id', $mutationStatus)->whereIn('type_id', $mutationDepositTypes)->sum('quantity');
                }
                break;
            case 'bedrag_inleg_mutatie_interesse':
                $mutationStatus = (ParticipantMutationStatus::where('code_ref', 'interest')->first())->id;
                if($projectTypeCodeRef == 'loan'){
                    return $model->mutations->where('status_id', $mutationStatus)->whereIn('type_id', $mutationDepositTypes)->sum('amount');
                }else{
                    $firstMutationAmount = 0;
                    foreach($model->mutations->where('status_id', $mutationStatus)->whereIn('type_id', $mutationDepositTypes) as $mutation) {
                        $bookWorth = ProjectValueCourse::where('project_id', $model->project_id)
                            ->where('date', '<=', $mutation->date_interest)
                            ->orderBy('date', 'desc')
                            ->value('book_worth');
                        $firstMutationAmount = $firstMutationAmount + ( $bookWorth * $mutation->quantity );
                    }
                    return number_format($firstMutationAmount, 2, ',', '');
                }
                break;
            case 'bedrag_inleg_mutatie_ingeschreven':
                $mutationStatus = (ParticipantMutationStatus::where('code_ref', 'option')->first())->id;
                if($projectTypeCodeRef == 'loan'){
                    return $model->mutations->where('status_id', $mutationStatus)->whereIn('type_id', $mutationDepositTypes)->sum('amount');
                }else{
                    $firstMutationAmount = 0;
                    foreach($model->mutations->where('status_id', $mutationStatus)->whereIn('type_id', $mutationDepositTypes) as $mutation) {
                        $bookWorth = ProjectValueCourse::where('project_id', $model->project_id)
                            ->where('date', '<=', $mutation->date_option)
                            ->orderBy('date', 'desc')
                            ->value('book_worth');
                        $firstMutationAmount = $firstMutationAmount + ( $bookWorth * $mutation->quantity );
                    }
                    return number_format($firstMutationAmount, 2, ',', '');
                }
                break;
            case 'bedrag_inleg_mutatie_toegekend':
                $mutationStatus = (ParticipantMutationStatus::where('code_ref', 'granted')->first())->id;
                if($projectTypeCodeRef == 'loan'){
                    return $model->mutations->where('status_id', $mutationStatus)->whereIn('type_id', $mutationDepositTypes)->sum('amount');
                }else{
                    $firstMutationAmount = 0;
                    foreach($model->mutations->where('status_id', $mutationStatus)->whereIn('type_id', $mutationDepositTypes) as $mutation) {
                        $bookWorth = ProjectValueCourse::where('project_id', $model->project_id)
                            ->where('date', '<=', $mutation->date_granted)
                            ->orderBy('date', 'desc')
                            ->value('book_worth');
                        $firstMutationAmount = $firstMutationAmount + ( $bookWorth * $mutation->quantity );
                    }
                    return number_format($firstMutationAmount, 2, ',', '');
                }
                break;
            case 'bedrag_inleg_mutatie_definitief':
                $mutationStatus = (ParticipantMutationStatus::where('code_ref', 'final')->first())->id;
                if($projectTypeCodeRef == 'loan'){
                    return $model->mutations->where('status_id', $mutationStatus)->whereIn('type_id', $mutationDepositTypes)->sum('amount');
                }else{
                    $firstMutationAmount = 0;
                    foreach($model->mutations->where('status_id', $mutationStatus)->whereIn('type_id', $mutationDepositTypes) as $mutation) {
                        $bookWorth = ProjectValueCourse::where('project_id', $model->project_id)
                            ->where('date', '<=', $mutation->date_entry)
                            ->orderBy('date', 'desc')
                            ->value('book_worth');
                        $firstMutationAmount = $firstMutationAmount + ( $bookWorth * $mutation->quantity );
                    }
                    return number_format($firstMutationAmount, 2, ',', '');
                }
                break;
            case 'aantal_opname_mutatie_interesse':
                if($projectTypeCodeRef == 'loan'){
                    return 0;
                }else{
                    $mutationStatus = (ParticipantMutationStatus::where('code_ref', 'interest')->first())->id;
                    return $model->mutations->where('status_id', $mutationStatus)->whereIn('type_id', $mutationWithDrawalTypes)->sum('quantity');
                }
                break;
            case 'aantal_opname_mutatie_ingeschreven':
                if($projectTypeCodeRef == 'loan'){
                    return 0;
                }else{
                    $mutationStatus = (ParticipantMutationStatus::where('code_ref', 'option')->first())->id;
                    return $model->mutations->where('status_id', $mutationStatus)->whereIn('type_id', $mutationWithDrawalTypes)->sum('quantity');
                }
                break;
            case 'aantal_opname_mutatie_toegekend':
                if($projectTypeCodeRef == 'loan'){
                    return 0;
                }else{
                    $mutationStatus = (ParticipantMutationStatus::where('code_ref', 'granted')->first())->id;
                    return $model->mutations->where('status_id', $mutationStatus)->whereIn('type_id', $mutationWithDrawalTypes)->sum('quantity');
                }
                break;
            case 'aantal_opname_mutatie_definitief':
                if($projectTypeCodeRef == 'loan'){
                    return 0;
                }else{
                    $mutationStatus = (ParticipantMutationStatus::where('code_ref', 'final')->first())->id;
                    return $model->mutations->where('status_id', $mutationStatus)->whereIn('type_id', $mutationWithDrawalTypes)->sum('quantity');
                }
                break;
            case 'bedrag_opname_mutatie_interesse':
                $mutationStatus = (ParticipantMutationStatus::where('code_ref', 'interest')->first())->id;
                if($projectTypeCodeRef == 'loan'){
                    return $model->mutations->where('status_id', $mutationStatus)->whereIn('type_id', $mutationWithDrawalTypes)->sum('amount');
                }else{
                    $firstMutationAmount = 0;
                    foreach($model->mutations->where('status_id', $mutationStatus)->whereIn('type_id', $mutationWithDrawalTypes) as $mutation) {
                        $bookWorth = ProjectValueCourse::where('project_id', $model->project_id)
                            ->where('date', '<=', $mutation->date_interest)
                            ->orderBy('date', 'desc')
                            ->value('book_worth');
                        $firstMutationAmount = $firstMutationAmount + ( $bookWorth * $mutation->quantity );
                    }
                    return number_format($firstMutationAmount, 2, ',', '');
                }
                break;
            case 'bedrag_opname_mutatie_ingeschreven':
                $mutationStatus = (ParticipantMutationStatus::where('code_ref', 'option')->first())->id;
                if($projectTypeCodeRef == 'loan'){
                    return $model->mutations->where('status_id', $mutationStatus)->whereIn('type_id', $mutationWithDrawalTypes)->sum('amount');
                }else{
                    $firstMutationAmount = 0;
                    foreach($model->mutations->where('status_id', $mutationStatus)->whereIn('type_id', $mutationWithDrawalTypes) as $mutation) {
                        $bookWorth = ProjectValueCourse::where('project_id', $model->project_id)
                            ->where('date', '<=', $mutation->date_option)
                            ->orderBy('date', 'desc')
                            ->value('book_worth');
                        $firstMutationAmount = $firstMutationAmount + ( $bookWorth * $mutation->quantity );
                    }
                    return number_format($firstMutationAmount, 2, ',', '');
                }
                break;
            case 'bedrag_opname_mutatie_toegekend':
                $mutationStatus = (ParticipantMutationStatus::where('code_ref', 'granted')->first())->id;
                if($projectTypeCodeRef == 'loan'){
                    return $model->mutations->where('status_id', $mutationStatus)->whereIn('type_id', $mutationWithDrawalTypes)->sum('amount');
                }else{
                    $firstMutationAmount = 0;
                    foreach($model->mutations->where('status_id', $mutationStatus)->whereIn('type_id', $mutationWithDrawalTypes) as $mutation) {
                        $bookWorth = ProjectValueCourse::where('project_id', $model->project_id)
                            ->where('date', '<=', $mutation->date_granted)
                            ->orderBy('date', 'desc')
                            ->value('book_worth');
                        $firstMutationAmount = $firstMutationAmount + ( $bookWorth * $mutation->quantity );
                    }
                    return number_format($firstMutationAmount, 2, ',', '');
                }
                break;
            case 'bedrag_opname_mutatie_definitief':
                $mutationStatus = (ParticipantMutationStatus::where('code_ref', 'final')->first())->id;
                if($projectTypeCodeRef == 'loan'){
                    return $model->mutations->where('status_id', $mutationStatus)->whereIn('type_id', $mutationWithDrawalTypes)->sum('amount');
                }else{
                    $firstMutationAmount = 0;
                    foreach($model->mutations->where('status_id', $mutationStatus)->whereIn('type_id', $mutationWithDrawalTypes) as $mutation) {
                        $bookWorth = ProjectValueCourse::where('project_id', $model->project_id)
                            ->where('date', '<=', $mutation->date_entry)
                            ->orderBy('date', 'desc')
                            ->value('book_worth');
                        $firstMutationAmount = $firstMutationAmount + ( $bookWorth * $mutation->quantity );
                    }
                    return number_format($firstMutationAmount, 2, ',', '');
                }
                break;
            case 'datum_laatste_mutatie_interesse':
                $mutationStatusIds = (ParticipantMutationStatus::whereIn('code_ref', ['interest', 'option', 'granted', 'final'])->pluck('id')->toArray());
                // mutations zijn gesorteerd op ID, descending. Dus eerste is de laatste!
                $lastMutation = $model->mutations->whereNotNull('date_interest')->whereIn('status_id', $mutationStatusIds)->whereIn('type_id', $mutationDepositTypes)->first();
                return ($lastMutation && $lastMutation->date_interest) ? Carbon::parse($lastMutation->date_interest)->format('d-m-Y') : null;
                break;
            case 'datum_laatste_mutatie_ingeschreven':
                $mutationStatusIds = (ParticipantMutationStatus::whereIn('code_ref', ['option', 'granted', 'final'])->pluck('id')->toArray());
                // mutations zijn gesorteerd op ID, descending. Dus eerste is de laatste!
                $lastMutation = $model->mutations->whereNotNull('date_option')->whereIn('status_id', $mutationStatusIds)->whereIn('type_id', $mutationDepositTypes)->first();
                return ($lastMutation && $lastMutation->date_option) ? Carbon::parse($lastMutation->date_option)->format('d-m-Y') : null;
                break;
            case 'datum_laatste_mutatie_toegekend':
                $mutationStatusIds = (ParticipantMutationStatus::whereIn('code_ref', ['granted', 'final'])->pluck('id')->toArray());
                // mutations zijn gesorteerd op ID, descending. Dus eerste is de laatste!
                $lastMutation = $model->mutations->whereNotNull('date_granted')->whereIn('status_id', $mutationStatusIds)->whereIn('type_id', $mutationDepositTypes)->first();
                return ($lastMutation && $lastMutation->date_granted) ? Carbon::parse($lastMutation->date_granted)->format('d-m-Y') : null;
                break;
            case 'datum_laatste_mutatie_definitief':
                $mutationStatusIds = (ParticipantMutationStatus::whereIn('code_ref', ['final'])->pluck('id')->toArray());
                // mutations zijn gesorteerd op ID, descending. Dus eerste is de laatste!
                $lastMutation = $model->mutations->whereNotNull('date_entry')->whereIn('status_id', $mutationStatusIds)->whereIn('type_id', $mutationDepositTypes)->first();
                return ($lastMutation && $lastMutation->date_entry) ? Carbon::parse($lastMutation->date_entry)->format('d-m-Y') : null;
                break;
            case 'aantal_laatste_mutatie_interesse':
                if($projectTypeCodeRef == 'loan'){
                    return 0;
                }else{
                    $mutationStatusIds = (ParticipantMutationStatus::whereIn('code_ref', ['interest', 'option', 'granted', 'final'])->pluck('id')->toArray());
                    // mutations zijn gesorteerd op ID, descending. Dus eerste is de laatste!
                    $lastMutation = $model->mutations->whereNotNull('date_interest')->whereIn('status_id', $mutationStatusIds)->whereIn('type_id', $mutationDepositTypes)->first();
                    return $lastMutation ? $lastMutation->quantity_interest : 0;
                }
                break;
            case 'aantal_laatste_mutatie_ingeschreven':
                if($projectTypeCodeRef == 'loan'){
                    return 0;
                }else{
                    $mutationStatusIds = (ParticipantMutationStatus::whereIn('code_ref', ['option', 'granted', 'final'])->pluck('id')->toArray());
                    // mutations zijn gesorteerd op ID, descending. Dus eerste is de laatste!
                    $lastMutation = $model->mutations->whereNotNull('date_option')->whereIn('status_id', $mutationStatusIds)->whereIn('type_id', $mutationDepositTypes)->first();
                    return $lastMutation ? $lastMutation->quantity_option : 0;
                }
                break;
            case 'aantal_laatste_mutatie_toegekend':
                if($projectTypeCodeRef == 'loan'){
                    return 0;
                }else{
                    $mutationStatusIds = (ParticipantMutationStatus::whereIn('code_ref', ['granted', 'final'])->pluck('id')->toArray());
                    // mutations zijn gesorteerd op ID, descending. Dus eerste is de laatste!
                    $lastMutation = $model->mutations->whereNotNull('date_granted')->whereIn('status_id', $mutationStatusIds)->whereIn('type_id', $mutationDepositTypes)->first();
                    return $lastMutation ? $lastMutation->quantity_granted : 0;
                }
                break;
            case 'aantal_laatste_mutatie_definitief':
                if($projectTypeCodeRef == 'loan'){
                    return 0;
                }else{
                    $mutationStatusIds = (ParticipantMutationStatus::whereIn('code_ref', ['final'])->pluck('id')->toArray());
                    // mutations zijn gesorteerd op ID, descending. Dus eerste is de laatste!
                    $lastMutation = $model->mutations->whereNotNull('date_entry')->whereIn('status_id', $mutationStatusIds)->whereIn('type_id', $mutationDepositTypes)->first();
                    return $lastMutation ? $lastMutation->quantity_final : 0;
                }
                break;
            case 'bedrag_laatste_mutatie_interesse':
                $mutationStatusIds = (ParticipantMutationStatus::whereIn('code_ref', ['interest', 'option', 'granted', 'final'])->pluck('id')->toArray());
                $lastMutationAmount = 0;
                // mutations zijn gesorteerd op ID, descending. Dus eerste is de laatste!
                $lastMutation = $model->mutations->whereNotNull('date_interest')->whereIn('status_id', $mutationStatusIds)->whereIn('type_id', $mutationDepositTypes)->first();
                if($projectTypeCodeRef == 'loan'){
                    $lastMutationAmount = $lastMutation ? $lastMutation->amount_interest : 0;
                }else{
                    if($lastMutation)
                    {
                        $bookWorth = ProjectValueCourse::where('project_id', $model->project_id)
                            ->where('date', '<=', $lastMutation->date_interest)
                            ->orderBy('date', 'desc')
                            ->value('book_worth');
                        $lastMutationAmount = $bookWorth ? ( $bookWorth * $lastMutation->quantity_interest ) : 0;
                    }
                }
                return number_format($lastMutationAmount, 2, ',', '');
                break;
            case 'bedrag_laatste_mutatie_ingeschreven':
                $mutationStatusIds = (ParticipantMutationStatus::whereIn('code_ref', ['option', 'granted', 'final'])->pluck('id')->toArray());
                $lastMutationAmount = 0;
                // mutations zijn gesorteerd op ID, descending. Dus eerste is de laatste!
                $lastMutation = $model->mutations->whereNotNull('date_option')->whereIn('status_id', $mutationStatusIds)->whereIn('type_id', $mutationDepositTypes)->first();
                if($projectTypeCodeRef == 'loan'){
                    $lastMutationAmount = $lastMutation ? $lastMutation->amount_option : 0;
                }else{
                    if($lastMutation)
                    {
                        $bookWorth = ProjectValueCourse::where('project_id', $model->project_id)
                            ->where('date', '<=', $lastMutation->date_option)
                            ->orderBy('date', 'desc')
                            ->value('book_worth');
                        $lastMutationAmount = $bookWorth ? ( $bookWorth * $lastMutation->quantity_option ) : 0;
                    }
                }
                return number_format($lastMutationAmount, 2, ',', '');
                break;
            case 'bedrag_laatste_mutatie_toegekend':
                $mutationStatusIds = (ParticipantMutationStatus::whereIn('code_ref', ['granted', 'final'])->pluck('id')->toArray());
                $lastMutationAmount = 0;
                // mutations zijn gesorteerd op ID, descending. Dus eerste is de laatste!
                $lastMutation = $model->mutations->whereNotNull('date_granted')->whereIn('status_id', $mutationStatusIds)->whereIn('type_id', $mutationDepositTypes)->first();
                if($projectTypeCodeRef == 'loan'){
                    $lastMutationAmount = $lastMutation ? $lastMutation->amount_granted : 0;
                }else{
                    if($lastMutation)
                    {
                        $bookWorth = ProjectValueCourse::where('project_id', $model->project_id)
                            ->where('date', '<=', $lastMutation->date_granted)
                            ->orderBy('date', 'desc')
                            ->value('book_worth');
                        $lastMutationAmount = $bookWorth ? ( $bookWorth * $lastMutation->quantity_granted ) : 0;
                    }
                }
                return number_format($lastMutationAmount, 2, ',', '');
                break;
            case 'bedrag_laatste_mutatie_definitief':
                $mutationStatusIds = (ParticipantMutationStatus::whereIn('code_ref', ['final'])->pluck('id')->toArray());
                $lastMutationAmount = 0;
                // mutations zijn gesorteerd op ID, descending. Dus eerste is de laatste!
                $lastMutation = $model->mutations->whereNotNull('date_entry')->whereIn('status_id', $mutationStatusIds)->whereIn('type_id', $mutationDepositTypes)->first();
                if($projectTypeCodeRef == 'loan'){
                    $lastMutationAmount = $lastMutation ? $lastMutation->amount_final : 0;
                }else{
                    if($lastMutation)
                    {
                        $bookWorth = ProjectValueCourse::where('project_id', $model->project_id)
                            ->where('date', '<=', $lastMutation->date_entry)
                            ->orderBy('date', 'desc')
                            ->value('book_worth');
                        $lastMutationAmount = $bookWorth ? ( $bookWorth * $lastMutation->quantity_final ) : 0;
                    }
                }
                return number_format($lastMutationAmount, 2, ',', '');
                break;
            case 'datum_laatste_opname_interesse':
                $mutationStatusIds = (ParticipantMutationStatus::whereIn('code_ref', ['interest', 'option', 'granted', 'final'])->pluck('id')->toArray());
                // mutations zijn gesorteerd op ID, descending. Dus eerste is de laatste!
                $lastMutation = $model->mutations->whereNotNull('date_interest')->whereIn('status_id', $mutationStatusIds)->whereIn('type_id', $mutationWithDrawalTypes)->first();
                return ($lastMutation && $lastMutation->date_interest) ? Carbon::parse($lastMutation->date_interest)->format('d-m-Y') : null;
                break;
            case 'datum_laatste_opname_ingeschreven':
                $mutationStatusIds = (ParticipantMutationStatus::whereIn('code_ref', ['option', 'granted', 'final'])->pluck('id')->toArray());
                // mutations zijn gesorteerd op ID, descending. Dus eerste is de laatste!
                $lastMutation = $model->mutations->whereNotNull('date_option')->whereIn('status_id', $mutationStatusIds)->whereIn('type_id', $mutationWithDrawalTypes)->first();
                return ($lastMutation && $lastMutation->date_option) ? Carbon::parse($lastMutation->date_option)->format('d-m-Y') : null;
                break;
            case 'datum_laatste_opname_toegekend':
                $mutationStatusIds = (ParticipantMutationStatus::whereIn('code_ref', ['granted', 'final'])->pluck('id')->toArray());
                // mutations zijn gesorteerd op ID, descending. Dus eerste is de laatste!
                $lastMutation = $model->mutations->whereNotNull('date_granted')->whereIn('status_id', $mutationStatusIds)->whereIn('type_id', $mutationWithDrawalTypes)->first();
                return ($lastMutation && $lastMutation->date_granted) ? Carbon::parse($lastMutation->date_granted)->format('d-m-Y') : null;
                break;
            case 'datum_laatste_opname_definitief':
                $mutationStatusIds = (ParticipantMutationStatus::whereIn('code_ref', ['final'])->pluck('id')->toArray());
                // mutations zijn gesorteerd op ID, descending. Dus eerste is de laatste!
                $lastMutation = $model->mutations->whereNotNull('date_entry')->whereIn('status_id', $mutationStatusIds)->whereIn('type_id', $mutationWithDrawalTypes)->first();
                return ($lastMutation && $lastMutation->date_entry) ? Carbon::parse($lastMutation->date_entry)->format('d-m-Y') : null;
                break;

            case 'aantal_laatste_opname_interesse':
                if($projectTypeCodeRef == 'loan'){
                    return 0;
                }else{
                    $mutationStatusIds = (ParticipantMutationStatus::whereIn('code_ref', ['interest', 'option', 'granted', 'final'])->pluck('id')->toArray());
                    // mutations zijn gesorteerd op ID, descending. Dus eerste is de laatste!
                    $lastMutation = $model->mutations->whereNotNull('date_interest')->whereIn('status_id', $mutationStatusIds)->whereIn('type_id', $mutationWithDrawalTypes)->first();
                    return $lastMutation ? $lastMutation->quantity_interest : 0;
                }
                break;
            case 'aantal_laatste_opname_ingeschreven':
                if($projectTypeCodeRef == 'loan'){
                    return 0;
                }else{
                    $mutationStatusIds = (ParticipantMutationStatus::whereIn('code_ref', ['option', 'granted', 'final'])->pluck('id')->toArray());
                    // mutations zijn gesorteerd op ID, descending. Dus eerste is de laatste!
                    $lastMutation = $model->mutations->whereNotNull('date_option')->whereIn('status_id', $mutationStatusIds)->whereIn('type_id', $mutationWithDrawalTypes)->first();
                    return $lastMutation ? $lastMutation->quantity_option : 0;
                }
                break;
            case 'aantal_laatste_opname_toegekend':
                if($projectTypeCodeRef == 'loan'){
                    return 0;
                }else{
                    $mutationStatusIds = (ParticipantMutationStatus::whereIn('code_ref', ['granted', 'final'])->pluck('id')->toArray());
                    // mutations zijn gesorteerd op ID, descending. Dus eerste is de laatste!
                    $lastMutation = $model->mutations->whereNotNull('date_granted')->whereIn('status_id', $mutationStatusIds)->whereIn('type_id', $mutationWithDrawalTypes)->first();
                    return $lastMutation ? $lastMutation->quantity_granted : 0;
                }
                break;
            case 'aantal_laatste_opname_definitief':
                if($projectTypeCodeRef == 'loan'){
                    return 0;
                }else{
                    $mutationStatusIds = (ParticipantMutationStatus::whereIn('code_ref', ['final'])->pluck('id')->toArray());
                    // mutations zijn gesorteerd op ID, descending. Dus eerste is de laatste!
                    $lastMutation = $model->mutations->whereNotNull('date_entry')->whereIn('status_id', $mutationStatusIds)->whereIn('type_id', $mutationWithDrawalTypes)->first();
                    return $lastMutation ? $lastMutation->quantity_final : 0;
                }
                break;
            case 'bedrag_laatste_opname_interesse':
                $mutationStatusIds = (ParticipantMutationStatus::whereIn('code_ref', ['interest', 'option', 'granted', 'final'])->pluck('id')->toArray());
                $lastMutationAmount = 0;
                // mutations zijn gesorteerd op ID, descending. Dus eerste is de laatste!
                $lastMutation = $model->mutations->whereNotNull('date_interest')->whereIn('status_id', $mutationStatusIds)->whereIn('type_id', $mutationWithDrawalTypes)->first();
                if($projectTypeCodeRef == 'loan'){
                    $lastMutationAmount = $lastMutation ? $lastMutation->amount_interest : 0;
                }else{
                    if($lastMutation)
                    {
                        $bookWorth = ProjectValueCourse::where('project_id', $model->project_id)
                            ->where('date', '<=', $lastMutation->date_interest)
                            ->orderBy('date', 'desc')
                            ->value('book_worth');
                        $lastMutationAmount = $bookWorth ? ( $bookWorth * $lastMutation->quantity_interest ) : 0;
                    }
                }
                return number_format($lastMutationAmount, 2, ',', '');
                break;
            case 'bedrag_laatste_opname_ingeschreven':
                $mutationStatusIds = (ParticipantMutationStatus::whereIn('code_ref', ['option', 'granted', 'final'])->pluck('id')->toArray());
                $lastMutationAmount = 0;
                // mutations zijn gesorteerd op ID, descending. Dus eerste is de laatste!
                $lastMutation = $model->mutations->whereNotNull('date_option')->whereIn('status_id', $mutationStatusIds)->whereIn('type_id', $mutationWithDrawalTypes)->first();
                if($projectTypeCodeRef == 'loan'){
                    $lastMutationAmount = $lastMutation ? $lastMutation->amount_option : 0;
                }else{
                    if($lastMutation)
                    {
                        $bookWorth = ProjectValueCourse::where('project_id', $model->project_id)
                            ->where('date', '<=', $lastMutation->date_option)
                            ->orderBy('date', 'desc')
                            ->value('book_worth');
                        $lastMutationAmount = $bookWorth ? ( $bookWorth * $lastMutation->quantity_option) : 0;
                    }
                }
                return number_format($lastMutationAmount, 2, ',', '');
                break;
            case 'bedrag_laatste_opname_toegekend':
                $mutationStatusIds = (ParticipantMutationStatus::whereIn('code_ref', ['granted', 'final'])->pluck('id')->toArray());
                $lastMutationAmount = 0;
                // mutations zijn gesorteerd op ID, descending. Dus eerste is de laatste!
                $lastMutation = $model->mutations->whereNotNull('date_granted')->whereIn('status_id', $mutationStatusIds)->whereIn('type_id', $mutationWithDrawalTypes)->first();
                if($projectTypeCodeRef == 'loan'){
                    $lastMutationAmount = $lastMutation ? $lastMutation->amount_granted : 0;
                }else{
                    if($lastMutation)
                    {
                        $bookWorth = ProjectValueCourse::where('project_id', $model->project_id)
                            ->where('date', '<=', $lastMutation->date_granted)
                            ->orderBy('date', 'desc')
                            ->value('book_worth');
                        $lastMutationAmount = $bookWorth ? ( $bookWorth * $lastMutation->quantity_granted ) : 0;
                    }
                }
                return number_format($lastMutationAmount, 2, ',', '');
                break;
            case 'bedrag_laatste_opname_definitief':
                $mutationStatusIds = (ParticipantMutationStatus::whereIn('code_ref', ['final'])->pluck('id')->toArray());
                $lastMutationAmount = 0;
                // mutations zijn gesorteerd op ID, descending. Dus eerste is de laatste!
                $lastMutation = $model->mutations->whereNotNull('date_entry')->whereIn('status_id', $mutationStatusIds)->whereIn('type_id', $mutationWithDrawalTypes)->first();
                if($projectTypeCodeRef == 'loan'){
                    $lastMutationAmount = $lastMutation ? $lastMutation->amount_final : 0;
                }else{
                    if($lastMutation)
                    {
                        $bookWorth = ProjectValueCourse::where('project_id', $model->project_id)
                            ->where('date', '<=', $lastMutation->date_entry)
                            ->orderBy('date', 'desc')
                            ->value('book_worth');
                        $lastMutationAmount = $bookWorth ? ( $bookWorth * $lastMutation->quantity_final ) : 0;
                    }
                }
                return number_format($lastMutationAmount, 2, ',', '');
                break;

            case 'transactiekosten_laatste_mutatie':
                // mutations zijn gesorteerd op ID, descending. Dus eerste is de laatste!
                $lastMutation = $model->mutations->whereIn('type_id', $mutationDepositTypes)->first();
                $lastMutationTransactionCostsAmount = $lastMutation ? $lastMutation->transaction_costs_amount : 0;
                return number_format($lastMutationTransactionCostsAmount, 2, ',', '');
                break;
            case 'mutatie_datum_betaald':
                $mutationStatus = (ParticipantMutationStatus::where('code_ref', 'final')->first())->id;
                // mutations zijn gesorteerd op ID, descending. Dus eerste is de laatste!
                $lastMutation = $model->mutations->where('status_id', $mutationStatus)->whereIn('type_id', $mutationDepositTypes)->first();
                return ($lastMutation && $lastMutation->date_payment) ? Carbon::parse($lastMutation->date_payment)->format('d-m-Y') : null;
                break;
            case 'mutatie_betalingskenmerk':
                $mutationStatus = (ParticipantMutationStatus::where('code_ref', 'final')->first())->id;
                // mutations zijn gesorteerd op ID, descending. Dus eerste is de laatste!
                $lastMutation = $model->mutations->where('status_id', $mutationStatus)->whereIn('type_id', $mutationDepositTypes)->first();
                return ($lastMutation && $lastMutation->payment_reference) ? $lastMutation->payment_reference : null;
                break;
            case 'mutatie_datum_contract_retour':
                $mutationStatus = (ParticipantMutationStatus::where('code_ref', 'final')->first())->id;
                // mutations zijn gesorteerd op ID, descending. Dus eerste is de laatste!
                $lastMutation = $model->mutations->where('status_id', $mutationStatus)->whereIn('type_id', $mutationDepositTypes)->first();
                return ($lastMutation && $lastMutation->date_contract_retour) ? Carbon::parse($lastMutation->date_contract_retour)->format('d-m-Y') : null;
                break;

            default:
                return '';
                break;
        }
    }

    public static function getParticipantMutationVar($model, $varname){
        // Tabel genereren
        switch ($varname) {
            case 'tabel':
                if(!$model || $model->count() == 0) return '';
                $projectTypeCodeRef = $model->first()->participation->project->projectType->code_ref;

                $html = "
                <table style='width:100%; border-collapse: collapse;'>
                  <tr>
                    <th style='border: 1px solid #000000; text-align: left; padding: 8px; background-color: #dddddd;'>Omschrijving</th>
                    <th style='border: 1px solid #000000; text-align: left; padding: 8px; background-color: #dddddd;'>Status</th>
                    <th style='border: 1px solid #000000; text-align: left; padding: 8px; background-color: #dddddd;'>Betaaldatum</th>
                    <th style='border: 1px solid #000000; text-align: left; padding: 8px; background-color: #dddddd;'>Ingangsdatum</th>";
                    switch ($projectTypeCodeRef) {
                        case 'loan':
                            $html .= "<th style='border: 1px solid #000000; text-align: left; padding: 8px; background-color: #dddddd;'>Lening rekening</th>";
                            break;
                        case 'capital':
                        case 'postalcode_link_capital':
                            $html .= "<th style='border: 1px solid #000000; text-align: left; padding: 8px; background-color: #dddddd;'>Kapitaal rekening</th>";
                            $html .= "<th style='border: 1px solid #000000; text-align: left; padding: 8px; background-color: #dddddd;'>Aantal part.</th>";
                            break;
                        case 'obligation':
                            $html .= "<th style='border: 1px solid #000000; text-align: left; padding: 8px; background-color: #dddddd;'>Aantal obligaties</th>";
                            break;
                    };
                $html .= "<th style='border: 1px solid #000000; text-align: left; padding: 8px; background-color: #dddddd;'>Opbrengst</th>";
                $html .= "</tr>";
                foreach($model as $mutatie){
                    $html .= "
                    <tr>
                      <td style='border: 1px solid #000000; text-align: left; padding: 8px; font-weight: normal'>" . ( $mutatie->type ? $mutatie->type->description : '' ) . "</td>
                      <td style='border: 1px solid #000000; text-align: left; padding: 8px; font-weight: normal'>" . ( $mutatie->status ? $mutatie->status->name : '' ) . "</td>
                      <td style='border: 1px solid #000000; text-align: left; padding: 8px; font-weight: normal'>" . ( $mutatie->date_payment ? Carbon::parse($mutatie->date_payment)->format('d-m-Y') : '' ) . "</td>
                      <td style='border: 1px solid #000000; text-align: left; padding: 8px; font-weight: normal'>" . ( $mutatie->date_entry ? Carbon::parse($mutatie->date_entry)->format('d-m-Y') : '' ) . "</td>";
                    switch ($projectTypeCodeRef) {
                        case 'loan':
                            $html .= "<td style='border: 1px solid #000000; text-align: left; padding: 8px; font-weight: normal;'>" . ( $mutatie->amount ? number_format($mutatie->amount, 2, ',', '') : '' ) . "</td>";
                            break;
                        case 'capital':
                        case 'postalcode_link_capital':
                            $html .= "<td style='border: 1px solid #000000; text-align: left; padding: 8px; font-weight: normal;'>" . ( ($mutatie->amount || $mutatie->participation_worth ) ? number_format(($mutatie->amount + $mutatie->participation_worth), 2, ',', '') : '' ) . "</td>";
                            $html .= "<td style='border: 1px solid #000000; text-align: left; padding: 8px; font-weight: normal;'>" . ( $mutatie->quantity ? $mutatie->quantity : '' ) . "</td>";
                            break;
                        case 'obligation':
                            $html .= "<td style='border: 1px solid #000000; text-align: left; padding: 8px; font-weight: normal;'>" . ( $mutatie->quantity ? $mutatie->quantity : '' ) . "</td>";
                            break;
                    };
                    $html .= "<td style='border: 1px solid #000000; text-align: left; padding: 8px; font-weight: normal;'>" . ( $mutatie->returns ? number_format($mutatie->returns, 2, ',', '') : '' ) . "</td>";
                    $html .= "</tr>";

                }
                $html .= "</table>";
                return $html;
                break;
            default:
                return '';
                break;
        }
    }

    public static function getProjectRevenueVar($model, $varname){
        switch ($varname) {
            case 'categorie':
                return $model->category->name;
                break;
            case 'project':
                return $model->project->name;
                break;
            case 'type_verdeling':
                return $model->getDistributionType() ? $model->getDistributionType()->name : '';
                break;
            case 'peildatum':
                return $model->date_reference ? Carbon::parse($model->date_reference)->format('d-m-Y') : null;
                break;
            case 'datum_definitief':
                return $model->date_confirmed ? Carbon::parse($model->date_confirmed)->format('d-m-Y') : null;
                break;
            case 'kwh_start':
                return $model->kwh_start;
                break;
            case 'kwh_eind':
                return $model->kwh_end;
                break;
            case 'kwh_totaal':
                $start = $model->kwh_start ? $model->kwh_start : 0;
                $end = $model->kwh_end ? $model->kwh_end : 0;
                return $end - $start;
                break;
            case 'opbrengst_kwh_euro':
                return $model->payout_kwh;
                break;
            case 'uitkeren_op':
                return $model->participantProjectPayoutType ? $model->participantProjectPayoutType->name : '';
                break;
            case 'datum_uitgekeerd':
                return $model->date_payed ? Carbon::parse($model->date_payed)->format('d-m-Y') : null;
                break;
            case 'beginperiode':
                return $model->date_begin ? Carbon::parse($model->date_begin)->format('d-m-Y') : null;
                break;
            case 'eindperiode':
                return $model->date_end ? Carbon::parse($model->date_end)->format('d-m-Y') : null;
                break;
            case 'teruggave':
                $start = $model->kwh_start ? $model->kwh_start : 0;
                $end = $model->kwh_end ? $model->kwh_end : 0;
                $payoutKwh = $model->payout_kwh ? $model->payout_kwh : 0;
                return number_format(($end - $start) * $payoutKwh, 2, ',', '');
                break;
            case 'resultaat':
                return $model->revenue;
                break;
            case 'uitkering_percentage':
                return number_format($model->pay_percentage, 2, ',', '');
                break;
            case 'uitkering_bedrag':
                return number_format($model->pay_amount, 2, ',', '');
                break;
            case 'bedrag_eerste_percentage':
                return number_format($model->key_amount_first_percentage, 2, ',', '');
                break;
            case 'uitkering_percentage_vanaf_bedrag':
                return number_format($model->pay_percentage_valid_from_key_amount, 2, ',', '');
                break;
            default:
                return '';
                break;
        }
    }

    public static function getProjectRevenueDistributionVar($model, $varname){
        $projectTypeCodeRef = $model->revenue->project->projectType->code_ref;
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
                switch ($model->status) {
                    case 'concept':
                        return 'Concept';
                        break;
                    case 'confirmed':
                        return 'Definitief';
                        break;
                    case 'processed':
                        return 'Verwerkt';
                        break;
                    default:
                        return '**onbepaald**';
                        break;
                }
                break;
            case 'participaties':
                if($projectTypeCodeRef == 'loan') {
                    return number_format($model->participations_loan_amount, 2, ',', '');
                }else{
                    return $model->participations_amount;
                }
                break;
            case 'aantal_voor_aflossing':
                if($model->revenue->category->code_ref !== 'redemptionEuro' || $projectTypeCodeRef == 'loan') {
                    return 0;
                }else{
                    return $model->participations_amount;
                }
                break;
            case 'bedrag_voor_aflossing':
                if($model->revenue->category->code_ref !== 'redemptionEuro'){
                    $amountBeforeRedemption = 0;
                }elseif($projectTypeCodeRef == 'loan'){
                    $amountBeforeRedemption = $model->participations_loan_amount ? $model->participations_loan_amount : 0;
                }else{
                    if($model->participations_amount)
                    {
                        $bookWorth = ProjectValueCourse::where('project_id', $model->revenue->project_id)
                            ->where('date', '<=', $model->date_payout)
                            ->orderBy('date', 'desc')
                            ->value('book_worth');
                        $amountBeforeRedemption = $bookWorth ? ( $bookWorth * $model->participations_amount ) : 0;
                    }
                }
                return number_format($amountBeforeRedemption, 2, ',', '');
            case 'bedrag':
                return number_format($model->payout, 2, ',', '');
                break;
            case 'uitkeren_op':
                return $model->payout_type;
                break;
            case 'datum_uitkeren':
                return $model->date_payout ? Carbon::parse($model->date_payout)->format('d-m-Y') : null;
                break;
            case 'energieleverancier':
                return $model->energy_supplier_name;
                break;
            case 'kwh':
                return $model->delivered_total;
                break;
            case 'teruggave_energiebelasting':
                return number_format($model->kwh_return, 2, ',', '');
                break;
            case 'energieleverancier_ean_elektra':
                return $model->energy_supplier_ean_electricity;
                break;
            case 'energieleverancier_nummer':
                return $model->energy_supplier_number;
                break;
            case 'opbrengst_kwh_euro':
                return $model->payout_kwh;
                break;
            default:
                return '';
                break;
        }
    }

    public static function getRevenuesKwhVar($model, $varname){
        $valuesStart = RevenueValuesKwh::where('revenue_id', $model->id)->where('date_registration', Carbon::parse($model->date_begin)->format('Y-m-d'))->first();
        $startKhw = $valuesStart ? $valuesStart->kwh_start : 0;

        $valuesEnd = RevenueValuesKwh::where('revenue_id', $model->id)->where('date_registration', Carbon::parse($model->date_end_last_confirmed_parts_kwh)->addDay()->format('Y-m-d'))->first();
        $endKhw = $valuesEnd ? $valuesEnd->kwh_start : 0;

        switch ($varname) {
            case 'status':
                switch ($model->status) {
                    case 'new':
                        return 'Nieuw';
                        break;
                    case 'concept':
                        return 'Concept';
                        break;
                    case 'confirmed':
                        return 'Definitief';
                        break;
                    case 'processed':
                        return 'Verwerkt';
                        break;
                    default:
                        return '**onbepaald**';
                        break;
                }
                break;
            case 'categorie':
                return $model->category->name;
                break;
            case 'project':
                return $model->project->name;
                break;
            case 'type_verdeling':
                return ProjectRevenueDistributionType::get('inPossessionOf') ? ProjectRevenueDistributionType::get('inPossessionOf')->name : '';
                break;
            case 'datum_definitief':
                return $model->date_confirmed ? Carbon::parse($model->date_confirmed)->format('d-m-Y') : null;
                break;
            case 'datum_uitkeren':
                return optional($model->last_parts_kwh)->date_payout ? Carbon::parse($model->last_parts_kwh->date_payout)->format('d-m-Y') : null;
                break;
            case 'kwh_start':
                return $startKhw;
                break;
            case 'kwh_eind':
                return $endKhw;
                break;
            case 'kwh_totaal':
                return $endKhw - $startKhw;
                break;
            case 'opbrengst_kwh_euro':
                return $model->payout_kwh;
                break;
            case 'beginperiode':
                return $model->date_begin ? Carbon::parse($model->date_begin)->format('d-m-Y') : null;
                break;
            case 'eindperiode':
                return $model->date_end ? Carbon::parse($model->date_end)->format('d-m-Y') : null;
                break;
            case 'teruggave':
                $payoutKwh = $model->payout_kwh ? $model->payout_kwh : 0;
                return number_format(($endKhw - $startKhw) * $payoutKwh, 2, ',', '');
                break;
            default:
                return '';
                break;
        }
    }

    public static function getRevenuePartsKwhVar($model, $varname){
        $valuesStart = RevenueValuesKwh::where('revenue_id', $model->revenue_id)->where('date_registration', Carbon::parse($model->date_begin)->format('Y-m-d'))->first();
        $startKhw = $valuesStart ? $valuesStart->kwh_start : 0;
        $valuesEnd = RevenueValuesKwh::where('revenue_id', $model->revenue_id)->where('date_registration', Carbon::parse($model->date_end)->addDay()->format('Y-m-d'))->first();
        $endKhw = $valuesEnd ? $valuesEnd->kwh_start : 0;

        switch ($varname) {
            case 'status':
                switch ($model->status) {
                    case 'new':
                        return 'Nieuw';
                        break;
                    case 'concept':
                        return 'Concept';
                        break;
                    case 'confirmed':
                        return 'Definitief';
                        break;
                    case 'processed':
                        return 'Verwerkt';
                        break;
                    default:
                        return '**onbepaald**';
                        break;
                }
                break;
            case 'project':
                return $model->revenuesKwh->project->name;
                break;
            case 'type_verdeling':
                return ProjectRevenueDistributionType::get('inPossessionOf') ? ProjectRevenueDistributionType::get('inPossessionOf')->name : '';
                break;
            case 'datum_definitief':
                return $model->date_confirmed ? Carbon::parse($model->date_confirmed)->format('d-m-Y') : null;
                break;
            case 'datum_uitkeren':
                return $model->date_payout ? Carbon::parse($model->date_payout)->format('d-m-Y') : null;
                break;
            case 'kwh_start':
                return $startKhw;
                break;
            case 'kwh_eind':
                return $endKhw;
                break;
            case 'kwh_totaal':
                return $endKhw - $startKhw;
                break;
            case 'opbrengst_kwh_euro':
                return $model->payout_kwh;
                break;
            case 'beginperiode':
                return $model->date_begin ? Carbon::parse($model->date_begin)->format('d-m-Y') : null;
                break;
            case 'eindperiode':
                return $model->date_end ? Carbon::parse($model->date_end)->format('d-m-Y') : null;
                break;
            case 'teruggave':
                $payoutKwh = $model->payout_kwh ? $model->payout_kwh : 0;
                return number_format(($endKhw - $startKhw) * $payoutKwh, 2, ',', '');
                break;
            default:
                return '';
                break;
        }
    }

    public static function getRevenueDistributionKwhVar($model, $varname){
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
                switch ($model->status) {
                    case 'new':
                        return 'Nieuw';
                        break;
                    case 'concept':
                        return 'Concept';
                        break;
                    case 'confirmed':
                        return 'Definitief';
                        break;
                    case 'processed':
                        return 'Verwerkt';
                        break;
                    default:
                        return '**onbepaald**';
                        break;
                }
                break;
            case 'participaties':
//                return $model->participations_quantity;
                return $model->participations_quantity_last_confirmed_parts_kwh;
                break;
            case 'energieleverancier':
                $esNames = implode(',', array_unique($model->distributionPartsKwh()
                    ->where(function ($query) {
                        $query->whereNotNull('energy_supplier_name')
                            ->orWhere('energy_supplier_name', '!=', '');
                    })
                    ->pluck('energy_supplier_name')->toArray()));
                return $esNames;
                break;
            case 'kwh':
//                return $model->delivered_total_string;
                return $model->delivered_total_confirmed_string;
                break;
            case 'teruggave_energiebelasting':
                return number_format($model->kwh_return, 2, ',', '');
                break;
            case 'energieleverancier_ean_elektra':
                return $model->energy_supplier_ean_electricity;
                break;
            case 'energieleverancier_nummer':
                $esNumbers = implode(',', array_unique($model->distributionPartsKwh()
                    ->where(function ($query) {
                        $query->whereNotNull('energy_supplier_number')
                            ->orWhere('energy_supplier_number', '!=', '');
                    })
                    ->pluck('energy_supplier_number')->toArray()));
                return $esNumbers;
                break;
            case 'begindatum':
                return $model->revenuesKwh->date_begin ? Carbon::parse($model->revenuesKwh->date_begin)->format('d-m-Y') : null;
                break;
            case 'einddatum':
//                return $model->revenuesKwh->date_end ? Carbon::parse($model->revenuesKwh->date_end)->format('d-m-Y') : null;
                return $model->date_end_last_confirmed_parts_kwh ? Carbon::parse($model->date_end_last_confirmed_parts_kwh)->format('d-m-Y') : null;
                break;
            case 'opbrengst_kwh_euro':
                return $model->revenuesKwh->payout_kwh;
                break;
            default:
                return '';
                break;
        }
    }

    public static function getRevenueDistributionPartsKwhVar($model, $varname){
        switch ($varname) {
            case 'adres':
                return $model->distributionKwh->address;
                break;
            case 'postcode':
                return $model->distributionKwh->postal_code;
                break;
            case 'woonplaats':
                return $model->distributionKwh->city;
                break;
            case 'status':
                switch ($model->status) {
                    case 'new':
                        return 'Nieuw';
                        break;
                    case 'concept':
                        return 'Concept';
                        break;
                    case 'confirmed':
                        return 'Definitief';
                        break;
                    case 'processed':
                        return 'Verwerkt';
                        break;
                    default:
                        return '**onbepaald**';
                        break;
                }
                break;
            case 'participaties':
                return $model->participations_quantity;
                break;
            case 'energieleverancier':
                return optional($model->energySupplier)->name;
                break;
            case 'kwh':
//                return $model->delivered_total_string;
                return $model->not_reported_delivered_kwh_string;
                break;
            case 'kwh_totaal':
                $dateBegin = $model->not_reported_date_begin ? $model->not_reported_date_begin : null;
                $dateEnd = $model->partsKwh->date_end ? $model->partsKwh->date_end : null;
                $kwhTotaal = 0;
                if($dateBegin && $dateEnd){
                    $valuesStart = RevenueValuesKwh::where('revenue_id', $model->revenue_id)->where('date_registration', Carbon::parse($dateBegin)->format('Y-m-d'))->first();
                    $startKhw = $valuesStart ? $valuesStart->kwh_start : 0;
                    $valuesEnd = RevenueValuesKwh::where('revenue_id', $model->revenue_id)->where('date_registration', Carbon::parse($dateEnd)->addDay()->format('Y-m-d'))->first();
                    $endKhw = $valuesEnd ? $valuesEnd->kwh_start : 0;
                    $kwhTotaal = $endKhw - $startKhw;
                }
                return $kwhTotaal;
                break;
            case 'teruggave_energiebelasting':
//                return number_format($model->kwh_return, 2, ',', '');
                return $model->not_reported_kwh_return_string;
                break;
            case 'energieleverancier_ean_elektra':
                return $model->distributionKwh->energy_supplier_ean_electricity;
                break;
            case 'energieleverancier_nummer':
                return $model->energy_supplier_number;
                break;
            case 'begindatum':
                return $model->not_reported_date_begin ? Carbon::parse($model->not_reported_date_begin)->format('d-m-Y') : null;
                break;
            case 'einddatum':
                return $model->partsKwh->date_end ? Carbon::parse($model->partsKwh->date_end)->format('d-m-Y') : null;
                break;
            case 'opbrengst_kwh_euro':
                return $model->partsKwh->payout_kwh;
                break;
            default:
                return '';
                break;
        }
    }

    public static function getCampaignVar($model, $varname){
        switch ($varname) {
            case 'naam':
                return $model->name;
                break;
            case 'begindatum':
                return $model->start_date ? Carbon::parse($model->start_date)->format('d-m-Y') : null;
                break;
            case 'einddatum':
                return $model->end_date ? Carbon::parse($model->end_date)->format('d-m-Y') : null;
                break;
            case 'omschrijving':
                return $model->description;
                break;
            case 'aangeboden_maatregelen':
                return $model->name;
                break;
            default:
                return '';
                break;
        }
    }
    
    public static function getHousingFileVar($model, $varname){
        switch ($varname) {
            case 'woningtype':
                return optional($model->buildingType)->name;
                break;
            case 'gebruikersoppervlakte':
                return $model->surface;
                break;
            case 'bouwjaar':
                return $model->build_year;
                break;
            case 'daktype':
                return optional($model->roofType)->name;
                break;
            case 'energielabel':
                return optional($model->energyLabel)->name;
                break;
            case 'status_energielabel':
                return optional($model->energyLabelStatus)->name;
                break;
            case 'aantal_bouwlagen':
                return $model->floors;
                break;
            case 'monument':
                return $model->is_monument ? 'Ja' : 'Nee';
                break;
            case 'koophuis':
                return $model->is_house_for_sale ? 'Ja' : 'Nee';
                break;
            default:
                return '';
                break;
        }
    }

    public static function getQuotationRequestVar($model, $varname){
        switch ($varname) {
            case 'id':
                return $model->id;
                break;
            case 'id_encrypted':
                return Crypt::encrypt($model->id);
                break;
            case 'organisatie_naam':
                return optional(optional($model->organisationOrCoach)->organisation)->name;
                break;
            case 'organisatie_statutaire_naam':
                return optional(optional($model->organisationOrCoach)->organisation)->statutory_name;
                break;
            case 'organisatie_adres':
                return optional(optional($model->organisationOrCoach)->primaryAddress)->street . ' ' . optional(optional($model->organisationOrCoach)->primaryAddress)->number . (optional(optional($model->organisationOrCoach)->primaryAddress)->addition ? ('-' . optional(optional($model->organisationOrCoach)->primaryAddress)->addition) : '');
                break;
            case 'organisatie_plaats':
                return optional(optional($model->organisationOrCoach)->primaryAddress)->city;
                break;
            case 'organisatie_email':
                return optional(optional($model->organisationOrCoach)->primaryEmailAddress)->email;
                break;
            case 'organisatie_telefoonnummer':
                return optional(optional($model->organisationOrCoach)->primaryPhoneNumber)->number;
                break;
            case 'organisatie_primair_contact':
                return optional(optional(optional($model->organisationOrCoach)->contactPerson)->contact)->full_name_fnf;
                break;
            case 'organisatie_primair_contact_voornaam':
                if(optional(optional(optional($model->organisationOrCoach)->contactPerson)->contact)->type_id == 'person'){
                    return optional(optional(optional($model->organisationOrCoach)->contactPerson)->contact)->person->first_name;
                }
                elseif(optional(optional(optional($model->organisationOrCoach)->contactPerson)->contact)->type_id == 'organisation'){
                    return '';
                }
                break;
            case 'organisatie_primair_contact_achternaam':
                if(optional(optional(optional($model->organisationOrCoach)->contactPerson)->contact)->type_id == 'person'){
                    $prefix = optional(optional(optional($model->organisationOrCoach)->contactPerson)->contact)->person->last_name_prefix;
                    return $prefix ? $prefix . ' ' . optional(optional(optional($model->organisationOrCoach)->contactPerson)->contact)->person->last_name : optional(optional(optional($model->organisationOrCoach)->contactPerson)->contact)->person->last_name;
                }
                elseif(optional(optional(optional($model->organisationOrCoach)->contactPerson)->contact)->type_id == 'organisation'){
                    return optional(optional(optional($model->organisationOrCoach)->contactPerson)->contact)->full_name;
                }
                break;
            case 'organisatie_of_coach_naam':
                return optional($model->organisationOrCoach)->full_name_fnf;
                break;
            case 'organisatie_of_coach_voornaam':
                if(optional($model->organisationOrCoach)->type_id == 'person'){
                    return optional($model->organisationOrCoach)->first_name;
                }
                elseif(optional($model->organisationOrCoach)->type_id == 'organisation'){
                    return '';
                }
                break;
            case 'organisatie_of_coach_achternaam':
                if(optional($model->organisationOrCoach)->type_id == 'person'){

                    $prefix = optional($model->organisationOrCoach)->last_name_prefix;
                    return $prefix ? $prefix . ' ' . optional($model->organisationOrCoach)->last_name : optional($model->organisationOrCoach)->last_name;
                }
                elseif(optional($model->organisationOrCoach)->type_id == 'organisation'){
                    return optional($model->organisationOrCoach)->full_name;
                }
                break;
            case 'organisatie_of_coach_adres':
                return optional(optional($model->organisationOrCoach)->primaryAddress)->street . ' ' . optional(optional($model->organisationOrCoach)->primaryAddress)->number . (optional(optional($model->organisationOrCoach)->primaryAddress)->addition ? ('-' . optional(optional($model->organisationOrCoach)->primaryAddress)->addition) : '');
                break;
            case 'organisatie_of_coach_plaats':
                return optional(optional($model->organisationOrCoach)->primaryAddress)->city;
                break;
            case 'organisatie_of_coach_email':
                return optional(optional($model->organisationOrCoach)->primaryEmailAddress)->email;
                break;
            case 'organisatie_of_coach_telefoonnummer':
                return optional(optional($model->organisationOrCoach)->primaryPhoneNumber)->number;
                break;

            case 'projectmanager_naam':
                return optional($model->projectManager)->full_name_fnf;
                break;
            case 'projectmanager_voornaam':
                return optional($model->projectManager)->first_name;
                break;
            case 'projectmanager_achternaam':
                $prefix = optional($model->projectManager)->last_name_prefix;
                return $prefix ? $prefix . ' ' . optional($model->projectManager)->last_name : optional($model->projectManager)->last_name;
                break;
            case 'projectmanager_adres':
                return optional(optional($model->projectManager)->primaryAddress)->street . ' ' . optional(optional($model->projectManager)->primaryAddress)->number . (optional(optional($model->projectManager)->primaryAddress)->addition ? ('-' . optional(optional($model->projectManager)->primaryAddress)->addition) : '');
                break;
            case 'projectmanager_plaats':
                return optional(optional($model->projectManager)->primaryAddress)->city;
                break;
            case 'projectmanager_email':
                return optional(optional($model->projectManager)->primaryEmailAddress)->email;
                break;
            case 'projectmanager_telefoonnummer':
                return optional(optional($model->projectManager)->primaryPhoneNumber)->number;
                break;

            case 'externe_partij_naam':
                return optional($model->externalParty)->full_name_fnf;
                break;
            case 'externe_partij_voornaam':
                return optional($model->externalParty)->first_name;
                break;
            case 'externe_partij_achternaam':
                $prefix = optional($model->externalParty)->last_name_prefix;
                return $prefix ? $prefix . ' ' . optional($model->externalParty)->last_name : optional($model->externalParty)->last_name;
                break;
            case 'externe_partij_adres':
                return optional(optional($model->externalParty)->primaryAddress)->street . ' ' . optional(optional($model->externalParty)->primaryAddress)->number . (optional(optional($model->externalParty)->primaryAddress)->addition ? ('-' . optional(optional($model->externalParty)->primaryAddress)->addition) : '');
                break;
            case 'externe_partij_plaats':
                return optional(optional($model->externalParty)->primaryAddress)->city;
                break;
            case 'externe_partij_email':
                return optional(optional($model->externalParty)->primaryEmailAddress)->email;
                break;
            case 'externe_partij_telefoonnummer':
                return optional(optional($model->externalParty)->primaryPhoneNumber)->number;
                break;

            case 'contact_naam':
            case 'verzoek_voor_naam':
                return optional(optional($model->opportunity)->intake)->contact->full_name_fnf;
                break;
            case 'verzoek_voor_titel':
                return optional(optional(optional($model->opportunity->intake->contact)->person)->title)->name;
                break;
            case 'verzoek_voor_voornaam':
                return optional(optional($model->opportunity->intake->contact)->person)->first_name;
                break;
            case 'verzoek_voor_achternaam':
                if(optional($model->opportunity->intake->contact)->type_id == 'person'){
                    $prefix = $model->opportunity->intake->contact->person->last_name_prefix;
                    return $prefix ? $prefix . ' ' . $model->opportunity->intake->contact->person->last_name : $model->opportunity->intake->contact->person->last_name;
                }
                elseif($model->type_id == 'organisation'){
                    return optional($model->opportunity->intake->contact)->full_name;
                }
                break;
            case 'contact_adres':
            case 'verzoek_voor_adres':
                return optional(optional(optional($model->opportunity)->intake)->contact->primaryAddress)->street . ' ' . optional(optional(optional($model->opportunity)->intake)->contact->primaryAddress)->number . (optional(optional(optional($model->opportunity)->intake)->contact->primaryAddress)->addition ? ('-' . optional(optional(optional($model->opportunity)->intake)->contact->primaryAddress)->addition) : '');
                break;
            case 'contact_postcode':
            case 'verzoek_voor_postcode':
                return optional(optional(optional($model->opportunity)->intake)->contact->primaryAddress)->postal_code;
                break;
            case 'contact_plaats':
            case 'contact_woonplaats':
            case 'verzoek_voor_plaats':
                return optional(optional(optional($model->opportunity)->intake)->contact->primaryAddress)->city;
                break;
            case 'contact_email':
            case 'verzoek_voor_email':
                return optional(optional(optional($model->opportunity)->intake)->contact->primaryEmailAddress)->email;
                break;
            case 'contact_telefoonnummer':
            case 'verzoek_voor_telefoon':
                return optional(optional(optional($model->opportunity)->intake)->contact->primaryPhoneNumber)->number;
                break;
            case 'datum_opname':
                return $model->date_recorded ? Carbon::parse($model->date_recorded)->format('d-m-Y') : null;
                break;
            case 'uitgebracht':
                return $model->date_released ? Carbon::parse($model->date_released)->format('d-m-Y') : null;
                break;
            case 'maatregel':
            case 'maatregel_categorie':
                return optional(optional($model->opportunity)->measureCategory)->name;
                break;
            case 'maatregel_specifiek':
                return implode(', ', optional(optional($model->opportunity)->measures)->pluck('name' )->toArray() );
                break;
            case 'interesses':
                return implode(', ', optional(optional($model->opportunity)->intake)->measuresRequested->pluck('name' )->toArray() );
                break;
            case 'interesses_tabel':
                $tabel = "
                <table style='width:auto; border-collapse: collapse;'>
                  <tr>
                    <th style='border: 1px solid #000000; text-align: left; padding: 8px; background-color: #dddddd;'>Interesses</th>
                </tr>";
                foreach($model->opportunity->intake->measuresRequested as $measureRequested){
                    $tabel .= "
                    <tr>
                      <td style='border: 1px solid #000000; text-align: left; padding: 8px; font-weight: normal'>" . ( $measureRequested->name ? $measureRequested->name : '' ) . "</td>
                    </tr>";
                }
                $tabel .= "</table>";
                return $tabel;
                break;
            case 'opmerkingen_bewoner':
                return optional(optional($model->opportunity)->intake)->note;
                break;
            case 'offertetekst':
            case 'tekst':
            case 'toelichting':
            case 'maatregel_toelichting':
                return $model->quotation_text;
                break;
            case 'gemaakt_op':
                return $model->created_at ? Carbon::parse($model->created_at)->format('d-m-Y') : null;
                break;
            case 'gemaakt_door':
                return optional(optional($model->createdBy)->present())->fullName();
                break;
            case 'datum_afspraak':
                return $model->date_planned ? Carbon::parse($model->date_planned)->format('d-m-Y H:i') : null;
                break;
//            verwijderd ivm dubbele case, dit is de tweede dus zou nooit aangeroepen kunnen worden. verschil met de andere case is H:i in de format
//            case 'datum_opname':
//                return $model->date_recorded ? Carbon::parse($model->date_recorded)->format('d-m-Y H:i') : null;
//                break;
            case 'datum_uitgebracht':
                return $model->date_released ? Carbon::parse($model->date_released)->format('d-m-Y H:i') : null;
                break;
            case 'datum_akkoord_extern':
                return $model->date_approved_external ? Carbon::parse($model->date_approved_external)->format('d-m-Y') : null;
                break;
            case 'datum_akkoord_projectleider':
                return $model->date_approved_project_manager ? Carbon::parse($model->date_approved_project_manager)->format('d-m-Y') : null;
                break;
            case 'datum_akkoord_bewoner':
                return $model->date_approved_client ? Carbon::parse($model->date_approved_client)->format('d-m-Y') : null;
                break;
            case 'datum_uitgevoerd':
                return $model->date_executed ? Carbon::parse($model->date_executed)->format('d-m-Y') : null;
                break;
            case 'bedrag':
            case 'offerte_bedrag':
                return number_format( ($model->quotation_amount ? $model->quotation_amount : 0), 2, ',', '' );
                break;
            case 'opmerking_organisatie_of_coach':
                return $model->coach_or_organisation_note ? $model->coach_or_organisation_note : '';
                break;
            case 'opmerking_projectmanager':
                return $model->externalparty_note ? $model->projectmanager_note : '';
                break;
            case 'opmerking_externe_partij':
                return $model->externalparty_note ? $model->externalparty_note : '';
                break;
            case 'opmerking_bewoner':
                return $model->client_note ? $model->client_note : '';
                break;
            case 'status':
                return $model->status ? $model->status->name : '';
                break;
            case 'actie_op_kans':
                return $model->opportunityAction ? $model->opportunityAction->name : '';
                break;
            default:
                return '';
                break;
        }
    }

    public static function getOrderVar($model, $varname)
    {
        switch ($varname) {
            case 'nummer':
                return $model->number;
                break;
            case 'onderwerp':
                return $model->subject;
                break;
            case 'prijs':
                return number_format($model->total_price_incl_vat, 2, ',', '');
                break;
            case 'prijs_per_jaar':
                return number_format($model->total_price_incl_vat_per_year, 2, ',', '');
                break;
            case 'datum_aangevraagd':
                return $model->date_requested ? Carbon::parse($model->date_requested)->format('d-m-Y') : null;
                break;
            case 'gemaakt_op':
                return $model->created_at ? Carbon::parse($model->created_at)->format('d-m-Y') : null;
                break;
            case 'status':
                return $model->getStatus() ? $model->getStatus()->name : '';
                break;
            case 'betaalwijze':
                return $model->getPaymentType() ? $model->getPaymentType()->name : '';
                break;
            case 'incasso_frequentie':
                return $model->getCollectionFrequency() ? $model->getCollectionFrequency()->name : '';
                break;
            case 'contact_naam':
                if ($model->contact->type_id == 'person') {
                    $prefix = $model->contact->person->last_name_prefix;
                    return $prefix ? $model->contact->person->first_name . ' ' . $prefix . ' ' . $model->contact->person->last_name : $model->contact->person->first_name . ' ' . $model->contact->person->last_name;
                } elseif ($model->contact->type_id == 'organisation') {
                    return $model->contact->full_name;
                }
                break;
            case 'contact_naam_officieel':
                if ($model->contact->type_id == 'person') {
                    $initials = $model->contact->person->initials ? $model->contact->person->initials : ($model->contact->person->first_name ? substr($model->contact->person->first_name, 0, 1) . "." : "");
                    $prefix = $model->contact->person->last_name_prefix;
                    return $prefix ? $initials . ' ' . $prefix . ' ' . $model->contact->person->last_name : $initials . ' ' . $model->contact->person->last_name;
                } elseif ($model->contact->type_id == 'organisation') {
                    return $model->contact->full_name;
                }
                break;

            case 'contact_voornaam':
                if ($model->contact->type_id == 'person') {
                    return $model->contact->person->first_name;
                } elseif ($model->contact->type_id == 'organisation') {
                    return '';
                }
                break;
            case 'contact_achternaam':
                if ($model->contact->type_id == 'person') {
                    $prefix = $model->contact->person->last_name_prefix;
                    return $prefix ? $prefix . ' ' . $model->contact->person->last_name : $model->contact->person->last_name;
                } elseif ($model->contact->type_id == 'organisation') {
                    return $model->contact->full_name;
                }
                break;
            case 'contact_adres':
                return optional($model->contact->primaryAddress)->street . ' ' . optional($model->contact->primaryAddress)->number . (optional($model->contact->primaryAddress)->addition ? ('-' . optional($model->contact->primaryAddress)->addition) : '');
                break;
            case 'contact_postcode':
                return optional($model->contact->primaryAddress)->postal_code;
                break;
            case 'contact_plaats':
                return optional($model->contact->primaryAddress)->city;
                break;
            default:
                return '';
                break;
        }
    }

    public static function getInvoiceVar($model, $varname){
        $projectTypeCodeRef = optional(optional(optional(optional($model->order)->participation)->project)->projectType)->code_ref;

        switch ($varname) {
            case 'mollie_link':
                if(!$model->exists){
                    /**
                     * Factuur is nog niet opgeslagen in database, link dus nog niet beschikbaar.
                     * Tijdelijke melding weergeven ipv link.
                     */
                    return '&lt;Online_betaallink_new&gt;';
                }

                /**
                 * Geen Mollie link als de gekoppelde administratie geen Mollie
                 * koppeling heeft of als het bedrag 0 of negatief is.
                 */
                if(!$model->administration->uses_mollie || $model->total_incl_vat_incl_reduction <= 0){
                    return '';
                }

                return $model->econobis_payment_link;
            case 'deelname_aantal_toegekend':
                return optional(optional($model->order)->participation)->participations_granted;
            break;
            case 'deelname_bedrag_toegekend':
                if ($projectTypeCodeRef == 'loan') {
                    $amount = number_format( optional(optional($model->order)->participation)->amount_granted, 2, ',', '.' );
                } else {
                    $amount = number_format(( optional(optional($model->order)->participation)->participations_granted * optional(optional(optional($model->order)->participation)->project)->currentBookWorth() ), 2, ',', '.');
                }
                return $amount;
            break;
            case 'nummer':
                return $model->number;
            case 'betreft':
                return $model->subject;
            case 'iban':
                return $model->order->contact->iban;
            case 'iban_tnv':
                return $model->order->contact->iban_attn;
            case 'totaal_incl_btw':
                return number_format($model->total_incl_vat_incl_reduction, 2, ',', '.');
            case 'datum':
                if( $model->invoice_number == 0){
                    return "Nog niet bekend";
                }
                return $model->date_sent ? Carbon::parse($model->date_sent)->isoFormat('D MMMM YYYY') : null;
            default:
                return '';
        }
    }

    public static function getAdministrationVar($model, $varname){
        switch ($varname) {
            case 'naam':
                return $model->name;
                break;
            case 'adres':
                return $model->address;
                break;
            case 'postcode':
                return $model->postal_code;
                break;
            case 'kvk':
                return $model->kvk_number;
                break;
            case 'btwnr':
                return $model->btw_number;
                break;
            case 'bic':
                return $model->bic;
                break;
            case 'email':
                return $model->email;
                break;
            case 'website':
                return $model->website;
                break;
            case 'plaats':
                return $model->city;
                break;
            case 'iban_tnv':
                return $model->iban_attn;
                break;
            case 'iban':
                return $model->IBAN;
                break;
            case 'logo':
                $img = '';
                if ($model->logo_filename) {
                    $path = storage_path('app' . DIRECTORY_SEPARATOR . 'administrations' . DIRECTORY_SEPARATOR . $model->logo_filename);
                    $logo = file_get_contents($path);

                    $src = 'data:' . mime_content_type($path)
                        . ';charset=binary;base64,' . base64_encode($logo);
                    $src = str_replace(" ", "", $src);
                    $img = '<img src="' . $src . '" style="width:auto; height:156px;" alt="logo"/>';
                }
                return $img;
                break;
            default:
                return '';
                break;
        }
    }
    public static function getFinancialOverviewContactVar ($model, $varname){
        switch ($varname) {
            case 'belastingjaar':
                return $model->financialOverview->year;
                break;
            default:
                return '';
                break;
        }
    }

    static public function replaceTemplatePortalVariables($html_body, $var_prefix){
        $regex = "/{" . $var_prefix . "_(\S*?)}/";
        if (preg_match_all($regex, $html_body, $m)) {
            foreach ($m[1] as $i => $var_name) {
                $html_body = str_replace($m[0][$i], TemplateVariableHelper::getPortalVar($var_name), $html_body);
            }
        }
        return $html_body;
    }

    public static function getPortalVar($varname){
        $portalUrl = PortalSettings::get('portalUrl');
        $portalName = PortalSettings::get('portalName');
        $pcrPowerKwhConsumptionPercentage = PortalSettings::get('pcrPowerKwhConsumptionPercentage');
        $pcrGeneratingCapacityOneSolorPanel = PortalSettings::get('pcrGeneratingCapacityOneSolorPanel');

        switch ($varname) {
            case 'url':
                return $portalUrl;
                break;
            case 'naam':
                return $portalName;
                break;
            case 'advies_percentage_dekking_zonnepanelen':
                return $pcrPowerKwhConsumptionPercentage;
                break;
            case 'capaciteit_van_een_zonnepaneel':
                return $pcrGeneratingCapacityOneSolorPanel;
                break;
            default:
                return '';
                break;
        }
    }

    static public function replaceTemplateCooperativeVariables($html_body, $var_prefix){
        $regex = "/{" . $var_prefix . "_(\S*?)}/";
        if (preg_match_all($regex, $html_body, $m)) {
            foreach ($m[1] as $i => $var_name) {
                $html_body = str_replace($m[0][$i], TemplateVariableHelper::getCooperativeVar($var_name), $html_body);
            }
        }
        return $html_body;
    }

    public static function getCooperativeVar($varname){
        $cooperativePortalName = PortalSettings::get('portalName');
        $cooperativeName = PortalSettings::get('cooperativeName');
        $cooperativeWebsite = PortalSettings::get('portalWebsite');

        switch ($varname) {
            case 'portal_naam':
                return $cooperativePortalName;
                break;
            case 'naam':
                return $cooperativeName;
                break;
            case 'website':
                return $cooperativeWebsite;
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
        $document->load('contact', 'order', 'contactGroup', 'opportunity', 'intake', 'sentBy', 'campaign', 'housingFile', 'quotationRequest', 'measure', 'task', 'project', 'participant');

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
        $html = TemplateVariableHelper::replaceTemplateVariables($html, 'kansactie', $document->quotationRequest);
        $html = TemplateVariableHelper::replaceTemplateVariables($html, 'maatregel', $document->measure);
        $html = TemplateVariableHelper::replaceTemplateVariables($html, 'taak', $document->task);
        $html = TemplateVariableHelper::replaceTemplateVariables($html, 'project', $document->project);
        $html = TemplateVariableHelper::replaceTemplateVariables($html, 'deelname', $document->participant);
        if($document->participant)
        {
            $html = TemplateVariableHelper::replaceTemplateVariables($html, 'mutaties', $document->participant->mutations);
        }
        $html = TemplateVariableHelper::replaceTemplateVariables($html, 'order', $document->order);
        // Er bestaat nog geen relatie tussen document en invoice
//        $html = TemplateVariableHelper::replaceTemplateVariables($html, 'nota', $document->invoice);

        //Als laatste verwijder alle niet bestaande tags
        $html = TemplateVariableHelper::stripRemainingVariableTags($html);

        return $html;
    }
}