<?php
/**
 * Created by PhpStorm.
 * User: Fren de Haan
 * Date: 19-1-2018
 * Time: 11:55
 */

namespace App\Helpers\Delete\Models;

use App\Helpers\Delete\DeleteInterface;
use App\Helpers\Delete\Traits\ChecksExcludedCleanupContacts;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Log;

/**
 * Class DeleteHousingFile
 *
 * @package App\Helpers\Delete
 */
class DeleteHousingFile implements DeleteInterface
{
    use ChecksExcludedCleanupContacts;

    private $errorMessage = [];
    private $housingFile;

    /** Sets the model to delete
     *
     * @param Model $housingFile the model to delete
     */

    public function __construct(Model $housingFile)
    {
        $this->housingFile = $housingFile;
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
            Log::error('Fout bij opschonen Woningdossiers', [
                'exception' => $exception->getMessage(),
                'errormessages' => implode(' | ', $this->errorMessage),
            ]);

            $this->errorMessage[] =
                "Fout bij opschonen Woningdossiers. (meld dit bij Econobis support)";

            return $this->errorMessage;
        }
    }

    public function canCleanup(): bool
    {
        $contactId = $this->housingFile->address?->contact_id;

        if ($this->isContactExcludedFromCleanup($contactId)) {
            $this->errorMessage[] =
                "Woningdossier {$this->housingFile->id} kan niet worden opgeschoond: "
                . "het gekoppelde contact valt in een uitzonderingsgroep.";

            return false;
        }

        foreach ($this->housingFile->tasks as $task) {
            $deleteTask = new DeleteTask($task);

            if (! $deleteTask->canCleanup()) {
                $this->errorMessage[] =
                    "Woningdossier {$this->housingFile->id} kan niet worden opgeschoond: "
                    . "een gekoppelde taak hoort bij een contact dat in een "
                    . "uitzonderingsgroep valt.";

                return false;
            }
        }

        foreach ($this->housingFile->notes as $note) {
            $deleteTask = new DeleteTask($note);

            if (! $deleteTask->canCleanup()) {
                $this->errorMessage[] =
                    "Woningdossier {$this->housingFile->id} kan niet worden opgeschoond: "
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
            $this->housingFile->delete();
        }

        return $this->errorMessage;
    }

    /** Checks if the model can be deleted
     *
     */
    public function canDelete(): bool
    {
        // van hier uit altijd true
        return true;
    }

    /** Deletes models recursive
     *
     */
    public function deleteModels()
    {
        foreach ($this->housingFile->housingFileSpecifications as $specification) {
            $deleteSpecification = new DeleteHousingFileSpecification($specification);
            $this->errorMessage = array_merge($this->errorMessage, ( $deleteSpecification->delete() ?? [] ) );
        }
        foreach ($this->housingFile->tasks as $task) {
            $deleteTask = new DeleteTask($task);
            $this->errorMessage = array_merge($this->errorMessage, ( $deleteTask->delete() ?? [] ) );
        }
        foreach ($this->housingFile->notes as $note) {
            $deleteTask = new DeleteTask($note);
            $this->errorMessage = array_merge($this->errorMessage, ( $deleteTask->delete() ?? [] ) );
        }
    }

    /** The relations which should be dissociated
     */
    public function dissociateRelations()
    {
        foreach ($this->housingFile->documents as $document){
            $document->housingFile()->dissociate();
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
     *
     */
    public function customDeleteActions()
    {
    }
}