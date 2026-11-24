<?php
/**
 * Created by PhpStorm.
 * User: StagiarSoftware
 * Date: 10-8-2018
 * Time: 14:37
 */

namespace App\Helpers\Delete\Models;

use App\Helpers\Delete\DeleteInterface;
use App\Helpers\Delete\Traits\ChecksExcludedCleanupContacts;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Log;

/**
 * Class DeleteOpportunity
 *
 * @package App\Helpers\Delete\Models
 */
class DeleteOpportunity implements DeleteInterface
{
    use ChecksExcludedCleanupContacts;

    private $errorMessage = [];
    private $opportunity;

    /** Sets the model to delete
     *
     * @param Model $opportunity the model to delete
     */
    public function __construct(Model $opportunity)
    {
        $this->opportunity = $opportunity;
    }

    /** If it's called by the cleanup functionality, we land on this function, else on the delete function
     *
     * @return array
     * @throws
     */
    public function cleanup()
    {
        try {
            if (! $this->canCleanup()) {
                return $this->errorMessage;
            }

            return $this->delete();
        } catch (\Exception $exception) {
            Log::error('Fout bij opschonen Kansen', [
                'exception' => $exception->getMessage(),
                'errormessages' => implode(' | ', $this->errorMessage),
            ]);

            $this->errorMessage[] =
                "Fout bij opschonen Kansen. (meld dit bij Econobis support)";

            return $this->errorMessage;
        }
    }

    public function canCleanup(): bool
    {
        $contactId = $this->opportunity->intake?->contact_id;

        if ($this->isContactExcludedFromCleanup($contactId)) {
            $this->errorMessage[] =
                "Kans {$this->opportunity->number} ({$this->opportunity->id}) "
                . "kan niet worden opgeschoond: het gekoppelde contact valt "
                . "in een uitzonderingsgroep.";

            return false;
        }

        foreach ($this->opportunity->tasks as $task) {
            $deleteTask = new DeleteTask($task);

            if (! $deleteTask->canCleanup()) {
                $this->errorMessage[] =
                    "Kans {$this->opportunity->number} ({$this->opportunity->id}) "
                    . "kan niet worden opgeschoond: een gekoppelde taak hoort bij "
                    . "een contact dat in een uitzonderingsgroep valt.";

                return false;
            }
        }

        foreach ($this->opportunity->notes as $note) {
            $deleteTask = new DeleteTask($note);

            if (! $deleteTask->canCleanup()) {
                $this->errorMessage[] =
                    "Kans {$this->opportunity->number} ({$this->opportunity->id}) "
                    . "kan niet worden opgeschoond: een gekoppelde notitie hoort bij "
                    . "een contact dat in een uitzonderingsgroep valt.";

                return false;
            }
        }

        return true;
    }
    /** Main method for deleting this model and all it's relations
     *
     * @return array
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
            $this->opportunity->delete();
        }

        return $this->errorMessage;
    }

    /** Checks if the model can be deleted and sets error messages
     *
     */
    public function canDelete(): bool
    {
        if ($this->opportunity->quotationRequests()->exists()) {
            $this->errorMessage[] =
                "Onder kans " . $this->opportunity->number
                . " bij contact "
                . ($this->opportunity->intake?->contact?->full_name ?? '*contact onbekend*')
                . " met maatregel "
                . ($this->opportunity->measureCategory?->name ?? '*maatregel onbekend*')
                . " hangen nog kansacties, verwijderen kans niet mogelijk.";

            return false;
        }

        return true;
    }

    /** Deletes models recursive
     */
    public function deleteModels()
    {
        foreach ($this->opportunity->tasks as $task) {
            $deleteTask = new DeleteTask($task);
            $this->errorMessage = array_merge($this->errorMessage, ( $deleteTask->delete() ?? [] ) );
        }

        foreach ($this->opportunity->notes as $note) {
            $deleteTask = new DeleteTask($note);
            $this->errorMessage = array_merge($this->errorMessage, ( $deleteTask->delete() ?? [] ) );
        }

        // 25-04-2024: Verwijderen mag niet meer als er nog kansacties onder hangen
//        foreach ($this->opportunity->quotationRequests as $quotationRequest) {
//            $deleteQuotationRequest = new DeleteQuotationRequest($quotationRequest);
//            $this->errorMessage = array_merge($this->errorMessage, ( $deleteQuotationRequest->delete() ?? [] ) );
//        }
    }

    /** The relations which should be dissociated
     */
    public function dissociateRelations()
    {
        foreach ($this->opportunity->emails as $email){
            $email->opportunity()->dissociate();
            $email->save();
        }

        foreach ($this->opportunity->documents as $document){
            $document->opportunity()->dissociate();
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