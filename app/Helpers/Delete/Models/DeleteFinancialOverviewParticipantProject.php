<?php
/**
 * Created by PhpStorm.
 * User: StagiarSoftware
 * Date: 10-8-2018
 * Time: 14:37
 */

namespace App\Helpers\Delete\Models;


use App\Eco\FinancialOverview\FinancialOverviewContact;
use App\Eco\ParticipantMutation\ParticipantMutation;
use App\Helpers\Delete\DeleteInterface;
use Illuminate\Database\Eloquent\Model;

/**
 * Class DeleteFinancialOverviewParticipantProject
 *
 * Relation: 1-n Emails. Action: dissociate
 * Relation: 1-n Documents. Action: dissociate
 * Relation: 1-n Tasks & notes. Action: call DeleteTask
 * Relation: 1-n Quotation requests. Action: call DeleteQuotationRequest
 *
 * @package App\Helpers\Delete\Models
 */
class DeleteFinancialOverviewParticipantProject implements DeleteInterface
{
    private $errorMessage = [];
    private $financialOverviewParticipantProject;

    /** Sets the model to delete
     *
     * @param Model $financialOverviewParticipantProject the model to delete
     */

    public function __construct(Model $financialOverviewParticipantProject)
    {
        $this->financialOverviewParticipantProject = $financialOverviewParticipantProject;
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
        $this->financialOverviewParticipantProject->delete();

        return $this->errorMessage;
    }

    /** Checks if the model can be deleted and sets error messages
     */
    public function canDelete()
    {
        if($this->financialOverviewParticipantProject->status_id === 'sent'){
            array_push($this->errorMessage, "Er zijn al waardestaten voor deelnemer verzonden.");
        }
        $hasFinancialOverviewDefinitive = ParticipantMutation::where('participation_id', $this->financialOverviewParticipantProject->participant_project_id)
            ->where('financial_overview_definitive', true)->exists();
        if($hasFinancialOverviewDefinitive){
            array_push($this->errorMessage, "Er zijn al mutaties voor deelnemer verwerkt in een definitieve project waarde staat.");
        }
        $hasFinancialOverviewContactSent = FinancialOverviewContact::where('financial_overview_id',  $this->financialOverviewParticipantProject->financialOverviewProject->financial_overview_id)
            ->where('contact_id',  $this->financialOverviewParticipantProject->contact_id)
            ->where('status_id', 'sent')->exists();

        if($hasFinancialOverviewContactSent){
            array_push($this->errorMessage, "Er zijn al waardestaten voor contact verzonden.");
        }
    }

    /** Deletes models recursive
     */
    public function deleteModels()
    {
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