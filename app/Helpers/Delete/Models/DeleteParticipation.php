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
use Illuminate\Support\Facades\Log;

/**
 * Class DeleteParticipation
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

    /** If it's called by the cleanup functionality, we land on this function, else on the delete function
     *
     * @return array
     * @throws
     */
    public function cleanup()
    {
        try{
            $this->delete();
            if(!empty($this->errorMessage)) {
                return $this->errorMessage;
            }
        }catch (\Exception $exception){
            Log::error('Fout bij opschonen Deelnames', [
                'exception' => $exception->getMessage(),
                'errormessages' => implode(' | ', $this->errorMessage),
            ]);
            array_push($this->errorMessage, "Fout bij opschonen Deelnames. (meld dit bij Econobis support)");
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
            $this->participation->delete();
        }

        return $this->errorMessage;
    }

    /** Checks if the model can be deleted and sets error messages
     */
    public function canDelete()
    {
        if($this->participation->mutations()->count() > 0){
            array_push($this->errorMessage, "Er zijn nog deelname mutaties in een project. Verwijder de deelname mutaties eerst.");
            return false;
        }

        return true;
    }

    /** Deletes models recursive
     */
    public function deleteModels()
    {
        foreach ($this->participation->projectRevenueDistributions as $revenueDistribution){
            $deleteRevenueDistribution = new DeleteRevenueDistribution($revenueDistribution);
            $this->errorMessage = array_merge($this->errorMessage, ( $deleteRevenueDistribution->delete() ?? [] ) );
        }
        foreach ($this->participation->revenueDistributionKwh as $revenueDistributionKwh){
            $deleteRevenueDistributionKwh = new DeleteRevenueDistributionKwh($revenueDistributionKwh);
            $this->errorMessage = array_merge($this->errorMessage, ( $deleteRevenueDistributionKwh->delete() ?? [] ) );
        }

        foreach ($this->participation->tasks as $task){
            $deleteTask = new DeleteTask($task);
            $this->errorMessage = array_merge($this->errorMessage, ( $deleteTask->delete() ?? [] ) );
        }

        foreach ($this->participation->financialOverviewParticipantProjects as $financialOverviewParticipantProject){
            $deleteFinancialOverviewParticipantProject = new DeleteFinancialOverviewParticipantProject($financialOverviewParticipantProject);
            $this->errorMessage = array_merge($this->errorMessage, ( $deleteFinancialOverviewParticipantProject->delete() ?? [] ) );
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