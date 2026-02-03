<?php
/**
 * Created by PhpStorm.
 * User: Fren de Haan
 * Date: 19-1-2018
 * Time: 11:55
 */

namespace App\Helpers\Delete\Models;

use App\Eco\Cooperation\Cooperation;
use App\Helpers\Delete\DeleteInterface;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Log;

/**
 * Class DeleteContact
 *
 * @package App\Helpers\Delete
 */
class DeleteContact implements DeleteInterface
{
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
        try{
            return $this->delete();
        }catch (\Exception $exception){
            Log::error('Fout bij opschonen Contacten', [
                'exception' => $exception->getMessage(),
                'errormessages' => implode(' | ', $this->errorMessage),
            ]);
            array_push($this->errorMessage, "Fout bij opschonen Contacten. (meld dit bij Econobis support)");
            return $this->errorMessage;
        }
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
    public function canDelete()
    {
        if($this->contact->primaryOccupations()->count() > 0){
            array_push($this->errorMessage, "Er is nog een verbinding aanwezig, Verwijder de verbinding bij het contact en verwijder dan het contact opnieuw.");
            return false;
        }

        if($this->contact->occupations()->count() > 0){
            array_push($this->errorMessage, "Er is nog een verbinding aanwezig, Verwijder de verbinding bij het contact en verwijder dan het contact opnieuw.");
            return false;
        }

        if($this->contact->portalUser()->count() > 0){
            array_push($this->errorMessage, "Dit contact maakt gebruik van de 'mijn coöperatie portal'. Ga naar het contact en verwijder 'Portal gebruiker gegevens'. Verwijder dan het contact opnieuw.");
            return false;
        }

        if($this->contact->organisation && $this->contact->organisation->campaigns->count() > 0){
            $campaignNumbers = $this->contact->organisation->campaigns->pluck('number')->toArray();
            array_push($this->errorMessage, "Organisatie is nog betrokken bij een of meer campagnes: " . implode(',', $campaignNumbers) . " Verwijder de organisatie als betrokken bedrijf bij campagne(s) en verwijder dan het contact opnieuw.");
            return false;
        }

        if($this->contact->coachCampaigns->count() > 0){
            $campaignNumbers = $this->contact->coachCampaigns->pluck('number')->toArray();
            array_push($this->errorMessage, "Persoon is als coach nog betrokken bij een of meer campagnes: " . implode(',', $campaignNumbers) . " Verwijder de persoon als betrokken coach bij campagne(s) en verwijder dan het contact opnieuw.");
            return false;
        }
        if($this->contact->projectManagerCampaigns->count() > 0){
            $campaignNumbers = $this->contact->projectManagerCampaigns->pluck('number')->toArray();
            array_push($this->errorMessage, "Persoon is als projectleider nog betrokken bij een of meer campagnes: " . implode(',', $campaignNumbers) . " Verwijder de persoon als betrokken projectleider bij campagne(s) en verwijder dan het contact opnieuw.");
            return false;
        }
        if($this->contact->externalPartyCampaigns->count() > 0){
            $campaignNumbers = $this->contact->externalPartyCampaigns->pluck('number')->toArray();
            array_push($this->errorMessage, "Persoon is als externe partij nog betrokken bij een of meer campagnes: " . implode(',', $campaignNumbers) . " Verwijder de persoon als betrokken externe partij bij campagne(s) en verwijder dan het contact opnieuw.");
            return false;
        }

        return true;
    }

    /** Deletes models recursive
     *
     */
    public function deleteModels()
    {
        foreach ($this->contact->addresses as $address){
            $deleteAddress = new DeleteAddress($address);
            $this->errorMessage = array_merge($this->errorMessage, ( $deleteAddress->delete() ?? [] ) );
        }

        foreach ($this->contact->tasks as $task){
            $deleteTask = new DeleteTask($task);
            $this->errorMessage = array_merge($this->errorMessage, ( $deleteTask->delete() ?? [] ) );
        }

        foreach ($this->contact->notes as $note){
            $deleteTask = new DeleteTask($note);
            $this->errorMessage = array_merge($this->errorMessage, ( $deleteTask->delete() ?? [] ) );
        }

        if($this->contact->isOrganisation()) {
            $deleteOrganisation = new DeleteOrganisation($this->contact->organisation);
            $this->errorMessage = array_merge($this->errorMessage, ( $deleteOrganisation->delete() ?? [] ) );
        }

        foreach ($this->contact->projectRevenueDistributions as $revenueDistribution){
            $deleteRevenueDistribution = new DeleteRevenueDistribution($revenueDistribution);
            $this->errorMessage = array_merge($this->errorMessage, ( $deleteRevenueDistribution->delete() ?? [] ) );
        }
        foreach ($this->contact->revenueDistributionKwh as $revenueDistributionKwh){
            $deleteRevenueDistributionKwh = new DeleteRevenueDistributionKwh($revenueDistributionKwh);
            $this->errorMessage = array_merge($this->errorMessage, ( $deleteRevenueDistributionKwh->delete() ?? [] ) );
        }

        foreach ($this->contact->orders as $order){
            $deleteOrder = new DeleteOrder($order);
            $this->errorMessage = array_merge($this->errorMessage, ( $deleteOrder->delete() ?? [] ) );
        }

        foreach ($this->contact->participations as $participation){
            $deleteParticipation = new DeleteParticipation($participation);
            $this->errorMessage = array_merge($this->errorMessage, ( $deleteParticipation->delete() ?? [] ) );
        }

        foreach ($this->contact->intakes as $intake){
            $deleteIntake = new DeleteIntake($intake);
            $this->errorMessage = array_merge($this->errorMessage, ( $deleteIntake->delete() ?? [] ) );
        }

        foreach ($this->contact->quotationRequests as $quotationRequest){
            $quotationRequest->contact_id = null;
            $quotationRequest->save();
        }
        foreach ($this->contact->quotationRequestsAsProjectManager as $quotationRequest){
            $quotationRequest->project_manager_id = null;
            $quotationRequest->save();
        }
        foreach ($this->contact->quotationRequestsAsExternalParty as $quotationRequest){
            $quotationRequest->external_party_id = null;
            $quotationRequest->save();
        }

        foreach ($this->contact->financialOverviewContacts as $financialOverviewContact){
            $deleteFinancialOverviewContact = new DeleteFinancialOverviewContact($financialOverviewContact);
            $this->errorMessage = array_merge($this->errorMessage, ( $deleteFinancialOverviewContact->delete() ?? [] ) );
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

        foreach ($this->contact->responses as $response){
            $response->delete();
        }

        $this->contact->manualEmails()->detach();
        $this->contact->groups()->detach();
    }

    /**
     * Delete relations who dont need their own Delete class
     */
    public function deleteRelations()
    {
        $this->contact->contactEmails()->delete();

        foreach ($this->contact->emailAddresses as $emailAddress){
            $emailAddress->delete();
        }

        if($this->contact->isPerson()) {
            $this->contact->person->delete();
        }
    }


    /** Model specific delete actions e.g. delete files from server
     *
     */
    public function customDeleteActions()
    {
    }
}