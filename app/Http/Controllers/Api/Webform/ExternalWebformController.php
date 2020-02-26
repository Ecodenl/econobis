<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 12-09-2018
 * Time: 16:10
 */

namespace App\Http\Controllers\Api\Webform;


use App\Eco\Address\Address;
use App\Eco\Campaign\Campaign;
use App\Eco\Contact\Contact;
use App\Eco\ContactGroup\ContactGroup;
use App\Eco\Country\Country;
use App\Eco\EmailAddress\EmailAddress;
use App\Eco\EnergySupplier\ContactEnergySupplier;
use App\Eco\EnergySupplier\ContactEnergySupplierStatus;
use App\Eco\EnergySupplier\ContactEnergySupplierType;
use App\Eco\EnergySupplier\EnergySupplier;
use App\Eco\Intake\Intake;
use App\Eco\Intake\IntakeReason;
use App\Eco\Intake\IntakeSource;
use App\Eco\Intake\IntakeStatus;
use App\Eco\Measure\MeasureCategory;
use App\Eco\Occupation\OccupationContact;
use App\Eco\Order\Order;
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
use App\Eco\Title\Title;
use App\Eco\User\User;
use App\Eco\Webform\Webform;
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
     * Het gevonden webform hebben we op nog een aantal plekken nodig, daarom in class opslaan
     * @var Webform|null
     */
    protected $webform = null;

    private $contactActie = null;

    public function post(string $apiKey, Request $request)
    {
        try {
            \DB::transaction(function () use ($request, $apiKey) {
                $this->doPost($apiKey, $request);
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

        // Geen fouten onstaan, log weergeven met succes melding.
        $this->log('Aanroep succesvol afgerond.');
        $this->logInfo();
        return Response::json($this->logs);
    }

    protected function doPost(string $apiKey, Request $request)
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

        $data = $this->getDataFromRequest($request);

        $contact = $this->updateOrCreateContact($data['contact'], $webform);
        $this->addEnergySupplierToContact($contact, $data['energy_supplier']);
        if ($this->address) {
            $intake = $this->addIntakeToAddress($this->address, $data['intake']);
        } else {
            $intake = null;
            $this->log("Er is geen adres gevonden en kon ook niet aangemaakt worden met huidige gegevens, intake kan niet worden aangemaakt.");
        }
        $participation = $this->addParticipationToContact($contact, $data['participation'], $webform);
        $order = $this->addOrderToContact($contact, $data['order']);
        $this->addTaskToContact($contact, $data['task'], $webform, $intake, $participation, $order);
    }


    protected function getDataFromRequest(Request $request)
    {
        $mapping = [
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
                'adres_straat' => 'address_street',
                'adres_huisnummer' => 'address_number',
                'adres_toevoeging' => 'address_addition',
                'adres_postcode' => 'address_postal_code',
                'adres_plaats' => 'address_city',
                'adres_land_id' => 'address_country_id',
                // PhoneNumber
                'telefoonnummer' => 'phone_number',
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
            ],
            'energy_supplier' => [
                // ContactEnergySupplier
                'energieleverancier_id' => 'energy_supplier_id',
                'energieleverancier_klantnummer' => 'es_number',
                'energieleverancier_type_id' => 'contact_energy_supply_type_id',
                'energieleverancier_klant_sinds' => 'member_since',
                'energieleverancier_ean_code_elektra' => 'ean_electricity',
                'energieleverancier_status' => 'contact_energy_supply_status_id',
                'energieleverancier_huidig' => 'is_current_supplier',
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
                'order_begindatum' => 'date_start',
                'order_aanvraagdatum' => 'date_requested',
            ],
            'intake' => [
                // Intake
                'intake_campagne_id' => 'campaign_id',
                'intake_motivatie_ids' => 'reason_ids',
                'intake_interesse_ids' => 'measure_categorie_ids',
                'intake_aanmeldingsbron_ids' => 'source_ids',
                'intake_status_id' => 'status_id',
                'intake_opmerkingen_bewoner' => 'note',
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
        $data['contact']['address_postal_code'] = str_replace(' ', '', $data['contact']['address_postal_code']);

        return $data;
    }

    protected function updateOrCreateContact(array $data, Webform $webform)
    {
        $contact = $this->getContactByAddressAndEmail($data);
        $this->log('Actie: ' . $this->contactActie);

//        $contact = $this->getContactByNameAndEmail($data);

        if ($contact) {
            // Person of organisatie is gevonden, uitvoeren acties
// contactActie = "GEEN"
// contactActie = "NAT" -> Nieuw adres + taak
// contactActie = "NET" -> Nieuw emailadres + taak
// contactActie = "CCT" -> Controle contact taak
            switch($this->contactActie){
                case 'NAT' :
                    $this->addAddressToContact($data, $contact);
                    $this->addPhoneNumberToContact($data, $contact);
                    $this->addContactToGroup($data, $contact);
                    $note = "Webformulier " . $webform->name . ".\n\n";
                    $note .= "Nieuw adres toegevoegd aan contact " . $contact->full_name . " (".$contact->number.").\n";
                    $note .= "Controleer contactgegevens\n";
                    $this->addTaskCheckContact($contact, $webform, $note);
                    break;
                case 'NET' :
                    $this->addEmailToContact($data, $contact);
                    $this->addPhoneNumberToContact($data, $contact);
                    $this->addContactToGroup($data, $contact);
                    $note = "Webformulier " . $webform->name . ".\n\n";
                    $note .= "Nieuw e-mailadres toegevoegd aan contact " . $contact->full_name . " (".$contact->number.").\n";
                    $note .= "Controleer contactgegevens\n";
                    $this->addTaskCheckContact($contact, $webform, $note);
                    break;
                case 'CCT' :
                    $note = "Webformulier " . $webform->name . ".\n\n";
                    $note .= "Gegevens contact " . $contact->full_name . " (".$contact->number.") gevonden op basis van naam en/of e-mail, zonder match op NAW.\n";
                    $note .= "Controleer contactgegevens\n";
                    $this->addTaskCheckContact($contact, $webform, $note);
                    break;
            }
        }

//        if (!$contact) {
//            // Contact niet gevonden op basis van naam en email, kijken of er een match op basis van naam en adres is
//            $contact = $this->getContactByNameAndAddress($data);
//
//            if ($contact) {
//                // Person of organisatie is gevonden obv naam en adres, Eventueel email en telefoonnummer toevoegen
//                $this->addEmailToContact($data, $contact);
//                $this->addPhoneNumberToContact($data, $contact);
//                $this->addContactToGroup($data, $contact);
//            }
//        }

// contactActie = "NC"  -> Nieuw contact
// contactActie = "NCT" -> Nieuw contact + taak
        if (!$contact) {
            $this->log('Geen enkel contact kunnen vinden op basis van meegegeven data, nieuw contact aanmaken.');
            $contact = $this->addContact($data);
            switch($this->contactActie){
                case 'NCT' :
                    $note = "Webformulier " . $webform->name . ".\n\n";
                    $note .= "Nieuw contact " . $contact->full_name . " (".$contact->number.") aangemaakt op adres wat al voorkomt bij bestaande contact(en).\n";
                    $note .= "Controleer contactgegevens\n";
                    $this->addTaskCheckContact($contact, $webform, $note);
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
        // Kijken of er een persoon gematcht kan worden op basis van adres (postcode, huisnummer en huisnummer toevoeging)
        if($data['address_postal_code'] || $data['address_number'] || $data['address_addition']) {
            $contactAddressQuery = contact::whereHas('addresses', function ($query) use ($data) {
                $query->where('postal_code', $data['address_postal_code'])
                    ->where('number', $data['address_number'])
                    ->where('addition', $data['address_addition']);
            });
            // Niet gevonden op adres, check op email
            if ($contactAddressQuery->count() == 0) {
                $contactEmailQuery = contact::whereHas('emailAddresses', function ($query) use ($data) {
                    $query->where('email', $data['email_address']);
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
            // Gevonden op adres, check op email
            } else {
                $this->log($contactAddressQuery->count() . ' contacten gevonden op adres: ' . $data['address_postal_code']
                    . ', '
                    . $data['address_number'] . $data['address_addition'] );
                $contactEmailQuery = $contactAddressQuery->whereHas('emailAddresses', function ($query) use ($data) {
                    $query->where('email', $data['email_address']);
                });
                // Niet gevonden op email, check op 1e letter voornaam + achternaam (of naam in geval van organisatie)
                if ($contactEmailQuery->count() == 0) {
                    $contactNameQuery = $contactAddressQuery->whereHas('person', function ($query) use ($data) {
                        $query->where('first_name', 'like', substr($data['first_name'], 0, 1))
                            ->where('last_name', $data['last_name']);
                    });
//                        ->orWhereHas('organisation', function ($query) use ($data) {
//                            $query->where('name', 'like', $data['organisation_name']);
//                        });
                    // Gevonden op adres maar niet op emailcontact. Wel op naam (voorletter + achternaam).
                    if ($contactNameQuery->count() > 0) {
                        $this->log($contactNameQuery->count() . ' contacten gevonden op adres: ' . $data['address_postal_code']
                            . ', '
                            . $data['address_number'] . $data['address_addition'] . ' en naam '
                            . substr($data['first_name'], 0, 1) . ' ' . $data['last_name']);
                        // add address + taak
                        $this->log('Nieuw emailadres toevoegen + taak ');
                        $this->contactActie = "NET";
                        return $contactNameQuery->first();
                    } else {
                        // Gevonden op adres maar niet op email of naam.
                        $this->log('Contact niet gevonden op basis van adres (postcode, huisnummer en huisnummer toevoeging) of emailadres');
                        // add contact + taak
                        $this->contactActie = "NCT";
                        $this->log('Nieuw contact maken + taak');
                        return null;
                    }
                // Ook gevonden op email, controle op voornaam en achternaam
                } else {
                    $contactNameQuery = $contactEmailQuery->whereHas('person', function ($query) use ($data) {
                        $query->where('first_name', $data['first_name'])
                            ->where('last_name', $data['last_name']);
                    });
//                        ->orWhereHas('organisation', function ($query) use ($data) {
//                            $query->where('name', 'like', $data['organisation_name']);
//                        });
                    // Gevonden op adres, emailcontact en naam (voornaam + achternaam).
                    if ($contactNameQuery->count() > 0) {
                        $this->log($contactNameQuery->count() . ' contacten gevonden op adres: ' . $data['address_postal_code']
                            . ', '
                            . $data['address_number'] . $data['address_addition'] . 'en emailadres ' . $data['email_address'] .
                            ' en naam ' . $data['first_name'] . ' ' . $data['last_name']);
                        // geen actie inzake contact, adres en/of email
                        $this->contactActie = "GEEN";
                        return $contactNameQuery->first();
                    } else {
                        // Gevonden op adres maar niet op email of naam.
                        $this->log('Contact niet gevonden op basis van adres (postcode, huisnummer en huisnummer toevoeging) of emailadres');
                        // add contact + taak
                        $this->contactActie = "NC";
                        $this->log('Nieuw contact maken + taak');
                        return null;
                    }
                    return null;

                }

            }
        // Geen adres opgegeven, check op naam en email
        }else{
            // taak controle
            $this->contactActie = "CCT";
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
            return $person->contact;
        } else {
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
            return $organisation->contact;
        } else {
            $this->log('Geen organisatie gevonden op basis van naam en emailadres');
        }

        return null;
    }

    protected function getContactByNameAndAddress(array $data)
    {
        // Kijken of er een persoon gematcht kan worden op basis van naam en adres
        $person = Person::where('first_name', $data['first_name'])
            ->where('last_name', $data['last_name'])
            ->whereHas('contact', function ($query) use ($data) {
                $query->whereHas('addresses', function ($query) use ($data) {
                    $query->where('number', $data['address_number'])
                        ->where('postal_code', $data['address_postal_code']);
                });
            })
            ->first();

        if ($person) {
            $this->log('Persoon ' . $person->contact->full_name . ' gevonden op basis van naam en adres');
            return $person->contact;
        } else {
            $this->log('Geen persoon gevonden op basis van naam en adres');
        }

        // Er is geen persoon gevonden op basis van naam en email, kijken of er een organisatie matcht
        $organisation = Organisation::where('name', $data['organisation_name'])
            ->whereHas('contact', function ($query) use ($data) {
                $query->whereHas('addresses', function ($query) use ($data) {
                    $query->where('number', $data['address_number'])
                        ->where('postal_code', $data['address_postal_code']);
                });
            })
            ->first();

        if ($organisation) {
            $this->log('Organisatie ' . $organisation->contact->full_name . ' gevonden op basis van naam en adres');
            return $organisation->contact;
        } else {
            $this->log('Geen organisatie gevonden op basis van naam en adres');
        }

        return null;
    }

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
                ->where('number', $data['address_number'])
                ->where('postal_code', $data['address_postal_code'])
                ->first();

            if (!$address) {
                // Adres met deze gegevens bestaat nog niet, adres toevoegen met type "postadres"
                $this->log('Er bestaat nog geen adres met dit huisnummer en postcode; adres aanmaken');

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
                    'type_id' => 'postal',
                    'street' => $data['address_street'],
                    'number' => $data['address_number'],
                    'city' => $data['address_city'],
                    'postal_code' => $data['address_postal_code'],
                    'country_id' => $countryCode,
                    'addition' => $data['address_addition'],
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

    protected function log(string $text)
    {
        $this->logs[] = $text;
    }

    protected function addContact(array $data)
    {
        // Functie voor afvangen ongeldige waarden in title_id
        $titleValidator = function ($titleId) {
            if ($titleId != '') {
                $title = Title::find($titleId);
                if (!$title) $this->error('Ongeldige waarde in titel_id');
                return $title->id;
            }
            return null;
        };

        if ($data['organisation_name']) {
            $this->log('Er is een organisatienaam meegegeven; organisatie aanmaken.');

            $iban = $this->checkIban($data['iban'], 'organisatie.');
            $contactOrganisation = Contact::create([
                'type_id' => 'organisation',
                'status_id' => 'none',
                'iban' => $iban,
                'iban_attn' => $data['iban_attn'],
                'did_agree_avg' => (bool)$data['did_agree_avg'],
                'date_did_agree_avg' => $data['date_did_agree_avg'] ? Carbon::make($data['date_did_agree_avg']): null,
                'is_collect_mandate' => (bool)$data['is_collect_mandate'],
                'collect_mandate_code' => $data['is_collect_mandate'] ? $data['collect_mandate_code'] : '',
                'collect_mandate_signature_date' => $data['is_collect_mandate'] ? Carbon::make($data['collect_mandate_signature_date']): null,
                'collect_mandate_first_run_date' => $data['is_collect_mandate'] ? Carbon::make($data['collect_mandate_first_run_date']): null,
                'collect_mandate_collection_schema' => $data['is_collect_mandate'] ? 'core' : '',
            ]);

            $organisation = Organisation::create([
                'contact_id' => $contactOrganisation->id,
                'name' => $data['organisation_name'],
                'website' => $data['website'],
                'chamber_of_commerce_number' => $data['chamber_of_commerce_number'],
                'vat_number' => $data['vat_number'],
            ]);
            $this->log('Organisatie met id ' . $organisation->id . ' aangemaakt.');

            $contactPerson = Contact::create([
                'type_id' => 'person',
                'status_id' => 'none',
            ]);

            // Validatie op title_id

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

            $this->log('Persoon met id ' . $person->id . ' aangemaakt en gekoppeld aan organisatie als medewerker.');

            // Overige gegevens aan organisation hangen
            $this->addAddressToContact($data, $contactOrganisation);
            $this->addEmailToContact($data, $contactOrganisation);
            $this->addPhoneNumberToContact($data, $contactOrganisation);
            $this->addContactToGroup($data, $contactOrganisation);

            return $contactOrganisation;
        }

        // Als we hier komen is er geen bedrijfsnaam meegegeven, dan maken we alleen een persoon aan
        $this->log('Er is geen organisatienaam meegegeven; persoon aanmaken.');

        $iban = $this->checkIban($data['iban'], 'contactpersoon.');
        $contact = Contact::create([
            'type_id' => 'person',
            'status_id' => 'none',
            'iban' => $iban,
            'iban_attn' => $data['iban_attn'],
            'did_agree_avg' => (bool)$data['did_agree_avg'],
            'date_did_agree_avg' => $data['date_did_agree_avg'] ? Carbon::make($data['date_did_agree_avg']): null,
            'is_collect_mandate' => (bool)$data['is_collect_mandate'],
            'collect_mandate_code' => $data['is_collect_mandate'] ? $data['collect_mandate_code'] : '',
            'collect_mandate_signature_date' => $data['is_collect_mandate'] ? Carbon::make($data['collect_mandate_signature_date']): null,
            'collect_mandate_first_run_date' => $data['is_collect_mandate'] ? Carbon::make($data['collect_mandate_first_run_date']): null,
            'collect_mandate_collection_schema' => $data['is_collect_mandate'] ? 'core' : '',
        ]);

        $lastName = $data['last_name'];
        if (!$lastName) {
            $emailParts = explode('@', $data['email_address']);
            $lastName = $emailParts[0];
            if ($lastName) $this->log('Geen achternaam meegegeven, achternaam ' . $lastName . ' uit emailadres gehaald.');
            else $this->log('Geen achternaam meegegeven, ook geen achternaam uit emailadres kunnen halen.');
        }
        $person = Person::create([
            'contact_id' => $contact->id,
            'title_id' => $titleValidator($data['title_id']),
            'initials' => $data['initials'],
            'first_name' => $data['first_name'],
            'last_name' => $lastName,
            'last_name_prefix' => $data['last_name_prefix'],
            'date_of_birth' => $data['date_of_birth'] ?: null,
        ]);

        $this->log('Persoon met id ' . $person->id . ' aangemaakt.');

        // Overige gegevens aan persoon hangen
        $this->addAddressToContact($data, $contact);
        $this->addEmailToContact($data, $contact);
        $this->addPhoneNumberToContact($data, $contact);
        $this->addContactToGroup($data, $contact);

        return $contact;
    }

    protected function addEnergySupplierToContact(Contact $contact, $data)
    {
        if ($data['energy_supplier_id'] != '') {
            $this->log('Er is een energie leverancier meegegeven');

            $energySupplier = EnergySupplier::find($data['energy_supplier_id']);
            if (!$energySupplier) $this->error('Ongeldige waarde voor energie leverancier meegegeven.');

            $contactEnergySupplierType = ContactEnergySupplierType::find($data['contact_energy_supply_type_id']);
            if (!$contactEnergySupplierType) $this->error('Ongeldige waarde voor energie leverancier type meegegeven.');

            $contactEnergySupplierStatus = ContactEnergySupplierStatus::find($data['contact_energy_supply_status_id']);
            if (!$contactEnergySupplierStatus) $this->error('Ongeldige waarde voor energie leverancier status meegegeven.');

            if (ContactEnergySupplier::where('contact_id', $contact->id)->where('energy_supplier_id', $energySupplier->id)->exists()) {
                $this->log('Koppeling met energieleverancier ' . $energySupplier->name . ' bestaat al; niet opnieuw aangemaakt.');
                return;
            }

            ContactEnergySupplier::create([
                'contact_id' => $contact->id,
                'energy_supplier_id' => $energySupplier->id,
                'es_number' => $data['es_number'],
                'contact_energy_supply_type_id' => $contactEnergySupplierType->id,
                'member_since' => $data['member_since'] ?: null,
                'ean_electricity' => $data['ean_electricity'],
                'contact_energy_supply_status_id' => $contactEnergySupplierStatus->id,
                'is_current_supplier' => (bool)$data['is_current_supplier'],
            ]);

            $this->log('Koppeling met energieleverancier ' . $energySupplier->name . ' gemaakt.');
        } else {
            $this->log('Er is geen energie leverancier meegegeven, niet koppelen.');
        }
    }

    protected function addIntakeToAddress(Address $address, array $data)
    {
        if ($data['campaign_id']) {
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
            $measureCategories = MeasureCategory::whereIn('id', explode(',', $data['measure_categorie_ids']))->get();

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

            return $intake;
        } else {
            $this->log('Er is geen campagne meegegeven, intake niet aanmaken.');
        }
    }

    protected function addParticipationToContact(Contact $contact, array $data, Webform $webform )
    {
        if ($data['project_id']) {
            $this->log('Er is een project meegegeven, participatie aanmaken.');
            $project = Project::find($data['project_id']);
            if (!$project) $this->error('Er is een ongeldige waarde voor project meegegeven.');

            // Voor aanmaak van Participant Mutations wordt created by and updated by via ParticipantMutationObserver altijd bepaald obv Auth::id
            // Die moeten we eerst even setten als we dus hier vanuit webform komen.
            Auth::setUser(User::find($webform->responsible_user_id));
            $this->log('responsible_user_id : ' . $webform->responsible_user_id);

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
                'contact_id' => $contact->id,
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
            $participation_mutation_date = $data['participation_mutation_date'] ?: null;
            $participation_mutation_amount = $data['participation_mutation_amount'] ?: null;
            $participation_mutation_quantity = $data['participation_mutation_quantity'] ?: null;

            switch($status->code_ref){
                case 'interest' :
                    $dateInterest = $participation_mutation_date;
                    $amountInterest = $participation_mutation_amount;
                    $quantityInterest = $participation_mutation_quantity;
                    break;
                case 'option' :
                    $dateOption = $participation_mutation_date;
                    $amountOption = $participation_mutation_amount;
                    $quantityOption = $participation_mutation_quantity;
                    break;
                case 'granted' :
                    $dateGranted = $participation_mutation_date;
                    $amountGranted = $participation_mutation_amount;
                    $quantityGranted = $participation_mutation_quantity;
                    break;
                case 'final' :
                    $dateFinal = $participation_mutation_date;
                    $amountFinal = $participation_mutation_amount;
                    $quantityFinal = $participation_mutation_quantity;
                    break;
            }

            $participantMutation = ParticipantMutation::create([
                'participation_id' => $participation->id,
                'type_id' => ParticipantMutationType::where('project_type_id', $project->project_type_id)->where('code_ref', 'first_deposit')->value('id'),
                'status_id' => $status->id,
                'date_payment' => Carbon::make($data['participation_mutation_date_payment']),
                'date_contract_retour' => Carbon::make($data['participation_mutation_date_contract_retour']),
                'amount' => $participation_mutation_amount,
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

    protected function addContactToGroup(array $data, Contact $contact)
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

            $contactGroup->contacts()->syncWithoutDetaching($contact);
            $this->contactGroup = $contactGroup;
            $this->log('Contact ' . $contact->id . ' aan groep ' . $data['group_name'] . ' gekoppeld.');

        }elseif($data['contact_group_ids']){
            $contactGroups = ContactGroup::whereIn('id', explode(',', $data['contact_group_ids']))->get();
            if ($contactGroups->count() > 0) {
                $this->log('Er is 1 of meerdere contactgroep meegegeven, groep(en) koppelen.');

                foreach ($contactGroups as $contactGroup)
                {
                    if ($contactGroup->type_id != 'static') {
                        $this->log('Een contact kan alleen aan een statische groep worden gekoppeld, groep ' . $contactGroup->group_name . ' niet gekoppeld aan contact ' . $contact->id . '.');
                    }else{

                        $contactGroup->contacts()->syncWithoutDetaching($contact);
                        $this->log('Contact ' . $contact->id . ' aan groep ' . $contactGroup->name . ' gekoppeld.');
                    }
                }
                $this->contactGroups = $contactGroups;
            } else {
                $this->log('Er is geen contact groep meegegeven, geen groep koppelen.');
            }
        } else {
            $this->log('Er is geen contact groep meegegeven, geen groep koppelen.');
        }
    }

    protected function addTaskToContact(Contact $contact, array $data, Webform $webform, Intake $intake = null, ParticipantProject $participation = null, Order $order = null)
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

        // Opmerkingen over eventuele ongeldige ibans toevoegen als notitie aan taak
        $note = "Webformulier " . $webform->name . ".\n\n";
        if($data['note']) $note .= $data['note'] . "\n\n";
        $note .= implode("\n", $this->taskErrors);

        $contactGroupId = null;
        if ($this->contactGroup) {
            $contactGroupId = $this->contactGroup->id;
            $note .= "Contact is aan groep " . $this->contactGroup->name . " gekoppeld.\n\n";
            $this->log('Contact is aan groep ' . $this->contactGroup->name . ' gekoppeld.');
        }elseif($this->contactGroups && $this->contactGroups->count() == 1 ){
            $contactGroupId = $this->contactGroups[0]->id;
            $note .= "Contact is aan groep " . $this->contactGroups[0]->name . " gekoppeld.\n\n";
            $this->log('Contact is aan groep ' . $this->contactGroups[0]->name . ' gekoppeld.');
        }elseif($this->contactGroups && $this->contactGroups->count() > 1 )
        if ($this->contactGroups && $this->contactGroups->count() > 0) {
            $note .= "Contact is aan meerdere groepen gekoppeld.\n\n";
            $this->log('Contact is aan meerdere groepen gekoppeld.');
        }

        $taskTypeId = $data['type_id'];
        $taskType = TaskType::find($taskTypeId);
        if (!$taskType) {
            $taskTypeId = 6;
            $taskType = TaskType::find($taskTypeId);
            $this->log('Geen bekende waarde voor taak_type_id (' . $data['type_id'] . ') meegegeven, default naar ' . $taskTypeId . ' ' . $taskType->name . '.');
        }

        $task = Task::create([
            'note' => $note,
            'type_id' => $taskTypeId,
            'contact_id' => $contact->id,
            'contact_group_id' => $contactGroupId,
            'finished' => $data['finished'] ? (bool)$data['finished'] : false,
            'date_planned_start' => (new Carbon())->startOfDay(),
            'date_planned_finish' => $datePlannedFinish,
            'responsible_user_id' => $webform->responsible_user_id,
            'responsible_team_id' => $webform->responsible_team_id,
            'intake_id' => $intake ? $intake->id : null,
            'project_id' => $participation ? $participation->project_id : null,
            'participation_project_id' => $participation ? $participation->id : null,
            'order_id' => $order ? $order->id : null,
        ]);

        if($task->finished){
            $task->date_finished = Carbon::today();
            $finished_by_user = User::find($webform->responsible_user_id);
            $task->finished_by_id = $finished_by_user ? $finished_by_user->id : null;
            $task->save();
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

    protected function addTaskCheckContact(Contact $contact, Webform $webform, $note)
    {
        $taskTypeId = 6;
        $taskType = TaskType::find($taskTypeId);
        $this->log('Taak Controle contact met taak_type_id (default)' . $taskTypeId . ' ' . $taskType->name . ' aangemaakt.');

        $task = Task::create([
            'note' => $note,
            'type_id' => $taskTypeId,
            'contact_id' => $contact->id,
            'contact_group_id' => null,
            'finished' => false,
            'date_planned_start' => (new Carbon())->startOfDay(),
            'date_planned_finish' => null,
            'responsible_user_id' => $webform->responsible_user_id,
            'responsible_team_id' => $webform->responsible_team_id,
            'intake_id' => null,
            'project_id' => null,
            'participation_project_id' => null,
            'order_id' => null,
        ]);

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
                return;
            }

            $statusId = $data['status_id'];
            if (!OrderStatus::exists($statusId)) {
                $this->log('Geen bekende waarde voor orderstatus meegegeven, default naar concept.');
                $statusId = 'concept';
            }

            $paymentTypeId = $data['payment_type_id'];
            if (!OrderPaymentType::exists($paymentTypeId)) {
                $this->log('Geen bekende waarde voor betaalwijze meegegeven, default naar betaalwijze van product.');
                $paymentTypeId = $product->payment_type_id;
            }

            $iban = $this->checkIban($data['iban'], 'order.');

            $dateStart = Carbon::make($data['date_start']);
            if (!$dateStart) {
                $this->log('Geen bekende startdatum meegegeven voor product, default naar datum van vandaag.');
                $dateStart = new Carbon();
            }

            $dateRequested = Carbon::make($data['date_requested']);
            if (!$dateRequested) {
                $this->log('Geen bekende aanvraag datum meegegeven voor product, default naar datum van vandaag.');
                $dateRequested = new Carbon();
            }

            $order = Order::create([
                'contact_id' => $contact->id,
                'administration_id' => $product->administration_id,
                'status_id' => $statusId,
                'subject' => $product->name,
                'payment_type_id' => $paymentTypeId,
                'IBAN' => $iban,
                'iban_attn' => $data['iban_attn'],
                'date_requested' => $dateRequested,
                'collection_frequency_id' => 'once',
            ]);

            $this->log('Order met id ' . $order->id . ' aangemaakt.');

            $amount = (int) $data['amount'];
            if($amount < 1) $amount = 1;
            $orderProduct = OrderProduct::create([
                'product_id' => $product->id,
                'order_id' => $order->id,
                'amount' => $amount,
                'date_start' => $dateStart,
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

        if (!(new IBAN($iban))->validate()) {
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
}