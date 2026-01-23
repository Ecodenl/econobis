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
class DeleteRevenueDistributionKwh implements DeleteInterface
{
    private bool $force = true;
    private $errorMessage = [];
    private $revenueDistributionKwh;
    private $yearsForDelete;
    private $dateAllowedToDelete;
    private $cooperation;

    /** Sets the model to delete
     *
     * @param Model $revenueDistributionKwh the model to delete
     */
    public function __construct(Model $revenueDistributionKwh)
    {
        $this->revenueDistributionKwh = $revenueDistributionKwh;
        $this->cooperation = Cooperation::first();
        $cleanupItemRevenueKwh = $this->cooperation->cleanupItems()->where('code_ref', 'revenuesKwh')->first();
        $this->yearsForDelete = $cleanupItemRevenueKwh?->years_for_delete ?? 99;
        $this->dateAllowedToDelete = Carbon::now()->subYears($this->yearsForDelete)->format('Y-m-d');
    }

    public function cleanup()
    {
        try {
            $this->force = false;
            return $this->delete();
        }catch (\Exception $exception){
            Log::error('Fout bij opschonen Opbrengsten Kwh deelnames', [
                'exception' => $exception->getMessage(),
                'errormessages' => implode(' | ', $this->errorMessage),
            ]);
            $this->errorMessage[] = "Fout bij opschonen Opbrengsten Kwh deelnames. (meld dit bij Econobis support)";
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

        if (count($this->errorMessage) === 0) {
            $this->force ? $this->revenueDistributionKwh->forceDelete()
                : $this->revenueDistributionKwh->delete();
        }

        return $this->errorMessage;
    }

    /** Checks if the model can be deleted and sets error messages
     */
    public function canDelete(): bool
    {
        $revenues = $this->revenueDistributionKwh?->revenuesKwh;

        // bewaarplicht cases (confirmed+processed)
        if ($revenues?->confirmed && $revenues->status === 'processed') {
            if ($revenues->date_end < $this->dateAllowedToDelete) {
                return true;
            }

            $this->errorMessage[] =
                "Er is al een verwerkte opbrengstverdeling Kwh aangemaakt. Opbrengstverdeling Kwh kan niet worden verwijderd vanwege de bewaarplicht: {$this->yearsForDelete} jaar.";
            return false;
        }

        if(!in_array($this->revenueDistributionKwh->status, ['new', 'concept'], true)){
            $this->errorMessage[] = "Er is al minimaal 1 definitieve deelname verdeling";
            return false;
        }
        return true;
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
        $revenues = $this->revenueDistributionKwh?->revenuesKwh;

        $processedBeforeRetention =
            $revenues?->confirmed &&
            $revenues->status === 'processed' &&
            $revenues->date_end < $this->dateAllowedToDelete;

        if ($processedBeforeRetention) {
            if ($this->force) {
                $this->revenueDistributionKwh->distributionValuesKwh()->withTrashed()->forceDelete();
                $this->revenueDistributionKwh->distributionPartsKwh()->withTrashed()->forceDelete();
            } else {
                $this->revenueDistributionKwh->distributionValuesKwh()->delete();
                $this->revenueDistributionKwh->distributionPartsKwh()->delete();
            }
        } else {
            if ($this->force) {
                $this->revenueDistributionKwh->newOrConceptDistributionValuesKwh()->withTrashed()->forceDelete();
                $this->revenueDistributionKwh->newOrConceptDistributionPartsKwh()->withTrashed()->forceDelete();
            } else {
                $this->revenueDistributionKwh->newOrConceptDistributionValuesKwh()->delete();
                $this->revenueDistributionKwh->newOrConceptDistributionPartsKwh()->delete();
            }
        }
    }


}