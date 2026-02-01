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
use Illuminate\Support\Facades\Log;

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
    /** If it's called by the cleanup functionality, we land on this function, else on the delete function
     *
     * @return array
     * @throws
     */
    public function cleanup()
    {
        try{
            $this->delete();
            if(!empty($this->errorMessage)) {
                return $this->errorMessage;
            }
        }catch (\Exception $exception){
            Log::error('Fout bij opschonen Kansacties', [
                'exception' => $exception->getMessage(),
                'errormessages' => implode(' | ', $this->errorMessage),
            ]);
            array_push($this->errorMessage, "Fout bij opschonen Kansacties. (meld dit bij Econobis support)");
            return $this->errorMessage;

        }
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
        foreach ($this->quotationRequest->emails as $email){
            $email->quotationRequest()->dissociate();
            $email->save();
        }

        foreach ($this->quotationRequest->documents as $document){
            $document->quotationRequest()->dissociate();
            $document->save();
        }
        foreach ($this->quotationRequest->actionsLog as $actionsLog){
            $actionsLog->delete();
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