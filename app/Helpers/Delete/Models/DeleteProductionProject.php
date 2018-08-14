<?php
/**
 * Created by PhpStorm.
 * User: StagiarSoftware
 * Date: 13-8-2018
 * Time: 16:20
 */

namespace App\Helpers\Delete\Models;


use App\Helpers\Delete\DeleteInterface;
use Illuminate\Database\Eloquent\Model;

/**
 * Class DeleteProductionProject
 *
 * Relation: 1-n Participations. Action: call DeleteParticipation
 * Relation: 1-n Documents. Action: dissociate
 * Relation: 1-n Tasks. Action: call DeleteTask
 * Relation: 1-n Emails. Action: dissociate.
 *
 * @package App\Helpers\Delete\Models
 */
class DeleteProductionProject implements DeleteInterface
{
    private $errorMessage = [];
    private $productionProject;

    /** Sets the model to delete
     *
     * @param Model $productionProject the model to delete
     */

    public function __construct(Model $productionProject)
    {
        $this->productionProject = $productionProject;
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
        $this->productionProject->delete();

        return $this->errorMessage;
    }


    /** Checks if the model can be deleted and sets error messages
     */
    public function canDelete()
    {
        // TODO: Implement canDelete() method.
    }

    /** Deletes models recursive
     */
    public function deleteModels()
    {
        foreach ($this->productionProject->participations as $participation){
            $deleteParticipation = new DeleteParticipation($participation);
            $this->errorMessage = array_merge($this->errorMessage, $deleteParticipation->delete());
        }

        foreach ($this->productionProject->tasks as $task) {
            $deleteTask = new DeleteTask($task);
            $this->errorMessage = array_merge($this->errorMessage, $deleteTask->delete());
        }
    }

    /** The relations which should be dissociated
     */
    public function dissociateRelations()
    {
        foreach ($this->productionProject->emails() as $email){
            $email->productionProject()->dissociate();
            $email->save();
        }

        foreach ($this->productionProject->documents() as $document){
            $document->productionProject()->dissociate();
            $document->save();
        }
    }

    /**
     * Delete relations who dont need their own Delete class
     */
    public function deleteRelations()
    {
        // TODO: Implement deleteRelations() method.
    }

    /** Model specific delete actions e.g. delete files from server
     */
    public function customDeleteActions()
    {
        // TODO: Implement customDeleteActions() method.
    }

}