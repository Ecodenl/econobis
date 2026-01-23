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
 * Class DeletePaymentInvoice
 *
 * @package App\Helpers\Delete\Models
 */
class DeletePaymentInvoice implements DeleteInterface
{
    private $errorMessage = [];
    private $paymentInvoice;
    private $yearsForDelete;
    private $dateAllowedToDelete;
    private $cooperation;

    /** Sets the model to delete
     *
     * @param Model $paymentInvoice the model to delete
     */

    public function __construct(Model $paymentInvoice)
    {
        $this->paymentInvoice = $paymentInvoice;
        $this->cooperation = Cooperation::first();
        $cleanupItemPaymentInvoice = $this->cooperation->cleanupItems()->where('code_ref', 'paymentInvoices')->first();
        $this->yearsForDelete = $cleanupItemPaymentInvoice?->years_for_delete ?? 99;
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
            Log::error('Fout bij opschonen Uitkeringsnota\'s', [
                'exception' => $exception->getMessage(),
                'errormessages' => implode(' | ', $this->errorMessage),
            ]);
            array_push($this->errorMessage, "Fout bij opschonen Uitkeringsnota's. (meld dit bij Econobis support)");
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

        if(!empty($this->errorMessage)) {
            return $this->errorMessage;
        }

        $this->paymentInvoice->delete();
    }

    /** Checks if the model can be deleted and sets error messages
     */
    public function canDelete()
    {
        if($this->paymentInvoice->created_at >= $this->dateAllowedToDelete){
            array_push($this->errorMessage, "Er is al een uitkeringsnota aangemaakt. Uitkeringsnota kan niet worden verwijderd vanwege de bewaarplicht: " . $this->yearsForDelete . " jaar.");
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