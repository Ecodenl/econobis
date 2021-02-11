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
 * Class DeleteFinancialOverviewContact
 *
 * Relation: 1-n Emails. Action: dissociate
 * Relation: 1-n Documents. Action: dissociate
 * Relation: 1-n Tasks & notes. Action: call DeleteTask
 * Relation: 1-n Quotation requests. Action: call DeleteQuotationRequest
 *
 * @package App\Helpers\Delete\Models
 */
class DeleteFinancialOverviewContact implements DeleteInterface
{
    private $errorMessage = [];
    private $financialOverviewContact;

    /** Sets the model to delete
     *
     * @param Model $financialOverviewContact the model to delete
     */

    public function __construct(Model $financialOverviewContact)
    {
        $this->financialOverviewContact = $financialOverviewContact;
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
        $this->financialOverviewContact->delete();

        return $this->errorMessage;
    }

    /** Checks if the model can be deleted and sets error messages
     */
    public function canDelete()
    {
        if($this->financialOverviewContact->status_id != 'concept'){
            array_push($this->errorMessage, "Waardestaat voor contact " . $this->financialOverviewContact->contact->full_name. " is al in behandeling. Status: " . $this->financialOverviewContact->status_id . "." );
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