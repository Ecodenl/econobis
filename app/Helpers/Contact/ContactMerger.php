<?php

namespace App\Helpers\Contact;

use App\Eco\Address\Address;
use App\Eco\Contact\Contact;
use Illuminate\Support\Facades\DB;

class ContactMerger
{

    /**
     * @var Contact $toContact
     * Het contact waarin alle gegevens van fromContact worden samengevoegd.
     * Dit contact blijft bestaan.
     */
    protected $toContact;

    /**
     * @var Contact $fromContact
     * Het contact dat wordt samengevoegd in toContact.
     * Dit contact wordt verwijderd.
     */
    protected $fromContact;

    public function __construct(Contact $toContact, Contact $fromContact)
    {
        $this->toContact = $toContact;
        $this->fromContact = $fromContact;
    }

    public function merge()
    {
        $this->validate();

        /**
         * We willen geen halve merge uitvoeren, dus de gehele merge in een transaction.
         * Als er ergens een fout ontstaat wordt de gehele merge teruggedraaid.
         */
        DB::transaction(function () {
            $this->doMerge();
        });
    }

    private function validate()
    {
        if ($this->toContact->type_id !== $this->fromContact->type_id) {
            throw new ContactMergeException('Personen kunnen niet worden samengevoegd met organisaties.');
        }

        $toHoomAccountId = $this->toContact->hoom_account_id;
        $fromHoomAccountId = $this->fromContact->hoom_account_id;
        if ($toHoomAccountId && $fromHoomAccountId && $toHoomAccountId !== $fromHoomAccountId) {
            throw new ContactMergeException('Contacten hebben een verschillende Hoom account id, verwijder eerst één van de twee Hoom account id\'s handmatig. Vervolgens moet het contact_id ook in het Hoomdossier worden aangepast');
        }

        if ($this->toContact->twinfieldNumbers()->exists() && $this->fromContact->twinfieldNumbers()->exists()) {
            throw new ContactMergeException('Contacten zijn beide gekoppeld via Twinfield, ontkoppel eerst een van de twee contacten handmatig van Twinfield.');
        }

        $toIban = $this->toContact->iban;
        $fromIban = $this->fromContact->iban;
        if ($toIban && $fromIban && $toIban !== $fromIban) {
            throw new ContactMergeException('Contacten hebben een verschillende IBAN, verwijder eerst één van de twee IBAN\'s handmatig.');
        }

        $toGroupInspectionPersontype = $this->toContact->groups()->where('inspection_person_type_id', '!=', null)->first();
        $fromGroupInspectionPersontype = $this->fromContact->groups()->where('inspection_person_type_id', '!=', null)->first();
        if ($toGroupInspectionPersontype && $fromGroupInspectionPersontype && $toGroupInspectionPersontype->inspection_person_type_id !== $fromGroupInspectionPersontype->inspection_person_type_id) {
            throw new ContactMergeException('Contacten hebben beide een verschillende rol in "rol in buurtaanpak", een contact mag maar één unieke rol hebben.');
        }


    }

    private function doMerge()
    {
        $this->mergeContact();
        $this->mergeEmailAddresses();

        if ($this->toContact->isPerson()) {
            $this->mergePerson();
        }

        if ($this->toContact->isOrganisation()) {
            $this->mergeOrganisation();
        }

        $this->mergeAddresses();
        $this->mergePhoneNumbers();
        $this->mergeGenericBelongsToManyRelation('emails');
        $this->mergeGenericBelongsToManyRelation('groups');
        $this->mergeGenericHasManyRelation('responses');
        $this->mergeGenericHasManyRelation('documents');
        $this->mergeGenericHasManyRelation('financialOverviewContacts');
        $this->mergeGenericHasManyRelation('orders');
        $this->mergeGenericHasManyRelation('participations');
        $this->mergeGenericHasManyRelation('participationsGifted');
        $this->mergeGenericHasManyRelation('participationsLegalRep');
        $this->mergeGenericHasOneRelation('portalUser');
        $this->mergeGenericHasManyRelation('projectRevenueDistributions');
        $this->mergeGenericHasManyRelation('tasks');
        $this->mergeGenericHasManyRelation('notes');
        $this->mergeGenericHasManyRelation('contactNotes');
        $this->mergeOccupations();
        $this->mergeGenericHasManyRelation('twinfieldNumbers');
        $this->mergeGenericHasManyRelation('intakes');
        $this->mergeGenericHasManyRelation('revenueDistributionKwh');
        $this->mergeGenericHasManyRelation('twinfieldLogs');
        $this->mergeGenericHasManyRelation('quotationRequests');

        /**
         * Totalen van obligations_current, etc herberekenen.
         * Op een of andere manier werkt dit niet vanuit ParticipantProjectObserver (of wordt later weer overschreven?).
         * Voor nu als quickfix hier nog maar een keer uitvoeren.
         */
        $this->toContact->fresh()->calculateParticipationTotals()->save();

        $this->fromContact->delete();
    }

