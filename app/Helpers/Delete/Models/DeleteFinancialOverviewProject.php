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
    private $errorMessage = [];
    private $financialOverviewProject;

    /** Sets the model to delete
     *
     * @param Model $financialOverviewProject the model to delete
     */

    public function __construct(Model $financialOverviewProject)
    {
        $this->financialOverviewProject = $financialOverviewProject;
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
        $this->financialOverviewProject->delete();

        return $this->errorMessage;
    }

    /** Checks if the model can be deleted and sets error messages
     */
    public function canDelete()
    {
        if($this->financialOverviewProject->definitive == true){
            array_push($this->errorMessage, "Waardestaat voor project " . $this->financialOverviewProject->project->name. " is al definitief.");
        }
    }

    /** Deletes models recursive
     */
    public function deleteModels()
    {
        foreach ($this->financialOverviewProject->financialOverviewParticipantProjects as $financialOverviewParticipantProject){
            $deleteFinancialOverviewParticipantProject = new DeleteFinancialOverviewParticipantProject($financialOverviewParticipantProject);
            // this can resolve in a lot of messages, we not going to share them.
//            $this->errorMessage = array_merge($this->errorMessage, ( $deleteFinancialOverviewParticipantProject->delete() ?? [] ) );
            $deleteFinancialOverviewParticipantProject->delete();
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