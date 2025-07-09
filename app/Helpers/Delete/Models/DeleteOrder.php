<?php
/**
 * Created by PhpStorm.
 * User: StagiarSoftware
 * Date: 10-8-2018
 * Time: 9:23
 */

namespace App\Helpers\Delete\Models;


use App\Eco\Cooperation\Cooperation;
use App\Helpers\Delete\DeleteInterface;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

/**
 * Class DeleteOrder
 *
 * Relation: 1-n Invoices. Action: call DeleteInvoice
 * Relation: 1-n Emails. Action: dissociate
 * Relation: 1-n Documents. Action: dissociate
 * Relation: 1-n Tasks. Action: call DeleteTask
 *
 * @package App\Helpers\Delete\Models
 */
class DeleteOrder implements DeleteInterface
{

    private $errorMessage = [];
    private $order;


    /** If it's called by the cleanup functionality, we land on this function, else on the delete function
     *
     * @return array
     * @throws
     */
    public function cleanup()
    {
        $this->delete();

        $dateToday = Carbon::now();
        $cooperation = Cooperation::first();

        $cleanupItems = $cooperation->cleanupItems()->whereIn('code_ref', ['ordersOneoff','ordersPeriodic'])->get();

        foreach($cleanupItems as $cleanupItem) {
            $cleanupItem->number_of_items_to_delete = 0;
            $cleanupItem->date_cleaned_up = $dateToday;
            $cleanupItem->save();
        }
    }

    /** Sets the model to delete
     *
     * @param Model $order the model to delete
     */
    public function __construct(Model $order)
    {
        $this->order = $order;
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
        $this->order->delete();

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
        foreach ($this->order->invoices as $invoices){
            $deleteInvoice = new DeleteInvoice($invoices);
            $this->errorMessage = array_merge($this->errorMessage, $deleteInvoice->delete());
        }

        foreach ($this->order->tasks as $task) {
            $deleteTask = new DeleteTask($task);
            $this->errorMessage = array_merge($this->errorMessage, $deleteTask->delete());
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