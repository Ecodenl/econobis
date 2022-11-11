<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 12-09-2018
 * Time: 16:10
 */

namespace App\Http\Controllers\Api\Webform;


use App\Eco\Address\Address;
use App\Eco\Address\AddressEnergyConsumptionElectricity;
use App\Eco\Address\AddressEnergyConsumptionGas;
use App\Eco\Address\AddressType;
use App\Eco\Campaign\Campaign;
use App\Eco\Contact\Contact;
use App\Eco\ContactGroup\ContactGroup;
use App\Eco\ContactNote\ContactNote;
use App\Eco\Cooperation\Cooperation;
use App\Eco\Country\Country;
use App\Eco\EmailAddress\EmailAddress;
use App\Eco\AddressEnergySupplier\AddressEnergySupplier;
use App\Eco\EnergySupplier\EnergySupplierStatus;
use App\Eco\EnergySupplier\EnergySupplierType;
use App\Eco\EnergySupplier\EnergySupplier;
use App\Eco\HousingFile\BuildingType;
use App\Eco\HousingFile\EnergyLabel;
use App\Eco\HousingFile\EnergyLabelStatus;
use App\Eco\HousingFile\HousingFile;
use App\Eco\HousingFile\RoofType;
use App\Eco\Intake\Intake;
use App\Eco\Intake\IntakeReason;
use App\Eco\Intake\IntakeSource;
use App\Eco\Intake\IntakeStatus;
use App\Eco\Measure\Measure;
use App\Eco\Measure\MeasureCategory;
use App\Eco\Occupation\OccupationContact;
use App\Eco\Opportunity\Opportunity;
use App\Eco\Opportunity\OpportunityStatus;
use App\Eco\Order\Order;
use App\Eco\Order\OrderCollectionFrequency;
use App\Eco\Order\OrderPaymentType;
use App\Eco\Order\OrderProduct;
use App\Eco\Order\OrderStatus;
use App\Eco\Organisation\Organisation;
use App\Eco\ParticipantMutation\ParticipantMutation;
use App\Eco\ParticipantMutation\ParticipantMutationStatus;
use App\Eco\ParticipantMutation\ParticipantMutationType;
use App\Eco\ParticipantProject\ParticipantProject;
use App\Eco\ParticipantProject\ParticipantProjectPayoutType;
use App\Eco\Person\Person;
use App\Eco\PhoneNumber\PhoneNumber;
use App\Eco\Product\Product;
use App\Eco\Project\Project;
use App\Eco\Task\Task;
use App\Eco\Task\TaskProperty;
use App\Eco\Task\TaskPropertyValue;
use App\Eco\Task\TaskType;
use App\Eco\Team\Team;
use App\Eco\Title\Title;
use App\Eco\User\User;
use App\Eco\Webform\Webform;
use App\Helpers\Address\AddressHelper;
use App\Helpers\ContactGroup\ContactGroupHelper;
use App\Helpers\Laposta\LapostaMemberHelper;
use App\Helpers\Workflow\IntakeWorkflowHelper;
use App\Helpers\Workflow\TaskWorkflowHelper;
use App\Http\Controllers\Api\AddressEnergySupplier\AddressEnergySupplierController;
use App\Http\Controllers\Api\Contact\ContactController;
use App\Http\Controllers\Controller;
use App\Notifications\WebformRequestProcessed;
use Carbon\Carbon;
use CMPayments\IBAN;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Notification;
use Illuminate\Support\Facades\Response;

class ExternalWebformController extends Controller
{

    protected $logs = [];

    /**
     * Het contact record aangemaakt of gevonden.
     * Bij dit contact wordt eventueel nog hoomdossier aanmaken.
     * Voor taskToContact hebben we dan ook intake en housingFile nodig (indien aangemaakt).
     * @var Contact|null
     */
    protected $contact = null;
    protected $responsibleIds = [];
    protected $intake = null;
    protected $housingFile = null;

    /**
     * Het address record aangemaakt of gevonden obv postcode en huisnummer.
     * Aan dit address worden eventuele andere gegevens gekoppeld die op adres niveau gekoppeld moeten worden.
     * @var null
     */
    protected $address = null;

    /**
     * Array om meldingen in op te slaan die uiteindelijk in de taak omschrijving moeten worden toegevoegd.
     * @var array
     */
    protected $taskErrors = [];

    /**
     * Als er een group is gevonden en de contact aan een group gekoppeld kon worden moet deze groep ook aan de taak worden gekoppeld.
     * Om heen en weer sturen van deze Group tussen functies te voorkomen deze maar in de class opgeslagen.
     *
     * @var ContactGroup|null
     */
    protected $contactGroup = null;
    protected $contactGroups = null;

    /**
     * Als er een kans is gemaakt bij een intake, dan moet deze kans ook aan de taak worden gekoppeld.
     * Om heen en weer sturen van deze Opportunity tussen functies te voorkomen deze maar in de class opgeslagen.
     *
     * @var Opportunity|null
     */
    protected $opportunityForTask = null;

    /**
     * Het gevonden webform hebben we op nog een aantal plekken nodig, daarom in class opslaan
     * @var Webform|null
     */
    protected $webform = null;

    private $contactActie = null;
    private $newContactCreated = false;
    private $contactIdToEmailNewContactToGroup = null;
    private $processEmailNewContactToGroup = false;

    private $newTaskToEmail = [];
    private $processWorkflowEmailNewTask = false;

    public function post(string $apiKey, Request $request)
    {
        $data = $this->getDataFromRequest($request);
        $createHoomDossier = (bool)$data['contact']['create_hoom_dossier'];
        $this->responsibleIds = $data['responsible_ids'];
        $this->newTaskToEmail = [];
        $this->processWorkflowEmailNewTask = false;

        try {
            \DB::transaction(function () use ($request, $apiKey, $data ) {
                $this->doPost($apiKey, $request, $data);
            });
        } catch (WebformException $e) {
            // Er is een bewuste fout vanuit het verwerken van de aanroep onstaan
            // Deze kan worden weergegeven in het log.
            // Doordat er een fout is ontstaan tijdens de transaction, worden alle DB wijzigingen teruggedraaid.
            $this->log('Fout opgetreden: ' . $e->getMessage());
            $this->log('Gehele API aanroep is ongedaan gemaakt!');

            // Log wegschrijven naar laravel logbestand
            $this->logInfo();

            // Log emailen naar verantwoordelijke(n)
            $this->mailLog($request->all(), false, $this->webform);

            // Logregels weegeven ter info voor degene die de functie aanroept
            return Response::json($this->logs, $e->getStatusCode());
        } catch (\Exception $e) {
            // Er is een onbekende fout opgetreden, dit is een systeemfout en willen we dus niet weergeven.
            // Log dus aanvullen met 'Onbekende fout'
            // Doordat er een fout is ontstaan tijdens de transaction, worden alle DB wijzigingen teruggedraaid.
            $this->log('Onbekende fout opgetreden.');
            $this->log('Gehele API aanroep is ongedaan gemaakt!');

            // Log wegschrijven naar laravel logbestand
            $this->logInfo();

            // Exception onderwater raporteren zonder 'er uit te klappen'
            // Zo is de error terug te vinden in de logs en evt Slack
            report($e);
            $this->log('Error is gerapporteerd.');

            // Log emailen naar verantwoordelijke(n)
            $this->mailLog($request->all(), false, $this->webform);

            // Logregels weegeven ter info voor degene die de functie aanroept
            return Response::json($this->logs, 500);
        }

        $this->log('Aanroep succesvol afgerond tot nu toe. Eventueel verwerken van deelname, order, taak en aanmaak Hoomdossier volgen nog.');

        $participation = $this->addParticipationToContact($this->contact, $data['participation'], $this->webform);
        $order = $this->addOrderToContact($this->contact, $data['order']);
        $this->addTaskToContact($this->contact, $data['responsible_ids'], $data['task'], $this->webform, $this->intake, $this->housingFile, $participation, $order);

        // evt nog Hoomdossier aanmaken indien van toepassing
        if ($createHoomDossier) {
            $this->createHoomDossier();
        }

        // evt nog ProcessEmailNewContactToGroup uitvoeren
        if ($this->processEmailNewContactToGroup) {
            $this->doProcessEmailNewContactToGroup($data['contact']);
        }

        // evt nog processWorkflowEmailNewTask uitvoeren
        if ($this->processWorkflowEmailNewTask) {
            foreach ($this->newTaskToEmail as $newTaskId){
                $newTask = Task::find($newTaskId);
                if ($newTask && $newTask->type && $newTask->type->uses_wf_new_task) {
                    $taskWorkflowHelper = new TaskWorkflowHelper($newTask);
                    $processed = $taskWorkflowHelper->processWorkflowEmailNewTask();
                    if($processed)
                    {
                        $this->log('Nieuwe taak (id: ' . $newTask->id . ') gemaild aan verantwoordelijke.');
                        $newTask->date_sent_wf_new_task =  Carbon::now();
                        $newTask->save();
                    } else {
                        $this->log('Nieuwe taak (id: ' . $newTask->id . ') NIET gemaild aan verantwoordelijke.');
                    }
                }

            }
        }


        $this->logInfo();
        return Response::json($this->logs);
    }

    protected function doPost(string $apiKey, Request $request, $data)
    {
        // Geëncrypte strings kunnen variëren, daarom alle models ophalen en op gedecrypte key filteren
        $webform = Webform::all()->first(function ($webform) use ($apiKey) {
            if ($webform->api_key != $apiKey) return false;
            if ($webform->date_start && $webform->date_start->gt((new Carbon())->startOfDay())) return false;
            if ($webform->date_end && $webform->date_end->lt((new Carbon())->startOfDay())) return false;
            return true;
        });
        if (!$webform) {
            $this->log('Webform met code ' . $apiKey . ' is niet gevonden.');
            $this->error('Webform not found', 404);
        } else {
            $this->webform = $webform;
            $this->log('Webform met id ' . $webform->id . ' gevonden bij code ' . $apiKey . '.');
        }
        $this->checkMaxRequests($webform);

        $contact = $this->updateOrCreateContact($data['responsible_ids'], $data['contact'], $webform);

        // Indien contact gevonden en niet new aangemaakt.
        if($contact && !$this->newContactCreated){
            // IBAN nummer meegegeven, dan deze wijzigen.
            // En hoeft dus niet als IBAN niet is meegegeven (leeg maken / verwijderen van IBAN via mutatie kan dus niet).
            // Voor IBAN tnv idem
            if($data['contact']['iban'] != ''
                && $data['contact']['iban'] != $contact->iban){
                $iban = $this->checkIban($data['contact']['iban'], 'contact.');
                $contact->iban = $iban;
                $contact->save();
                $this->log("IBAN gewijzigd bij contact " . $contact->full_name . " (".$contact->number.").");
            }
            // IBAN tnv meegegeven, dan deze wijzigen.
            if($data['contact']['iban_attn'] != ''
                && $data['contact']['iban_attn'] != $contact->iban_attn){
                $contact->iban_attn = $data['contact']['iban_attn'];
                $contact->save();
                $this->log("IBAN tnv gewijzigd bij contact " . $contact->full_name . " (".$contact->number.").");
            }

            // Incasso machting gewijzigd.
            if($data['contact']['is_collect_mandate'] != ''){
                $isCollectMandate = (bool)$data['contact']['is_collect_mandate'];
                $contact->is_collect_mandate = $isCollectMandate;
                $this->log("Incasso machtiging Ja/Nee gewijzigd bij contact " . $contact->full_name . " (".$contact->number.").");

                if(!$isCollectMandate){
                    $contact->collect_mandate_code = '';
                    $contact->collect_mandate_signature_date = null;
                    $contact->collect_mandate_first_run_date = null;
                    $contact->collect_mandate_collection_schema = '';
                }else{
                    if($data['contact']['collect_mandate_code'] == '' && $contact->collect_mandate_code == '') {
                        $data['contact']['collect_mandate_code'] = $contact->number;
                    }
                    if($data['contact']['collect_mandate_signature_date'] == '' && $contact->collect_mandate_signature_date == null) {
                        $data['contact']['collect_mandate_signature_date'] = Carbon::now();
                    }
                    if($data['contact']['collect_mandate_first_run_date'] == '' && $contact->collect_mandate_first_run_date == null) {
                        $data['contact']['collect_mandate_first_run_date'] = Carbon::now()->addMonth(1)->startOfMonth();
                    }
                    if($data['contact']['collect_mandate_collection_schema'] == '' && $contact->collect_mandate_collection_schema == '') {
                        $data['contact']['collect_mandate_collection_schema'] = 'core';
                    }
                    // Incasso machtigingskenmerk gewijzigd.
                    if($data['contact']['collect_mandate_code'] != '' && $data['contact']['collect_mandate_code'] != $contact->collect_mandate_code){
                        $contact->collect_mandate_code = $data['contact']['collect_mandate_code'];
                        $this->log("Incasso machtigingskenmerk gewijzigd bij contact " . $contact->full_name . " (".$contact->number.").");
                    }
                    // Incasso ondertekening datum gewijzigd.
                    if($data['contact']['collect_mandate_signature_date'] != '' && $data['contact']['collect_mandate_signature_date'] != $contact->collect_mandate_signature_date){
                        $contact->collect_mandate_signature_date = Carbon::make($data['contact']['collect_mandate_signature_date']);
                        $this->log("Incasso ondertekening datum gewijzigd bij contact " . $contact->full_name . " (".$contact->number.").");
                    }
                    // Incasso eerste datum gewijzigd.
                    if($data['contact']['collect_mandate_first_run_date'] != '' && $data['contact']['collect_mandate_first_run_date'] != $contact->collect_mandate_first_run_date){
                        $contact->collect_mandate_first_run_date = Carbon::make($data['contact']['collect_mandate_first_run_date']);
                        $this->log("Incasso eerste datum gewijzigd bij contact " . $contact->full_name . " (".$contact->number.").");
                    }
                    // Incasso schema gewijzigd.
                    if($data['contact']['collect_mandate_collection_schema'] != '' && $data['contact']['collect_mandate_collection_schema'] != $contact->collect_mandate_collection_schema){
                        $contact->collect_mandate_collection_schema = $data['contact']['collect_mandate_collection_schema'];
                        $this->log("Incasso schema gewijzigd bij contact " . $contact->full_name . " (".$contact->number.").");
                    }
                }
                $contact->save();
            }
        }

        if ($this->address) {
            $this->addEnergySupplierToAddress($this->address, $data['energy_supplier']);
            $this->addEnergyConsumptionGasToAddress($this->address, $data['address_energy_consumption_gas']);
            $this->addEnergyConsumptionElectricityToAddress($this->address, $data['address_energy_consumption_electricity']);

            $intake = $this->addIntakeToAddress($this->address, $data['intake'], $webform);
            $housingFile = $this->addHousingFileToAddress($this->address, $data['housing_file'], $webform);
        } else {
            $intake = null;
            $housingFile = null;
            $this->log("Er is geen adres gevonden en kon ook niet aangemaakt worden met huidige gegevens, intake en/of woondossier konden niet worden aangemaakt.");
        }

        // Bewaar intake en housingfile voor verdere acties later hiermee
        $this->contact = $contact;
        $this->intake = $intake;
        $this->housingFile = $housingFile;
    }


