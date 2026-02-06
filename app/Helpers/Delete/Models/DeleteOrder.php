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
use Illuminate\Support\Facades\Log;

/**
 * Class DeleteOrder
 *
 * @package App\Helpers\Delete\Models
 */
class DeleteOrder implements DeleteInterface
{

    private $errorMessage = [];
    private $order;

    /** Sets the model to delete
     *
     * @param Model $order the model to delete
     */
    public function __construct(Model $order)
    {
        $this->order = $order;
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
            Log::error('Fout bij opschonen Orders', [
                'exception' => $exception->getMessage(),
                'errormessages' => implode(' | ', $this->errorMessage),
            ]);
            array_push($this->errorMessage, "Fout bij opschonen Orders. (meld dit bij Econobis support)");
            return $this->errorMessage;

        }
    }

    /** Main method for deleting this model and all it's relations
     *
     * @return array errorMessage array
     * @throws
     */
    public function delete()
    {
        if (! $this->canDelete()) {
            return $this->errorMessage;
        }
        $this->deleteModels();
        $this->dissociateRelations();
        $this->deleteRelations();
        $this->customDeleteActions();
        if( count($this->errorMessage) === 0 ) {
            $this->order->delete();
        }

        return $this->errorMessage;
    }

    /** Checks if the model can be deleted and sets error messages
     */
    public function canDelete()
    {
        // van hieruit altijd true
        return true;
    }

    /** Deletes models recursive
     */
    public function deleteModels()
    {
        $this->order->orderProducts()->delete();

        foreach ($this->order->invoices as $invoices){

            $deleteInvoice = new DeleteInvoice($invoices);
            $this->errorMessage = array_merge($this->errorMessage, ( $deleteInvoice->delete() ?? [] ) );
        }

        foreach ($this->order->tasks as $task) {
            $deleteTask = new DeleteTask($task);
            $this->errorMessage = array_merge($this->errorMessage, ( $deleteTask->delete() ?? [] ) );
        }
    }

    /** The relations which should be dissociated
     */
    public function dissociateRelations()
    {
        foreach ($this->order->emails as $email){
            $email->order()->dissociate();
            $email->save();
        }

        foreach ($this->order->documents as $document){
            $document->order()->dissociate();
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