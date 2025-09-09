<?php
/**
 * Created by PhpStorm.
 * User: StagiarSoftware
 * Date: 10-8-2018
 * Time: 9:23
 */

namespace App\Helpers\Delete\Models;


use App\Eco\Cooperation\Cooperation;
use App\Helpers\Delete\DeleteInterface;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

/**
 * Class DeleteIntake
 *
 * Relation: 1-n Documents. Action: dissociate
 * Relation: 1-n Emails. Action: dissociate
 * Relation: 1-n Opportunities. Action: call DeleteOpportunity
 * Relation: 1-n Tasks & notes. Action: call DeleteTask
 *
 * @package App\Helpers\Delete\Models
 */
class DeleteIntake implements DeleteInterface
{
    private $errorMessage = [];
    private $intake;

    /** Sets the model to delete
     *
     * @param Model $intake the model to delete
     */
    public function __construct(Model $intake)
    {
        $this->intake = $intake;
    }

    /** If it's called by the cleanup functionality, we land on this function, else on the delete function
     *
     * @return array
     * @throws
     */
    public function cleanup()
    {
        $this->delete();

        $dateToday = Carbon::now();
        $cooperation = Cooperation::first();

        $cleanupItem = $cooperation->cleanupItems()->where('code_ref', 'intakes')->first();

        $cleanupItem->number_of_items_to_delete = 0;
        $cleanupItem->date_cleaned_up = $dateToday;
        $cleanupItem->save();
    }

    /** Main method for deleting this model and all it's relations
     *
     * @return array errorMessage array
     * @throws
     */
    public function delete()
    {
        $this->canDelete();
        $this->deleteModels();
        $this->dissociateRelations();
        $this->deleteRelations();
        $this->customDeleteActions();
        $this->intake->delete();

        return $this->errorMessage;
    }

    /** Checks if the model can be deleted and sets error messages
     *
     */
    public function canDelete()
    {
        // 25-04-2024: Verwijderen 1 voor 1 mag ook ongeacht de status van de intake
//        if(!($this->intake->intake_status_id === 2 || $this->intake->intake_status_id === 3)){
//            array_push($this->errorMessage, "Er is nog een intake die niet gesloten is.");
//        }
        // 25-04-2024: Verwijderen mag niet meer als er nog kansen onder hangen
        if($this->intake->opportunities()->count() > 0){
            array_push($this->errorMessage, "Onder intake " . ($this->intake->address ? $this->intake->address->fullAddress : '*adres onbekend*') . " hangen nog kansen, verwijderen intake niet mogelijk.");
        }

    }

    /** Deletes models recursive
     */
    public function deleteModels()
    {
        foreach ($this->intake->tasks as $task){
            $deleteTask = new DeleteTask($task);
            $this->errorMessage = array_merge($this->errorMessage, $deleteTask->delete());
        }

        foreach ($this->intake->notes as $note){
            $deleteTask = new DeleteTask($note);
            $this->errorMessage = array_merge($this->errorMessage, $deleteTask->delete());
        }

        // 25-04-2024: Verwijderen mag niet meer als er nog kansen onder hangen
//        foreach ($this->intake->opportunities as $opportunity){
//            $deleteOpportunity = new DeleteOpportunity($opportunity);
//            $this->errorMessage = array_merge($this->errorMessage, $deleteOpportunity->delete());
//        }
    }

    /** The relations which should be dissociated
     */
    public function dissociateRelations()
    {
        foreach ($this->intake->emails as $email){
            $email->intake()->dissociate();
            $email->save();
        }

        foreach ($this->intake->documents as $document){
            $document->intake()->dissociate();
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