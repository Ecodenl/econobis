<?php
/**
 * Created by PhpStorm.
 * User: Fren de Haan
 * Date: 19-1-2018
 * Time: 11:55
 */

namespace App\Helpers\Delete\Models;

use App\Helpers\Delete\DeleteInterface;
use App\Helpers\Delete\Traits\ChecksExcludedCleanupContacts;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Log;

/**
 * Class DeleteContact
 *
 * @package App\Helpers\Delete
 */
class DeleteContact implements DeleteInterface
{
    use ChecksExcludedCleanupContacts;

    private bool $isCleanup = false;
    private $errorMessage = [];
    private $contact;

    /** Sets the model to delete
     *
     * @param Model $contact the model to delete
     */

    public function __construct(Model $contact)
    {
        $this->contact = $contact;
    }

    /** If it's called by the cleanup functionality, we land on this function, else on the delete function
     *
     * @return array
     * @throws
     */
    public function cleanup()
    {
        try {
            $this->isCleanup = true;

            if (! $this->canCleanup()) {
                return $this->errorMessage;
            }

            return $this->delete();
        } catch (\Exception $exception) {
            Log::error('Fout bij opschonen Contacten', [
                'exception' => $exception->getMessage(),
                'errormessages' => implode(' | ', $this->errorMessage),
            ]);

            $this->errorMessage[] =
                "Fout bij opschonen Contacten. "
                . "(meld dit bij Econobis support)";

            return $this->errorMessage;
        }
    }

    public function canCleanup(): bool
    {
        $contactName = $this->contact->full_name_fnf;
        $contactId = $this->contact->id;

        if ($this->isContactExcludedFromCleanup($contactId)) {
            $this->errorMessage[] =
                "Contact {$contactName} ({$contactId}) kan niet worden "
                . "opgeschoond: het contact valt in een uitzonderingsgroep.";

            return false;
        }

        foreach ($this->contact->addresses as $address) {
            $deleteAddress = new DeleteAddress($address);

            if (! $deleteAddress->canDelete()) {
                $this->errorMessage[] =
                    "Contact {$contactName} ({$contactId}) kan niet worden "
                    . "opgeschoond: een gekoppeld adres kan niet worden verwijderd.";

                return false;
            }
        }

        foreach ($this->contact->tasks as $task) {
            $deleteTask = new DeleteTask($task);

            if (! $deleteTask->canCleanup()) {
                $this->errorMessage[] =
                    "Contact {$contactName} ({$contactId}) kan niet worden "
                    . "opgeschoond: een gekoppelde taak kan niet worden opgeschoond.";

                return false;
            }
        }

        foreach ($this->contact->notes as $note) {
            $deleteTask = new DeleteTask($note);

            if (! $deleteTask->canCleanup()) {
                $this->errorMessage[] =
                    "Contact {$contactName} ({$contactId}) kan niet worden "
                    . "opgeschoond: een gekoppelde notitie kan niet worden opgeschoond.";

                return false;
            }
        }

        foreach (
            $this->contact->projectRevenueDistributions
            as $revenueDistribution
        ) {
            $deleteRevenueDistribution =
                new DeleteRevenueDistribution($revenueDistribution);

            if (! $deleteRevenueDistribution->canCleanup()) {
                $this->errorMessage[] =
                    "Contact {$contactName} ({$contactId}) kan niet worden "
                    . "opgeschoond: een gekoppelde opbrengstverdeling kan "
                    . "niet worden opgeschoond.";

                return false;
            }
        }

        foreach (
            $this->contact->revenueDistributionKwh
            as $revenueDistributionKwh
        ) {
            $deleteRevenueDistributionKwh =
                new DeleteRevenueDistributionKwh($revenueDistributionKwh);

            if (! $deleteRevenueDistributionKwh->canCleanup()) {
                $this->errorMessage[] =
                    "Contact {$contactName} ({$contactId}) kan niet worden "
                    . "opgeschoond: een gekoppelde Kwh-opbrengstverdeling "
                    . "kan niet worden opgeschoond.";

                return false;
            }
        }

        foreach ($this->contact->orders as $order) {
            $deleteOrder = new DeleteOrder($order);

            if (! $deleteOrder->canCleanup()) {
                $this->errorMessage[] =
                    "Contact {$contactName} ({$contactId}) kan niet worden "
                    . "opgeschoond: een gekoppelde order kan niet worden "
                    . "opgeschoond.";

                return false;
            }
        }

        foreach ($this->contact->participations as $participation) {
            $deleteParticipation = new DeleteParticipation($participation);

            if (! $deleteParticipation->canCleanup()) {
                $this->errorMessage[] =
                    "Contact {$contactName} ({$contactId}) kan niet worden "
                    . "opgeschoond: een gekoppelde deelname kan niet worden "
                    . "opgeschoond.";

                return false;
            }
        }

        foreach ($this->contact->intakes as $intake) {
            $deleteIntake = new DeleteIntake($intake);

            if (! $deleteIntake->canCleanup()) {
                $this->errorMessage[] =
                    "Contact {$contactName} ({$contactId}) kan niet worden "
                    . "opgeschoond: een gekoppelde intake kan niet worden "
                    . "opgeschoond.";

                return false;
            }
        }

        foreach (
            $this->contact->financialOverviewContacts
            as $financialOverviewContact
        ) {
            $deleteFinancialOverviewContact =
                new DeleteFinancialOverviewContact(
                    $financialOverviewContact
                );

            if (! $deleteFinancialOverviewContact->canCleanup()) {
                $this->errorMessage[] =
                    "Contact {$contactName} ({$contactId}) kan niet worden "
                    . "opgeschoond: een gekoppelde financiële waardestaat "
                    . "kan niet worden opgeschoond.";

                return false;
            }
        }

        return true;
    }

