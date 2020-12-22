<?php
/**
 * Created by PhpStorm.
 * User: StagiarSoftware
 * Date: 10-8-2018
 * Time: 14:37
 */

namespace App\Helpers\Delete\Models;


use App\Eco\Administration\Administration;
use App\Helpers\Delete\DeleteInterface;
use Illuminate\Database\Eloquent\Model;

/**
 * Class DeletePortalSettingsLayout
 *
 * Relation: 1-n Emails. Action: dissociate
 * Relation: 1-n Documents. Action: dissociate
 * Relation: 1-n Tasks & notes. Action: call DeleteTask
 * Relation: 1-n Quotation requests. Action: call DeleteQuotationRequest
 *
 * @package App\Helpers\Delete\Models
 */
class DeletePortalSettingsLayout implements DeleteInterface
{
    private $errorMessage = [];
    private $portalSettingsLayout;

    /** Sets the model to delete
     *
     * @param Model $portalSettingsLayout the model to delete
     */

    public function __construct(Model $portalSettingsLayout)
    {
        $this->portalSettingsLayout = $portalSettingsLayout;
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
        $this->portalSettingsLayout->delete();

        return $this->errorMessage;
    }

    /** Checks if the model can be deleted and sets error messages
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
        foreach (Administration::where('portal_settings_layout_id', $this->emailTemplate->id)->get() as $administration){
            $administration->emailTemplateFinancialOverview()->dissociate();
            $administration->save();
        }
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