    protected function getDataFromRequest(Request $request)
    {
        $mapping = [
            'responsible_ids' => [
                'verantwoordelijke_gebruiker_id' => 'responsible_user_id',
                'verantwoordelijke_team_id' => 'responsible_team_id',
            ],
            'contact' => [
                // Contact
                'titel_id' => 'title_id',
                'voorletters' => 'initials',
                'voornaam' => 'first_name',
                'tussenvoegsel' => 'last_name_prefix',
                'achternaam' => 'last_name',
                'geboortedatum' => 'date_of_birth',
                // Organisation
                'organisatienaam' => 'organisation_name',
                'kvk' => 'chamber_of_commerce_number',
                'btw_nr' => 'vat_number',
                'website' => 'website',
                // Address
                'adres_type_id' => 'address_type_id',
                'adres_straat' => 'address_street',
                'adres_huisnummer' => 'address_number',
                'adres_toevoeging' => 'address_addition',
                'adres_postcode' => 'address_postal_code',
                'adres_plaats' => 'address_city',
                'adres_land_id' => 'address_country_id',
                // Ean electra
                'energieleverancier_ean_code_elektra' => 'ean_electricity',
                // PhoneNumber
                'telefoonnummer' => 'phone_number',
                // ContactNotes
                'contact_opmerkingen' => 'contact_notes',
                // ContactEmail
                'emailadres' => 'email_address',
                // Iban en Iban tnv
                'iban' => 'iban',
                'iban_tnv' => 'iban_attn',
                'akkoord_privacybeleid' => 'did_agree_avg',
                'datum_akkoord_privacybeleid' => 'date_did_agree_avg',
                'incasso_machtiging' => 'is_collect_mandate',
                'incasso_machtigingskenmerk' => 'collect_mandate_code',
                'incasso_ondertekening_datum' => 'collect_mandate_signature_date',
                'incasso_eerste_datum' => 'collect_mandate_first_run_date',
                'incasso_schema' => 'collect_mandate_collection_schema',
                // Groep
                'contact_groep' => 'group_name',
                'contact_groep_ids' => 'contact_group_ids',
                // Hoomdossier aanmaken
                'hoomdossier_aanmaken' => 'create_hoom_dossier',
            ],
            'address_energy_consumption_gas' => [
                // Address energy consumption gas
                'verbruik_gas_begindatum' => 'date_begin',
                'verbruik_gas_einddatum' => 'date_end',
                'verbruik_gas_verbruik_m3' => 'consumption',
                'verbruik_gas_voorgesteld_tarief_variabel' => 'proposed_variable_rate',
                'verbruik_gas_voorgesteld_tarief_vast' => 'proposed_fixed_rate',
                'verbruik_gas_variabele_kosten' => 'total_variable_costs',
                'verbruik_gas_vaste_kosten' => 'total_fixed_costs',
            ],
            'address_energy_consumption_electricity' => [
                // Address energy consumption gas
                'verbruik_electriciteit_begindatum' => 'date_begin',
                'verbruik_electriciteit_einddatum' => 'date_end',
                'verbruik_electriciteit_verbruik_hoog' => 'consumption_high',
                'verbruik_electriciteit_verbruik_laag' => 'consumption_low',
                'verbruik_electriciteit_terug_hoog' => 'return_high',
                'verbruik_electriciteit_terug_laag' => 'return_low',
                'verbruik_electriciteit_voorgesteld_tarief_variabel_hoog' => 'proposed_variable_rate_high',
                'verbruik_electriciteit_voorgesteld_tarief_vast_hoog' => 'proposed_variable_rate_low',
                'verbruik_electriciteit_voorgesteld_tarief_variabel_laag' => 'proposed_fixed_rate_high',
                'verbruik_electriciteit_voorgesteld_tarief_vast_laag' => 'proposed_fixed_rate_low',
                'verbruik_electriciteit_variabele_kosten_hoog' => 'total_variable_costs_high',
                'verbruik_electriciteit_vaste_kosten_hoog' => 'total_variable_costs_low',
                'verbruik_electriciteit_variabele_kosten_laag' => 'total_fixed_costs_high',
                'verbruik_electriciteit_vaste_kosten_laag' => 'total_fixed_costs_low',
            ],
            'energy_supplier' => [
                // AddressEnergySupplier
                'energieleverancier_id' => 'energy_supplier_id',
                'energieleverancier_klantnummer' => 'es_number',
                'energieleverancier_type_id' => 'energy_supply_type_id',
                'energieleverancier_klant_sinds' => 'member_since',
//                'energieleverancier_ean_code_elektra' => 'ean_electricity',
                'energieleverancier_status' => 'energy_supply_status_id',
//                'energieleverancier_huidig' => 'is_current_supplier',
            ],
            'participation' => [
                // ParticipantProject
                'deelname_project_id' => 'project_id',
                'deelname_iban_uitkering' => 'iban_payout',
                'deelname_iban_uitkering_tnv' => 'iban_payout_attn',
                'deelname_jaarlijks_verbruik' => 'power_kwh_consumption',
                'deelname_uitkeren_op_id' => 'payout_type_id',
                'deelname_akkoord_regelement' => 'did_accept_agreement',
                'deelname_datum_akkoord_regelement' => 'date_did_accept_agreement',
                'deelname_projectinformatie_begrepen' => 'did_understand_info',
                'deelname_datum_projectinformatie_begrepen' => 'date_did_understand_info',
                // ParticipantMutation
                'deelname_mutatie_status_id' => 'participation_mutation_status_id',
                'deelname_mutatie_aantal' => 'participation_mutation_quantity',
                'deelname_mutatie_bedrag' => 'participation_mutation_amount',
                'deelname_mutatie_ingangs_datum' => 'participation_mutation_date',
                'deelname_mutatie_betaal_datum' => 'participation_mutation_date_payment',
                'deelname_mutatie_betalingskenmerk' => 'participation_mutation_payment_reference',
                'deelname_mutatie_contract_retour' => 'participation_mutation_date_contract_retour',
            ],
            'order' => [
                // Order / OrderProduct
                'order_product_id' => 'product_id',
                'order_aantal' => 'amount',
                'order_iban' => 'iban',
                'order_iban_tnv' => 'iban_attn',
                'order_betaalwijze_id' => 'payment_type_id',
                'order_status_id' => 'status_id',
                'order_nota_frequentie_id' => 'collection_frequency_id',
                'order_volgende_nota_datum' => 'date_next_invoice',
                'order_begindatum' => 'date_start',
                'order_eerste_notadatum_start_op' => 'date_period_start_first_invoice',
                'order_aanvraagdatum' => 'date_requested',
                'order_betreft' => 'subject',
                'order_opmerking' => 'invoice_text',
            ],
            'intake' => [
                // Intake
                'intake_campagne_id' => 'campaign_id',
                'intake_motivatie_ids' => 'reason_ids',
                'intake_maatregel_id' => 'measure_id',
                'intake_maatregel_ids' => 'measure_ids',
                'intake_interesse_ids' => 'measure_categorie_ids',
                'intake_aanmeldingsbron_ids' => 'source_ids',
                'intake_status_id' => 'status_id',
                'intake_opmerkingen_bewoner' => 'note',
            ],
            'housing_file' => [
                // HousingFile
                'woondossier_woningtype_id' => 'building_type_id',
                'woondossier_bouwjaar' => 'build_year',
                'woondossier_koophuis' => 'is_house_for_sale',
                'woondossier_gebruiksoppervlakte' => 'surface',
                'woondossier_daktype_id' => 'roof_type_id',
                'woondossier_energielabel_id' => 'energy_label_id',
                'woondossier_aantal_bouwlagen' => 'floors',
                'woondossier_status_energielabel_id' => 'energy_label_status_id',
                'woondossier_momument' => 'is_monument',
                'woondossier_maatregelen_ids' => 'measure_ids',
                'woondossier_maatregelen_datums_realisatie' => 'measure_dates',
                'woondossier_aantal_bewoners' => 'number_of_residents',
                'woondossier_opbrengst_zonnepanelen' => 'revenue_solar_panels',
                'woondossier_opmerking' => 'remark',
            ],
        ];

        // Task properties toevoegen met prefix 'taak_'
        foreach (TaskProperty::all() as $taskProperty) {
            $mapping['task']['taak_' . $taskProperty->code] = $taskProperty->code;
        }
        $mapping['task']['taak_type_id'] = 'type_id';
        $mapping['task']['taak_einddatum'] = 'date_planned_finish';
        $mapping['task']['taak_dagen_einddatum'] = 'days_planned_finish';
        $mapping['task']['taak_afgehandeld'] = 'finished';

        $mapping['task']['taak_opmerkingen'] = 'note';

        $data = [];
        foreach ($mapping as $groupname => $fields) {
            foreach ($fields as $inputName => $outputName) {
                // Alle input standaard waarde '' meegeven.
                // Op deze manier hoeven we later alleen op lege string te checken...
                // ... ipv bijv. if(!array_key_exists() || is_null($var) || $var = '')
                $data[$groupname][$outputName] = trim($request->get($inputName, ''));
            }
        }

        // Sanitize
        $data['contact']['address_postal_code'] = strtoupper(str_replace(' ', '', $data['contact']['address_postal_code']));

        // Amount values with decimals. Remove thousand points first, than replace decimal comma with point. 1.234,56 => 1234.56
        $data['address_energy_consumption_gas']['proposed_variable_rate'] = floatval(str_replace(',', '.', str_replace('.', '', $data['address_energy_consumption_gas']['proposed_variable_rate'])));
        $data['address_energy_consumption_gas']['proposed_fixed_rate'] = floatval(str_replace(',', '.', str_replace('.', '', $data['address_energy_consumption_gas']['proposed_fixed_rate'])));
        $data['address_energy_consumption_gas']['total_variable_costs'] = floatval(str_replace(',', '.', str_replace('.', '', $data['address_energy_consumption_gas']['total_variable_costs'])));
        $data['address_energy_consumption_gas']['total_fixed_costs'] = floatval(str_replace(',', '.', str_replace('.', '', $data['address_energy_consumption_gas']['total_fixed_costs'])));

        $data['address_energy_consumption_electricity']['proposed_variable_rate_high'] = floatval(str_replace(',', '.', str_replace('.', '', $data['address_energy_consumption_electricity']['proposed_variable_rate_high'])));
        $data['address_energy_consumption_electricity']['proposed_variable_rate_low'] = floatval(str_replace(',', '.', str_replace('.', '', $data['address_energy_consumption_electricity']['proposed_variable_rate_low'])));
        $data['address_energy_consumption_electricity']['proposed_fixed_rate_high'] = floatval(str_replace(',', '.', str_replace('.', '', $data['address_energy_consumption_electricity']['proposed_fixed_rate_high'])));
        $data['address_energy_consumption_electricity']['proposed_fixed_rate_low'] = floatval(str_replace(',', '.', str_replace('.', '', $data['address_energy_consumption_electricity']['proposed_fixed_rate_low'])));
        $data['address_energy_consumption_electricity']['total_variable_costs_high'] = floatval(str_replace(',', '.', str_replace('.', '', $data['address_energy_consumption_electricity']['total_variable_costs_high'])));
        $data['address_energy_consumption_electricity']['total_variable_costs_low'] = floatval(str_replace(',', '.', str_replace('.', '', $data['address_energy_consumption_electricity']['total_variable_costs_low'])));
        $data['address_energy_consumption_electricity']['total_fixed_costs_high'] = floatval(str_replace(',', '.', str_replace('.', '', $data['address_energy_consumption_electricity']['total_fixed_costs_high'])));
        $data['address_energy_consumption_electricity']['total_fixed_costs_low'] = floatval(str_replace(',', '.', str_replace('.', '', $data['address_energy_consumption_electricity']['total_fixed_costs_low'])));

        $data['participation']['participation_mutation_amount'] = floatval(str_replace(',', '.', str_replace('.', '', $data['participation']['participation_mutation_amount'])));

        // Validatie op addressNummer (numeriek), indien nodig herstellen door evt. toevoeging eruit te halen.
        if(!isset($data['contact']['address_number']) || strlen($data['contact']['address_number']) == 0){
            $data['contact']['address_number'] = 0;
        }
        if(!is_numeric($data['contact']['address_number'])){
            $addressNumber = 0;
            $addressAddition = '';
            $teller = 1;
            $length = strlen($data['contact']['address_number']);
            while ($teller < $length) {

                if (!is_numeric(substr($data['contact']['address_number'], $teller, 1))) {
                    $addressNumber = substr($data['contact']['address_number'], 0, $teller);
                    $addressAddition = substr($data['contact']['address_number'], $teller) . $data['contact']['address_addition'];
                    break;
                }
                $teller++;
            }
            $data['contact']['address_number'] = $addressNumber;
            $data['contact']['address_addition'] = $addressAddition ;
        }

        $data['contact']['address_addition'] = str_replace(' ', '', $data['contact']['address_addition']);
        $data['contact']['address_addition'] = str_replace('-', '', $data['contact']['address_addition']);

        return $data;
    }

