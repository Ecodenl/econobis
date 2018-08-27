<?php
/**
 * Created by PhpStorm.
 * User: StagiarSoftware
 * Date: 19-1-2018
 * Time: 11:55
 */

namespace App\Helpers\CSV;

use App\Eco\EmailAddress\EmailAddressType;
use Carbon\Carbon;

class ParticipantCSVHelper
{
    private $csvExporter;
    private $participants;

    public function __construct($participants)
    {
        $this->csvExporter = new \Laracsv\Export();
        $this->csvExporter->getCsv()->setDelimiter(';');
        $this->participants = $participants;
    }

    public function downloadCSV(){
        $csv = '';

        foreach ($this->participants->chunk(100) as $chunk) {

            $chunk->load([
                'contact.person.title',
                'contact.organisation',
                'contact.addresses',
                'contact.emailAddresses',
                'contact.primaryphoneNumber',
                'contact.primaryAddress.country',
                'contact.primaryContactEnergySupplier.energySupplier',
                'giftedByContact',
                'legalRepContact',
                'productionProject',
                'participantProductionProjectStatus',
                'participantProductionProjectPayoutType'
            ]);

        foreach ($this->participants as $participant) {
            // E-mail
            if ($participant->contact->emailAddresses) {
                foreach (EmailAddressType::collection() as $type) {
                    $emailAddresses = $participant->contact->emailAddresses()->where('type_id', $type->id)->get();
                    $first = true;
                    foreach ($emailAddresses as $emailAddress){
                        if($first) {
                            $participant['email_' . $type->id] = ($emailAddress ? $emailAddress->email : '');
                            $first = false;
                        }
                        else{
                            $repParticipant = $participant->replicate();
                            $repParticipant->id = $participant->id;
                            $repParticipant['email_' . $type->id] = ($emailAddress ? $emailAddress->email : '');

                            $index = $this->participants->search(function ($item, $key) use ($participant) {
                                return $item->id == $participant->id;
                            });
                            $this->participants->splice($index, 0, [$repParticipant]);
                        }
                    }

                }
            }
            $this->csvExporter->beforeEach(function ($participant) {
                // person/organisation fields
                if ($participant->contact->type_id === 'person') {
                    $participant->title = $participant->contact->person->title;
                    $participant->initials = $participant->contact->person->initials;
                    $participant->first_name = $participant->contact->person->first_name;
                    $participant->last_name_prefix = $participant->contact->person->last_name_prefix;
                    $participant->last_name = $participant->contact->person->last_name;
                    // Date of birth date format
                    $dateOfBirth = $participant->contact->person->date_of_birth
                        ? new Carbon($participant->contact->person->date_of_birth) : false;
                    $participant->date_of_birth = $dateOfBirth ? $dateOfBirth->format('d-m-Y') : '';
                }

                // Reformat energy supplier fields
                if ($participant->contact->primaryContactEnergySupplier) {
                    // Reformat when supplier starts with equal sign (example '=om')
                    $participant->energy_supplier_name
                        = $participant->contact->primaryContactEnergySupplier->energySupplier->name;
                }

                //reformat bools
                $participant->did_accept_agreement = $participant->did_accept_agreement ? 'Ja' : 'Nee';
                // Reformat dates
                $participant->date_contract_send = $participant->date_contract_send
                    ? Carbon::parse($participant->date_contract_send)->format('d-m-Y') : '';
                $participant->date_contract_retour = $participant->date_contract_retour
                    ? Carbon::parse($participant->date_contract_retour)->format('d-m-Y') : '';
                $participant->date_payed = $participant->date_payed ? Carbon::parse($participant->date_payed)
                    ->format('d-m-Y') : '';
                $participant->date_register = $participant->date_register ? Carbon::parse($participant->date_register)
                    ->format('d-m-Y') : '';
                $participant->date_end = $participant->date_end ? Carbon::parse($participant->date_end)->format('d-m-Y')
                    : '';
            });

            $csv = $this->csvExporter->build($chunk, [
                'id' => '#',
                'contact.id' => 'Contactnummer',
                'productionProject.name' => 'Productie project naam',
                'contact.full_name' => 'Naam',
                'contact.organisation.name' => 'Organisatie',
                'title.name' => 'Aanspreektitel',
                'initials' => 'Initialen',
                'first_name' => 'Voornaam',
                'last_name_prefix' => 'Tussenvoegsel',
                'last_name' => 'Achternaam',
                'date_of_birth' => 'Geboortedatum',
                'contact.primaryAddress.street' => 'Primair adres',
                'contact.primaryAddress.number' => 'Primair huisnummer',
                'contact.primaryAddress.addition' => 'Primair toevoeging',
                'contact.primaryAddress.postal_code' => 'Primair postcode',
                'contact.primaryAddress.city' => 'Primair plaats',
                'contact.primaryAddress.country.name' => 'Primair land',
                'email_general' => 'Email algemeen',
                'email_home' => 'Email prive',
                'email_work' => 'Email werk',
                'email_administration' => 'Email administratie',
                'email_invoice' => 'Email factuur',
                'contact.primaryphoneNumber.number' => 'Primair telefoonnummer',
                'energy_supplier_name' => 'Energieleverancier',
                'contact.primaryContactEnergySupplier.es_number' => 'Klantnummer',
                'productionProject.code' => 'Productie project',
                'productionProject.participation_worth' => 'Waarde per participatie',
                'participations_requested' => 'Participaties aangevraagd',
                'participations_granted' => 'Participaties toegekend',
                'participations_rest_sale' => 'Participaties restverkoop',
                'participations_current' => 'Participaties huidig',
                'participations_worth_total' => 'Hudige waarde',
                'date_contract_send' => 'Contract verstuurd',
                'date_contract_retour' => 'Contract retour',
                'date_payed' => 'Betaald op',
                'legalRepContact.full_name' => 'Wettelijk vertegenwoordiger',
                'giftedByContact.full_name' => 'Geschonken door',
                'did_accept_agreement' => 'Akkoord regelement',
                'power_kwh_consumption' => 'Jaarlijks verbruik',
                'iban_payout' => 'Iban uitkeren',
                'iban_attn' => 'Iban uitkeren t.n.v.',
                'participantProductionProjectStatus.name' => 'Status',
                'date_register' => 'Inschrijfdatum',
                'date_end' => 'Einddatum',
                'participantProductionProjectPayoutType.name' => 'Uitkeren op',
            ])->getCsv();
        }

        return $csv;
    }
}