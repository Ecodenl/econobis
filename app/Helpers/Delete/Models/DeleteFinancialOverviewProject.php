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
 * Class DeleteFinancialOverviewProject
 *
 * Relation: 1-n Emails. Action: dissociate
 * Relation: 1-n Documents. Action: dissociate
 * Relation: 1-n Tasks & notes. Action: call DeleteTask
 * Relation: 1-n Quotation requests. Action: call DeleteQuotationRequest
 *
 * @package App\Helpers\Delete\Models
 */
class DeleteFinancialOverviewProject implements DeleteInterface
{
    private bool $isCleanup = false;
    private bool $force = false; // default softdelete
    private $errorMessage = [];
    private $financialOverviewProject;

    /** Sets the model to delete
     *
     * @param Model $financialOverviewProject the model to delete
     */

    public function __construct(Model $financialOverviewProject, bool $isCleanup = false)
    {
        $this->financialOverviewProject = $financialOverviewProject;
        $this->isCleanup = $isCleanup;
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

        if (count($this->errorMessage) === 0) {
            if ($this->force) {
                $this->financialOverviewProject->forceDelete();
            } else {
                $this->financialOverviewProject->delete();
            }
        }

        return $this->errorMessage;
    }

    /** Checks if the model can be deleted and sets error messages
     */
    public function canDelete()
    {
        $isDraft = $this->financialOverviewProject->status_id === 'concept';

        if ($isDraft) {
            if (! $this->isCleanup) {
                $this->force = true;
            }

            return true;
        }

        $foDescription = $this->financialOverviewProject->financialOverview?->description ?? '*onbekend*';
        $projectId = $this->financialOverviewProject?->project_id ?? '?';
        $projectCode = $this->financialOverviewProject?->project?->code ?? 'onbekend';

        if($this->financialOverviewProject->definitive == true){
            array_push($this->errorMessage, "Waardestaat " . $foDescription . " voor project " . $projectCode . " (" . $projectId . ") is al definitief.");
        }

        return count($this->errorMessage) === 0;
    }

    /** Deletes models recursive
     */
    public function deleteModels()
    {
        foreach ($this->financialOverviewProject->financialOverviewParticipantProjects as $financialOverviewParticipantProject){
            $deleteFinancialOverviewParticipantProject = new DeleteFinancialOverviewParticipantProject($financialOverviewParticipantProject, $this->isCleanup);
            $this->errorMessage = array_merge($this->errorMessage, ( $deleteFinancialOverviewParticipantProject->delete() ?? [] ) );
        }
    }

    /** The relations which should be dissociated
     */
    public function dissociateRelations()
    {

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