    protected function updateOrCreateContact(array $responsibleIds, array $data, Webform $webform)
    {
        $ownerAndResponsibleUser = null;
        if($responsibleIds['responsible_user_id']) {
            $ownerAndResponsibleUser = User::find($responsibleIds['responsible_user_id']);
            $this->log('Eigenaar contact : ' . $ownerAndResponsibleUser->id);
        }elseif($responsibleIds['responsible_team_id'] && Team::find($responsibleIds['responsible_team_id'])) {
            $ownerAndResponsibleUser = Team::find($responsibleIds['responsible_team_id'])->users->first();
            $this->log('Eigenaar contact ' . $ownerAndResponsibleUser->id . ' (1e van team : '
                . $responsibleIds['responsible_team_id'] . ')');
        }elseif(!empty($webform->responsible_user_id)) {
            $ownerAndResponsibleUser = User::find($webform->responsible_user_id);
            $this->log('Eigenaar contact (default webformulier) : ' . $ownerAndResponsibleUser->id);
        }elseif(!empty($webform->responsible_team_id) && Team::find($webform->responsible_team_id)) {
            $ownerAndResponsibleUser = Team::find($webform->responsible_team_id)->users->first();
            $this->log('Eigenaar contact (default webformulier) ' . $ownerAndResponsibleUser->id . ' (1e van team : '
                . $webform->responsible_team_id . ')');
        }
        Auth::setUser($ownerAndResponsibleUser);
        $this->log('Default Eigenaar contact verantwoordelijke gebruiker (zelfde als eigenaar) : ' . $ownerAndResponsibleUser->id);

        $contact = $this->getContactByAddressAndEmail($data);
        $this->log('Actie: ' . $this->contactActie);
        if($contact){
            $this->log('Actie bij contact: ' . $contact->id);
        }

        if ($data['address_type_id'] != '') {
            try {
                $addressType = AddressType::get($data['address_type_id']);
                $addressTypeId = $data['address_type_id'];
                $this->log('Adres type ingesteld op: ' . $addressType->name . ' (' . $addressTypeId . ')');
            } catch (\Exception $e) {
                $addressTypeId = 'postal';
                $this->log('Ongeldige waarde in adres_type_id (' . $data['address_type_id'] . ') , default naar "Post"');
            }
        } else {
            $addressTypeId = 'postal';
            $this->log('Er is geen waarde voor adres type meegegeven, default naar "Post"');
        }

        if ($contact) {
            // Person of organisatie is gevonden, uitvoeren acties
            // contactActie = "GEEN" ->geen acties op contact naw of email
            // contactActie = "NAT" -> Nieuw adres + taak
            // contactActie = "NET" -> Nieuw emailadres + taak
            // contactActie = "BCB" -> Bewoner contact bijwerken + taak
            // contactActie = "CCT" -> Controle contact taak
            switch($this->contactActie){
                case 'GEEN' :
                    $contact = $this->updateContact($contact, $data, $ownerAndResponsibleUser);
                    $address = $contact->addresses()
                        ->where('postal_code', $data['address_postal_code'])
                        ->where('number', $data['address_number'])
                        ->where('addition', $data['address_addition'])
                        ->first();
                    if($address){
                        $this->address = $address;
                    }
//                    $this->addPhoneNumberToContact($data, $contact);
//                    $this->addContactNotesToContact($data, $contact);
//                    $this->addContactToGroup($data, $contact, $ownerAndResponsibleUser);
                    break;
                case 'NAT' :
                    $this->addAddressToContact($data, $contact);
                    $this->addPhoneNumberToContact($data, $contact);
                    $this->addContactNotesToContact($data, $contact);
                    $this->addContactToGroup($data, $contact, $ownerAndResponsibleUser);
                    $note = "Webformulier " . $webform->name . ".\n\n";
                    $note .= "Nieuw adres toegevoegd aan contact " . $contact->full_name . " (".$contact->number.").\n";
                    $note .= "Adres type : " . AddressType::get($addressTypeId)->name . "\n";
                    $note .= "Voornaam : " . $data['first_name'] . "\n";
                    $note .= "Achternaam : " . $data['last_name'] . "\n";
                    $note .= "Straat : " . $data['address_street'] . "\n";
                    $note .= "Nummer : " . $data['address_number'] . "\n";
                    $note .= "Toevoeging : " . $data['address_addition'] . "\n";
                    $note .= "Postcode : " . $data['address_postal_code'] . "\n";
                    $note .= "Plaats : " . $data['address_city'] . "\n";
                    $note .= "Landcode : " . $data['address_country_id'] . "\n";
                    $note .= "Controleer contactgegevens\n";
                    $this->addTaskCheckContact($responsibleIds, $contact, $webform, $note);
                    break;
                case 'NET' :
                    $this->addEmailToContact($data, $contact);
                    $this->addPhoneNumberToContact($data, $contact);
                    $this->addContactNotesToContact($data, $contact);
                    $this->addContactToGroup($data, $contact, $ownerAndResponsibleUser);
                    $address = $contact->addresses()
                        ->where('postal_code', $data['address_postal_code'])
                        ->where('number', $data['address_number'])
                        ->where('addition', $data['address_addition'])
                        ->first();
                    if($address){
                        $this->address = $address;
                    }
                    $note = "Webformulier " . $webform->name . ".\n\n";
                    $note .= "Nieuw e-mailadres  " . $data['email_address'] . " toegevoegd aan contact " . $contact->full_name . " (".$contact->number.").\n";
                    $note .= "Controleer contactgegevens\n";
                    $this->addTaskCheckContact($responsibleIds, $contact, $webform, $note);
                    break;
                case 'BCB' :
                    $contact = $this->updateContact($contact, $data, $ownerAndResponsibleUser);
                    $address = $contact->addresses()
                        ->where('postal_code', $data['address_postal_code'])
                        ->where('number', $data['address_number'])
                        ->where('addition', $data['address_addition'])
                        ->first();
                    if($address){
                        $this->address = $address;
                    }
                    $note = "Webformulier " . $webform->name . ".\n\n";
                    $note .= "Contact 'bewoner' " . $contact->full_name . " (".$contact->number.") bijgewerkt op adres 'bewoner'.\n";
                    $note .= "Controleer contactgegevens\n";
                    $this->addTaskCheckContact($responsibleIds, $contact, $webform, $note);
                    break;
                case 'CCT' :
                    $note = "Webformulier " . $webform->name . ".\n\n";
                    $note .= "Gegevens contact met emailadres " . $data['email_address'] . " (".$contact->number.") gevonden bij op basis van e-mail maar zonder goede match op NAW.\n";
                    $note .= "Adres type : " . AddressType::get($addressTypeId)->name . "\n";
                    $note .= "Voornaam : " . $data['first_name'] . "\n";
                    $note .= "Achternaam : " . $data['last_name'] . "\n";
                    $note .= "Straat : " . $data['address_street'] . "\n";
                    $note .= "Nummer : " . $data['address_number'] . "\n";
                    $note .= "Toevoeging : " . $data['address_addition'] . "\n";
                    $note .= "Postcode : " . $data['address_postal_code'] . "\n";
                    $note .= "Plaats : " . $data['address_city'] . "\n";
                    $note .= "Landcode : " . $data['address_country_id'] . "\n";
                    $note .= "Controleer contactgegevens\n";
                    $this->addTaskCheckContact($responsibleIds, $contact, $webform, $note);
                    break;
            }
        }

        if (!$contact) {
            // Person of organisatie is niet gevonden, uitvoeren acties
            // contactActie = "NC"  -> Nieuw contact
            // contactActie = "NCT" -> Nieuw contact + taak
            $this->log('Geen enkel contact kunnen vinden op basis van meegegeven data, nieuw contact aanmaken.');

            $contact = $this->addContact($data, $ownerAndResponsibleUser);
            switch($this->contactActie){
                case 'NCT' :
                    $note = "Webformulier " . $webform->name . ".\n\n";
                    $note .= "Nieuw contact " . $contact->full_name . " (".$contact->number.") aangemaakt op adres wat al voorkomt bij bestaande contact(en).\n";
                    $note .= "Controleer contactgegevens\n";
                    $this->addTaskCheckContact($responsibleIds, $contact, $webform, $note);
                    break;
            }
        }

        return $contact;
    }

    protected function error(string $string, int $statusCode = 422)
    {
        throw new WebformException($string, $statusCode);
    }

    protected function getContactByAddressAndEmail(array $data)
    {
        $this->contactActie = "???";

        if ($data['organisation_name']) {
            $contactTypeId = 'organisation';
        }else{
            $contactTypeId = 'person';
        }

        // Kijken of er een persoon gematcht kan worden op basis van adres (postcode, huisnummer en huisnummer toevoeging)
        if($data['address_postal_code'] && $data['address_number'] && isset($data['address_addition'])) {
            $this->log('Er zijn adres gegevens meegegeven');
            $contactAddressQuery = Contact::where('type_id', $contactTypeId)
                ->whereHas('addresses', function ($queryAddress) use ($data) {
                    $queryAddress->where('postal_code', $data['address_postal_code'])
                        ->where('number', $data['address_number'])
                        ->where('addition', $data['address_addition']);
                });
            // Niet gevonden op adres, check op email
            if ($contactAddressQuery->count() == 0) {
                $contactEmailQuery = Contact::where('type_id', $contactTypeId)
                    ->whereHas('emailAddresses', function ($queryEmail) use ($data) {
                        $queryEmail->where('email', $data['email_address']);
                    });
                // Gevonden op emailcontact. Adres bijwerken op 1e contact + taak.
                if ($contactEmailQuery->count() > 0) {
                    $this->log($contactEmailQuery->count() . ' contacten gevonden met emailadres '
                        . $data['email_address']);
                    // add address + taak
                    $this->contactActie = "NAT";
                    $this->log('Nieuw adres maken + taak ');
                    return $contactEmailQuery->first();
                } else {
                    // Niet gevonden dan aanmaken Nieuw contact
                    $this->log('Contact niet gevonden op basis van adres (postcode, huisnummer en huisnummer toevoeging) of emailadres');
                    // add contact
                    $this->contactActie = "NC";
                    $this->log('Nieuw contact maken ');
                    return null;
                }
                // Gevonden op adres, check op specifiek contact of anders op email
            } else {

                $checkContactForBewoner = $contactAddressQuery->first();
                if($checkContactForBewoner && str_contains( strtolower($checkContactForBewoner->person->last_name), 'bewoner') ){
                    $this->contactActie = "BCB";
                    $this->log('Contact "bewoner" gevonden op basis van adres, naam en email bijwerken');
                    return $checkContactForBewoner;
                }

                $this->log($contactAddressQuery->count() . ' contacten gevonden op adres: ' . $data['address_postal_code']
                    . ', '
                    . $data['address_number'] . $data['address_addition'] );
                $contactEmailQuery = clone($contactAddressQuery);
                $contactEmailQuery = $contactEmailQuery->whereHas('emailAddresses', function ($queryEmail) use ($data) {
                    $queryEmail->where('email', $data['email_address']);
                });
                $this->log('Aantal gevonden op adres en emailadres ' . $data['email_address'] . ' : ' . $contactEmailQuery->count());
                // Gevonden op adres maar niet op emailcontact. Check op voornaam + achternaam (of naam in geval van organisatie)
                if ($contactEmailQuery->count() == 0) {
                    $contactNameQuery = clone($contactAddressQuery);
                    if ($data['organisation_name']) {
                        $contactNameQuery = $contactNameQuery->whereHas('organisation', function ($queryName) use ($data) {
                            $queryName->where('name', 'like', $data['organisation_name']);
                        });
                    }else{
                        $contactNameQuery = $contactNameQuery->whereHas('person', function ($queryName) use ($data) {
                            $queryName->where('first_name', $data['first_name'])
                                ->where('last_name', $data['last_name']);
                        });
                    }
                    // Gevonden op adres, niet op emailcontact. Wel op naam (voornaam + achternaam).
                    if ($contactNameQuery->count() > 0) {
                        $this->log($contactNameQuery->count() . ' contacten gevonden op adres: ' . $data['address_postal_code']
                            . $data['address_number'] . $data['address_addition'] . ' en naam '
                            . $data['first_name'] . ' ' . $data['last_name']);
                        // add emailaddress + taak
                        if($data['email_address'] && $data['email_address'] != ''){
                            $this->log('Nieuw emailadres toevoegen + taak ');
                            $this->contactActie = "NET";
                        } else {
                            $this->contactActie = "GEEN";
                        }
                        return $contactNameQuery->first();
                    } else {
                        // Gevonden op adres, niet op emailcontact en niet op naam (voornaam + achternaam).
                        // Indien geen organisatie check met voorletter + achternaam
                        if (empty($data['organisation_name']) ) {
                            $contactNameInitialsQuery = clone($contactAddressQuery);
                            if (!empty($data['initials']) ) {
                                $contactNameInitialsQuery = $contactNameInitialsQuery->whereHas('person', function ($queryNameInitials) use ($data) {
                                    $queryNameInitials->where('initials', $data['initials'])
                                        ->where('last_name', $data['last_name']);
                                });
                            } else {
                                $contactNameInitialsQuery = $contactNameInitialsQuery->whereHas('person', function ($queryNameInitials) use ($data) {
                                    $queryNameInitials->where('first_name', 'like', substr($data['first_name'], 0, 1) . '%')
                                        ->where('last_name', $data['last_name']);
                                });
                            }
                            // Gevonden op adres, niet op emailcontact en niet op voornaam + achternaam. Wel op initial(s).
                            if ($contactNameInitialsQuery->count() > 0) {
                                $this->log($contactNameInitialsQuery->count() . ' contacten gevonden op adres: ' . $data['address_postal_code']
                                    . $data['address_number'] . $data['address_addition'] . ' en achternaam '
                                    . $data['last_name'] . ( !empty($data['initials']) ? ' en voorletters: ' . $data['initials'] :  ' en voorletter voornaam: ' . substr($data['first_name'], 0, 1) ) );
                                // add emailaddress + taak
                                if($data['email_address'] && $data['email_address'] != ''){
                                    $this->log('Nieuw emailadres toevoegen + taak ');
                                    $this->contactActie = "NET";
                                } else {
                                    $this->contactActie = "GEEN";
                                }
                                return $contactNameInitialsQuery->first();
                            } else {
                                // Persoon Gevonden op adres maar niet op email of naam.
                                $this->log('Contact (persoon) gevonden op basis van adres (postcode, huisnummer en huisnummer toevoeging) maar niet op emailadres of naam');
                                // add contact + taak
                                $this->contactActie = "NCT";
                                $this->log('Nieuw contact maken + taak');
                                return null;
                            }
                        } else {
                            // Organisatie Gevonden op adres maar niet op email of naam.
                            $this->log('Contact (organisatie) gevonden op basis van adres (postcode, huisnummer en huisnummer toevoeging) maar niet op emailadres of naam');
                            // add contact + taak
                            $this->contactActie = "NCT";
                            $this->log('Nieuw contact maken + taak');
                            return null;
                        }
                    }

                    // Ook gevonden op email, controle op voornaam en achternaam
                } else {
                    $contactNameQuery = clone($contactEmailQuery);
                    if ($data['organisation_name']) {
                        $contactNameQuery = $contactNameQuery->whereHas('organisation', function ($queryName) use ($data) {
                            $queryName->where('name', 'like', $data['organisation_name']);
                        });
                    }else{
                        $contactNameQuery = $contactNameQuery->whereHas('person', function ($queryName) use ($data) {
                            $queryName->where('first_name', $data['first_name'])
                                ->where('last_name', $data['last_name']);
                        });
                    }
                    // Gevonden op adres, emailcontact en naam (voornaam + achternaam).
                    if ($contactNameQuery->count() > 0) {
                        $this->log($contactNameQuery->count() . ' contacten gevonden op adres: ' . $data['address_postal_code']
                            . ', '
                            . $data['address_number'] . $data['address_addition'] . ' en emailadres ' . $data['email_address'] .
                            ' en naam ' . $data['first_name'] . ' ' . $data['last_name']);
                        // geen actie inzake contact, adres en/of email
                        $this->contactActie = "GEEN";
                        return $contactNameQuery->first();
                    } else {
                        // Gevonden op adres en emailcontact, niet op naam (voornaam + achternaam).
                        // Indien geen organisatie check met voorletter + achternaam
                        if (empty($data['organisation_name']) ) {
                            $contactNameInitialsQuery = clone($contactEmailQuery);
                            if (!empty($data['initials']) ) {
                                $contactNameInitialsQuery = $contactNameInitialsQuery->whereHas('person', function ($queryNameInitials) use ($data) {
                                    $queryNameInitials->where('initials', $data['initials'])
                                        ->where('last_name', $data['last_name']);
                                });
                            } else {
                                $contactNameInitialsQuery = $contactNameInitialsQuery->whereHas('person', function ($queryNameInitials) use ($data) {
                                    $queryNameInitials->where('first_name', 'like', substr($data['first_name'], 0, 1) . '%')
                                        ->where('last_name', $data['last_name']);
                                });
                            }
                            // Gevonden op adres en emailcontact, niet op voornaam + achternaam. Wel op initial(s).
                            if ($contactNameInitialsQuery->count() > 0) {
                                $this->log($contactNameInitialsQuery->count() . ' contacten gevonden op adres: ' . $data['address_postal_code']
                                    . $data['address_number'] . $data['address_addition']. ' en emailadres ' . $data['email_address'] . ' en achternaam '
                                    . $data['last_name'] . ( !empty($data['initials']) ? ' en voorletters: ' . $data['initials'] :  ' en voorletter voornaam :' . substr($data['first_name'], 0, 1) ) );
                                $this->contactActie = "GEEN";
                                return $contactNameInitialsQuery->first();
                            } else {
                                // Persoon Gevonden op adres en email, maar niet op naam.
                                $this->log('Contact (persoon) gevonden op basis van adres (postcode, huisnummer en huisnummer toevoeging) en emailadres maar niet op naam met initials');
                                // add contact + taak
                                $this->contactActie = "NCT";
                                $this->log('Nieuw contact maken + taak');
                                return null;
                            }
                        } else {
                            // Organisatie Gevonden op adres maar niet op email of naam.
                            $this->log('Contact (organisatie) gevonden op basis van adres (postcode, huisnummer en huisnummer toevoeging) en emailadres maar niet op naam');
                            // add contact + taak
                            $this->contactActie = "NCT";
                            $this->log('Nieuw contact maken + taak');
                            return null;
                        }

                    }
                    return null;

                }

            }
            // Geen adres opgegeven, check op naam en email
        }else{
            return $this->getContactByNameAndEmail($data);
        }
        return null;
    }

