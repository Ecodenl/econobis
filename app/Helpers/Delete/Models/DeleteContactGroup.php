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
 * Class DeleteContactGroup
 *
 * Relation 1-n: Documents. Action: dissociate
 * Relation 1-n: Emails. Action: dissociate
 * Relation 1-n: Tasks. Action: call DeleteTask
 *
 * @package App\Helpers\Delete
 */
class DeleteContactGroup implements DeleteInterface
{
    private $errorMessage = [];
    private $contactGroup;

    /** Sets the model to delete
     *
     * @param Model $contactGroup the model to delete
     */

    public function __construct(Model $contactGroup)
    {
        $this->contactGroup = $contactGroup;
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
        $this->contactGroup->delete();

        return $this->errorMessage;
    }

    /** Checks if the model can be deleted
     *
     */
    public function canDelete()
    {

    }

    /** Deletes models recursive
     *
     */
    public function deleteModels()
    {
        foreach ($this->contactGroup->tasks as $task){
            $deleteTask = new DeleteTask($task);
            $this->errorMessage = array_merge($this->errorMessage, $deleteTask->delete());
        }
    }

    /** The relations which should be dissociated
     */
    public function dissociateRelations()
    {
        foreach ($this->contactGroup->documents as $document){
            $document->contactGroup()->dissociate();
            $document->save();
        }

        foreach ($this->contactGroup->emails as $email){
            $email->contactGroup()->dissociate();
            $email->save();
        }
    }

    /**
     * Delete relations who dont need their own Delete class
     */
    public function deleteRelations()
    {

    }


    /** Model specific delete actions e.g. delete files from server
     *
     */
    public function customDeleteActions()
    {
    }
}