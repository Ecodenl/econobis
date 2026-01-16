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
use Illuminate\Support\Facades\Log;

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
    private $yearsForDelete;
    private $dateAllowedToDelete;
    private $cooperation;

    /** Sets the model to delete
     *
     * @param Model $invoice the model to delete
     */

    public function __construct(Model $invoice)
    {
        $this->invoice = $invoice;
        $this->cooperation = Cooperation::first();
        $cleanupItemInvoice = $this->cooperation->cleanupItems()->where('code_ref', 'invoices')->first();
        $this->yearsForDelete = $cleanupItemInvoice?->years_for_delete ?? 99;
        $this->dateAllowedToDelete = Carbon::now()->subYears($this->yearsForDelete)->format('Y-m-d');
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
            Log::error('Fout bij opschonen Nota\'s', [
                'exception' => $exception->getMessage(),
                'errormessages' => implode(' | ', $this->errorMessage),
            ]);
            array_push($this->errorMessage, "Fout bij opschonen Nota's'. '(meld dit bij Econobis support)");
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

        if(!empty($this->errorMessage)) {
            return $this->errorMessage;
        }

        $this->invoice->delete();
    }

    /** Checks if the model can be deleted and sets error messages
     */
    public function canDelete()
    {
        if(!($this->invoice->status_id == 'to-send') || $this->invoice->invoice_number != 0 ){
            if($this->invoice->date_sent >= $this->dateAllowedToDelete){
                array_push($this->errorMessage, "Er is al een nota aangemaakt. Nota kan niet worden verwijderd vanwege de bewaarplicht: " . $this->yearsForDelete . " jaar.");
            }
        }
    }

    /** Deletes models recursive
     */
    public function deleteModels()
    {
        foreach ($this->invoice->tasks as $task) {
            $deleteTask = new DeleteTask($task);
            $this->errorMessage = array_merge($this->errorMessage, ( $deleteTask->delete() ?? [] ) );
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
    public function deleteRelations()
    {
    }

    /** Model specific delete actions e.g. delete files from server
     */
    public function customDeleteActions()
    {
    }

}