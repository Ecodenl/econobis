<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 12-09-2018
 * Time: 16:10
 */

namespace App\Http\Controllers\Api\Webform;


use App\Eco\Address\Address;
use App\Eco\Contact\Contact;
use App\Eco\Country\Country;
use App\Eco\EmailAddress\EmailAddress;
use App\Eco\Occupation\Occupation;
use App\Eco\Occupation\OccupationContact;
use App\Eco\Organisation\Organisation;
use App\Eco\Person\Person;
use App\Eco\PhoneNumber\PhoneNumber;
use App\Eco\Task\TaskProperty;
use App\Eco\Title\Title;
use App\Eco\Webform\Webform;
use App\Http\Controllers\Controller;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Response;

class ExternalWebformController extends Controller
{

    protected $logs = [];

    public function post(string $apiKey, Request $request)
    {
        try {
            \DB::transaction(function () use ($request, $apiKey) {
                $this->doPost($apiKey, $request);
            });
        } catch (WebformException $e) {
            $this->log('Fout opgetreden: ' . $e->getMessage());
            Log::info(implode("\n", $this->logs));
            return Response::json($this->logs, $e->getStatusCode());
        } catch (\Exception $e) {
            throw $e;
        }

        Log::info(implode("\n", $this->logs));
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
            $this->log('Webform met id ' . $webform->id . ' gevonden bij code ' . $apiKey . '.');
        }

        $data = $this->getDataFromRequest($request);

