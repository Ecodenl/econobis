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
        if($this->revenuesKwh->partsKwh->whereNotIn('status', ['new', 'concept'])->count() > 0){
            array_push($this->errorMessage, "Er is al minimaal 1 definitieve deelperiode");
        }
        if($this->revenuesKwh->distributionKwh->whereNotIn('status', ['concept'])->count() > 0){
            array_push($this->errorMessage, "Er is al minimaal 1 definitieve deelname verdeling");
        }
        if($this->revenuesKwh->valuesKwh->whereNotIn('status', ['concept'])->count() > 0){
            array_push($this->errorMessage, "Er is al minimaal 1 definitieve kwh productie stand");
        }

    }

    /** Deletes models recursive
     */
    public function deleteModels()
    {
        foreach($this->revenuesKwh->distributionKwh as $distribution) {
                $deleteRevenueDistributionKwh = new DeleteRevenueDistributionKwh($distribution);
                $this->errorMessage = array_merge($this->errorMessage, $deleteRevenueDistributionKwh->delete());
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
        foreach ($this->revenuesKwh->conceptValuesKwh as $conceptValueKwh){
            $conceptValueKwh->delete();
        }
        foreach ($this->revenuesKwh->conceptPartsKwh as $conceptPartKwh){
            $conceptPartKwh->delete();
        }
    }

    /** Model specific delete actions e.g. delete files from server
     */
    public function customDeleteActions()
    {
    }


}