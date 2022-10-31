<?php

namespace App\Helpers\Contact;

use App\Eco\Address\Address;
use App\Eco\Contact\Contact;
use App\Helpers\Delete\Models\DeleteOrganisation;
use Illuminate\Support\Facades\DB;

class ContactMerger
{

    /**
     * @var Contact $toContact
     * Het contact waarin alle gegevens van contact2 worden samengevoegd.
     * Dit contact blijft bestaan.
     */
    protected $toContact;

    /**
     * @var Contact $fromContact
     * Het contact dat wordt samengevoegd in contact1.
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

        return;

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
        if($this->toContact->type_id !== $this->fromContact->type_id){
            throw new \Exception('Personen kunnen niet worden samengevoegd met organisaties.');
        }

        if($this->toContact->twinfieldNumbers()->exists() && $this->fromContact->twinfieldNumbers()->exists()){
            throw new \Exception('Contacten zijn beide gekoppeld via Twinfield, ontkoppel eerst een van de twee contacten handmatig van Twinfield.');
        }
    }

    private function doMerge()
    {
        $this->mergeContact();
        $this->mergePerson();
        $this->mergeOrganisation();
        $this->mergeAddresses();
        $this->mergeGenericHasManyRelation('emails');
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
        $this->mergeGenericHasManyRelation('groups');
        $this->mergeGenericHasManyRelation('contactNotes');
        $this->mergeGenericHasManyRelation('emailAddresses');
        $this->mergeGenericHasManyRelation('occupations');
        $this->mergeGenericHasManyRelation('primaryOccupations');
        $this->mergeGenericHasManyRelation('phoneNumbers');
        $this->mergeGenericHasManyRelation('twinfieldNumbers');
        $this->mergeGenericHasManyRelation('intakes');
        $this->mergeGenericHasManyRelation('revenueDistributionKwh');
        $this->mergeGenericHasManyRelation('twinfieldLogs');
    }

    private function mergeContact()
    {
//        $this->toContact
    }

    private function mergePerson()
    {
        $this->fromContact->person->delete();
    }

    private function mergeOrganisation()
    {
        $errors = (new DeleteOrganisation($this->fromContact->organisation))->delete();

        if ($errors) {
            throw new \Exception('Organisatie kon niet worden verwijderd: ' . implode(', ', $errors));
        }
    }

    private function mergeAddresses()
    {
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
             * Dit adres bestaat nog niet bij contact1, dus verplaatsen we het adres.
             */
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

        foreach($this->fromContact->$relationName as $relation){
            $relation->$foreignKey = $this->toContact->id;
            $relation->save();
        }
    }

    private function mergeGenericHasOneRelation(string $relationName)
    {
        $relation = $this->fromContact->$relationName;

        if($relation){
            $relation->contact_id = $this->toContact->id;
            $relation->save();
        }
    }
}