        $contact = $this->updateOrCreateContact($data['contact']);

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
                'website' => 'website',
                // Address
                'adres_huisnummer' => 'address_number',
                'adres_toevoeging' => 'address_addition',
                'adres_postcode' => 'address_postal_code',
                'adres_plaats' => 'address_city',
                'adres_land_id' => 'address_country_id',
                // PhoneNumber
                'telefoonnummer' => 'phone_number',
                // ContactEmail
                'emailadres' => 'email_address',
                // Contact
                'iban' => 'iban',
                'akkoord_privacybeleid' => 'did_agree_avg',
            ],
            'energy_supplier' => [
                // ContactEnergySupplier
                'energieleverancier_id' => 'energy_supplier_id',
                'energieleverancier_klantnummer' => 'es_number',
                'energieleverancier_type_id' => 'contact_energy_supply_type_id',
                'energieleverancier_klant_sinds' => 'member_since',
            ],
            'participation' => [
                // ParticipantProductionProject
                'participatie_productieproject' => 'production_project_id',
                'participatie_aantal_participaties_aangevraagd' => 'participations_requested',
                'participatie_iban_uitkering' => 'iban_payout',
                'participatie_iban_uitkering_tnv' => 'iban_payout_attn',
                'participatie_inschrijfdatum' => 'date_register',
                'participatie_jaarlijks_verbruik' => 'power_kwh_consumption',
                'participatie_status_id' => 'status_id',
                'participatie_uitkeren_op_id' => 'type_id',
            ],
            'order' => [
                // Order / OrderProduct
                'order_product_id' => 'product_id',
                'order_iban' => 'IBAN',
                'order_iban_tnv' => 'iban_attn',
                'order_betaalwijze_id' => 'payment_type_id',
                'order_status_id' => 'status_id',
                'order_administratie_id' => 'administration_id',
                'order_begindatum' => 'date_start',
                'order_aanvraagdatum' => 'date_requested',
            ],
            'intake' => [
                // Intake
                'intake_campagne_id' => 'campaign_id',
                'intake_motivatie_ids' => 'reason_ids',
                'intake_interesse_ids' => 'measure_categorie_ids',
                'intake_status_id' => 'status_id',
                'intake_opmerkingen_bewoner' => 'note',
            ],
        ];

        // Task properties toevoegen
        $mapping['task_properties'] = TaskProperty::pluck('code', 'code');

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

    protected function updateOrCreateContact(array $data)
    {
        $contact = $this->getContactByNameAndEmail($data);

        if ($contact) {
            // Person of organisatie is gevonden obv naam en email, Eventueel adres en telefoonnummer toevoegen
            $this->addAddressToContact($data, $contact);
            $this->addPhoneNumberToContact($data, $contact);
        }

        if (!$contact) {
            // Contact niet gevonden op basis van naam en email, kijken of er een match op basis van naam en adres is
            $contact = $this->getContactByNameAndAddress($data);

            if ($contact) {
                // Person of organisatie is gevonden obv naam en adres, Eventueel email en telefoonnummer toevoegen
                $this->addEmailToContact($data, $contact);
                $this->addPhoneNumberToContact($data, $contact);
            }
        }

        if (!$contact) {
            $this->log('Geen enkel contact kunnen vinden op basis van meegegeven data, nieuw contact aanmaken.');
            $this->addContact($data);
        }


        return $contact;
    }

    protected function error(string $string, int $statusCode)
    {
        throw new WebformException($string, $statusCode);
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
            if (!$contact->addresses()
                ->where('number', $data['address_number'])
                ->where('postal_code', $data['address_postal_code'])
                ->exists()) {
                // Adres met deze gegevens bestaat nog niet, adres toevoegen met type "postadres"
                $this->log('Er bestaat nog geen adres met dit huisnummer en postcode; adres aanmaken');

                // Validatie op countrycode
                if ($data['address_country_id'] != '') {
                    $country = Country::find($data['address_country_id']);
                    if (!$country) $this->error('Ongeldige waarde in adres_land_id', 422);
                    $countryCode = $country->id;
                } else {
                    $countryCode = null;
                }

                $address = Address::create([
                    'contact_id' => $contact->id,
                    'type_id' => 'postal',
                    'street' => '',
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
        } else {
            $this->log('Er is geen huisnummer of postcode meegegeven; adres niet aanmaken');
        }
    }

    /**
     * @param array $data
     * @param $contact
     */
    protected function addPhoneNumberToContact(array $data, $contact): void
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
                $this->log('emailadres aangemaakt met id ' . $emailaddress->id);
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
        $titleValidator = function($titleId){
            if ($titleId != '') {
                $title = Title::find($titleId);
                if (!$title) $this->error('Ongeldige waarde in titel_id', 422);
                return $title->id;
            }
            return null;
        };

        if ($data['organisation_name']) {
            $this->log('Er is een organisatienaam meegegeven; organisatie aanmaken.');

            $contactOrganisation = Contact::create([
                'type_id' => 'organisation',
                'status_id' => 'none',
                'iban' => $data['iban'],
                'did_agree_avg' => (bool)$data['did_agree_avg'],
            ]);

            $organisation = Organisation::create([
                'contact_id' => $contactOrganisation->id,
                'name' => $data['organisation_name'],
                'website' => $data['website'],
                'chamber_of_commerce_number' => $data['chamber_of_commerce_number'],
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

            $occupationContact = OccupationContact::create([
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

            return $contactOrganisation;
        }

        // Als we hier komen is er geen bedrijfsnaam meegegeven, dan maken we alleen een contact aan
        $this->log('Er is geen organisatienaam meegegeven; persoon aanmaken.');

        $contact = Contact::create([
            'type_id' => 'person',
            'status_id' => 'none',
            'iban' => $data['iban'],
            'did_agree_avg' => (bool)$data['did_agree_avg'],
        ]);

        $person = Person::create([
            'contact_id' => $contact->id,
            'title_id' => $titleValidator($data['title_id']),
            'initials' => $data['initials'],
            'first_name' => $data['first_name'],
            'last_name' => $data['last_name'],
            'last_name_prefix' => $data['last_name_prefix'],
            'date_of_birth' => $data['date_of_birth'] ?: null,
        ]);

        $this->log('Persoon met id ' . $person->id . ' aangemaakt.');

        // Overige gegevens aan persoon hangen
        $this->addAddressToContact($data, $contact);
        $this->addEmailToContact($data, $contact);
        $this->addPhoneNumberToContact($data, $contact);

        return $contact;
    }

}