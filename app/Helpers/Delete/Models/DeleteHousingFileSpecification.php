<?php
/**
 * Created by PhpStorm.
 * User: Fren de Haan
 * Date: 19-1-2018
 * Time: 11:55
 */

namespace App\Helpers\Delete\Models;

use App\Eco\Opportunity\OpportunityStatus;
use App\Helpers\Delete\DeleteInterface;
use Illuminate\Database\Eloquent\Model;

/**
 * Class DeleteHousingFileSpecification
 *
 * Relation: 1-n Documents. Action: dissociate
 * Relation: 1-n Tasks & notes. Action: call DeleteTask
 *
 * @package App\Helpers\Delete
 */
class DeleteHousingFileSpecification implements DeleteInterface
{
    private $errorMessage = [];
    private $housingFileSpecification;

    /** Sets the model to delete
     *
     * @param Model $housingFile the model to delete
     */

    public function __construct(Model $housingFileSpecification)
    {
        $this->housingFileSpecification = $housingFileSpecification;
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
        $this->housingFileSpecification->delete();

        return $this->errorMessage;
    }

    /** Checks if the model can be deleted
     *
     */
    public function canDelete()
    {
        $statusInActive = OpportunityStatus::where('code_ref', 'inactive')->first();
        if($this->housingFileSpecification->opportunities()->where('status_id', '!=', $statusInActive->id)->count() > 0){
            array_push($this->errorMessage, "Er zijn nog gekoppelde kansen in behandeling.");
        }
    }

    /** Deletes models recursive
     *
     */
    public function deleteModels()
    {
        foreach ($this->housingFileSpecification->opportunities as $opportunity) {
            $deleteOpportunity = new DeleteOpportunity($opportunity);
            $this->errorMessage = array_merge($this->errorMessage, ( $deleteOpportunity->delete() ?? [] ) );
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
     *
     */
    public function customDeleteActions()
    {
    }
}