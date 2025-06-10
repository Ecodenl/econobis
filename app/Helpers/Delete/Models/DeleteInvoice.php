<?php
/**
 * Created by PhpStorm.
 * User: StagiarSoftware
 * Date: 10-8-2018
 * Time: 15:31
 */

namespace App\Helpers\Delete\Models;


use App\Eco\Cooperation\Cooperation;
use App\Helpers\Delete\DeleteInterface;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

/**
 * Class DeleteInvoice
 *
 * Relation: 1-n Emails. Action: dissociate.
 * Relation: 1-n Tasks. Action: call DeleteTask.
 *
 * @package App\Helpers\Delete\Models
 */
class DeleteInvoice implements DeleteInterface
{
    private $errorMessage = [];
    private $invoice;

    /** Sets the model to delete
     *
     * @param Model $invoice the model to delete
     */

    public function __construct(Model $invoice)
    {
        $this->invoice = $invoice;
    }

    /** Main method for deleting this model and all it's relations
     *
     * @return array
     * @throws
     */
    public function delete($destroy = false)
    {
        $this->canDelete($destroy);
        $this->deleteModels();
        $this->dissociateRelations();
        $this->deleteRelations($destroy);
        $this->customDeleteActions();

        if($destroy === true) {
            $dateToday = Carbon::now();
            $cooperation = Cooperation::first();
            $cooperation->cleanup_invoices_last_run_at = $dateToday;
            $cooperation->save();

            $this->invoice->forceDelete();
        } else {
            $this->invoice->delete();
        }

        return $this->errorMessage;
    }

    /** Checks if the model can be deleted and sets error messages
     */
    public function canDelete($destroy = false)
    {
        if($destroy === false && (!($this->invoice->status_id == 'to-send') || $this->invoice->invoice_number != 0 )){
            array_push($this->errorMessage, "Er is al een nota aangemaakt. Een nota kan niet worden verwijderd vanwege de bewaarplicht.");
        }
    }

    /** Deletes models recursive
     */
    public function deleteModels()
    {
        foreach ($this->invoice->tasks as $task) {
            $deleteTask = new DeleteTask($task);
            $this->errorMessage = array_merge($this->errorMessage, $deleteTask->delete());
        }
    }

    /** The relations which should be dissociated
     */
    public function dissociateRelations()
    {
        foreach ($this->invoice->emails as $email){
            $email->invoice()->dissociate();
            $email->save();
        }

        foreach ($this->invoice->documents as $email){
            $email->invoice()->dissociate();
            $email->save();
        }
    }

    /**
     * Delete relations who dont need their own Delete class
     */
    public function deleteRelations($destroy = false)
    {
        if($destroy) {
            foreach ($this->invoice->payments as $payment){
                $payment->forceDelete();
            }

            foreach ($this->invoice->invoiceProducts as $invoiceProduct){
                $invoiceProduct->forceDelete();
            }

            foreach ($this->invoice->twinfieldMessages as $twinfieldMessage){
                $twinfieldMessage->forceDelete();
            }
        }
    }

    /** Model specific delete actions e.g. delete files from server
     */
    public function customDeleteActions()
    {
    }

}