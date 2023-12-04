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
class DeleteRevenueDistribution implements DeleteInterface
{

    private $errorMessage = [];
    private $revenueDistribution;

    /** Sets the model to delete
     *
     * @param Model $revenueDistribution the model to delete
     */
    public function __construct(Model $revenueDistribution)
    {
        $this->revenueDistribution = $revenueDistribution;
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
            $this->revenueDistribution->forceDelete();
        }

        return $this->errorMessage;
    }

    /** Checks if the model can be deleted and sets error messages
     */
    public function canDelete()
    {
        if($this->revenueDistribution->paymentInvoices()->count() > 0){
            array_push($this->errorMessage, "Er is al een uitkerings nota aangemaakt.");
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
// todo WM: opschonen: deliveredKwhPeriod gebruiken we niet meer
//        foreach ($this->revenueDistribution->deliveredKwhPeriod as $deliveredKwhPeriod){
//            $deliveredKwhPeriod->delete();
//        }
    }

    /** Model specific delete actions e.g. delete files from server
     */
    public function customDeleteActions()
    {
    }


}