    protected function getContactByNameAndEmail(array $data)
    {
        // Kijken of er een persoon gematcht kan worden op basis van naam en email
        $person = Person::where('first_name', $data['first_name'])
            ->where('last_name', $data['last_name'])
            ->whereHas('contact', function ($query) use ($data) {
                $query->whereHas('emailAddresses', function ($query) use ($data) {
                    $query->where('email', $data['email_address']);
                });
            })
            ->first();

        if ($person) {
            $this->log('Persoon ' . $person->contact->full_name . ' gevonden op basis van naam en emailadres');
            // Geen taak nodig
            $this->contactActie = "GEEN";
            return $person->contact;
        } else {
            // Kijken of er een persoon gematcht kan worden op basis van alleen email
            $person = Person::whereHas('contact', function ($query) use ($data) {
                $query->whereHas('emailAddresses', function ($query) use ($data) {
                    $query->where('email', $data['email_address']);
                });
            });
            $this->log('Contacten gevonden op emailadres ' . $data['email_address'] . ': ' . $person->count());
            // Gevonden op email contact.
            if ($person->count() > 0) {
                $this->log($person->count() . ' contact gevonden op emailadres ' . $data['email_address']);
                // Controle contact taak
                $this->contactActie = "CCT";
                return $person->first()->contact;
                // meer dan 1 gevonden op email contact.
            } else {
                // Ook niet gevonden op alleen email contact.
                $this->log('Contact niet gevonden op basis van adres (postcode, huisnummer en huisnummer toevoeging) en niet op basis van emailadres');
                // add contact + taak
                $this->contactActie = "NC";
                $this->log('Nieuw contact maken');
                return null;
            }
            return null;


            $this->log('Geen persoon gevonden op basis van naam en emailadres');
        }

        // Er is geen persoon gevonden op basis van naam en email, kijken of er een organisatie matcht
        $organisation = Organisation::where('name', $data['organisation_name'])
            ->whereHas('contact', function ($query) use ($data) {
                $query->whereHas('emailAddresses', function ($query) use ($data) {
                    $query->where('email', $data['email_address']);
                });
            })
            ->first();

        if ($organisation) {
            $this->log('Organisatie ' . $organisation->contact->full_name . ' gevonden op basis van naam en emailadres');
            // Geen taak nodig
            $this->contactActie = "GEEN";
            return $organisation->contact;
        } else {
            $this->log('Geen organisatie gevonden op basis van naam en emailadres');
        }

        // Nieuw contact + taak
        $this->contactActie = "NCT";
        return null;
    }

    //    protected function getContactByNameAndAddress(array $data)
    //    {
    //        // Kijken of er een persoon gematcht kan worden op basis van naam en adres
    //        $person = Person::where('first_name', $data['first_name'])
    //            ->where('last_name', $data['last_name'])
    //            ->whereHas('contact', function ($query) use ($data) {
    //                $query->whereHas('addresses', function ($query) use ($data) {
    //                    $query->where('number', $data['address_number'])
    //                        ->where('postal_code', $data['address_postal_code']);
    //                });
    //            })
    //            ->first();
    //
    //        if ($person) {
    //            $this->log('Persoon ' . $person->contact->full_name . ' gevonden op basis van naam en adres');
    //            return $person->contact;
    //        } else {
    //            $this->log('Geen persoon gevonden op basis van naam en adres');
    //        }
    //
    //        // Er is geen persoon gevonden op basis van naam en email, kijken of er een organisatie matcht
    //        $organisation = Organisation::where('name', $data['organisation_name'])
    //            ->whereHas('contact', function ($query) use ($data) {
    //                $query->whereHas('addresses', function ($query) use ($data) {
    //                    $query->where('number', $data['address_number'])
    //                        ->where('postal_code', $data['address_postal_code']);
    //                });
    //            })
    //            ->first();
    //
    //        if ($organisation) {
    //            $this->log('Organisatie ' . $organisation->contact->full_name . ' gevonden op basis van naam en adres');
    //            return $organisation->contact;
    //        } else {
    //            $this->log('Geen organisatie gevonden op basis van naam en adres');
    //        }
    //
    //        return null;
    //    }

    /**
     * @param array $data
     * @param $contact
     * @throws WebformException
     */
    protected function addAddressToContact(array $data, $contact)
    {
        if ($data['address_number'] && $data['address_postal_code']) {
            $this->log('Er is een huisnummer en postcode meegegeven; kijken of deze al bestaat.');
            // Er is voldoende adres data meegegeven om een adres te kunnen maken

            $address = $contact->addresses()
                ->where('postal_code', $data['address_postal_code'])
                ->where('number', $data['address_number'])
                ->where('addition', $data['address_addition'])
                ->first();
            // Adres met deze gegevens bestaat nog niet
            if (!$address) {
                // Adres toevoegen met binnenkomende type of anders default "postadres"
                $this->log('Er bestaat nog geen adres met dit huisnummer en postcode; adres aanmaken');

                // Validatie op addresstype
                if ($data['address_type_id'] != '') {
                    try {
                        $addressType = AddressType::get($data['address_type_id']);
                        $addressTypeId = $data['address_type_id'];
                        $this->log('Adres type ingesteld op: ' . $addressType->name . ' (' . $addressTypeId . ')');
                    } catch (\Exception $e) {
                        $addressTypeId = 'postal';
                        $this->log('Ongeldige waarde in adres_type_id (' . $data['address_type_id'] . ') , default naar "Post"');
                    }
                } else {
                    $addressTypeId = 'postal';
                    $this->log('Er is geen waarde voor adres type meegegeven, default naar "Post"');
                }

                // Validatie op countrycode
                if ($data['address_country_id'] != '') {
                    $country = Country::find($data['address_country_id']);
                    if (!$country) $this->error('Ongeldige waarde in adres_land_id');
                    $countryCode = $country->id;
                } else {
                    $countryCode = null;
                }

                $address = Address::create([
                    'contact_id' => $contact->id,
                    'type_id' => $addressTypeId,
                    'street' => $data['address_street'],
                    'number' => $data['address_number'],
                    'city' => $data['address_city'],
                    'postal_code' => $data['address_postal_code'],
                    'country_id' => $countryCode,
                    'addition' => $data['address_addition'],
                    'ean_electricity' => $data['ean_electricity'],
                ]);
                $this->log('Adres aangemaakt met id ' . $address->id);
            } else {
                $this->log('Er bestaat al een adres met dit huisnummer en postcode; adres niet aanmaken');
            }

            // Address opslaan in controller, aan dit address worden eventuele andere gegevens gekoppeld die op address niveau moeten worden gekoppeld.
            $this->address = $address;
        } else {
            $this->log('Er is geen huisnummer of postcode meegegeven; adres niet aanmaken');
        }
    }

    /**
     * @param array $data
     * @param $contact
     */
    protected function addPhoneNumberToContact(array $data, $contact)
    {
        if ($data['phone_number']) {
            $this->log('Er is een telefoonnummer meegegeven; kijken of deze al bestaat.');
            // Er is voldoende adres data meegegeven om een telefoonnummer te kunnen maken
            if (!$contact->phoneNumbers()
                ->where('number', $data['phone_number'])
                ->exists()) {
                // Telefoonnummer met deze gegevens bestaat nog niet, telefoonnummer toevoegen met type "prive"
                $this->log('Er bestaat nog geen telefoonnummer met dit nummer; telefoonnummer aanmaken');
                $phoneNumber = PhoneNumber::create([
                    'contact_id' => $contact->id,
                    'type_id' => 'home',
                    'number' => $data['phone_number'],
                ]);
                $this->log('Telefoonnummer aangemaakt met id ' . $phoneNumber->id);
            } else {
                $this->log('Er bestaat al een telefoonnummer met dit nummer; telefoonnummer niet aanmaken');
            }
        } else {
            $this->log('Er is geen telefoonnummer meegegeven; telefoonnummer niet aanmaken');
        }
    }

    protected function addEmailToContact(array $data, $contact)
    {
        if ($data['email_address']) {
            $this->log('Er is een emailadres meegegeven; kijken of deze al bestaat.');
            // Er is voldoende email data meegegeven om een emailadres te kunnen maken
            if (!$contact->emailAddresses()
                ->where('email', $data['email_address'])
                ->exists()) {
                // Emailadres met deze gegevens bestaat nog niet, eailadres toevoegen met type "prive"
                $this->log('Er bestaat nog geen emailadres met dit adres; emailadres aanmaken');
                $emailaddress = EmailAddress::create([
                    'contact_id' => $contact->id,
                    'type_id' => 'home',
                    'email' => $data['email_address'],
                ]);
                $this->log('Emailadres aangemaakt met id ' . $emailaddress->id);
            } else {
                $this->log('Er bestaat al een emailadres met dit adres; emailadres niet adres');
            }
        } else {
            $this->log('Er is geen emailadres meegegeven; emailadres niet aanmaken');
        }
    }

    /**
     * @param array $data
     * @param $contact
     */
    protected function addContactNotesToContact(array $data, $contact)
    {
        if ($data['contact_notes']) {
            $contactNote = ContactNote::create([
                'contact_id' => $contact->id,
                'note' => $data['contact_notes'],
            ]);
            $this->log('Contactopmerking aangemaakt met id ' . $contactNote->id . ' voor contact ' . $contact->full_name . '(' . $contact->id . ')');
        }
    }

    protected function log(string $text)
    {
        $this->logs[] = $text;
    }

    protected function addContact(array $data, User $ownerAndResponsibleUser)
    {
        $this->newContactCreated = false;

        $ownerAndResponsibleUser->occupation = '@webform-update@';
        Auth::setUser($ownerAndResponsibleUser);
        $this->log('Contact verantwoordelijke gebruiker (zelfde als eigenaar) : ' . $ownerAndResponsibleUser->id);

        // Functie voor afvangen ongeldige waarden in title_id
        $titleValidator = function ($titleId) {
            if ($titleId != '') {
                $title = Title::find($titleId);
                if (!$title) $this->error('Ongeldige waarde in titel_id');
                return $title->id;
            }
            return null;
        };

        $isCollectMandate = (bool)$data['is_collect_mandate'];
        if($isCollectMandate){
            if($data['collect_mandate_code'] == '') {
                $data['collect_mandate_code'] = '';
            }
            if($data['collect_mandate_signature_date'] == '') {
                $data['collect_mandate_signature_date'] = Carbon::now();
            }
            if($data['collect_mandate_first_run_date'] == '') {
                $data['collect_mandate_first_run_date'] = Carbon::now()->addMonth(1)->startOfMonth();
            }
            if($data['collect_mandate_collection_schema'] == '') {
                $data['collect_mandate_collection_schema'] = 'core';
            }
        }

        if ($data['organisation_name']) {
            $this->log('Er is een organisatienaam meegegeven; organisatie aanmaken.');

            $iban = $this->checkIban($data['iban'], 'organisatie.');
            $contactOrganisation = Contact::create([
                'type_id' => 'organisation',
                'status_id' => 'webform',
                'created_with' => 'webform',
                'iban' => $iban,
                'iban_attn' => $data['iban_attn'],
                'did_agree_avg' => (bool)$data['did_agree_avg'],
                'date_did_agree_avg' => $data['date_did_agree_avg'] ? Carbon::make($data['date_did_agree_avg']): null,
                'is_collect_mandate' => $isCollectMandate,
                'collect_mandate_code' => $isCollectMandate ? $data['collect_mandate_code'] : '',
                'collect_mandate_signature_date' => $isCollectMandate ? Carbon::make($data['collect_mandate_signature_date']): null,
                'collect_mandate_first_run_date' => $isCollectMandate ? Carbon::make($data['collect_mandate_first_run_date']): null,
                'collect_mandate_collection_schema' => $isCollectMandate ? 'core' : '',
                'owner_id' => $ownerAndResponsibleUser->id,
            ]);
            $this->newContactCreated = true;

            $organisation = Organisation::create([
                'contact_id' => $contactOrganisation->id,
                'name' => $data['organisation_name'],
                'statutory_name' => '',
                'website' => $data['website'],
                'chamber_of_commerce_number' => $data['chamber_of_commerce_number'],
                'vat_number' => $data['vat_number'],
            ]);
            $this->log('Organisatie met id ' . $organisation->id . ' aangemaakt.');

            if ($data['first_name'] || $data['last_name']) {
                $contactPerson = Contact::create([
                    'type_id' => 'person',
                    'status_id' => 'webform',
                    'created_with' => 'webform',
                    'owner_id' => $ownerAndResponsibleUser->id,
                ]);

                $person = Person::create([
                    'contact_id' => $contactPerson->id,
                    'title_id' => $titleValidator($data['title_id']),
                    'initials' => $data['initials'],
                    'first_name' => $data['first_name'],
                    'last_name' => $data['last_name'],
                    'last_name_prefix' => $data['last_name_prefix'],
                    'organisation_id' => $organisation->id,
                    'date_of_birth' => $data['date_of_birth'] ?: null,
                ]);

                OccupationContact::create([
                    'occupation_id' => 14, // Relatie type "medewerker"
                    'primary_contact_id' => $organisation->contact_id,
                    'contact_id' => $person->contact_id,
                    'primary' => true,
                ]);

                $this->log('Persoon met id ' . $person->id
                    . ' aangemaakt en gekoppeld aan organisatie als medewerker.');

            }

            // Overige gegevens aan organisation hangen
            $this->addAddressToContact($data, $contactOrganisation);
            $this->addEmailToContact($data, $contactOrganisation);
            $this->addPhoneNumberToContact($data, $contactOrganisation);
            $this->addContactNotesToContact($data, $contactOrganisation);
            $this->addContactToGroup($data, $contactOrganisation, $ownerAndResponsibleUser);

            return $contactOrganisation;
        }

        // Als we hier komen is er geen bedrijfsnaam meegegeven, dan maken we alleen een persoon aan
        $this->log('Er is geen organisatienaam meegegeven; persoon aanmaken.');

        $iban = $this->checkIban($data['iban'], 'persoon.');
        $contactNew = Contact::create([
            'type_id' => 'person',
            'status_id' => 'webform',
            'created_with' => 'webform',
            'iban' => $iban,
            'iban_attn' => $data['iban_attn'],
            'did_agree_avg' => (bool)$data['did_agree_avg'],
            'date_did_agree_avg' => $data['date_did_agree_avg'] ? Carbon::make($data['date_did_agree_avg']): null,
            'is_collect_mandate' => (bool)$data['is_collect_mandate'],
            'collect_mandate_code' => $data['is_collect_mandate'] ? $data['collect_mandate_code'] : '',
            'collect_mandate_signature_date' => $data['is_collect_mandate'] ? Carbon::make($data['collect_mandate_signature_date']): null,
            'collect_mandate_first_run_date' => $data['is_collect_mandate'] ? Carbon::make($data['collect_mandate_first_run_date']): null,
            'collect_mandate_collection_schema' => $data['is_collect_mandate'] ? 'core' : '',
            'owner_id' => $ownerAndResponsibleUser->id,
        ]);
        $this->newContactCreated = true;

        $lastName = $data['last_name'];
        if (!$lastName) {
            $emailParts = explode('@', $data['email_address']);
            $lastName = $emailParts[0];
            if ($lastName) $this->log('Geen achternaam meegegeven, achternaam ' . $lastName . ' uit emailadres gehaald.');
            else $this->log('Geen achternaam meegegeven, ook geen achternaam uit emailadres kunnen halen.');
        }
        $person = Person::create([
            'contact_id' => $contactNew->id,
            'title_id' => $titleValidator($data['title_id']),
            'initials' => $data['initials'],
            'first_name' => $data['first_name'],
            'last_name' => $lastName,
            'last_name_prefix' => $data['last_name_prefix'],
            'date_of_birth' => $data['date_of_birth'] ?: null,
        ]);

        // contact opnieuw ophalen tbv contactwijzigingen via PersonObserver
        $contact = Contact::find($contactNew->id);

        // Overige gegevens aan persoon hangen
        $this->addAddressToContact($data, $contact);
        $this->addEmailToContact($data, $contact);
        $this->addPhoneNumberToContact($data, $contact);
        $this->addContactNotesToContact($data, $contact);
        $this->addContactToGroup($data, $contact, $ownerAndResponsibleUser);

        return $contact;
    }

