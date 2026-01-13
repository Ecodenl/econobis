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
class DeleteRevenue implements DeleteInterface
{

    private $errorMessage = [];
    private $projectRevenue;

    /** Sets the model to delete
     *
     * @param Model $projectRevenue the model to delete
     */
    public function __construct(Model $projectRevenue)
    {
        $this->projectRevenue = $projectRevenue;
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
            $this->projectRevenue->forceDelete();
        }

        return $this->errorMessage;
    }

    /** Checks if the model can be deleted and sets error messages
     */
    public function canDelete()
    {
        if($this->projectRevenue->confirmed){
            array_push($this->errorMessage, "Opbrengstverdeling is al definitief.");
        }
    }

    /** Deletes models recursive
     */
    public function deleteModels()
    {
        foreach($this->projectRevenue->distribution as $distribution) {
                $deleteRevenueDistribution = new DeleteRevenueDistribution($distribution);
                $this->errorMessage = array_merge($this->errorMessage, ( $deleteRevenueDistribution->delete() ?? [] ) );
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