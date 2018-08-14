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
 * Class DeleteAddress
 *
 * Relation: 1-n Housing files. Action: remove
 * Relation: 1-n Intakes. Action: call DeleteIntake

 *
 * @package App\Helpers\Delete\Models
 */
class DeleteAddress implements DeleteInterface
{

    private $errorMessage = [];
    private $address;

    /** Sets the model to delete
     *
     * @param Model $address the model to delete
     */

    public function __construct(Model $address)
    {
        $this->address = $address;
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
        $this->address->delete();

        return $this->errorMessage;
    }

    /** Checks if the model can be deleted and sets error messages
     *
     */
    public function canDelete()
    {
    }

    /** Deletes models recursive
     */
    public function deleteModels()
    {
        foreach ($this->address->intakes as $intake){
            $deleteIntake = new DeleteIntake($intake);
            $this->errorMessage = array_merge($this->errorMessage, $deleteIntake->delete());
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
        foreach ($this->address->housingFiles as $housingFile){
            $housingFile->delete();
        }
    }

    /** Model specific delete actions e.g. delete files from server
     */
    public function customDeleteActions()
    {
    }

}