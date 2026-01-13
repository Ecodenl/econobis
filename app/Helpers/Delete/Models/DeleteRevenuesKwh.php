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
class DeleteRevenuesKwh implements DeleteInterface
{

    private $errorMessage = [];
    private $revenuesKwh;

    /** Sets the model to delete
     *
     * @param Model $revenuesKwh the model to delete
     */
    public function __construct(Model $revenuesKwh)
    {
        $this->revenuesKwh = $revenuesKwh;
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
        if( !sizeof($this->errorMessage)>0 ) {
            $this->revenuesKwh->forceDelete();
        }

        return $this->errorMessage;
    }

    /** Checks if the model can be deleted and sets error messages
     */
    public function canDelete()
    {
        if($this->revenuesKwh->confirmed){
            array_push($this->errorMessage, "Opbrengstverdeling Kwh is al definitief.");
            return;
        }
    }

    /** Deletes models recursive
     */
    public function deleteModels()
    {
        foreach($this->revenuesKwh->distributionKwh as $distributionKwh) {
                $deleteRevenueDistributionKwh = new DeleteRevenueDistributionKwh($distributionKwh);
                $this->errorMessage = array_merge($this->errorMessage, ( $deleteRevenueDistributionKwh->delete() ?? [] ) );
        }
        foreach($this->revenuesKwh->partsKwh as $partsKwh) {
                $deleteRevenuePartsKwh = new DeleteRevenuePartsKwh($partsKwh);
                $this->errorMessage = array_merge($this->errorMessage, ( $deleteRevenuePartsKwh->delete() ?? [] ) );
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
        $this->revenuesKwh->conceptValuesKwh()->delete();
    }


}