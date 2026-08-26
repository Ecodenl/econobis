<?php
/**
 * Created by PhpStorm.
 * User: StagiarSoftware
 * Date: 10-8-2018
 * Time: 9:51
 */

namespace App\Helpers\Delete\Models;

use App\Helpers\Delete\DeleteInterface;
use App\Helpers\Delete\Traits\ChecksExcludedCleanupContacts;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Log;

/**
 * Class DeleteTask
 *
 * @package App\Helpers\Delete\Models
 */
class DeleteTask implements DeleteInterface
{
    use ChecksExcludedCleanupContacts;

    private $errorMessage = [];
    private $task;

    /** Sets the model to delete
     *
     * @param Model $task the model to delete
     */
    public function __construct(Model $task)
    {
        $this->task = $task;
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
            Log::error('Fout bij opschonen Taken', [
                'exception' => $exception->getMessage(),
                'errormessages' => implode(' | ', $this->errorMessage),
            ]);

            $this->errorMessage[] =
                "Fout bij opschonen Taken. (meld dit bij Econobis support)";

            return $this->errorMessage;
        }
    }
    public function canCleanup(): bool
    {
        $blockedTask = $this->findTaskRelatedToExcludedContact($this->task);

        if ($blockedTask) {
            $this->errorMessage[] =
                "Taak {$blockedTask->id} kan niet worden opgeschoond: "
                . "de taak of een gekoppeld onderdeel hoort bij een contact "
                . "dat in een uitzonderingsgroep valt.";

            return false;
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
            $this->task->delete();
        }

        return $this->errorMessage;
    }

    /** Checks if the model can be deleted and sets error messages
     */
    public function canDelete(): bool
    {
        // van hieruit altijd true
        return true;
    }

    /** Deletes models recursive
     */
    public function deleteModels()
    {
        foreach ($this->task->tasks as $task) {
            $deleteTask = new DeleteTask($task);
            $this->errorMessage = array_merge($this->errorMessage, ( $deleteTask->delete() ?? [] ) );
        }

        foreach ($this->task->notes as $task) {
            $deleteTask = new DeleteTask($task);
            $this->errorMessage = array_merge($this->errorMessage, ( $deleteTask->delete() ?? [] ) );
        }
    }

    /** The relations which should be dissociated
     */
    public function dissociateRelations()
    {
        foreach ($this->task->emails as $email){
            $email->task()->dissociate();
            $email->save();
        }

        foreach ($this->task->documents as $document){
            $document->task()->dissociate();
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

    private function findTaskRelatedToExcludedContact(Model $task): ?Model
    {
        if ($this->isTaskRelatedToExcludedContact($task)) {
            return $task;
        }

        foreach ($task->tasks as $childTask) {
            $blockedTask = $this->findTaskRelatedToExcludedContact($childTask);

            if ($blockedTask) {
                return $blockedTask;
            }
        }

        foreach ($task->notes as $note) {
            $blockedTask = $this->findTaskRelatedToExcludedContact($note);

            if ($blockedTask) {
                return $blockedTask;
            }
        }

        return null;
    }

    private function isTaskRelatedToExcludedContact(Model $task): bool
    {
        $relatedContactIds = [
            $task->contact_id,
            $task->intake?->contact_id,
            $task->order?->contact_id,
            $task->invoice?->order?->contact_id,
            $task->opportunity?->intake?->contact_id,
            $task->participant?->contact_id,
            $task->housingFile?->address?->contact_id,
        ];

        if ($task->contactGroup) {
            $relatedContactIds = array_merge(
                $relatedContactIds,
                $task->contactGroup->getAllContacts(true) ?? []
            );
        }

        return $this->containsExcludedCleanupContact($relatedContactIds);
    }

}