    /** Main method for deleting this model and all it's relations
     *
     * @return array errorMessage array
     * @throws
     */
    public function delete()
    {
        if (! $this->canDelete()) {
            return $this->errorMessage;
        }
        $this->deleteModels();
        $this->dissociateRelations();
        $this->deleteRelations();
        $this->customDeleteActions();
        if( count($this->errorMessage) === 0 ) {
            $this->contact->delete();
        }

        return $this->errorMessage;
    }

    /** Checks if the model can be deleted
     *
     */
    public function canDelete(): bool
    {
        $contactFullName = $this->contact->full_name_fnf;
        $contactId = $this->contact->id;
        if($this->contact->primaryOccupations()->count() > 0){
            array_push($this->errorMessage, "Bij contact " . $contactFullName . " (" . $contactId . ") is nog een verbinding aanwezig, Verwijder de verbinding bij het contact en verwijder dan het contact opnieuw.");
            return false;
        }

        if($this->contact->occupations()->count() > 0){
            array_push($this->errorMessage, "Bij contact " . $contactFullName . " (" . $contactId . ") is nog een verbinding aanwezig, Verwijder de verbinding bij het contact en verwijder dan het contact opnieuw.");
            return false;
        }

        if($this->contact->portalUser()->count() > 0){
            array_push($this->errorMessage, "Contact " . $contactFullName . " (" . $contactId . ") maakt gebruik van de 'mijn coöperatie portal'. Ga naar het contact en verwijder 'Portal gebruiker gegevens'. Verwijder dan het contact opnieuw.");
            return false;
        }

        if($this->contact->organisation && $this->contact->organisation->campaigns->count() > 0){
            $campaignNumbers = $this->contact->organisation->campaigns->pluck('number')->toArray();
            array_push($this->errorMessage, "Organisatie " . $contactFullName . " (" . $contactId . ") is nog betrokken bij een of meer campagnes: " . implode(',', $campaignNumbers) . " Verwijder de organisatie als betrokken bedrijf bij campagne(s) en verwijder dan het contact opnieuw.");
            return false;
        }

        if($this->contact->coachCampaigns->count() > 0){
            $campaignNumbers = $this->contact->coachCampaigns->pluck('number')->toArray();
            array_push($this->errorMessage, "Persoon " . $contactFullName . " (" . $contactId . ") is als coach nog betrokken bij een of meer campagnes: " . implode(',', $campaignNumbers) . " Verwijder de persoon als betrokken coach bij campagne(s) en verwijder dan het contact opnieuw.");
            return false;
        }
        if($this->contact->projectManagerCampaigns->count() > 0){
            $campaignNumbers = $this->contact->projectManagerCampaigns->pluck('number')->toArray();
            array_push($this->errorMessage, "Persoon " . $contactFullName . " (" . $contactId . ") is als projectleider nog betrokken bij een of meer campagnes: " . implode(',', $campaignNumbers) . " Verwijder de persoon als betrokken projectleider bij campagne(s) en verwijder dan het contact opnieuw.");
            return false;
        }
        if($this->contact->externalPartyCampaigns->count() > 0){
            $campaignNumbers = $this->contact->externalPartyCampaigns->pluck('number')->toArray();
            array_push($this->errorMessage, "Persoon " . $contactFullName . " (" . $contactId . ") is als externe partij nog betrokken bij een of meer campagnes: " . implode(',', $campaignNumbers) . " Verwijder de persoon als betrokken externe partij bij campagne(s) en verwijder dan het contact opnieuw.");
            return false;
        }

        return true;
    }