    protected function updateContact(Contact $contact, array $data, User $ownerAndResponsibleUser)
    {
        $ownerAndResponsibleUser->occupation = '@webform-update@';
        Auth::setUser($ownerAndResponsibleUser);
        $this->log('Contact verantwoordelijke gebruiker (zelfde als eigenaar) : ' . $ownerAndResponsibleUser->id);

        // Functie voor afvangen ongeldige waarden in title_id
        $titleValidator = function ($titleId) {
            if ($titleId != '') {
                $title = Title::find($titleId);
                if (!$title) $this->error('Ongeldige waarde in titel_id');
                return $title->id;
            }
            return null;
        };

        $isCollectMandate = (bool)$data['is_collect_mandate'];
        if($isCollectMandate){
            if($data['collect_mandate_code'] == '') {
                $data['collect_mandate_code'] = '';
            }
            if($data['collect_mandate_signature_date'] == '') {
                $data['collect_mandate_signature_date'] = Carbon::now();
            }
            if($data['collect_mandate_first_run_date'] == '') {
                $data['collect_mandate_first_run_date'] = Carbon::now()->addMonth(1)->startOfMonth();
            }
            if($data['collect_mandate_collection_schema'] == '') {
                $data['collect_mandate_collection_schema'] = 'core';
            }
        }

        if ($data['organisation_name']) {
            $this->log('Er is een organisatienaam meegegeven; organisatie bijwerken.');

            $contact->update([
                'type_id' => 'organisation',
                'updated_with' => 'webform',
                'did_agree_avg' => (bool)$data['did_agree_avg'],
                'date_did_agree_avg' => $data['date_did_agree_avg'] ? Carbon::make($data['date_did_agree_avg']): null,
                'is_collect_mandate' => $isCollectMandate,
                'collect_mandate_code' => $isCollectMandate ? $data['collect_mandate_code'] : '',
                'collect_mandate_signature_date' => $isCollectMandate ? Carbon::make($data['collect_mandate_signature_date']): null,
                'collect_mandate_first_run_date' => $isCollectMandate ? Carbon::make($data['collect_mandate_first_run_date']): null,
                'collect_mandate_collection_schema' => $isCollectMandate ? 'core' : '',
            ]);
            $iban = $this->checkIban($data['iban'], 'organisatie.');
            if($iban != ''){
                $contact->update([
                    'iban' => $iban,
                ]);
            }
            if($data['iban_attn'] != '') {
                $contact->update([
                    'iban_attn' => $data['iban_attn'],
                ]);
            }

            $contact->organisation->update([
                'name' => $data['organisation_name'],
                'website' => $data['website'],
                'chamber_of_commerce_number' => $data['chamber_of_commerce_number'],
                'vat_number' => $data['vat_number'],
            ]);
            $this->log('Organisatie met id ' . $contact->organisation->id . ' bijgewerkt.');
//
//        if ($data['first_name'] || $data['last_name']) {
//            $contactPerson = Contact::create([
//                'type_id' => 'person',
//                'status_id' => 'webform',
//                'created_with' => 'webform',
//                'owner_id' => $ownerAndResponsibleUser->id,
//            ]);
//
//            $person = Person::create([
//                'contact_id' => $contactPerson->id,
//                'title_id' => $titleValidator($data['title_id']),
//                'initials' => $data['initials'],
//                'first_name' => $data['first_name'],
//                'last_name' => $data['last_name'],
//                'last_name_prefix' => $data['last_name_prefix'],
//                'organisation_id' => $organisation->id,
//                'date_of_birth' => $data['date_of_birth'] ?: null,
//            ]);
//
//            OccupationContact::create([
//                'occupation_id' => 14, // Relatie type "medewerker"
//                'primary_contact_id' => $organisation->contact_id,
//                'contact_id' => $person->contact_id,
//                'primary' => true,
//            ]);
//
//            $this->log('Persoon met id ' . $person->id
//                . ' aangemaakt en gekoppeld aan organisatie als medewerker.');
//
//        }
//
            // Overige gegevens aan organisation hangen
            $this->addEmailToContact($data, $contact);
            $this->addPhoneNumberToContact($data, $contact);
            $this->addContactNotesToContact($data, $contact);
            $this->addContactToGroup($data, $contact, $ownerAndResponsibleUser);
//
            return $contact;
        }

        // Als we hier komen is er geen bedrijfsnaam meegegeven, dan maken we alleen een persoon aan
        $this->log('Er is geen organisatienaam meegegeven; persoon bijwerken.');

        $contact->update([
            'updated_with' => 'webform',
            'did_agree_avg' => (bool)$data['did_agree_avg'],
            'date_did_agree_avg' => $data['date_did_agree_avg'] ? Carbon::make($data['date_did_agree_avg']): null,
            'is_collect_mandate' => (bool)$data['is_collect_mandate'],
            'collect_mandate_code' => $data['is_collect_mandate'] ? $data['collect_mandate_code'] : '',
            'collect_mandate_signature_date' => $data['is_collect_mandate'] ? Carbon::make($data['collect_mandate_signature_date']): null,
            'collect_mandate_first_run_date' => $data['is_collect_mandate'] ? Carbon::make($data['collect_mandate_first_run_date']): null,
            'collect_mandate_collection_schema' => $data['is_collect_mandate'] ? 'core' : '',
        ]);
        $iban = $this->checkIban($data['iban'], 'persoon.');
        if($iban != ''){
            $contact->update([
                'iban' => $iban,
            ]);
        }
        if($data['iban_attn'] != '') {
            $contact->update([
                'iban_attn' => $data['iban_attn'],
            ]);
        }

        $lastName = $data['last_name'];
        if (!$lastName) {
            $emailParts = explode('@', $data['email_address']);
            $lastName = $emailParts[0];
            if ($lastName) $this->log('Geen achternaam meegegeven, achternaam ' . $lastName . ' uit emailadres gehaald.');
            else $this->log('Geen achternaam meegegeven, ook geen achternaam uit emailadres kunnen halen.');
        }
        $contact->person->update([
            'title_id' => $titleValidator($data['title_id']),
            'initials' => $data['initials'],
            'first_name' => $data['first_name'],
            'last_name' => $lastName,
            'last_name_prefix' => $data['last_name_prefix'],
            'date_of_birth' => $data['date_of_birth'] ?: null,
        ]);

        // contact opnieuw ophalen tbv contactwijzigingen via PersonObserver
        $contact = Contact::find($contact->id);

        // Overige gegevens aan persoon hangen
        $this->addEmailToContact($data, $contact);
        $this->addPhoneNumberToContact($data, $contact);
        $this->addContactNotesToContact($data, $contact);
        $this->addContactToGroup($data, $contact, $ownerAndResponsibleUser);

        return $contact;
    }

    protected function addEnergySupplierToAddress(Address $address, $data)
    {
        if ($data['energy_supplier_id'] != '') {
            $this->log('Er is een energie leverancier meegegeven');

            $energySupplier = EnergySupplier::find($data['energy_supplier_id']);
            if (!$energySupplier) {
                $this->error('Ongeldige waarde voor energie leverancier meegegeven.');
            }

            $energySupplierType = EnergySupplierType::find($data['energy_supply_type_id']);
            if (!$energySupplierType) {
                $this->error('Ongeldige waarde voor energie leverancier type meegegeven.');
            }

            $energySupplierStatusId = null;
            if ($data['energy_supplier_id'] != '' && $data['energy_supply_status_id'] != '') {
                $energySupplierStatus
                    = EnergySupplierStatus::find($data['energy_supply_status_id']);
                if (!$energySupplierStatus) {
                    $this->log('Ongeldige waarde voor energie leverancier status meegegeven. Default naar null');
                }else{
                    $energySupplierStatusId = $energySupplierStatus->id;
                }
            }

            if (AddressEnergySupplier::where('address_id', $address->id)->where('energy_supplier_id', $energySupplier->id)->exists()) {
                $this->log('Koppeling met energieleverancier ' . $energySupplier->name . ' bestaat al; niet opnieuw aangemaakt.');
                return;
            }

//            $addressEnergySupplier = AddressEnergySupplier::create([
//                'address_id' => $address->id,
//                'energy_supplier_id' => $energySupplier->id,
//                'es_number' => $data['es_number'],
//                'energy_supply_type_id' => $energySupplierType->id,
//                'member_since' => $data['member_since'] ?: null,
////                'ean_electricity' => $data['ean_electricity'],
//                'energy_supply_status_id' => $energySupplierStatusId,
////                'is_current_supplier' => (bool)$data['is_current_supplier'],
//            ]);
//            $addressEnergySupplier->save();
//            $this->log('Koppeling met energieleverancier ' . $energySupplier->name . ' gemaakt.');

            $addressEnergySupplierData = [
                'address_id' => $address->id,
                'energy_supplier_id' => $energySupplier->id,
                'es_number' => $data['es_number'],
                'energy_supply_type_id' => $energySupplierType->id,
                'member_since' => $data['member_since'] ?: '2000-01-01',
                'energy_supply_status_id' => $energySupplierStatusId,
            ];
            $addressEnergySupplier = new AddressEnergySupplier();
            $addressEnergySupplier->fill($addressEnergySupplierData);
            $addressEnergySupplierController = new AddressEnergySupplierController();
            $response = $addressEnergySupplierController->validateAddressEnergySupplier($addressEnergySupplier, false);

            if($response){
                $this->log('Koppeling met energieleverancier ' . $energySupplier->name . ' NIET gemaakt.');
                $this->log($response);
            } else {
                $addressEnergySupplier->save();
                $this->log('Koppeling met energieleverancier ' . $energySupplier->name . ' gemaakt.');
            }
        } else {
            $this->log('Er is geen energie leverancier meegegeven, niet koppelen.');
        }
    }

    protected function addEnergyConsumptionGasToAddress(Address $address, $data)
    {
        if ($data['date_begin'] != '' || $data['date_end'] != '') {
            $this->log('Er is een verbruiksperiode meegegeven');

            $addressEnergyConsumptionGas = AddressEnergyConsumptionGas::where('address_id', $address->id)->where('date_begin',  Carbon::parse($data['date_begin'])->format('Y-m-d'))->where('date_end',  Carbon::parse($data['date_end'])->format('Y-m-d'));
            if ($addressEnergyConsumptionGas->exists()) {
                $this->log('Verbruik gas gevonden voor periode ' . Carbon::parse($data['date_begin'])->format('d-m-Y') . ' t/m ' . Carbon::parse($data['date_end'])->format('d-m-Y') . ', deze worden bijgewerkt.');
                //update
                $addressEnergyConsumptionGas->update([
                    'consumption' => $data['consumption'] ?: 0,
                    'proposed_variable_rate' => $data['proposed_variable_rate'] ?: 0,
                    'proposed_fixed_rate' => $data['proposed_fixed_rate'] ?: 0,
                    'total_variable_costs' => $data['total_variable_costs'] ?: 0,
                    'total_fixed_costs' => $data['total_fixed_costs'] ?: 0,
                ]);
            } else {
                $addressEnergyConsumptionGasCheck = AddressEnergyConsumptionGas::where('address_id', $address->id)
                    ->where(function ($query) use ($data) {
                        $query->whereBetween('date_begin', [$data['date_begin'], $data['date_end']])
                            ->orWhereBetween('date_end', [$data['date_begin'], $data['date_end']]);
                    });

                if ($addressEnergyConsumptionGasCheck->exists()) {
                    $this->log('Verbruik gas voor periode ' . Carbon::parse($data['date_begin'])->format('d-m-Y') . ' t/m ' . Carbon::parse($data['date_end'])->format('d-m-Y') . ' overlapt met een andere verbruikperiode, deze gegevens worden NIET verwerkt.');
                }else{
                    //create new
                    AddressEnergyConsumptionGas::create([
                        'address_id' => $address->id,
                        'date_begin' => Carbon::parse($data['date_begin'])->format('Y-m-d'),
                        'date_end' => Carbon::parse($data['date_end'])->format('Y-m-d'),
                        'consumption' => $data['consumption'] ?: 0,
                        'proposed_variable_rate' => $data['proposed_variable_rate'] ?: 0,
                        'proposed_fixed_rate' => $data['proposed_fixed_rate'] ?: 0,
                        'total_variable_costs' => $data['total_variable_costs'] ?: 0,
                        'total_fixed_costs' => $data['total_fixed_costs'] ?: 0,
                    ]);

                }

            }

        } else {
            $this->log('Er is geen verbruiksperiode meegegeven, kan geen gas verbruik vastleggen');
        }
    }

