<?php
/**
 * Created by PhpStorm.
 * User: Fren de Haan
 * Date: 19-1-2018
 * Time: 11:55
 */

namespace App\Helpers\Delete\Models;

use App\Helpers\Delete\DeleteInterface;
use Illuminate\Database\Eloquent\Model;

/**
 * Class DeleteContact
 *
 * Relation: 1-1 Organisation. Action: call DeleteOrganisation
 * Relation: 1-1 Person. Action: delete
 * Relation: 1-n Documents. Action: dissociate
 * Relation: 1-n Email address. Action: delete
 * Relation: 1-n Intakes. Action: call DeleteIntake
 * Relation: 1-n Orders. Action: call DeleteOrder
 * Relation: 1-n Participation gifted by contact. Action: detach
 * Relation: 1-n Participation legal rep contact. Action: detach
 * Relation: 1-n Participations. Action: call DeleteParticipation
 * Relation: 1-n RevenueDistributions. Action: call DeleteRevenueDistribution
 * Relation: 1-n Addresses. Action: call DeleteAddress
 * Relation: 1-n Tasks & notes. Action: call DeleteTask
 * Relation: n-n Contact emails. Action: remove pivots
 * Relation: n-n Contact groups. Action: remove pivots
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

    /** Main method for deleting this model and all it's relations
     *
     * @return array
     * @throws
     */
    public function delete()
    {
        $this->canDelete();
        $this->deleteModels();
        $this->dissociateRelations();
        $this->deleteRelations();
        $this->customDeleteActions();
        $this->contact->delete();

        return $this->errorMessage;
    }

    /** Checks if the model can be deleted
     *
     */
    public function canDelete()
    {
        if($this->contact->primaryOccupations()->count() > 0){
            array_push($this->errorMessage, "Er is nog een verbinding aanwezig.");
        }

        if($this->contact->occupations()->count() > 0){
            array_push($this->errorMessage, "Er is nog een verbinding aanwezig.");
        }
    }

    /** Deletes models recursive
     *
     */
    public function deleteModels()
    {
        foreach ($this->contact->addresses as $address){
            $deleteAddress = new DeleteAddress($address);
            $this->errorMessage = array_merge($this->errorMessage, $deleteAddress->delete());
        }

        foreach ($this->contact->tasks as $task){
            $deleteTask = new DeleteTask($task);
            $this->errorMessage = array_merge($this->errorMessage, $deleteTask->delete());
        }

        foreach ($this->contact->notes as $note){
            $deleteTask = new DeleteTask($note);
            $this->errorMessage = array_merge($this->errorMessage, $deleteTask->delete());
        }

        if($this->contact->isOrganisation()) {
            $deleteOrganisation = new DeleteOrganisation($this->contact->organisation);
            $this->errorMessage = array_merge($this->errorMessage, $deleteOrganisation->delete());
        }

        foreach ($this->contact->productionProjectRevenueDistributions as $revenue){
            $deleteRevenue = new DeleteRevenueDistribution($revenue);
            $this->errorMessage = array_merge($this->errorMessage, $deleteRevenue->delete());
        }

        foreach ($this->contact->orders as $order){
            $deleteOrder = new DeleteOrder($order);
            $this->errorMessage = array_merge($this->errorMessage, $deleteOrder->delete());
        }

        foreach ($this->contact->participations as $participation){
            $deleteParticipation = new DeleteParticipation($participation);
            $this->errorMessage = array_merge($this->errorMessage, $deleteParticipation->delete());
        }

        foreach ($this->contact->intakes as $intake){
            $deleteIntake = new DeleteIntake($intake);
            $this->errorMessage = array_merge($this->errorMessage, $deleteIntake->delete());
        }
    }

    /** The relations which should be dissociated
     */
    public function dissociateRelations()
    {
        foreach ($this->contact->participationsGifted() as $participation){
            $participation->giftedByContact()->dissociate();
            $participation->save();
        }

        foreach ($this->contact->participationsLegalRep() as $participation){
            $participation->legalRepContact()->dissociate();
            $participation->save();
        }

        foreach ($this->contact->documents() as $document){
            $document->contact()->dissociate();
            $document->save();
        }
    }

    /**
     * Delete relations who dont need their own Delete class
     */
    public function deleteRelations()
    {
        if($this->contact->isPerson()) {
            $this->contact->person->delete();
        }

        foreach ($this->contact->emailAddresses as $emailAddress){
            $emailAddress->delete();
        }
    }


    /** Model specific delete actions e.g. delete files from server
     *
     */
    public function customDeleteActions()
    {
    }
}