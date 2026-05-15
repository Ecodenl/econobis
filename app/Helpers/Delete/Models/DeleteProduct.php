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
 * Class DeleteProduct
 *
 * Relation: 1-n Emails. Action: dissociate
 * Relation: 1-n Documents. Action: dissociate
 * Relation: 1-n Tasks & notes. Action: call DeleteTask
 * Relation: 1-n Quotation requests. Action: call DeleteQuotationRequest
 *
 * @package App\Helpers\Delete\Models
 */
class DeleteProduct implements DeleteInterface
{
    private $errorMessage = [];
    private $product;

    /** Sets the model to delete
     *
     * @param Model $product the model to delete
     */

    public function __construct(Model $product)
    {
        $this->product = $product;
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
        $this->product->delete();

        return $this->errorMessage;
    }

    /** Checks if the model can be deleted and sets error messages
     */
    public function canDelete()
    {
        if($this->product->orderProducts->count() == 1){
            array_push($this->errorMessage, "Er is al een orderregel aangemaakt met dit product.");
        }
        elseif($this->product->orderProducts->count() > 0){
            array_push($this->errorMessage, "Er zijn al " . $this->product->orderProducts->count() . " orderregels aangemaakt met dit product.");
        }
    }

    /** Deletes models recursive
     */
    public function deleteModels()
    {
        foreach ($this->product->invoiceProducts as $invoiceProduct) {
            if($invoiceProduct->invoice) {
                $deleteInvoice = new DeleteInvoice($invoiceProduct->invoice);
                $this->errorMessage = array_merge($this->errorMessage, ( $deleteInvoice->delete() ?? [] ) );
            }
        }

        foreach ($this->product->orderProducts as $orderProduct) {
            if($orderProduct->order) {
                $deleteOrder = new DeleteOrder($orderProduct->order);
                $this->errorMessage = array_merge($this->errorMessage, ( $deleteOrder->delete() ?? [] ) );
            }
        }
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