    protected function addEnergyConsumptionElectricityToAddress(Address $address, $data)
    {
        if ($data['date_begin'] != '' || $data['date_end'] != '') {
            $this->log('Er is een verbruiksperiode meegegeven');

            $addressEnergyConsumptionElectricity = AddressEnergyConsumptionElectricity::where('address_id', $address->id)->where('date_begin',  Carbon::parse($data['date_begin'])->format('Y-m-d'))->where('date_end',  Carbon::parse($data['date_end'])->format('Y-m-d'));
            if ($addressEnergyConsumptionElectricity->exists()) {
                $this->log('Verbruik electriciteit gevonden voor periode ' . Carbon::parse($data['date_begin'])->format('d-m-Y') . ' t/m ' . Carbon::parse($data['date_end'])->format('d-m-Y') . ', deze worden bijgewerkt.');
                //update
                $addressEnergyConsumptionElectricity->update([
                    'consumption_high' => $data['consumption_high'] ?: 0,
                    'consumption_low' => $data['consumption_low'] ?: 0,
                    'return_high' => $data['return_high'] ?: 0,
                    'return_low' => $data['return_low'] ?: 0,
                    'proposed_variable_rate_high' => $data['proposed_variable_rate_high'] ?: 0,
                    'proposed_variable_rate_low' => $data['proposed_variable_rate_low'] ?: 0,
                    'proposed_fixed_rate_high' => $data['proposed_fixed_rate_high'] ?: 0,
                    'proposed_fixed_rate_low' => $data['proposed_fixed_rate_low'] ?: 0,
                    'total_variable_costs_high' => $data['total_variable_costs_high'] ?: 0,
                    'total_variable_costs_low' => $data['total_variable_costs_low'] ?: 0,
                    'total_fixed_costs_high' => $data['total_fixed_costs_high'] ?: 0,
                    'total_fixed_costs_low' => $data['total_fixed_costs_low'] ?: 0,
                ]);
            } else {
                $addressEnergyConsumptionElectricityCheck = AddressEnergyConsumptionElectricity::where('address_id', $address->id)
                    ->where(function ($query) use ($data) {
                        $query->whereBetween('date_begin', [$data['date_begin'], $data['date_end']])
                            ->orWhereBetween('date_end', [$data['date_begin'], $data['date_end']]);
                    });

                if ($addressEnergyConsumptionElectricityCheck->exists()) {
                    $this->log('Verbruik electriciteit voor periode ' . Carbon::parse($data['date_begin'])->format('d-m-Y') . ' t/m ' . Carbon::parse($data['date_end'])->format('d-m-Y') . ' overlapt met een andere verbruikperiode, deze gegevens worden NIET verwerkt.');
                }else{
                    //create new
                    AddressEnergyConsumptionElectricity::create([
                        'address_id' => $address->id,
                        'date_begin' => Carbon::parse($data['date_begin'])->format('Y-m-d'),
                        'date_end' => Carbon::parse($data['date_end'])->format('Y-m-d'),
                        'consumption_high' => $data['consumption_high'] ?: 0,
                        'consumption_low' => $data['consumption_low'] ?: 0,
                        'return_high' => $data['return_high'] ?: 0,
                        'return_low' => $data['return_low'] ?: 0,
                        'proposed_variable_rate_high' => $data['proposed_variable_rate_high'] ?: 0,
                        'proposed_variable_rate_low' => $data['proposed_variable_rate_low'] ?: 0,
                        'proposed_fixed_rate_high' => $data['proposed_fixed_rate_high'] ?: 0,
                        'proposed_fixed_rate_low' => $data['proposed_fixed_rate_low'] ?: 0,
                        'total_variable_costs_high' => $data['total_variable_costs_high'] ?: 0,
                        'total_variable_costs_low' => $data['total_variable_costs_low'] ?: 0,
                        'total_fixed_costs_high' => $data['total_fixed_costs_high'] ?: 0,
                        'total_fixed_costs_low' => $data['total_fixed_costs_low'] ?: 0,
                    ]);

                }

            }

        } else {
            $this->log('Er is geen verbruiksperiode meegegeven, kan geen electriciteit verbruik vastleggen');
        }
    }

    protected function addIntakeToAddress(Address $address, array $data, Webform $webform)
    {
        if ($data['campaign_id']) {

            // Voor aanmaak van Intake, Opportunity en/of QuotationRequest worden created by and updated by via observers altijd bepaald obv Auth::id
            // Die moeten we eerst even setten als we dus hier vanuit webform komen.
            $responsibleUser = User::find($webform->responsible_user_id);
            if($responsibleUser){
                Auth::setUser($responsibleUser);
                $this->log('Intake verantwoordelijke gebruiker : ' . $webform->responsible_user_id);
            }else{
                $responsibleTeam = Team::find($webform->responsible_team_id);
                if($responsibleTeam && $responsibleTeam->users ){
                    $teamFirstUser = $responsibleTeam->users->first();
                    Auth::setUser($teamFirstUser);
                    $this->log('Intake verantwoordelijke gebruiker : ' . $teamFirstUser->id);
                }else{
                    $this->log('Intake verantwoordelijke gebruiker : onbekend');
                }
            }

            $this->log('Er is een campagne meegegeven, intake aanmaken.');
            $campaign = Campaign::find($data['campaign_id']);
            if (!$campaign) $this->error('Er is een ongeldige waarde voor campagne meegegeven.');

            $intakeStatus = IntakeStatus::find($data['status_id']);
            if (!$intakeStatus) {
                $this->log('Er is geen bekende waarde voor intake status meegegeven, default naar "open"');
                $intakeStatus = IntakeStatus::find(1);
            }

            $reasons = IntakeReason::whereIn('id', explode(',', $data['reason_ids']))->get();
            $sources = IntakeSource::whereIn('id', explode(',', $data['source_ids']))->get();
            $intakeMeasures = Measure::whereIn('id', explode(',', $data['measure_ids']))->get();
            $measure = Measure::find($data['measure_id']);
            if ($intakeMeasures && count($intakeMeasures)>0 ){
                $measureCategories = MeasureCategory::whereIn('id', array_unique($intakeMeasures->pluck('measure_category_id')->toArray() ) )->get();
            } elseif ($measure) {
                $measureCategories = MeasureCategory::where('id', $measure->measure_category_id)->get();
            } else {
                $measureCategories = MeasureCategory::whereIn('id', explode(',', $data['measure_categorie_ids']))->get();
            }

            $intake = Intake::make([
                'contact_id' => $address->contact->id,
                'intake_status_id' => $intakeStatus->id,
                'campaign_id' => $campaign->id,
                'note' => $data['note'],
            ]);
            $intake->address_id = $address->id;
            $intake->save();
            $this->log("Intake met id " . $intake->id . " aangemaakt en gekoppeld aan adres id " . $address->id . ".");

            $intake->reasons()->sync($reasons->pluck('id'));
            $this->log("Intake gekoppeld aan motivaties: " . $reasons->implode('name', ', '));

            $intake->sources()->sync($sources->pluck('id'));
            $this->log("Intake gekoppeld aan aanmeldingsbronnen: " . $sources->implode('name', ', '));

            $intake->measuresRequested()->sync($measureCategories->pluck('id'));
            $this->log("Intake gekoppeld aan interesses: " . $measureCategories->implode('name', ', '));

            $statusIdClosedWithOpportunity = IntakeStatus::where('name', 'Afgesloten met kans')->first()->id;

            // Intake maatregelen meegegeven, aanmaken kansen (per intake maatregel)
            foreach ($intakeMeasures as $intakeMeasure) {
                $this->log("Intake maatregelen meegegeven. Kans voor intake maatregel specifiek '" . $intakeMeasure->name . "' aanmaken (status Actief)");
                $opportunity = $this->addOpportunity($intakeMeasure, $intake);
            }
            // precies 1 intake maatregel, dan aangemaakte kans straks koppelen aan taak.
            if(count($intakeMeasures) == 1 && $opportunity != null){
                $this->opportunityForTask = $opportunity;
            }

            // indien intake status 'Afgesloten met kans' en er is specifieke maatregel meegegeven, dan ook meteen kans aanmaken.
            if($measure && $intakeStatus->id == $statusIdClosedWithOpportunity){
                $this->log("Intake status 'Afgesloten met kans' meegegeven. Kans voor maatregel specifiek '" . $measure->name . "' aanmaken (status Actief)");
                $opportunity = $this->addOpportunity($measure, $intake);
                // deze aangemaakte kans straks koppelen aan taak (overschrijft dus evt. de "los" meegegeven intake maatregel.
                if($opportunity != null){
                    $this->opportunityForTask = $opportunity;
                }
            }

            // Indien geen intake maatregelen zijn mee gegeven (niet via intake_maatregel_ids en niet via intake_maatregel_id),
            // dan nog wel interesses doorlopen voor check of er een workflow intake maatregel van toepassing is.
            if((!$intakeMeasures || count($intakeMeasures) == 0) && !$measure) {
                $this->log("Intake interesses meegegeven. Check op workflow intake per interesse");
                // check workflow maak kans voor interesses (maatregel categorieen). indien aan, maak kans (en vandaar uit wellicht ook nog offerteverzoek)
                foreach ($measureCategories as $measureCategory) {
                    if ($measureCategory->uses_wf_create_opportunity) {
                        $this->log("Intake interesse (maatregel categorie) '" . $measureCategory->name . " heeft workflow kans maken. Deze uitvoeren");
                        $intakeWorkflowHelper = new IntakeWorkflowHelper($intake, $measureCategory);
                        $intakeWorkflowHelper->processWorkflowCreateOpportunity();
                    }
                }
            }
            return $intake;
        } else {
            $this->log('Er is geen campagne meegegeven, intake niet aanmaken.');
        }
    }

    /**
     * @param $measure
     * @param $intake
     */
    protected function addOpportunity($measure, $intake)
    {
        $statusOpportunity = OpportunityStatus::where('name', 'Actief')->first()->id;
        $opportunity = null;
        if($statusOpportunity) {
            $opportunity = Opportunity::create([
                'measure_category_id' => $measure->measureCategory->id,
                'status_id' => $statusOpportunity,
                'intake_id' => $intake->id,
                'quotation_text' => '',
                'desired_date' => null,
                'evaluation_agreed_date' => null,
            ]);
            $opportunity->measures()->sync($measure->id);
            $this->log("Kans met id " . $opportunity->id . " aangemaakt met maatregel categorie '" . $measure->measureCategory->name . "' en maatregel specifiek '" . $measure->name . "' en gekoppeld aan intake id " . $intake->id . ".");
        } else {
            $this->log('Er is geen kans status "Actief" gevonden, kans niet aangemaakt.');
        }
        return $opportunity;
    }

    protected function addHousingFileToAddress(Address $address, array $data, Webform $webform)
    {
        if($data['building_type_id'] == ''
            && $data['build_year'] == ''
            && $data['is_house_for_sale'] == ''
            && $data['surface'] == ''
            && $data['roof_type_id'] == ''
            && $data['energy_label_id'] == ''
            && $data['floors'] == ''
            && $data['energy_label_status_id'] == ''
            && $data['is_monument'] == ''
            && $data['measure_ids'] == ''
            && $data['measure_dates'] == ''
            && $data['number_of_residents'] == ''
            && $data['revenue_solar_panels'] == ''
            && $data['remark'] == ''
        ){
            $this->log('Er zijn geen woondossiergegevens meegegeven.');
            return null;
        }

        // Voor aanmaak van Housing file wordt created by and updated by via HousingFileObserver altijd bepaald obv Auth::id
        // Die moeten we eerst even setten als we dus hier vanuit webform komen.
        $responsibleUser = User::find($webform->responsible_user_id);
        if($responsibleUser){
            Auth::setUser($responsibleUser);
            $this->log('Woondossier verantwoordelijke gebruiker : ' . $webform->responsible_user_id);
        }else{
            $responsibleTeam = Team::find($webform->responsible_team_id);
            if($responsibleTeam && $responsibleTeam->users ){
                $teamFirstUser = $responsibleTeam->users->first();
                Auth::setUser($teamFirstUser);
                $this->log('Woondossier verantwoordelijke gebruiker : ' . $teamFirstUser->id);
            }else{
                $this->log('Woondossier verantwoordelijke gebruiker : onbekend');
            }
        }

        $buildYear = null;
        if (isset($data['build_year']) && is_numeric($data['build_year']) && (1500 <= $data['build_year']) && ($data['build_year'] <= 3000) ) {
            $buildYear = $data['build_year'];
        }

        $buildingType = BuildingType::find($data['building_type_id']);
        if (!$buildingType) {
            $this->log('Er is geen bekende waarde voor woning type meegegeven, default naar "geen"');
            $buildingType = null;
        }

        $eneryLabel = EnergyLabel::find($data['energy_label_id']);
        if (!$eneryLabel) {
            $this->log('Er is geen bekende waarde voor energie label meegegeven, default naar "geen"');
            $eneryLabel = null;
        }

        $eneryLabelStatus = EnergyLabelStatus::find($data['energy_label_status_id']);
        if (!$eneryLabelStatus) {
            $this->log('Er is geen bekende waarde voor status energie label meegegeven, default naar "geen"');
            $eneryLabelStatus = null;
        }

        $rofeType = RoofType::find($data['roof_type_id']);
        if (!$rofeType) {
            $this->log('Er is geen bekende waarde voor dak type meegegeven, default naar "geen"');
            $rofeType = null;
        }

        $measures = Measure::whereIn('id', explode(',', $data['measure_ids']))->get();
        $measureDates = explode(',', $data['measure_dates']);

        $housingFile = HousingFile::where('address_id', $address->id)->orderBy('id', 'desc')->first();
        // Nog geen woondossier op adres, nieuw aanmaken
        if (!$housingFile) {
            $this->log('Er is geen woondossier gevonden op adres met postcode: ' . ($address->postal_code . ' nummer: ' . $address->number . ' toevoeging: ' . $address->addition ) .'. woondossier aanmaken.');

            $housingFile = HousingFile::create([
                'address_id' =>  $address->id,
                'building_type_id' => $buildingType ? $buildingType->id : null,
                'build_year' => $buildYear ? $buildYear : null,
                'is_house_for_sale' => $data['is_house_for_sale'] == '0' ? false : true,
                'surface' => is_numeric($data['surface']) ? $data['surface'] : null,
                'roof_type_id' => $rofeType ? $rofeType->id : null,
                'energy_label_id' => $eneryLabel ? $eneryLabel->id : null,
                'floors' => is_numeric($data['floors']) ? $data['floors'] : null,
                'energy_label_status_id' => $eneryLabelStatus ? $eneryLabelStatus->id : null,
                'is_monument' => $data['is_monument'] == '1' ? true : false,
                'number_of_residents' => is_numeric($data['number_of_residents']) ? $data['number_of_residents'] : 0,
                'revenue_solar_panels' => is_numeric($data['revenue_solar_panels']) ? $data['revenue_solar_panels'] : 0,
                'remark' => $data['remark'],
            ]);
            $this->log("Woondossier met id " . $housingFile->id . " aangemaakt en gekoppeld aan adres id " . $address->id . ".");

            if($measures){
                if(!$data['measure_dates'] || !isset($data['measure_dates']) ){
                    $this->log('Er zijn geen datum(s) realisaties meegegeven.');
                }

                foreach ($measures as $key=>$measure) {
                    if(!$data['measure_dates'] || !isset($data['measure_dates']) ){
                        $address->measuresTaken()->attach($measure->id, ['measure_date' => null]);
                    }else{
                        $address->measuresTaken()->attach($measure->id, ['measure_date' => $measureDates[$key]]);
                    }
                }
            } else {
                $this->log("Er zijn geen maatregelen opgenomen voor woondossier.");
            }

            return $housingFile;
        } else {
            $this->log('Er is een woondossier met ' . $housingFile->id . ' gevonden op adres met postcode: ' . ($address->postal_code . ' nummer: ' . $address->number . ' toevoeging: ' . $address->addition ) .'. woondossier bijwerken.');

            $housingFile->building_type_id = $buildingType ? $buildingType->id : null;
            $housingFile->build_year = $buildYear ? $buildYear : null;
            $housingFile->is_house_for_sale = $data['is_house_for_sale'] == '0' ? false : true;
            $housingFile->surface = is_numeric($data['surface']) ? $data['surface'] : null;
            $housingFile->roof_type_id = $rofeType ? $rofeType->id : null;
            $housingFile->energy_label_id = $eneryLabel ? $eneryLabel->id : null;
            $housingFile->floors = is_numeric($data['floors']) ? $data['floors'] : null;
            $housingFile->energy_label_status_id = $eneryLabelStatus ? $eneryLabelStatus->id : null;
            $housingFile->is_monument = $data['is_monument'] == '1' ? true : false;
            $housingFile->number_of_residents = is_numeric($data['number_of_residents']) ? $data['number_of_residents'] : 0;
            $housingFile->revenue_solar_panels = is_numeric($data['revenue_solar_panels']) ? $data['revenue_solar_panels'] : 0;
            $housingFile->remark = $data['remark'];
            $housingFile->save();
            $this->log("Woondossier met id " . $housingFile->id . " is gewijzigd voor adres id " . $address->id . ".");

            if(isset($measures)){
                if(!$data['measure_dates'] || !isset($data['measure_dates']) ){
                    $this->log('Er zijn geen datum(s) realisaties meegegeven.');
                }
                foreach ($measures as $key=>$measure) {
                    if(!$address->measuresTaken()->where('measure_id', $measure->id)->exists()){
                        if(!$data['measure_dates'] || !isset($data['measure_dates']) ){
                            $address->measuresTaken()->attach($measure->id, ['measure_date' => null]);
                        }else{
                            $address->measuresTaken()->attach($measure->id, ['measure_date' => $measureDates[$key]]);
                        }
                    }
                }
            } else {
                $this->log("Er zijn geen maatregelen opgenomen voor woondossier.");
            }

            return $housingFile;
        }
    }

