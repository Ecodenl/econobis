<?php

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
class DeleteRevenuesKwh implements DeleteInterface
{
    private bool $force = true; // default: oude gedrag (hard)
    private $errorMessage = [];
    private $revenuesKwh;
    private $yearsForDelete;
    private $dateAllowedToDelete;
    private $cooperation;

    /** Sets the model to delete
     *
     * @param Model $revenuesKwh the model to delete
     */
    public function __construct(Model $revenuesKwh)
    {
        $this->revenuesKwh = $revenuesKwh;
        $this->cooperation = Cooperation::first();
        $cleanupItem = $this->cooperation->cleanupItems()->where('code_ref', 'revenuesKwh')->first();
        $this->yearsForDelete = $cleanupItem?->years_for_delete ?? 99;
        $this->dateAllowedToDelete = Carbon::now()->subYears($this->yearsForDelete)->format('Y-m-d');
    }

    /** If it's called by the cleanup functionality, we land on this function, else on the delete function
     *
     * @return array
     * @throws
     */
    public function cleanup(): array
    {
        try {
            $this->force = false;   // cleanup = soft
            return $this->delete();
        } catch (\Exception $exception) {
            Log::error('Fout bij opschonen Opbrengsten Kwh', [
                'exception' => $exception->getMessage(),
                'errormessages' => implode(' | ', $this->errorMessage),
            ]);
            array_push($this->errorMessage, "Fout bij opschonen Opbrengsten Kwh. (meld dit bij Econobis support)");
            return $this->errorMessage;
        }

    }

    /** Main method for deleting this model and all it's relations
     *
     * @return array errorMessage array
     * @throws
     */
    public function delete(): array
    {
        if (! $this->canDelete()) {
            return $this->errorMessage;
        }
        $this->deleteModels();
        $this->dissociateRelations();
        $this->deleteRelations();
        $this->customDeleteActions();
        if (count($this->errorMessage) === 0) {
            $this->force ? $this->revenuesKwh->forceDelete()
                : $this->revenuesKwh->delete();
        }

        return $this->errorMessage;
    }

    /** Checks if the model can be deleted and sets error messages
     */
    public function canDelete(): bool
    {
        // indien status processed en einddatum revenue ligt voor bewaarplicht termijn, dan ok
        if($this?->revenuesKwh?->confirmed && $this?->revenuesKwh?->status === 'processed' && $this?->revenuesKwh?->date_end < $this->dateAllowedToDelete) {
            return true;
        }
        // indien status processed en einddatum revenue ligt op of na bewaarplicht termijn, dan niet ok
        if($this?->revenuesKwh?->confirmed && $this?->revenuesKwh?->status === 'processed' && $this?->revenuesKwh?->date_end >= $this->dateAllowedToDelete) {
            array_push($this->errorMessage, "Er is al een verwerkte opbrengstverdeling Kwh aangemaakt. Opbrengstverdeling Kwh kan niet worden verwijderd vanwege de bewaarplicht: " . $this->yearsForDelete . " jaar.");
            return false;
        }
        // overige situaties:
        // indien revenue bevestigd (confirmed), dan niet ok
        if($this->revenuesKwh->confirmed){
            array_push($this->errorMessage, "Opbrengstverdeling is al definitief.");
            return false;
        }
        return true;
    }

    /** Deletes models recursive
     */
    public function deleteModels()
    {
        $queryDistributionKwh = $this->revenuesKwh->distributionKwh();
        $itemsDistributionKwh = $this->force ? $queryDistributionKwh->withTrashed()->get() : $queryDistributionKwh->get();
        foreach ($itemsDistributionKwh as $distributionKwh) {
            $deleteRevenueDistributionKwh = new DeleteRevenueDistributionKwh($distributionKwh);
            $this->errorMessage = array_merge( $this->errorMessage, ($this->force ? $deleteRevenueDistributionKwh->delete() : ($deleteRevenueDistributionKwh->cleanup() ?? [])));
        }

        $queryPartsKwh = $this->revenuesKwh->partsKwh();
        $itemsPartsKwh = $this->force ? $queryPartsKwh->withTrashed()->get() : $queryPartsKwh->get();
        foreach ($itemsPartsKwh as $partsKwh) {
            $deleteRevenuePartsKwh = new DeleteRevenuePartsKwh($partsKwh);
            $this->errorMessage = array_merge( $this->errorMessage, ($this->force ? $deleteRevenuePartsKwh->delete() : ($deleteRevenuePartsKwh->cleanup() ?? [])));
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
        // indien status processed en einddatum revenue ligt voor bewaarplicht termijn
        if($this?->revenuesKwh?->confirmed && $this?->revenuesKwh?->status === 'processed' && $this?->revenuesKwh?->date_end < $this->dateAllowedToDelete) {
            if ($this->force) {
                $this->revenuesKwh->valuesKwh()->withTrashed()->forceDelete();
            } else {
                $this->revenuesKwh->valuesKwh()->delete();
            }
        } else {
            if ($this->force) {
                $this->revenuesKwh->conceptValuesKwh()->withTrashed()->forceDelete();
            } else {
                $this->revenuesKwh->conceptValuesKwh()->delete();
            }

        }

    }


}