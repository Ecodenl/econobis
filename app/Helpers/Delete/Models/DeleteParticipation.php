<?php
/**
 * Created by PhpStorm.
 * User: StagiarSoftware
 * Date: 10-8-2018
 * Time: 9:23
 */

namespace App\Helpers\Delete\Models;


use App\Helpers\Delete\DeleteInterface;
use Illuminate\Database\Eloquent\Model;

/**
 * Class DeleteParticipation
 *
 * Relation: 1-n Revenue distribution. Action: call DeleteRevenueDistribution
 * Relation: 1-n Documents. Action: dissociate
 * Relation: 1-n Tasks. Action: call DeleteTask
 *
 * @package App\Helpers\Delete\Models
 */
class DeleteParticipation implements DeleteInterface
{

    private $errorMessage = [];
    private $participation;

    /** Sets the model to delete
     *
     * @param Model $participation the model to delete
     */

    public function __construct(Model $participation)
    {
        $this->participation = $participation;
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
        $this->participation->delete();

        return $this->errorMessage;
    }

    /** Checks if the model can be deleted and sets error messages
     */
    public function canDelete()
    {
        if($this->participation->transactions()->count() > 0){
            array_push($this->errorMessage, "Er is al een financiële transactie.");
        }

        if($this->participation->status_id === 2){
            array_push($this->errorMessage, "Er is nog een participatie.");
        }
    }

    /** Deletes models recursive
     */
    public function deleteModels()
    {
        foreach ($this->participation->productionProjectRevenueDistributions as $revenueDistribution){
            $deleteRevenueDistribution = new DeleteRevenueDistribution($revenueDistribution);
            $this->errorMessage = array_merge($this->errorMessage, $deleteRevenueDistribution->delete());
        }

        foreach ($this->participation->tasks as $task){
            $deleteTask = new DeleteTask($task);
            $this->errorMessage = array_merge($this->errorMessage, $deleteTask->delete());
        }
    }

    /** The relations which should be dissociated
     */
    public function dissociateRelations()
    {
        foreach ($this->participation->documents as $document){
            $document->participant()->dissociate();
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