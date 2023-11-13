<?php
/**
 * Created by PhpStorm.
 * User: StagiarSoftware
 * Date: 19-1-2018
 * Time: 11:55
 */

namespace App\Helpers\CSV;

use App\Eco\Address\AddressType;
use Carbon\Carbon;
use League\Csv\Reader;

class ContactCSVHelper
{
    private $csvExporter;
    private $contacts;

    public function __construct($contacts, $contactGroup = false)
    {
        $this->csvExporter = new Export();
        $this->csvExporter->getCsv()->setDelimiter(';');
        $this->contacts = $contacts;
        $this->contactGroup = $contactGroup;
    }

    public function downloadCSV()
    {
        $csv = '';
        $headers = true;

        foreach ($this->contacts->chunk(500) as $chunk) {
            $chunk->load([
                'person',
                'organisation',
                'addresses',
                'primaryEmailAddress',
                'emailAddresses',
                'primaryphoneNumber',
                'phoneNumbers',
                'primaryAddress',
                'primaryAddress.currentAddressEnergySupplierElectricity.energySupplier',
                'primaryAddress.currentAddressEnergySupplierGas.energySupplier',
                'contactNotes',
                'occupations.occupation',
                'occupations.primaryContact.person.title',
                'occupations.primaryContact.primaryEmailAddress',
                'occupations.primaryContact.primaryphoneNumber',
                'primaryOccupations.occupation',
                'primaryOccupations.contact.person.title',
                'primaryOccupations.contact.primaryEmailAddress',
                'primaryOccupations.contact.primaryphoneNumber',
            ]);

            foreach ($chunk as $contact) {
                // Addresses
                if ($contact->addresses) {
                    foreach (AddressType::collection() as $type) {
                        $address = $contact->addresses()->where('type_id', $type->id)->where('primary', true)->first();
                        if(empty($address))
                        {
                            $address = $contact->addresses()->where('type_id', $type->id)->first();
                        }

                        $addressArr = [];

                        $addressArr['street'] = ($address ? $address->street : '');
                        $addressArr['number'] = ($address ? $address->number : '');
                        $addressArr['addition'] = ($address ? $address->addition : '');
                        $addressArr['postal_code'] = ($address ? $address->postal_code : '');
                        $addressArr['city'] = ($address ? $address->city : '');
                        $addressArr['areaName'] = ($address ? $address->shared_area_name : '');
                        $addressArr['districtName'] = (($address && $address->getSharedPostalCodesHouseNumber()) ? $address->getSharedPostalCodesHouseNumber()->sharedArea->district_name : '');
                        $addressArr['country'] = (($address && $address->country) ? $address->country->name : '');

                        $contact['address_' . $type->id] = $addressArr;
                    }
                }

                // Other e-mail addresses
                if ($contact->emailAddresses) {
                    $emailAddresses = $contact->emailAddresses()->where('primary', false)->limit(5)->get();

                    $contact['emailAddress_2'] = (isset($emailAddresses[0]) ? $emailAddresses[0]->email : '');
                    $contact['emailAddress_3'] = (isset($emailAddresses[1]) ? $emailAddresses[1]->email : '');
                    $contact['emailAddress_4'] = (isset($emailAddresses[2]) ? $emailAddresses[2]->email : '');
                    $contact['emailAddress_5'] = (isset($emailAddresses[3]) ? $emailAddresses[3]->email : '');
                }

                // Other phonenumbers
                if ($contact->phoneNumbers) {
                    $phoneNumbers = $contact->phoneNumbers()->where('primary', false)->limit(2)->get();

                    $contact['phonenumber_2'] = (isset($phoneNumbers[0]) ? $phoneNumbers[0]->number : '');
                    $contact['phonenumber_3'] = (isset($phoneNumbers[1]) ? $phoneNumbers[1]->number : '');
                }

                // Latest 2 contactNotes
                if ($contact->contactNotes) {
                    $contactNotes = $contact->contactNotes()->limit(2)->orderBy('id', 'desc')->get();

                    $latestContactNotes = (isset($contactNotes[0]) ? $contactNotes[0]->note : '');
                    $latestContactNotes .= (isset($contactNotes[1]) ? ' | ' . $contactNotes[1]->note : '');

                    $contact['latest_contactNotes'] = $latestContactNotes;
                }

                // Occupations
                $first = true;
                if ($contact->occupations) {
                    foreach ($contact->occupations as $occupation) {
                        if($first) {
                            $contact['occupationPrimary'] = ($occupation->primary ? 'Ja' : 'Nee');
                            $contact['occupationPrimaryOrSecundary'] = 'onder';
                            $contact['occupationStartDate'] = $this->formatDate($occupation->start_date);
                            $contact['occupationEndDate'] = $this->formatDate($occupation->end_date);
                            $contact['occupationTitle'] = $occupation->primaryContact->person ? $occupation->primaryContact->person->title : '';
                            $contact['occupationFullName'] = $occupation->full_name;
                            $contact['occupationInitial'] = $occupation->primaryContact->person ? $occupation->primaryContact->person->initials : '';
                            $contact['occupationFirstName'] = $occupation->primaryContact->person ? $occupation->primaryContact->person->first_name : '';
                            $contact['occupationLastNamePrefix'] = $occupation->primaryContact->person ? $occupation->primaryContact->person->last_name_prefix : '';
                            $contact['occupationLastName'] = $occupation->primaryContact->person ? $occupation->primaryContact->person->last_name : '';
                            $contact['occupationDateOfBirth'] = $occupation->primaryContact->person ? $this->formatDate($occupation->primaryContact->person->date_of_birth) : '';
                            $contact['occupationPrimaryEmailAddress'] = $occupation->primaryContact->primaryEmailAddress ? $occupation->primaryContact->primaryEmailAddress : '';
                            $contact['occupationPrimaryTelephoneNumber'] = $occupation->primaryContact->primaryphoneNumber ? $occupation->primaryContact->primaryphoneNumber : '';
                            $contact['occupationRole'] = $occupation->occupation->primary_occupation;
                            $first = false;
                        }
                        else{
                            $repContact = $contact->replicate();
                            $repContact['occupationPrimary'] = ($occupation->primary ? 'Ja' : 'Nee');
                            $repContact['occupationPrimaryOrSecundary'] = 'onder';
                            $repContact['occupationStartDate'] = $this->formatDate($occupation->start_date);
                            $repContact['occupationEndDate'] = $this->formatDate($occupation->end_date);
                            $repContact['occupationTitle'] = $occupation->primaryContact->person ? $occupation->primaryContact->person->title : '';
                            $repContact['occupationFullName'] = $occupation->full_name;
                            $repContact['occupationInitial'] = $occupation->primaryContact->person ? $occupation->primaryContact->person->initials : '';
                            $repContact['occupationFirstName'] = $occupation->primaryContact->person ? $occupation->primaryContact->person->first_name : '';
                            $repContact['occupationLastNamePrefix'] = $occupation->primaryContact->person ? $occupation->primaryContact->person->last_name_prefix : '';
                            $repContact['occupationLastName'] = $occupation->primaryContact->person ? $occupation->primaryContact->person->last_name : '';
                            $repContact['occupationDateOfBirth'] = $occupation->primaryContact->person ? $this->formatDate($occupation->primaryContact->person->date_of_birth) : '';
                            $repContact['occupationPrimaryEmailAddress'] = $occupation->primaryContact->primaryEmailAddress ? $occupation->primaryContact->primaryEmailAddress : '';
                            $repContact['occupationPrimaryTelephoneNumber'] = $occupation->primaryContact->primaryphoneNumber ? $occupation->primaryContact->primaryphoneNumber : '';
                            $repContact['occupationRole'] = $occupation->occupation->primary_occupation;
                            $index = $chunk->search(function ($item, $key) use ($contact) {
                                return $item->id == $contact->id;
                            });
                            $chunk->splice($index, 0, [$repContact]);
                        }
                    }
                }

                // Primary Occupations
                if ($contact->primaryOccupations) {
                    foreach ($contact->primaryOccupations as $primaryOccupation) {
                        if($first) {
                            $contact['occupationPrimary'] = ($primaryOccupation->primary ? 'Ja' : 'Nee');
                            $contact['occupationPrimaryOrSecundary'] = 'boven';
                            $contact['occupationStartDate'] = $this->formatDate($primaryOccupation->start_date);
                            $contact['occupationEndDate'] = $this->formatDate($primaryOccupation->end_date);
                            $contact['occupationTitle'] = $primaryOccupation->contact->person ? $primaryOccupation->contact->person->title : '';
                            $contact['occupationFullName'] = $primaryOccupation->full_name;
                            $contact['occupationInitial'] = $primaryOccupation->contact->person ? $primaryOccupation->contact->person->initials : '';
                            $contact['occupationFirstName'] = $primaryOccupation->contact->person ? $primaryOccupation->contact->person->first_name : '';
                            $contact['occupationLastNamePrefix'] = $primaryOccupation->contact->person ? $primaryOccupation->contact->person->last_name_prefix : '';
                            $contact['occupationLastName'] = $primaryOccupation->contact->person ? $primaryOccupation->contact->person->last_name : '';
                            $contact['occupationDateOfBirth'] = $primaryOccupation->contact->person ? $this->formatDate($primaryOccupation->contact->person->date_of_birth) : '';
                            $contact['occupationPrimaryEmailAddress'] = $primaryOccupation->contact->primaryEmailAddress ? $primaryOccupation->contact->primaryEmailAddress : '';
                            $contact['occupationPrimaryTelephoneNumber'] = $primaryOccupation->contact->primaryphoneNumber ? $primaryOccupation->contact->primaryphoneNumber : '';
                            $contact['occupationRole'] = $primaryOccupation->occupation->secondary_occupation;
                            $first = false;
                        }
                        else{
                            $repContact = $contact->replicate();
                            $repContact['occupationPrimary'] = ($primaryOccupation->primary ? 'Ja' : 'Nee');
                            $repContact['occupationPrimaryOrSecundary'] = 'boven';
                            $repContact['occupationStartDate'] = $this->formatDate($primaryOccupation->start_date);
                            $repContact['occupationEndDate'] = $this->formatDate($primaryOccupation->end_date);
                            $repContact['occupationTitle'] = $primaryOccupation->contact->person ? $primaryOccupation->contact->person->title : '';
                            $repContact['occupationFullName'] = $primaryOccupation->full_name;
                            $repContact['occupationInitial'] = $primaryOccupation->contact->person ? $primaryOccupation->contact->person->initials : '';
                            $repContact['occupationFirstName'] = $primaryOccupation->contact->person ? $primaryOccupation->contact->person->first_name : '';
                            $repContact['occupationLastNamePrefix'] = $primaryOccupation->contact->person ? $primaryOccupation->contact->person->last_name_prefix : '';
                            $repContact['occupationLastName'] = $primaryOccupation->contact->person ? $primaryOccupation->contact->person->last_name : '';
                            $repContact['occupationDateOfBirth'] = $primaryOccupation->contact->person ? $this->formatDate($primaryOccupation->contact->person->date_of_birth) : '';
                            $repContact['occupationPrimaryEmailAddress'] = $primaryOccupation->contact->primaryEmailAddress ? $primaryOccupation->contact->primaryEmailAddress : '';
                            $repContact['occupationPrimaryTelephoneNumber'] = $primaryOccupation->contact->primaryphoneNumber ? $primaryOccupation->contact->primaryphoneNumber : '';
                            $repContact['occupationRole'] = $primaryOccupation->occupation->secondary_occupation;
                            $index = $chunk->search(function ($item, $key) use ($contact) {
                                return $item->id == $contact->id;
                            });
                            $chunk->splice($index, 0, [$repContact]);
                        }
                    }
                }
            }

            $this->csvExporter->beforeEach(function ($contact) {
                // person/organisation fields
                if ($contact->type_id === 'person') {
                    $contact->title = $contact->person->title;
                    $contact->initials = $contact->person->initials;
                    $contact->first_name = $contact->person->first_name;
                    $contact->last_name_prefix = $contact->person->last_name_prefix;
                    $contact->last_name = $contact->person->last_name;
                    $contact->date_of_birth = $this->formatDate($contact->person->date_of_birth);
                    $contact->date_of_birth_partner = $this->formatDate($contact->person->date_of_birth_partner);
                }

                //optional member_to_group_since field if the export is for a specific group
                if($this->contactGroup) {
                    if ($this->contactGroup->contacts()->where('id', $contact->id)->count() > 0) {
                        $contact->member_to_group_since = $this->contactGroup->contacts()->where('id', $contact->id)->first()->pivot->member_to_group_since;
                    } else {
                        $contact->member_to_group_since = '';
                    }
                }

                // Reformat energy supplier fields
                if ($contact->primaryAddress && $contact->primaryAddress->currentAddressEnergySupplierElectricity) {
                    $contact->energy_supplier_name_electricity = $contact->primaryAddress->currentAddressEnergySupplierElectricity->energySupplier->name;
                    $contact->es_number_electricity = $contact->primaryAddress->currentAddressEnergySupplierElectricity->es_number;
                    $contact->energy_member_since_electricity
                        = $this->formatDate($contact->primaryAddress->currentAddressEnergySupplierElectricity->member_since);
                }
                if ($contact->primaryAddress && $contact->primaryAddress->currentAddressEnergySupplierGas) {
                    $contact->energy_supplier_name_gas = $contact->primaryAddress->currentAddressEnergySupplierGas->energySupplier->name;
                    $contact->es_number_gas = $contact->primaryAddress->currentAddressEnergySupplierGas->es_number;
                    $contact->energy_member_since_gas
                        = $this->formatDate($contact->primaryAddress->currentAddressEnergySupplierGas->member_since);
                }
                // Reformat primary address fields
                if ($contact->primaryAddress) {
                    $contact->ean_electricity = $contact->primaryAddress->ean_electricity;
                    $contact->ean_gas = $contact->primaryAddress->ean_gas;
                }

                $contact->did_agree_avg = ($contact->did_agree_avg ? 'Ja' : 'Nee');
                $contact->date_did_agree_avg = $this->formatDate($contact->date_did_agree_avg);

                $contact->is_collect_mandate = ($contact->is_collect_mandate ? 'Ja' : 'Nee');
                $contact->collect_mandate_code = $contact->collect_mandate_code;
                $contact->collect_mandate_signature_date = $this->formatDate($contact->collect_mandate_signature_date);
                $contact->collect_mandate_first_run_date = $this->formatDate($contact->collect_mandate_first_run_date);

                $contact->created_at_date = $this->formatDate($contact->created_at);
                $contact->updated_at_date = $this->formatDate($contact->updated_at);
            });

            $mapping = [
                'number' => '#',
                'full_name' => 'Naam',
                'organisation.name' => 'Organisatie',
                'organisation.website' => 'Website',
                'organisation.chamber_of_commerce_number' => 'Kvk',
                'organisation.vat_number' => 'Btw nummer',
                'title.name' => 'Aanspreektitel',
                'initials' => 'Initialen',
                'first_name' => 'Voornaam',
                'last_name_prefix' => 'Tussenvoegsel',
                'last_name' => 'Achternaam',
                'date_of_birth' => 'Geboortedatum',
                'iban' => 'IBAN',
                'iban_attn' => 'IBAN tnv',
                'did_agree_avg' => 'Akkoord privacybeleid',
                'date_did_agree_avg' => 'Datum akkoord privacybeleid',
                'is_collect_mandate' => 'Incasso',
                'collect_mandate_code' => 'Machtingskenmerk',
                'collect_mandate_signature_date' => 'Datum van ondertekening',
                'collect_mandate_first_run_date' => 'Datum eerste incassoronde',
                'person.first_name_partner' => 'Voornaam partner',
                'person.last_name_partner' => 'Achternaam partner',
                'date_of_birth_partner' => 'Geboortedatum partner',
                'address_deliver.street' => 'Bezorg adres',
                'address_deliver.number' => 'Bezorg huisnummer',
                'address_deliver.addition' => 'Bezorg toevoeging',
                'address_deliver.postal_code' => 'Bezorg postcode',
                'address_deliver.city' => 'Bezorg plaats',
                'address_deliver.areaName' => 'Bezorg buurt',
                'address_deliver.districtName' => 'Bezorg wijk',
                'address_deliver.country' => 'Bezorg land',
                'address_visit.street' => 'Bezoek adres',
                'address_visit.number' => 'Bezoek huisnummer',
                'address_visit.addition' => 'Bezoek toevoeging',
                'address_visit.postal_code' => 'Bezoek postcode',
                'address_visit.city' => 'Bezoek plaats',
                'address_visit.areaName' => 'Bezoek buurt',
                'address_visit.districtName' => 'Bezoek wijk',
                'address_visit.country' => 'Bezoek land',
                'address_postal.street' => 'Post adres',
                'address_postal.number' => 'Post huisnummer',
                'address_postal.addition' => 'Post toevoeging',
                'address_postal.postal_code' => 'Post postcode',
                'address_postal.city' => 'Post plaats',
                'address_postal.areaName' => 'Post buurt',
                'address_postal.districtName' => 'Post wijk',
                'address_postal.country' => 'Post land',
                'address_invoice.street' => 'Nota adres',
                'address_invoice.number' => 'Nota huisnummer',
                'address_invoice.addition' => 'Nota toevoeging',
                'address_invoice.postal_code' => 'Nota postcode',
                'address_invoice.city' => 'Nota plaats',
                'address_invoice.areaName' => 'Nota buurt',
                'address_invoice.districtName' => 'Nota wijk',
                'address_invoice.country' => 'Nota land',
                'primaryEmailAddress.email' => 'Email primair',
                'emailAddress_2' => 'Email 2',
                'emailAddress_3' => 'Email 3',
                'emailAddress_4' => 'Email 4',
                'emailAddress_5' => 'Email 5',
                'primaryphoneNumber.number' => 'Telefoonnummer primair',
                'phonenumber_2' => 'Telefoonnummer 2',
                'phonenumber_3' => 'Telefoonnummer 3',
                'energy_supplier_name_electricity' => 'Energieleverancier (elektra)',
                'es_number_electricity' => 'Klantnummer (elektra)',
                'energy_member_since_electricity' => 'Klant sinds (elektra)',
                'ean_electricity' => 'EAN electriciteit',
                'energy_supplier_name_gas' => 'Energieleverancier (gas)',
                'es_number_gas' => 'Klantnummer (gas)',
                'energy_member_since_gas' => 'Klant sinds (gas)',
                'ean_gas' => 'EAN gas',
                'participations_current' => 'Aantal Participaties',
                'obligations_current' => 'Aantal Obligaties',
                'postalcode_link_capital_current' => 'Aantal PCR',
                'loan_current' => 'Aantal Leningbedrag',
                'latest_contactNotes' => 'Opmerkingen',
                'created_at_date' => 'Datum gemaakt op',
                'updated_at_date' => 'Datum laatste update',
                'occupationPrimary' => 'Primair',
                'occupationPrimaryOrSecundary' => 'Boven of onder',
                'occupationStartDate' => 'Begindatum',
                'occupationEndDate' => 'Einddatum',
                'occupationTitle.name' => 'Aanspreektitel',
                'occupationFullName' => 'Volledige naam',
                'occupationInitial' => 'Initialen',
                'occupationFirstName' => 'Voornaam',
                'occupationLastNamePrefix' => 'Tussenvoegsel',
                'occupationLastName' => 'Achternaam',
                'occupationDateOfBirth' => 'Geboortedatum',
                'occupationPrimaryEmailAddress.email' => 'Primair e-mailadres',
                'occupationPrimaryTelephoneNumber.number' => 'Primair telefoonnummer',
                'occupationRole' => 'Rol van contact',
            ];

            if($this->contactGroup) {
                $mappingForMemberToGroupSince = [
                    'member_to_group_since' => 'Toegevoegd aan groep op',
                ];
                $mapping = array_merge($mapping, $mappingForMemberToGroupSince);
            }

            $csv = $this->csvExporter->build($chunk, $mapping, $headers);
            $headers = false;
        }
        if (empty($csv)) abort(422, 'Geen gegevens om te downloaden');

        return Reader::BOM_UTF8 . $csv->getCsv();
    }

