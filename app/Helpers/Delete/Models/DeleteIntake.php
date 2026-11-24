<?php
/**
 * Created by PhpStorm.
 * User: StagiarSoftware
 * Date: 10-8-2018
 * Time: 9:23
 */

namespace App\Helpers\Delete\Models;

use App\Helpers\Delete\DeleteInterface;
use App\Helpers\Delete\Traits\ChecksExcludedCleanupContacts;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Log;

/**
 * Class DeleteIntake
 *
 * @package App\Helpers\Delete\Models
 */
class DeleteIntake implements DeleteInterface
{
    use ChecksExcludedCleanupContacts;

    private $errorMessage = [];
    private $intake;

    /** Sets the model to delete
     *
     * @param Model $intake the model to delete
     */
    public function __construct(Model $intake)
    {
        $this->intake = $intake;
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
            Log::error('Fout bij opschonen Intakes', [
                'exception' => $exception->getMessage(),
                'errormessages' => implode(' | ', $this->errorMessage),
            ]);

            $this->errorMessage[] =
                "Fout bij opschonen Intakes. (meld dit bij Econobis support)";

            return $this->errorMessage;
        }
    }

    public function canCleanup(): bool
    {
        if ($this->isContactExcludedFromCleanup($this->intake->contact_id)) {
            $this->errorMessage[] =
                "Intake {$this->intake->id} kan niet worden opgeschoond: "
                . "het gekoppelde contact valt in een uitzonderingsgroep.";

            return false;
        }

        foreach ($this->intake->tasks as $task) {
            $deleteTask = new DeleteTask($task);

            if (! $deleteTask->canCleanup()) {
                $this->errorMessage[] =
                    "Intake {$this->intake->id} kan niet worden opgeschoond: "
                    . "een gekoppelde taak hoort bij een contact dat in een "
                    . "uitzonderingsgroep valt.";

                return false;
            }
        }

        foreach ($this->intake->notes as $note) {
            $deleteTask = new DeleteTask($note);

            if (! $deleteTask->canCleanup()) {
                $this->errorMessage[] =
                    "Intake {$this->intake->id} kan niet worden opgeschoond: "
                    . "een gekoppelde notitie hoort bij een contact dat in een "
                    . "uitzonderingsgroep valt.";

                return false;
            }
        }

        return true;
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
            $this->intake->delete();
        }

        return $this->errorMessage;
    }

    /** Checks if the model can be deleted and sets error messages
     *
     */
    public function canDelete(): bool
    {
        $intakeAddress = $this->intake->address?->fullAddress
            ?? '*adres onbekend*';

        if ($this->intake->opportunities()->exists()) {
            $this->errorMessage[] =
                "Onder intake ({$this->intake->id}) {$intakeAddress} "
                . "hangen nog kansen, verwijderen intake niet mogelijk.";

            return false;
        }

        return true;
    }

    /** Deletes models recursive
     */
    public function deleteModels()
    {
        foreach ($this->intake->tasks as $task){
            $deleteTask = new DeleteTask($task);
            $this->errorMessage = array_merge($this->errorMessage, ( $deleteTask->delete() ?? [] ) );
        }

        foreach ($this->intake->notes as $note){
            $deleteTask = new DeleteTask($note);
            $this->errorMessage = array_merge($this->errorMessage, ( $deleteTask->delete() ?? [] ) );
        }

        // 25-04-2024: Verwijderen mag niet meer als er nog kansen onder hangen
//        foreach ($this->intake->opportunities as $opportunity){
//            $deleteOpportunity = new DeleteOpportunity($opportunity);
//            $this->errorMessage = array_merge($this->errorMessage, ( $deleteOpportunity->delete() ?? [] ) );
//        }
    }

    /** The relations which should be dissociated
     */
    public function dissociateRelations()
    {
        foreach ($this->intake->emails as $email){
            $email->intake()->dissociate();
            $email->save();
        }

        foreach ($this->intake->documents as $document){
            $document->intake()->dissociate();
            $document->save();
        }

        $this->intake->reasons()->detach();
        $this->intake->sources()->detach();
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