    /** Deletes models recursive
     *
     */
    public function deleteModels()
    {
        foreach ($this->contact->addresses as $address) {
            $deleteAddress = new DeleteAddress($address);

            $this->errorMessage = array_merge(
                $this->errorMessage,
                $deleteAddress->delete() ?? []
            );
        }

        foreach ($this->contact->tasks as $task) {
            $this->deleteChild(new DeleteTask($task));
        }

        foreach ($this->contact->notes as $note) {
            $this->deleteChild(new DeleteTask($note));
        }

        if ($this->contact->isOrganisation()) {
            $deleteOrganisation = new DeleteOrganisation(
                $this->contact->organisation
            );

            $this->errorMessage = array_merge(
                $this->errorMessage,
                $deleteOrganisation->delete() ?? []
            );
        }

        foreach (
            $this->contact->projectRevenueDistributions
            as $revenueDistribution
        ) {
            $this->deleteChild(
                new DeleteRevenueDistribution($revenueDistribution)
            );
        }

        foreach (
            $this->contact->revenueDistributionKwh
            as $revenueDistributionKwh
        ) {
            $this->deleteChild(
                new DeleteRevenueDistributionKwh($revenueDistributionKwh)
            );
        }

        foreach ($this->contact->orders as $order) {
            $this->deleteChild(new DeleteOrder($order));
        }

        foreach ($this->contact->participations as $participation) {
            $this->deleteChild(new DeleteParticipation($participation));
        }

        foreach ($this->contact->intakes as $intake) {
            $this->deleteChild(new DeleteIntake($intake));
        }

        foreach ($this->contact->quotationRequests as $quotationRequest) {
            $quotationRequest->contact_id = null;
            $quotationRequest->save();
        }

        foreach (
            $this->contact->quotationRequestsAsProjectManager
            as $quotationRequest
        ) {
            $quotationRequest->project_manager_id = null;
            $quotationRequest->save();
        }

        foreach (
            $this->contact->quotationRequestsAsExternalParty
            as $quotationRequest
        ) {
            $quotationRequest->external_party_id = null;
            $quotationRequest->save();
        }

        foreach (
            $this->contact->financialOverviewContacts
            as $financialOverviewContact
        ) {
            $this->deleteChild(
                new DeleteFinancialOverviewContact(
                    $financialOverviewContact
                )
            );
        }
    }

    /** The relations which should be dissociated
     */
    public function dissociateRelations()
    {
        foreach ($this->contact->participationsGifted as $participation){
            $participation->giftedByContact()->dissociate();
            $participation->save();
        }

        foreach ($this->contact->participationsLegalRep as $participation){
            $participation->legalRepContact()->dissociate();
            $participation->save();
        }

        foreach ($this->contact->documents as $document){
            $document->contact()->dissociate();
            $document->save();
        }

        $this->contact->manualEmails()->detach();
        $this->contact->groups()->detach();
    }

    /**
     * Delete relations who dont need their own Delete class
     */
    public function deleteRelations()
    {
        // softdeletable
        $this->contact->phoneNumbers()->delete();
        $this->contact->emailAddresses()->delete();
        $this->contact->contactNotes()->delete();

        foreach ($this->contact->freeFieldsFieldRecords as $freeFieldsFieldRecord){
            $freeFieldsFieldRecord->freeFieldsFieldLogs()->delete();
            $freeFieldsFieldRecord->delete();
        }
        foreach ($this->contact->portalFreeFieldsFieldRecords as $portalFreeFieldsFieldRecord){
            $portalFreeFieldsFieldRecord->freeFieldsFieldLogs()->delete();
            $portalFreeFieldsFieldRecord->delete();
        }

        if($this->contact->isPerson()) {
            $this->contact->person->delete();
        }

        // hard delete
        $this->contact->contactEmails()->delete(); //// contact_email is een echte tabel met model ContactEmail (niet-softdeletable)
        $this->contact->responses()->delete();
        $this->contact->twinfieldNumbers()->delete();
        $this->contact->twinfieldLogs()->delete();
        $this->contact->availabilities()->delete();

    }


    /** Model specific delete actions e.g. delete files from server
     *
     */
    public function customDeleteActions()
    {
    }

    private function deleteChild($deleteHelper): void
    {
        $result = $this->isCleanup
            ? $deleteHelper->cleanup()
            : $deleteHelper->delete();

        $this->errorMessage = array_merge(
            $this->errorMessage,
            $result ?? []
        );
    }
}