    protected function addParticipationToContact(Contact $contact, array $data, Webform $webform )
    {
        if ($data['project_id']) {
            $this->log('Er is een project meegegeven, participatie aanmaken.');
            $project = Project::find($data['project_id']);
            if (!$project) $this->error('Er is een ongeldige waarde voor project meegegeven.');

            // Check address
            if($contact->addressForPostalCodeCheck){
                $addressHelper = new AddressHelper($contact, $contact->addressForPostalCodeCheck);
                $checkAddressOk = $addressHelper->checkAddress($project->id, false);
                if(!$checkAddressOk){
                    $note = "Webformulier " . $this->webform->name . ".\n\n";
                    $note .= "Deelname kan niet worden aangemaakt voor contact " . $this->contact->full_name . " (" . $this->contact->number . ")  vanwege volgende fouten:\n";
                    $note .= implode("\n", $addressHelper->messages);
                    $this->addTaskCheckContact($this->responsibleIds, $this->contact, $this->webform, $note);

                    $this->log('Deelname kan niet worden aangemaakt vanwege volgende fouten:');
                    $this->log(implode(';', $addressHelper->messages));
                    return null;
                }
            }

            // Voor aanmaak van Participant Mutations wordt created by and updated by via ParticipantMutationObserver altijd bepaald obv Auth::id
            // Die moeten we eerst even setten als we dus hier vanuit webform komen.
            $responsibleUser = User::find($webform->responsible_user_id);

            if($responsibleUser){
                $responsibleUser->occupation = '@webform-update@';
                Auth::setUser($responsibleUser);
                $this->log('Deelname mutatie verantwoordelijke gebruiker : ' . $webform->responsible_user_id);
            }else{
                $responsibleTeam = Team::find($webform->responsible_team_id);
                if($responsibleTeam && $responsibleTeam->users ){
                    $teamFirstUser = $responsibleTeam->users->first();
                    $teamFirstUser->occupation = '@webform-update@';
                    Auth::setUser($teamFirstUser);
                    $this->log('Deelname mutatie verantwoordelijke gebruiker : ' . $teamFirstUser->id);
                }else{
                    $this->log('Deelname mutatie verantwoordelijke gebruiker : onbekend');
                }
            }

            $ibanPayout = $this->checkIban($data['iban_payout'], 'participatie.');
            $projectTypeCodeRef = $project->projectType->code_ref;
            $payoutTypeId = null;
            switch($projectTypeCodeRef){
                case 'loan' :
                    $payoutType = ParticipantProjectPayoutType::find($data['payout_type_id']);
                    if (!$payoutType) {
                        $payoutType = ParticipantProjectPayoutType::where('code_ref', 'account')->first();
                        $this->log('Geen bekende waarde voor deelname uitkeren op meegegeven, default naar '
                            . $payoutType->value('name') . '.');
                    }
                    $payoutTypeId = $payoutType->id;
                    break;
                case 'obligation' :
                    $payoutTypeId = ParticipantProjectPayoutType::where('code_ref', 'account')->value('id');
                    break;
            }

            $participation = ParticipantProject::create([
                'created_with' => 'webform',
                'contact_id' => $contact->id,
                'address_id' => $contact->addressForPostalCodeCheck->id,
                'project_id' => $project->id,
                'iban_payout' => $ibanPayout,
                'iban_payout_attn' => $data['iban_payout_attn'],
                'power_kwh_consumption' => $data['power_kwh_consumption'] == '' ? 0 : $data['power_kwh_consumption'],
                'type_id' => $payoutTypeId,
                'did_accept_agreement' => (bool)$data['did_accept_agreement'],
                'date_did_accept_agreement' => Carbon::make($data['date_did_accept_agreement']),
                'did_understand_info' => (bool)$data['did_understand_info'],
                'date_did_understand_info' => Carbon::make($data['date_did_understand_info']),
            ]);

            $this->log('Participatie aangemaakt met id ' . $participation->id . '.');

            $status = ParticipantMutationStatus::find($data['participation_mutation_status_id']);
            if (!$status) {
                $status = ParticipantMutationStatus::where('code_ref', 'interest')->first();
                $this->log('Geen bekende waarde voor participatie status id meegegeven, default naar ' . $status->name . '.');
            }

            $dateInterest = null;
            $amountInterest = null;
            $quantityInterest = null;
            $dateOption = null;
            $amountOption = null;
            $quantityOption = null;
            $dateGranted = null;
            $amountGranted = null;
            $quantityGranted = null;
            $dateFinal = null;
            $amountFinal = null;
            $quantityFinal = null;
            $participation_mutation_date = $data['participation_mutation_date'] ?: Carbon::today()->format('Y-m-d');
            $participation_mutation_amount = $data['participation_mutation_amount'] ?: null;
            $participation_mutation_quantity = $data['participation_mutation_quantity'] ?: null;

            switch($status->code_ref){
                case 'interest' :
                    $dateInterest = $participation_mutation_date;
                    if($projectTypeCodeRef == 'loan'){
                        $amountInterest = $participation_mutation_amount;
                    } else {
                        $quantityInterest = $participation_mutation_quantity;
                    }
                    break;
                case 'option' :
                    $dateOption = $participation_mutation_date;
                    if($projectTypeCodeRef == 'loan'){
                        $amountOption = $participation_mutation_amount;
                    } else {
                        $quantityOption = $participation_mutation_quantity;
                    }
                    break;
                case 'granted' :
                    $dateGranted = $participation_mutation_date;
                    if($projectTypeCodeRef == 'loan'){
                        $amountGranted = $participation_mutation_amount;
                    } else {
                        $quantityGranted = $participation_mutation_quantity;
                    }
                    break;
                case 'final' :
                    $dateFinal = $participation_mutation_date;
                    if($projectTypeCodeRef == 'loan'){
                        $amountFinal = $participation_mutation_amount;
                    } else {
                        $quantityFinal = $participation_mutation_quantity;
                    }
                    break;
            }

            $participantMutation = ParticipantMutation::create([
                'participation_id' => $participation->id,
                'created_with' => 'webform',
                'type_id' => ParticipantMutationType::where('project_type_id', $project->project_type_id)->where('code_ref', 'first_deposit')->value('id'),
                'status_id' => $status->id,
                'payment_reference' => $data['participation_mutation_payment_reference'],
                'date_payment' => Carbon::make($data['participation_mutation_date_payment']),
                'date_contract_retour' => Carbon::make($data['participation_mutation_date_contract_retour']),
                'amount' => $projectTypeCodeRef == 'loan' ? $participation_mutation_amount : null,
                'quantity' => $participation_mutation_quantity,
                'date_interest' => $dateInterest,
                'amount_interest' => $amountInterest,
                'quantity_interest' => $quantityInterest,
                'date_option' => $dateOption,
                'amount_option' => $amountOption,
                'quantity_option' => $quantityOption,
                'date_granted' => $dateGranted,
                'amount_granted' => $amountGranted,
                'quantity_granted' => $quantityGranted,
                'date_entry' => $dateFinal,
                'amount_final' => $amountFinal,
                'quantity_final' => $quantityFinal,
            ]);

            $this->log('Participant mutation aangemaakt met id ' . $participantMutation->id . '.');

            // Recalculate dependent data in participantProject
            $participantMutation->participation->calculator()->run()->save();
            $this->log('Participant project bijgewerkt met id ' . $participantMutation->participation->id . '.');

            // Recalculate dependent data in project
            $participantMutation->participation->project->calculator()->run()->save();
            $this->log('Project bijgewerkt met id ' . $participantMutation->participation->project->id . '.');

            return $participation;
        } else {
            $this->log('Er is geen project meegegeven, geen participatie aanmaken.');
            return null;
        }
    }

    protected function addContactToGroup(array $data, Contact $contact, $ownerAndResponsibleUser)
    {
        if ($data['group_name']) {
            $this->log('Er is een contact groep meegegeven, groep koppelen.');

            $contactGroup = ContactGroup::where('name', $data['group_name'])->first();

            if (!$contactGroup) {
                $this->log('Groep met naam ' . $data['group_name'] . ' is niet gevonden, geen groep gekoppeld.');
                return;
            }

            if ($contactGroup->type_id != 'static') {
                $this->log('Een contact kan alleen aan een statische groep worden gekoppeld, geen groep gekoppeld.');
                return;
            }

            if($contactGroup->contacts()->where('contact_id', $contact->id)->exists()){
                $this->log('Groep ' . $data['group_name'] . ' al gekoppeld aan: ' . $contact->id );
            }else{
                $contactGroup->contacts()->syncWithoutDetaching([ $contact->id => ['member_created_at' => \Illuminate\Support\Carbon::now(), 'member_to_group_since' => Carbon::now()]]);

                $this->contactGroup = $contactGroup;
                $this->log('Contact ' . $contact->id . ' aan groep ' . $data['group_name'] . ' gekoppeld.');

                if($contactGroup->laposta_list_id){
                    Auth::setUser($ownerAndResponsibleUser);
                    $this->log('Laposta contact groep verantwoordelijke gebruiker (zelfde als eigenaar) : ' . $ownerAndResponsibleUser->id);
                    $lapostaMemberHelper = new LapostaMemberHelper($contactGroup, $contact, false);
                    $lapostaMemberId = $lapostaMemberHelper->createMember();
                    $this->log('Contact ' . $contact->id . ' als laposta relatie ' . $lapostaMemberId . ' aangemaakt.');
                }

                if($contactGroup->send_email_new_contact_link){
                    $this->contactIdToEmailNewContactToGroup = $contact->id;
                    $this->processEmailNewContactToGroup = true;
                }
            }
        }

        if($data['contact_group_ids']){
            $contactGroups = ContactGroup::whereIn('id', explode(',', $data['contact_group_ids']))->get();
            if ($contactGroups->count() > 0) {
                $this->log('Er is 1 of meerdere contactgroep meegegeven, groep(en) koppelen.');

                foreach ($contactGroups as $contactGroup)
                {
                    if ($contactGroup->type_id != 'static') {
                        $this->log('Een contact kan alleen aan een statische groep worden gekoppeld, groep ' . $contactGroup->group_name . ' niet gekoppeld aan contact ' . $contact->id . '.');
                    }else{
                        if($contactGroup->contacts()->where('contact_id', $contact->id)->exists()){
                            $this->log('Groep ' . $data['group_name'] . ' al gekoppeld aan: ' . $contact->id );
                        }else {
                            $contactGroup->contacts()->syncWithoutDetaching([ $contact->id => ['member_created_at' => \Illuminate\Support\Carbon::now(), 'member_to_group_since' => Carbon::now()]]);
                            $this->log('Contact ' . $contact->id . ' aan groep ' . $contactGroup->name . ' gekoppeld.');

                            if($contactGroup->laposta_list_id){
                                Auth::setUser($ownerAndResponsibleUser);
                                $this->log('Laposta contact groep verantwoordelijke gebruiker (zelfde als eigenaar) : ' . $ownerAndResponsibleUser->id);
                                $lapostaMemberHelper = new LapostaMemberHelper($contactGroup, $contact, false);
                                $lapostaMemberId = $lapostaMemberHelper->createMember();
                                $this->log('Contact ' . $contact->id . ' als laposta relatie ' . $lapostaMemberId . ' aangemaakt.');
                            }

                            if ($contactGroup->send_email_new_contact_link) {
                                $this->contactIdToEmailNewContactToGroup = $contact->id;
                                $this->processEmailNewContactToGroup = true;
                            }
                        }
                    }
                }
                $this->contactGroups = $contactGroups;
            } else {
                $this->log('Er is geen contact groep meegegeven, geen groep koppelen.');
            }
        }

        if (!$data['group_name'] && !$data['contact_group_ids']) {
            $this->log('Er is geen contact groep meegegeven, geen groep koppelen.');
        }
    }

    protected function doProcessEmailNewContactToGroup(array $data)
    {
        $contactToEmailNewContactGroup = Contact::find($this->contactIdToEmailNewContactToGroup);
        if ($data['group_name']) {
            $contactGroup = ContactGroup::where('name', $data['group_name'])->first();
            if($contactGroup->send_email_new_contact_link){
                $contactGroupHelper = new ContactGroupHelper($contactGroup, $contactToEmailNewContactGroup);
                $processed = $contactGroupHelper->processEmailNewContactToGroup();
                if($processed){
                    $this->log('Email verzonden naar ' . $this->contactIdToEmailNewContactToGroup);
                }
            }
        }

        if($data['contact_group_ids']){
            $contactGroups = ContactGroup::whereIn('id', explode(',', $data['contact_group_ids']))->get();
            foreach ($contactGroups as $contactGroup)
            {
                if ($contactGroup->send_email_new_contact_link) {
                    $contactGroupHelper = new ContactGroupHelper($contactGroup, $contactToEmailNewContactGroup);
                    $processed = $contactGroupHelper->processEmailNewContactToGroup();
                    if ($processed) {
                        $this->log('Email verzonden naar ' . $this->contactIdToEmailNewContactToGroup);
                    }
                }
            }
        }
    }

