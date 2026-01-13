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
 * Class DeleteOrganisation
 *
 * Relation: 1-n Quotation Requests. Action: call DeleteQuotationRequest
 *
 * @package App\Helpers\Delete\Models
 */
class DeleteOrganisation implements DeleteInterface
{

    private $errorMessage = [];
    private $organisation;

    /** Sets the model to delete
     *
     * @param Model $organisation the model to delete
     */
    public function __construct(Model $organisation)
    {
        $this->organisation = $organisation;
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
        $this->organisation->delete();

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
//        foreach ($this->organisation->quotationRequests as $quotationRequest){
//            /**
//             * 20221031; Jos; Deze relatie bestaat niet meer?
//             */
//            $deleteQuotationRequest = new DeleteQuotationRequest($quotationRequest);
//            $this->errorMessage = array_merge($this->errorMessage, ( $deleteQuotationRequest->delete() ?? [] ) );
//        }
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