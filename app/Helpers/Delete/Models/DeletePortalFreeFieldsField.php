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
use Illuminate\Support\Facades\Log;

// todo WM check of deze nog/wel gebruikt wordt?
/**
 * Class DeletePortalFreeFieldsField
 *
 * @package App\Helpers\Delete\Models
 */
class DeletePortalFreeFieldsField implements DeleteInterface
{
    private $errorMessage = [];
    private $portalFreeFieldsField;

    /** Sets the model to delete
     *
     * @param Model $portalFreeFieldsField the model to delete
     */

    public function __construct(Model $portalFreeFieldsField)
    {
        $this->portalFreeFieldsField = $portalFreeFieldsField;
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
        $this->portalFreeFieldsField->delete();

        return $this->errorMessage;
    }

    /** Checks if the model can be deleted
     *
     */
    public function canDelete()
    {

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