    protected function addTaskToContact(Contact $contact, array $responsibleIds, array $data, Webform $webform, Intake $intake = null, HousingFile $housingFile = null, ParticipantProject $participation = null, Order $order = null)
    {
        // Default date planned finish
        $datePlannedFinish = null;

        // When date planned finish filled in
        if($data['date_planned_finish']) {
            // Default requested date planned finish
            $datePlannedFinish = Carbon::make($data['date_planned_finish']);
        }
        // When days planned finish filled in
        elseif(strlen( $data['days_planned_finish'] ) > 0) {
            // Default today + requested days planned finish
            $today = Carbon::today();
            $datePlannedFinish = $today->addDay($data['days_planned_finish']);
            $this->log('Datum einddatum bepaald op : ' . $datePlannedFinish);
        }

        // When date of days planned finish was requested
        if($datePlannedFinish)
        {
            // Only dates in future allowed. If not, then change date planned finish to tomorrow.
            if($datePlannedFinish < Carbon::tomorrow())
            {
                $datePlannedFinish = Carbon::tomorrow();
                $this->log('Gewijzigd naar datum morgen: ' . $datePlannedFinish);
            }
            $this->log('Dagcode van de week: ' . $datePlannedFinish->dayOfWeekIso );
            // If date planned finish in weekend, then change date to first monday after date planned finish.
            if($datePlannedFinish->dayOfWeekIso > 5 )
            {
                $monday = $datePlannedFinish->startOfWeek();
                $datePlannedFinish = $monday->addWeek(1);
                $this->log('Gewijzigd naar datum eerst volgende maandag: ' . $datePlannedFinish);
            }

        }

        $opportunityForTaskId = null;
        if($this->opportunityForTask) {
            $opportunityForTaskId = $this->opportunityForTask->id;
        }

        if($intake){
            // Opmerking intake
            $note = $webform->name . " - Nieuwe intake.\n";

            if(count($intake->reasons)>0) {
                $note .= "Gekoppeld aan motivaties: " . ( implode(', ', $intake->reasons->pluck('name' )->toArray() ) ) . ".\n";
            }

            if(count($intake->sources)>0) {
                $note .= "Gekoppeld aan aanmeldingsbronnen: " . ( implode(', ', $intake->sources->pluck('name' )->toArray() ) ) . ".\n";
            }

            if(count($intake->measuresRequested)>0) {
                $note .= "Gekoppeld aan interesses: " . ( implode(', ', $intake->measuresRequested->pluck('name' )->toArray() ) ) . ".\n";
            }
            if(count($intake->opportunities)>0) {
                foreach($intake->opportunities as $opportunity){
                    if(count($opportunity->measures)>0){
                        $note .= "Met kans maatregelen specifiek: " . ( implode(', ', $opportunity->measures->pluck('name' )->toArray() ) ) . ".\n";
                    }else{
                        $note .= "Met kans maatregel categorie: " . ( $opportunity->measureCategory ? $opportunity->measureCategory->name :'' ) . ".\n";
                    }
                }
            }
            if(!empty($intake->note)) {
                $note .= "Opmerkingen bewoner: " . ( $intake->note ) . ".\n\n";
            }

        }else{
            // Opmerking webformulier indien geen intake.
            $note = "Webformulier " . $webform->name . ".\n\n";
        }

        // Opmerkingen over eventuele ongeldige ibans toevoegen als notitie aan taak
        if($data['note']) $note .= $data['note'] . "\n\n";
        $note .= implode("\n", $this->taskErrors);

        $contactGroupId = null;
        if ($this->contactGroup) {
            $contactGroupId = $this->contactGroup->id;
            $note .= "Contact is aan groep " . $this->contactGroup->name . " gekoppeld.\n\n";
        }elseif($this->contactGroups && $this->contactGroups->count() == 1 ){
            $contactGroupId = $this->contactGroups[0]->id;
            $note .= "Contact is aan groep " . $this->contactGroups[0]->name . " gekoppeld.\n\n";
        }elseif($this->contactGroups && $this->contactGroups->count() > 1 )
            if ($this->contactGroups && $this->contactGroups->count() > 0) {
                $note .= "Contact is aan meerdere groepen gekoppeld.\n\n";
            }

        $taskTypeId = $data['type_id'];
        $taskType = TaskType::find($taskTypeId);
        if (!$taskType) {
            $taskTypeId = 6;
            $taskType = TaskType::find($taskTypeId);
            $this->log('Geen bekende waarde voor taak_type_id (' . $data['type_id'] . ') meegegeven, default naar ' . $taskTypeId . ' ' . $taskType->name . '.');
        }

        if($responsibleIds['responsible_user_id']) {
            $responsibleUserId = $responsibleIds['responsible_user_id'];
            $responsibleTeamId = null;
        }elseif($responsibleIds['responsible_team_id']) {
            $responsibleUserId = null;
            $responsibleTeamId = $responsibleIds['responsible_team_id'];
        }else{
            $responsibleUserId = $webform->responsible_user_id;
            $responsibleTeamId = $webform->responsible_team_id;
        }

        $this->log('Taak verantwoordelijke gebruiker : ' . $responsibleUserId);
        $this->log('Taak verantwoordelijke team : ' . $responsibleTeamId);

        $task = Task::create([
            'note' => $note,
            'type_id' => $taskTypeId,
            'contact_id' => $contact->id,
            'contact_group_id' => $contactGroupId,
            'finished' => $data['finished'] ? (bool)$data['finished'] : false,
            'date_planned_start' => (new Carbon())->startOfDay(),
            'date_planned_finish' => $datePlannedFinish,
            'responsible_user_id' => $responsibleUserId,
            'responsible_team_id' => $responsibleTeamId,
            'intake_id' => $intake ? $intake->id : null,
            'opportunity_id' => $opportunityForTaskId,
            'housing_file_id' => $housingFile ? $housingFile->id : null,
            'project_id' => $participation ? $participation->project_id : null,
            'participation_project_id' => $participation ? $participation->id : null,
            'order_id' => $order ? $order->id : null,
        ]);

        if ($task->type && $task->type->uses_wf_new_task) {
            $taskWorkflowHelper = new TaskWorkflowHelper($task);
            $processed = $taskWorkflowHelper->processWorkflowEmailNewTask();
            if($processed)
            {
                $this->log('Nieuwe taak gemaild aan verantwoordelijke.');
                $task->date_sent_wf_new_task =  Carbon::now();
                $task->save();
            } else {
                $this->log('Nieuwe taak NIET gemaild aan verantwoordelijke.');
            }
        }

        if($task->finished){
            $task->date_finished = Carbon::today();
            $finished_by_user = User::find($responsibleIds['responsible_user_id'] ? $responsibleIds['responsible_user_id'] : $webform->responsible_user_id );
            $task->finished_by_id = $finished_by_user ? $finished_by_user->id : null;
            $task->save();
            $this->log('Taak met id ' . $task->id . ' automatisch gereed op ' . Carbon::parse($task->finished)->format('d-m-Y') . ' door verantwoordelijke: ' . $finished_by_user->fullname);
        }

        $this->log('Taak met id ' . $task->id . ' aangemaakt.');

        foreach (TaskProperty::all() as $taskProperty) {
            if ($data[$taskProperty->code] != '') {
                TaskPropertyValue::create([
                    'property_id' => $taskProperty->id,
                    'task_id' => $task->id,
                    'value' => $data[$taskProperty->code],
                ]);
                $this->log('Eigenschap ' . $taskProperty->name . ' met waarde ' . $data[$taskProperty->code] . ' aan taak toegevoegd.');
            }
        }
    }

    protected function addTaskCheckContact(array $responsibleIds, Contact $contact, Webform $webform, $note)
    {
        $taskTypeId = 6;
        $taskType = TaskType::find($taskTypeId);
        $this->log('Taak Controle contact met taak_type_id (default) ' . $taskTypeId . ' ' . $taskType->name . ' aanmaken.');

        if($responsibleIds['responsible_user_id']) {
            $responsibleUserId = $responsibleIds['responsible_user_id'];
            $responsibleTeamId = null;
        }elseif($responsibleIds['responsible_team_id']) {
            $responsibleUserId = null;
            $responsibleTeamId = $responsibleIds['responsible_team_id'];
        }else{
            $responsibleUserId = $webform->responsible_user_id;
            $responsibleTeamId = $webform->responsible_team_id;
        }

        $task = Task::create([
            'note' => $note,
            'type_id' => $taskTypeId,
            'contact_id' => $contact->id,
            'contact_group_id' => null,
            'finished' => false,
            'date_planned_start' => (new Carbon())->startOfDay(),
            'date_planned_finish' => null,
            'responsible_user_id' => $responsibleUserId,
            'responsible_team_id' => $responsibleTeamId,
            'intake_id' => null,
            'project_id' => null,
            'participation_project_id' => null,
            'order_id' => null,
        ]);

        if ($task->type && $task->type->uses_wf_new_task) {
            $this->newTaskToEmail [] = $task->id;
            $this->processWorkflowEmailNewTask = true;
        }

        $this->log('Taak met id ' . $task->id . ' aangemaakt.');
    }

    protected function addOrderToContact(Contact $contact, array $data)
    {
        if ($data['product_id']) {
            $this->log('Er is een product meegegeven, order aanmaken.');

            $product = Product::find($data['product_id']);

            if (!$product) {
                $this->log('Product met is ' . $data['product_id'] . ' is niet gevonden, geen order aangemaakt.');
                $this->addTaskError('Ongeldige product code meegegeven bij verzenden webformulier.');
                return null;
            }

            $statusId = $data['status_id'];
            if (!OrderStatus::exists($statusId)) {
                $this->log('Geen bekende waarde voor orderstatus meegegeven, default naar concept.');
                $statusId = 'concept';
            }

            $collectionFrequencyId = $data['collection_frequency_id'];
            if (!OrderCollectionFrequency::exists($collectionFrequencyId)) {
                $this->log('Geen bekende waarde voor order frequentie meegegeven, default naar once.');
                $collectionFrequencyId = 'once';
            }

            $paymentTypeId = $data['payment_type_id'];
            if (!OrderPaymentType::exists($paymentTypeId)) {
                $this->log('Geen bekende waarde voor betaalwijze meegegeven, default naar betaalwijze van product.');
                $paymentTypeId = $product->payment_type_id;
            }

            $dateNextInvoice = Carbon::make($data['date_next_invoice']);
            if (!$dateNextInvoice) {
                $this->log('Geen bekende volgende nota datum meegegeven voor order, default naar geen datum.');
                $dateNextInvoice = new Carbon();
            }

            $dateRequested = Carbon::make($data['date_requested']);
            if (!$dateRequested) {
                $this->log('Geen bekende aanvraag datum meegegeven voor order, default naar datum van vandaag.');
                $dateRequested = new Carbon();
            }

            $dateStart = Carbon::make($data['date_start']);
            if (!$dateStart) {
                $this->log('Geen bekende startdatum meegegeven voor orderproduct, default naar datum van vandaag.');
                $dateStart = new Carbon();
            }
            $datePeriodStartFirstInvoice = Carbon::make($data['date_period_start_first_invoice']);
            if (!$datePeriodStartFirstInvoice) {
                $this->log('Geen bekende notadatum start op meegegeven voor orderproduct, default naar datum van vandaag.');
                $datePeriodStartFirstInvoice = new Carbon();
            }

            $order = Order::create([
                'contact_id' => $contact->id,
                'administration_id' => $product->administration_id,
                'status_id' => $statusId,
                'subject' => ( isset($data['subject']) && !empty($data['subject']) ) ? $data['subject'] : $product->name,
                'payment_type_id' => $paymentTypeId,
                'email_template_id_transfer' => $product->administration ? $product->administration->email_template_id_transfer : null,
                'email_template_id_collection' => $product->administration ? $product->administration->email_template_id_collection : null,
                'email_template_reminder_id' => $product->administration ? $product->administration->email_template_reminder_id : null,
                'email_template_exhortation_id' => $product->administration ? $product->administration->email_template_exhortation_id : null,
                'date_requested' => $dateRequested,
                'date_next_invoice' => $dateNextInvoice,
                'collection_frequency_id' => $collectionFrequencyId,
                'invoice_text' => ( isset($data['invoice_text']) && !empty($data['invoice_text']) ) ? $data['invoice_text'] : null,
                'IBAN' => '',
                'iban_attn' => '',
            ]);

            $this->log('Order met id ' . $order->id . ' aangemaakt.');

            $amount = (int) $data['amount'];
            if($amount < 1) $amount = 1;
            $orderProduct = OrderProduct::create([
                'product_id' => $product->id,
                'order_id' => $order->id,
                'amount' => $amount,
                'date_start' => $dateStart,
                'date_period_start_first_invoice' => $datePeriodStartFirstInvoice,
            ]);

            $this->log('Orderregel met id ' . $orderProduct->id . ' aangemaakt en gekoppeld aan order.');

            return $order;
        } else {
            $this->log('Er is geen product meegegeven, geen order aanmaken.');
            return null;
        }
    }

    protected function checkMaxRequests($webform)
    {
        $lastRequests = $webform->last_requests;

        // Eerst oude requests opschonen
        // Timestamp van een minuut geleden. Timestamps ouder dan deze worden eruit gegooid.
        $expireTimestamp = (new Carbon())->subMinute()->timestamp;
        $lastRequests = array_filter($lastRequests, function ($value) use ($expireTimestamp) {
            return $value > $expireTimestamp;
        });
        // Huidige request toevoegen, en opslaan.
        $lastRequests[] = (new Carbon())->timestamp;
        $webform->last_requests = array_values($lastRequests);
        $webform->save();

        // Checken of het max aantal is overschreden.
        if (count($lastRequests) > $webform->max_requests_per_minute) {
            $this->error('Maximum aantal aanroepen per minuut is bereikt.');
        }
    }

    /**
     * Check een ibannummer en schrijf hier evt logregels voor weg.
     *
     * @param string $iban Ibannummer
     * @param string $errorSubject Onderwerp waarvoor iban wordt gebruikt, voor in weergave foutmelding.
     * @return string
     */
    protected function checkIban(string $iban, string $errorSubject)
    {
        if ($iban == '') {
            $error = 'Geen iban meegegeven voor ' . $errorSubject;
            $this->log($error);
            return '';
        }
        $iban = preg_replace('/[^a-z0-9]+/i', '', trim(strtoupper($iban)));
        $newIban = new IBAN($iban);
        if (!$newIban->validate()) {
            $error = 'Ongeldige Iban ingelezen voor ' . $errorSubject;
            $this->log($error);
            $this->addTaskError($error);
        }

        return $iban;
    }

    protected function mailLog(array $data, bool $success, Webform $webform = null)
    {
        try {
            if (!$webform) {
                $this->log('Geen webform gevonden, verantwoordelijken kunnen daarom niet worden gemaild.');
                return;
            }

            $users = (new User())->newCollection();
            if ($webform->responsibleUser) {
                $users->push($webform->responsibleUser);
            } elseif ($webform->responsibleTeam && $webform->responsibleTeam->users()->exists()) {
                $users = $webform->responsibleTeam->users;
            }
            Notification::send($users, new WebformRequestProcessed($this->logs, $data, $success, $webform));
        } catch (\Exception $e) {
            report($e);
            $this->log('Fout bij mailen naar verantwoordelijken, fout is gerapporteerd.');
            return;
        }

        $this->log('Log is gemaild naar ' . $users->count() . ' verantwoordelijke(n).');
    }

    protected function logInfo()
    {
        // Extra regels toevoegen voor leesbaarheid log
        $logs = $this->logs;
        array_unshift($logs, "=====================================================");
        $logs[] = "\n";
        Log::info(implode("\n", $logs));
        $this->log('Log is gelogd naar het applicatielog.');
    }

    protected function addTaskError(string $error)
    {
        $this->taskErrors[] = $error;
    }

    /**
     * @return bool
     */
    private function createHoomDossier()
    {
        $cooperation = Cooperation::first();
        $this->log("Aanmaken hoomdossier contact");
        if (!$cooperation || empty($cooperation->hoom_link)) {
            return $this->log("Kan geen Hoomdossier aanmaken want er is bij cooperatie geen hoomdossier link gevonden.");
        }
        if (!$this->contact) {
            return $this->log("Kan geen Hoomdossier aanmaken want er is geen contact gevonden.");
        }
        if ($this->contact->hoom_account_id) {
            return $this->log("Koppeling hoomdossier bestaat al.");
        } else {
            // aanmaken hoomdossier
            try {
                $contactController = new ContactController();
                $contactController->makeHoomdossier($this->contact);

                $note = "Webformulier " . $this->webform->name . ".\n\n";
                $note .= "Hoomdossier aangemaakt voor contact " . $this->contact->full_name . " (" . $this->contact->number . ").\n";
                $this->addTaskCheckContact($this->responsibleIds, $this->contact, $this->webform, $note);

            } catch (\Exception $errorHoomDossier) {
                $this->log("Fout bij aanmaken hoomdossier contact");

                $note = "Webformulier " . $this->webform->name . ".\n\n";
                $note .= "Fout bij aanmaken hoomdossier voor contact " . $this->contact->full_name . " (" . $this->contact->number . ").\n";
                $note .= "Controleer contactgegevens\n";
                $this->addTaskCheckContact($this->responsibleIds, $this->contact, $this->webform, $note);
            }
        }
    }

}