    private function mergeContact()
    {
        /**
         * Voor onderstaande velden geldt dat de waarde van fromContact alleen wordt overgenomen als deze in toContact leeg is.
         */
        $mergeFields = [
            'portal_registration_code',
            'collect_mandate_signature_date',
            'collect_mandate_collection_schema',
            'collect_mandate_first_run_date',
            'collect_mandate_code',
            'is_collect_mandate',
            'hoom_account_id',
            'iban',
            'iban_attn',
            'inspection_person_type_id',
        ];

        foreach ($mergeFields as $field) {
            if (!$this->toContact->$field && $this->fromContact->$field) {
                $this->toContact->$field = $this->fromContact->$field;
            }
        }

        $this->toContact->save();
    }

    private function mergePerson()
    {
        $toPerson = $this->toContact->person;
        $fromPerson = $this->fromContact->person;

        if(!$toPerson || !$fromPerson){
            // Voor het geval dat... Zou niet moeten voorkomen.
            return;
        }

        /**
         * Voor onderstaande velden geldt dat de waarde van fromPerson alleen wordt overgenomen als deze in toPerson leeg is.
         */
        $mergeFields = [
            'initials',
            'first_name',
            'date_of_birth',
            'first_name_partner',
            'last_name_partner',
            'date_of_birth_partner',
        ];

        foreach ($mergeFields as $field) {
            if (!$toPerson->$field && $fromPerson->$field) {
                $toPerson->$field = $fromPerson->$field;
            }
        }

        $toPerson->save();
        $fromPerson->delete();
    }

    private function mergeOrganisation()
    {
        $fromOrganisation = $this->fromContact->organisation;
        $toOrganisation = $this->toContact->organisation;

        if (!$fromOrganisation || !$toOrganisation) {
            return;
        }

        foreach ($fromOrganisation->people as $person) {
            $person->organisation_id = $toOrganisation->id;
            $person->save();
        }

        foreach ($fromOrganisation->campaigns as $campaign) {
            $toOrganisation->campaigns()->attach($campaign);
            $fromOrganisation->campaigns()->detach($campaign);
        }

        foreach ($fromOrganisation->deliversMeasures as $measure) {
            $toOrganisation->deliversMeasures()->attach($measure);
            $fromOrganisation->deliversMeasures()->detach($measure);
        }

        foreach ($fromOrganisation->measureCategories as $measureCategory) {
            $measureCategory->organisation_id_wf_create_quotation_request = $toOrganisation->id;
            $measureCategory->save();
        }

        $fromOrganisation->delete();
    }

    private function mergeAddresses()
    {
        $contactAlreadyHasPrimaryAddress = $this->toContact->primaryAddress()->exists();

        foreach ($this->fromContact->addresses as $address) {
            $existingAddress = $this->toContact->addresses->where('postal_code', $address->postal_code)
                ->where('number', $address->number)
                ->first();

            if ($existingAddress) {
                /**
                 * Dit adres bestaat al bij toContact.
                 * Gegevens overzetten op dit adres en het adres van fromContact verwijderen.
                 */
                $this->mergeAddress($existingAddress, $address);

                continue;
            }

            /**
             * Dit adres bestaat nog niet bij toContact, dus verplaatsen we het adres.
             */
            if($contactAlreadyHasPrimaryAddress){
                $address->primary = false;
            }
            $address->contact_id = $this->toContact->id;
            $address->save();
        }
    }

