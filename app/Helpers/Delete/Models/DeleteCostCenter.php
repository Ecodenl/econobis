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
 * Class DeleteCostCenter
 *
 * Relation: 1-n Emails. Action: dissociate
 * Relation: 1-n Documents. Action: dissociate
 * Relation: 1-n Tasks & notes. Action: call DeleteTask
 * Relation: 1-n Quotation requests. Action: call DeleteQuotationRequest
 *
 * @package App\Helpers\Delete\Models
 */
class DeleteCostCenter implements DeleteInterface
{
    private $errorMessage = [];
    private $costCenter;

    /** Sets the model to delete
     *
     * @param Model $costCenter the model to delete
     */

    public function __construct(Model $costCenter)
    {
        $this->costCenter = $costCenter;
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
        $this->costCenter->delete();

        return $this->errorMessage;
    }

    /** Checks if the model can be deleted and sets error messages
     */
    public function canDelete()
    {
        if($this->costCenter->products->count() == 1){
            array_push($this->errorMessage, "Er is al een product aangemaakt met deze kostenplaats.");
        }
        elseif($this->costCenter->products->count() > 0){
            array_push($this->errorMessage, "Er zijn al " . $this->costCenter->products->count() . " producten aangemaakt met deze kostenplaats");
        }
        if($this->costCenter->orderProducts->count() == 1){
            array_push($this->errorMessage, "Er is al een order aangemaakt met deze kostenplaats.");
        }
        elseif($this->costCenter->orderProducts->count() > 0){
            array_push($this->errorMessage, "Er zijn al " . $this->costCenter->orderProducts->count() . " orders aangemaakt met deze kostenplaats");
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