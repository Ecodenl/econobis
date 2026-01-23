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
use Illuminate\Support\Facades\Log;

/**
 * Class DeleteRevenueDistribution
 *
 * @package App\Helpers\Delete\Models
 */
class DeleteRevenueDistribution implements DeleteInterface
{

    private $errorMessage = [];
    private $revenueDistribution;
    private $yearsForDelete;
    private $dateAllowedToDelete;
    private $cooperation;

    /** Sets the model to delete
     *
     * @param Model $revenueDistribution the model to delete
     */
    public function __construct(Model $revenueDistribution)
    {
        $this->revenueDistribution = $revenueDistribution;
        $this->cooperation = Cooperation::first();
        $cleanupItemRevenue = $this->cooperation->cleanupItems()->where('code_ref', 'revenues')->first();
        $this->yearsForDelete = $cleanupItemRevenue?->years_for_delete ?? 99;
        $this->dateAllowedToDelete = Carbon::now()->subYears($this->yearsForDelete)->format('Y-m-d');

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
        if( count($this->errorMessage) === 0 )
        {
            $this->revenueDistribution->delete();
        }

        return $this->errorMessage;
    }

    /** Checks if the model can be deleted and sets error messages
     */
    public function canDelete()
    {
        // indien status processed en einddatum revenue ligt voor bewaarplicht termijn, dan ok
        if($this?->revenueDistribution?->projectRevenue?->confirmed && $this?->revenueDistribution?->projectRevenue?->status === 'processed' && $this?->revenueDistribution?->projectRevenue?->date_end < $this->dateAllowedToDelete) {
            return true;
        }
        // indien status processed en einddatum revenue ligt op of na bewaarplicht termijn, dan niet ok
        if($this?->revenueDistribution?->projectRevenue?->confirmed && $this?->revenueDistribution?->projectRevenue?->status === 'processed' && $this?->revenueDistribution?->projectRevenue?->date_end >= $this->dateAllowedToDelete) {
            array_push($this->errorMessage, "Er is al een Opbrengstverdeling aangemaakt. Opbrengstverdeling kan niet worden verwijderd vanwege de bewaarplicht: " . $this->yearsForDelete . " jaar.");
            return false;
        }

        return true;
    }

    /** Deletes models recursive
     */
    public function deleteModels()
    {
        foreach($this->revenueDistribution->paymentInvoices as $paymentInvoice) {
            $deletePaymentInvoice = new DeletePaymentInvoice($paymentInvoice);
            $this->errorMessage = array_merge($this->errorMessage, ( $deletePaymentInvoice->delete() ?? [] ) );
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