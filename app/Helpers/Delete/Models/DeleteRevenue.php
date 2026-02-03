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
class DeleteRevenue implements DeleteInterface
{
    private $errorMessage = [];
    private $projectRevenue;
    private $yearsForDelete;
    private $dateAllowedToDelete;
    private $cooperation;

    /** Sets the model to delete
     *
     * @param Model $projectRevenue the model to delete
     */
    public function __construct(Model $projectRevenue)
    {
        $this->projectRevenue = $projectRevenue;
        $this->cooperation = Cooperation::first();
        $cleanupItem = $this->cooperation->cleanupItems()->where('code_ref', 'revenues')->first();
        $this->yearsForDelete = $cleanupItem?->years_for_delete ?? 99;
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
            return $this->delete();
        }catch (\Exception $exception){
            Log::error('Fout bij opschonen Opbrengsten Euro / Aflossing', [
                'exception' => $exception->getMessage(),
                'errormessages' => implode(' | ', $this->errorMessage),
            ]);
            array_push($this->errorMessage, "Fout bij opschonen Opbrengsten Euro / Aflossing. (meld dit bij Econobis support)");
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
            $this->projectRevenue->delete();
        }

        return $this->errorMessage;
    }

    /** Checks if the model can be deleted and sets error messages
     */
    public function canDelete()
    {
        // indien status processed en einddatum revenue ligt voor bewaarplicht termijn, dan ok
        if($this?->projectRevenue?->confirmed && $this?->projectRevenue?->status === 'processed' && $this?->projectRevenue?->date_end < $this->dateAllowedToDelete) {
            return true;
        }
        // indien status processed en einddatum revenue ligt op of na bewaarplicht termijn, dan niet ok
        if($this?->projectRevenue?->confirmed && $this?->projectRevenue?->status === 'processed' && $this?->projectRevenue?->date_end >= $this->dateAllowedToDelete) {
            array_push($this->errorMessage, "Er is al een Opbrengstverdeling aangemaakt. Opbrengstverdeling kan niet worden verwijderd vanwege de bewaarplicht: " . $this->yearsForDelete . " jaar.");
            return false;
        }
        // overige situaties:
        // indien revenue bevestigd (confirmed), dan niet ok
        if($this->projectRevenue->confirmed){
            array_push($this->errorMessage, "Opbrengstverdeling is al definitief.");
            return false;
        }

        return true;
    }

    /** Deletes models recursive
     */
    public function deleteModels()
    {
        foreach($this->projectRevenue->distribution as $distribution) {
            $deleteRevenueDistribution = new DeleteRevenueDistribution($distribution);
            $this->errorMessage = array_merge($this->errorMessage, ( $deleteRevenueDistribution->delete() ?? [] ) );
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