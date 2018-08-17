<?php
/**
 * Created by PhpStorm.
 * User: StagiarSoftware
 * Date: 10-8-2018
 * Time: 15:08
 */

namespace App\Helpers\Delete\Models;


use App\Helpers\Delete\DeleteInterface;
use Illuminate\Database\Eloquent\Model;

/**
 * Class DeleteQuotationRequest
 *
 * Relation: 1-n Emails. Action: dissociate
 * Relation: 1-n Documents. Action: dissociate
 *
 * @package App\Helpers\Delete\Models
 */
class DeleteQuotationRequest implements DeleteInterface
{
    private $errorMessage = [];
    private $quotationRequest;

    /** Sets the model to delete
     *
     * @param Model $quotationRequest the model to delete
     */

    public function __construct(Model $quotationRequest)
    {
        $this->quotationRequest = $quotationRequest;
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
        $this->quotationRequest->delete();

        return $this->errorMessage;
    }

    /** Checks if the model can be deleted and sets error messages
     */
    public function canDelete()
    {
        if(!($this->quotationRequest->status_id === 2 || $this->quotationRequest->status_id === 3 || $this->quotationRequest->status_id === 4)){
            array_push($this->errorMessage, "Er is nog een open offerteverzoek.");
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
        foreach ($this->quotationRequest->emails() as $email){
            $email->quotationRequest()->dissociate();
            $email->save();
        }

        foreach ($this->quotationRequest->documents() as $document){
            $document->quotationRequest()->dissociate();
            $document->save();
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