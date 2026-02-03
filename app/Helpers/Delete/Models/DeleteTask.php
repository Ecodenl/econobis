<?php
/**
 * Created by PhpStorm.
 * User: StagiarSoftware
 * Date: 10-8-2018
 * Time: 9:51
 */

namespace App\Helpers\Delete\Models;


use App\Helpers\Delete\DeleteInterface;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Log;

/**
 * Class DeleteTask
 *
 * @package App\Helpers\Delete\Models
 */
class DeleteTask implements DeleteInterface
{

    private $errorMessage = [];
    private $task;

    /** Sets the model to delete
     *
     * @param Model $task the model to delete
     */
    public function __construct(Model $task)
    {
        $this->task = $task;
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
            Log::error('Fout bij opschonen Taken', [
                'exception' => $exception->getMessage(),
                'errormessages' => implode(' | ', $this->errorMessage),
            ]);
            array_push($this->errorMessage, "Fout bij opschonen Taken. (meld dit bij Econobis support)");
            return $this->errorMessage;
        }

    }

    /** Main method for deleting this model and all it's relations
     *
     * @return array
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
            $this->task->delete();
        }

        return $this->errorMessage;
    }

    /** Checks if the model can be deleted and sets error messages
     */
    public function canDelete()
    {
        // 22-04-2024: Verwijderen 1 voor 1 mag ook ongeacht de status van de taak
//        if(!$this->task->finished){
//            array_push($this->errorMessage, "Er is nog een taak die niet is afgerond. Zet de taak op afgehandeld en verwijder dan opnieuw.");
//            return false;
//        }
        // van hieruit altijd true
        return true;
    }

    /** Deletes models recursive
     */
    public function deleteModels()
    {
        foreach ($this->task->tasks as $task) {
            $deleteTask = new DeleteTask($task);
            $this->errorMessage = array_merge($this->errorMessage, ( $deleteTask->delete() ?? [] ) );
        }

        foreach ($this->task->notes as $task) {
            $deleteTask = new DeleteTask($task);
            $this->errorMessage = array_merge($this->errorMessage, ( $deleteTask->delete() ?? [] ) );
        }
    }

    /** The relations which should be dissociated
     */
    public function dissociateRelations()
    {
        foreach ($this->task->emails as $email){
            $email->task()->dissociate();
            $email->save();
        }

        foreach ($this->task->documents as $document){
            $document->task()->dissociate();
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