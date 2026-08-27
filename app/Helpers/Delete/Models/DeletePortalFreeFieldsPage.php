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

/**
 * Class DeletePortalFreeFieldsPage
 *
 * @package App\Helpers\Delete\Models
 */
class DeletePortalFreeFieldsPage implements DeleteInterface
{
    private $errorMessage = [];
    private $portalFreeFieldsPage;

    /** Sets the model to delete
     *
     * @param Model $portalFreeFieldsPage the model to delete
     */

    public function __construct(Model $portalFreeFieldsPage)
    {
        $this->portalFreeFieldsPage = $portalFreeFieldsPage;
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
        $this->portalFreeFieldsPage->delete();

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