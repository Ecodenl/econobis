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
 * Class DeleteRevenueDistribution
 *
 * @package App\Helpers\Delete\Models
 */
class DeleteRevenueDistributionKwh implements DeleteInterface
{

    private $errorMessage = [];
    private $revenueDistributionKwh;

    /** Sets the model to delete
     *
     * @param Model $revenueDistributionKwh the model to delete
     */
    public function __construct(Model $revenueDistributionKwh)
    {
        $this->revenueDistributionKwh = $revenueDistributionKwh;
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
        if( !sizeof($this->errorMessage)>0 )
        {
            $this->revenueDistributionKwh->forceDelete();
        }

        return $this->errorMessage;
    }

    /** Checks if the model can be deleted and sets error messages
     */
    public function canDelete()
    {
        if(!in_array($this->revenueDistributionKwh->status, ['new', 'concept'])){
            array_push($this->errorMessage, "Er is al minimaal 1 definitieve deelname verdeling");
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
        $this->revenueDistributionKwh->newOrConceptDistributionValuesKwh()->delete();
        $this->revenueDistributionKwh->newOrConceptDistributionPartsKwh()->delete();
    }


}