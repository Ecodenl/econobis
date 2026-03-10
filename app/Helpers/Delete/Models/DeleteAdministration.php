<?php
/**
 * Created by PhpStorm.
 * User: StagiarSoftware
 * Date: 10-8-2018
 * Time: 9:23
 */

namespace App\Helpers\Delete\Models;


use App\Helpers\Delete\DeleteInterface;
use App\Eco\PortalSettings\PortalSettings;
use Illuminate\Database\Eloquent\Model;

/**
 * Class DeleteAdministration
 *
 * Relation 1-n Invoices. Action: call DeleteInvoice
 * Relation 1-n Orders. Action: call DeleteOrder
 * Relation 1-n ProductionProject. Action: call ProductionProject
 * Relation 1-n products. Action: dissociate
 *
 * @package App\Helpers\Delete\Models
 */
class DeleteAdministration implements DeleteInterface
{

    private $errorMessage = [];
    private $administration;

    /** Sets the model to delete
     *
     * @param Model $administration the model to delete
     */

    public function __construct(Model $administration)
    {
        $this->administration = $administration;
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
        $this->administration->delete();

        return $this->errorMessage;
    }

    /** Checks if the model can be deleted and sets error messages
     *
     */
    public function canDelete()
    {
        if($this->administration->paymentInvoices()->count() > 0){
            array_push($this->errorMessage, "Er zijn al uitkerings nota's.");
        }
        // Administration can not be deleted if it is used in portalsettings
        $defaultAdministrationId = PortalSettings::first()?->default_administration_id;
        if($this->administration->id == $defaultAdministrationId){
            array_push($this->errorMessage, "Deze administratie wordt nog gebruikt in algemene portal instellingen.");
        }

    }

    /** Deletes models recursive
     */
    public function deleteModels()
    {
        foreach ($this->administration->invoices as $invoice) {
            $deleteInvoice = new DeleteInvoice($invoice);
            $this->errorMessage = array_merge($this->errorMessage, $deleteInvoice->delete());
        }

        foreach ($this->administration->orders as $order) {
            $deleteOrder = new DeleteOrder($order);
            $this->errorMessage = array_merge($this->errorMessage, $deleteOrder->delete());
        }
    }

    /** The relations which should be dissociated
     */
    public function dissociateRelations()
    {
        foreach ($this->administration->products as $product){
            $product->administration()->dissociate();
            $product->save();
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