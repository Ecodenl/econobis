<?php
/**
 * Created by PhpStorm.
 * User: StagiarSoftware
 * Date: 10-8-2018
 * Time: 14:37
 */

namespace App\Helpers\Delete\Models;


use App\Helpers\Delete\DeleteInterface;
use Illuminate\Database\Eloquent\Model;

/**
 * Class DeleteOpportunity
 *
 * Relation: 1-n Emails. Action: dissociate
 * Relation: 1-n Documents. Action: dissociate
 * Relation: 1-n Tasks & notes. Action: call DeleteTask
 * Relation: 1-n Quotation requests. Action: call DeleteQuotationRequest
 *
 * @package App\Helpers\Delete\Models
 */
class DeleteOpportunity implements DeleteInterface
{
    private $errorMessage = [];
    private $opportunity;

    /** Sets the model to delete
     *
     * @param Model $opportunity the model to delete
     */

    public function __construct(Model $opportunity)
    {
        $this->opportunity = $opportunity;
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
        $this->opportunity->delete();

        return $this->errorMessage;
    }

    /** Checks if the model can be deleted and sets error messages
     */
    public function canDelete()
    {
        // 25-04-2024: Verwijderen 1 voor 1 mag ook ongeacht de status van de kans
//        if(!($this->opportunity->status->code_ref == 'inactive' || $this->opportunity->status->code_ref == 'executed' || $this->opportunity->status->code_ref == 'executed-do-it-yourself' || $this->opportunity->status->code_ref == 'no_execution' )){
//            array_push($this->errorMessage, "Er is nog een openstaande kans.");
//        }
        // 25-04-2024: Verwijderen mag niet meer als er nog kansacties onder hangen
        if($this->opportunity->quotationRequests()->count() > 0){
            array_push($this->errorMessage, "Onder kans bij contact " . ($this->opportunity->intake && $this->opportunity->intake->contact ? $this->opportunity->intake->contact->full_name : '*contact onbekend*') . " met maatregel " . ($this->opportunity->measureCategory ? $this->opportunity->measureCategory->name : '*maatregel onbekend*') . " hangen nog kansacties, verwijderen kans niet mogelijk.");
        }
    }

    /** Deletes models recursive
     */
    public function deleteModels()
    {
        foreach ($this->opportunity->tasks as $task) {
            $deleteTask = new DeleteTask($task);
            $this->errorMessage = array_merge($this->errorMessage, $deleteTask->delete());
        }

        foreach ($this->opportunity->notes as $note) {
            $deleteTask = new DeleteTask($note);
            $this->errorMessage = array_merge($this->errorMessage, $deleteTask->delete());
        }

        // 25-04-2024: Verwijderen mag niet meer als er nog kansacties onder hangen
//        foreach ($this->opportunity->quotationRequests as $quotationRequest) {
//            $deleteQuotationRequest = new DeleteQuotationRequest($quotationRequest);
//            $this->errorMessage = array_merge($this->errorMessage, $deleteQuotationRequest->delete());
//        }
    }

    /** The relations which should be dissociated
     */
    public function dissociateRelations()
    {
        foreach ($this->opportunity->emails as $email){
            $email->opportunity()->dissociate();
            $email->save();
        }

        foreach ($this->opportunity->documents as $document){
            $document->opportunity()->dissociate();
            $document->save();
        }
    }

    /**
     * Delete relations who dont need their own Delete class
     */
    public function deleteRelations()
    {

    }

    /** Model specific delete actions e.g. delete files from server
     */
    public function customDeleteActions()
    {

    }

}