    public function downloadEnergySuppliersCSV()
    {
        $csv = '';
        $headers = true;

        foreach ($this->contacts->chunk(500) as $chunk) {
            $chunk->load([
                'person',
                'organisation',
                'addresses',
                'primaryEmailAddress',
                'emailAddresses',
                'primaryphoneNumber',
                'phoneNumbers',
                'primaryAddress',
                'primaryAddress.currentAddressEnergySupplierElectricity.energySupplier',
                'primaryAddress.currentAddressEnergySupplierGas.energySupplier',
            ]);

            foreach ($chunk as $contact) {
                // Addresses
                if ($contact->addresses) {
                    $address = $contact->addresses()->where('primary', true)->first();
                    if(empty($address))
                    {
                        $address = $contact->addresses()->first();
                    }

                    $addressArr = [];

                    $addressArr['street'] = ($address ? $address->street : '');
                    $addressArr['number'] = ($address ? $address->number : '');
                    $addressArr['addition'] = ($address ? $address->addition : '');
                    $addressArr['postal_code'] = ($address ? $address->postal_code : '');
                    $addressArr['city'] = ($address ? $address->city : '');
                    $addressArr['country'] = (($address && $address->country) ? $address->country->name : '');
                    $addressArr['type'] = (($address && $address->getType() && $address->getType()->name) ? $address->getType()->name : '');
                    $contact['address'] = $addressArr;
                }
            }

            $this->csvExporter->beforeEach(function ($contact) {
                // person/organisation fields
                if ($contact->type_id === 'person') {
                    $contact->title = $contact->person->title;
                    $contact->initials = $contact->person->initials;
                    $contact->first_name = $contact->person->first_name;
                    $contact->last_name_prefix = $contact->person->last_name_prefix;
                    $contact->last_name = $contact->person->last_name;
                }

                // Reformat energy supplier fields
                if ($contact->primaryAddress && $contact->primaryAddress->currentAddressEnergySupplierElectricity) {
                    $contact->energy_supplier_name_electricity = $contact->primaryAddress->currentAddressEnergySupplierElectricity->energySupplier->name;
                    $contact->es_number_electricity = $contact->primaryAddress->currentAddressEnergySupplierElectricity->es_number;
                    $contact->energy_member_since_electricity
                        = $this->formatDate($contact->primaryAddress->currentAddressEnergySupplierElectricity->member_since);
                }
                if ($contact->primaryAddress) {
                    $i = 0;
                    foreach($contact->primaryAddress->addressEnergySuppliers()->where('is_current_supplier', false)->whereIn('energy_supply_type_id', [2, 3])->take(2)->get() as $oldAddressEnergySupplierElectricity) {
                        $i++;
                        if($i === 1) {
                            $contact->old_energy_supplier_name_electricity_1 = $oldAddressEnergySupplierElectricity->energySupplier->name;
                            $contact->old_es_number_electricity_1 = $oldAddressEnergySupplierElectricity->es_number;
                            $contact->old_energy_member_since_electricity_1 = $this->formatDate($oldAddressEnergySupplierElectricity->member_since);
                            $contact->old_energy_end_date_electricity_1 = $this->formatDate($oldAddressEnergySupplierElectricity->end_date);
                        } else {
                            $contact->old_energy_supplier_name_electricity_2 = $oldAddressEnergySupplierElectricity->energySupplier->name;
                            $contact->old_es_number_electricity_2 = $oldAddressEnergySupplierElectricity->es_number;
                            $contact->old_energy_member_since_electricity_2 = $this->formatDate($oldAddressEnergySupplierElectricity->member_since);
                            $contact->old_energy_end_date_electricity_2 = $this->formatDate($oldAddressEnergySupplierElectricity->end_date);
                        }
                    }
                }

                if ($contact->primaryAddress && $contact->primaryAddress->currentAddressEnergySupplierGas) {
                    $contact->energy_supplier_name_gas = $contact->primaryAddress->currentAddressEnergySupplierGas->energySupplier->name;
                    $contact->es_number_gas = $contact->primaryAddress->currentAddressEnergySupplierGas->es_number;
                    $contact->energy_member_since_gas = $this->formatDate($contact->primaryAddress->currentAddressEnergySupplierGas->member_since);
                }
                if ($contact->primaryAddress) {
                    $i = 0;
                    foreach($contact->primaryAddress->addressEnergySuppliers()->where('is_current_supplier', false)->whereIn('energy_supply_type_id', [1, 3])->take(2)->get() as $oldAddressEnergySupplierGas) {
                        $i++;
                        if($i === 1) {
                            $contact->old_energy_supplier_name_gas_1 = $oldAddressEnergySupplierGas->energySupplier->name;
                            $contact->old_es_number_gas_1 = $oldAddressEnergySupplierGas->es_number;
                            $contact->old_energy_member_since_gas_1 = $this->formatDate($oldAddressEnergySupplierGas->member_since);
                            $contact->old_energy_end_date_gas_1 = $this->formatDate($oldAddressEnergySupplierGas->end_date);
                        } else {
                            $contact->old_energy_supplier_name_gas_2 = $oldAddressEnergySupplierGas->energySupplier->name;
                            $contact->old_es_number_gas_2 = $oldAddressEnergySupplierGas->es_number;
                            $contact->old_energy_member_since_gas_2 = $this->formatDate($oldAddressEnergySupplierGas->member_since);
                            $contact->old_energy_end_date_gas_2 = $this->formatDate($oldAddressEnergySupplierGas->end_date);
                        }
                    }
                }

                // Reformat primary address fields
                if ($contact->primaryAddress) {
                    $contact->ean_electricity = $contact->primaryAddress->ean_electricity;
                    $contact->ean_gas = $contact->primaryAddress->ean_gas;
                }
            });

            $mapping = [
                'number' => '#',
                'full_name' => 'Naam',
                'organisation.name' => 'Organisatienaam',
                'title.name' => 'Aanspreektitel',
                'initials' => 'Initialen',
                'first_name' => 'Voornaam',
                'last_name_prefix' => 'Tussenvoegsel',
                'last_name' => 'Achternaam',
                'address.street' => 'Adres',
                'address.number' => 'Huisnummer',
                'address.addition' => 'Huisnummertoevoeging',
                'address.postal_code' => 'Postcode',
                'address.city' => 'Woonplaats',
                'primaryEmailAddress.email' => 'Email primair',
                'primaryphoneNumber.number' => 'Telefoonnummer primair',
                'address.type' => 'Adrestype',

                'ean_electricity' => 'EAN (voor elektra)',
                'ean_gas' => 'EAN (voor gas)',

                'energy_supplier_name_electricity' => 'Huidige energieleverancier (voor elektra)',
                'es_number_electricity' => 'Klantnummer',
                'energy_member_since_electricity' => 'Klant sinds',

                'old_energy_supplier_name_electricity_1' => 'Vorige energieleverancier1 (voor elektra)',
                'old_es_number_electricity_1' => 'Klantnummer',
                'old_energy_member_since_electricity_1' => 'Klant sinds',
                'old_energy_end_date_electricity_1' => 'Einddatum',

                'old_energy_supplier_name_electricity_2' => 'Vorige energieleverancier2 (voor elektra)',
                'old_es_number_electricity_2' => 'Klantnummer',
                'old_energy_member_since_electricity_2' => 'Klant sinds',
                'old_energy_end_date_electricity_2' => 'Einddatum',

                'energy_supplier_name_gas' => 'Huidige energieleverancier (voor gas)',
                'es_number_gas' => 'Klantnummer',
                'energy_member_since_gas' => 'Klant sinds',

                'old_energy_supplier_name_gas_1' => 'Vorige energieleverancier1 (voor gas)',
                'old_es_number_gas_1' => 'Klantnummer',
                'old_energy_member_since_gas_1' => 'Klant sinds',
                'old_energy_end_date_gas_1' => 'Einddatum',

                'old_energy_supplier_name_gas_2' => 'Vorige energieleverancier2 (voor gas)',
                'old_es_number_gas_2' => 'Klantnummer',
                'old_energy_member_since_gas_2' => 'Klant sinds',
                'old_energy_end_date_gas_2' => 'Einddatum',
            ];

            $csv = $this->csvExporter->build($chunk, $mapping, $headers);
            $headers = false;
        }
        if (empty($csv)) abort(422, 'Geen gegevens om te downloaden');

        return Reader::BOM_UTF8 . $csv->getCsv();
    }

    private function formatDate($date) {
        $formatDate = $date ? new Carbon($date) : false;
        return $formatDate ? $formatDate->format('d-m-Y') : '';
    }
}