    private function mergeAddress(Address $toAddress, Address $fromAddress)
    {
        /**
         * Gegevens van ene adres overzetten naar andere, en het oude adres verwijderen.
         * (tabel housing_file_measure_taken heeft ook address_id maar lijkt niet te worden gebruikt)
         */
        foreach ($fromAddress->intakes as $intake) {
            $intake->address_id = $toAddress->id;
            $intake->save();
        }

        foreach ($fromAddress->housingFiles as $housingFile) {
            $housingFile->address_id = $toAddress->id;
            $housingFile->save();
        }

        foreach ($fromAddress->participations as $participation) {
            $participation->address_id = $toAddress->id;
            $participation->save();
        }

        foreach ($fromAddress->addressEnergySuppliers as $addressEnergySupplier) {
            $addressEnergySupplier->is_current_supplier = false;
            $addressEnergySupplier->address_id = $toAddress->id;
            $addressEnergySupplier->save();
        }

        foreach ($fromAddress->addressEnergyConsumptionGasPeriods as $addressEnergyConsumptionGasPeriod) {
            $addressEnergyConsumptionGasPeriod->address_id = $toAddress->id;
            $addressEnergyConsumptionGasPeriod->save();
        }

        foreach ($fromAddress->addressEnergyConsumptionElectricityPeriods as $addressEnergyConsumptionElectricityPeriod) {
            $addressEnergyConsumptionElectricityPeriod->address_id = $toAddress->id;
            $addressEnergyConsumptionElectricityPeriod->save();
        }

        $fromAddress->delete();
    }

    private function mergeGenericHasManyRelation(string $relationName)
    {
        $foreignKey = $this->fromContact->{$relationName}()->getQualifiedForeignKeyName();

        foreach ($this->fromContact->$relationName as $relation) {
            $relation->$foreignKey = $this->toContact->id;
            $relation->save();
        }
    }

    private function mergeGenericHasOneRelation(string $relationName)
    {
        $relation = $this->fromContact->$relationName;

        if ($relation) {
            $relation->contact_id = $this->toContact->id;
            $relation->save();
        }
    }

    private function mergeEmailAddresses()
    {
        $contactAlreadyHasPrimaryEmailAddress = $this->toContact->primaryEmailAddress()->exists();

        foreach ($this->fromContact->emailAddresses as $emailAddress) {
            $existingEmailAddress = $this->toContact->emailAddresses->where('email', $emailAddress->email)->first();

            if ($existingEmailAddress) {
                $emailAddress->delete();
                continue;
            }

            if($contactAlreadyHasPrimaryEmailAddress) {
                $emailAddress->primary = false;
            }
            $emailAddress->contact_id = $this->toContact->id;
            $emailAddress->save();
        }
    }

    private function mergePhoneNumbers()
    {
        $contactAlreadyHasPrimaryPhoneNumber = $this->toContact->primaryphoneNumber()->exists();

        foreach ($this->fromContact->phoneNumbers as $phoneNumber) {
            $existingPhoneNumber = $this->toContact->phoneNumbers->where('number', $phoneNumber->number)->first();

            if ($existingPhoneNumber) {
                $phoneNumber->delete();
                continue;
            }

            if($contactAlreadyHasPrimaryPhoneNumber) {
                $phoneNumber->primary = false;
            }
            $phoneNumber->contact_id = $this->toContact->id;
            $phoneNumber->save();
        }
    }

    private function mergeGenericBelongsToManyRelation(string $relationName)
    {
        foreach ($this->fromContact->$relationName as $relation) {
            $existingRelation = $this->toContact->$relationName->where('id', $relation->id)->first();

            if ($existingRelation) {
                continue;
            }

            $this->fromContact->$relationName()->updateExistingPivot($relation->id, [
                'contact_id' => $this->toContact->id,
            ]);
        }

        $this->fromContact->$relationName()->detach();
    }

    private function mergeOccupations()
    {
        foreach ($this->fromContact->occupations as $occupationContact) {
            $occupationContact->contact_id = $this->toContact->id;

            try {
                $occupationContact->save();
            } catch (\Throwable $e) {
                // Dit kan gebeuren als er al een occupation is met deze combinatie van contact_id, primary_contact_id en occupation_id
                // In dat geval verwijderen we het record, aangezien deze toch dubbel is.
                $occupationContact->delete();
            }
        }

        foreach ($this->fromContact->primaryOccupations as $occupationContact) {
            $occupationContact->primary_contact_id = $this->toContact->id;

            try {
                $occupationContact->save();
            } catch (\Throwable $e) {
                // Dit kan gebeuren als er al een occupation is met deze combinatie van contact_id, primary_contact_id en occupation_id
                // In dat geval verwijderen we het record, aangezien deze toch dubbel is.
                $occupationContact->delete();
            }
        }
    }
}