<?php

namespace App\Helpers\Delete\Models;

use App\Eco\Cooperation\Cooperation;
use App\Eco\DataCleanup\CleanupRegistry;
use App\Helpers\Delete\DeleteInterface;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Log;

/**
 * Class DeleteInvoice
 *
 * @package App\Helpers\Delete\Models
 */
class DeleteInvoice implements DeleteInterface
{
    private array $errorMessage = [];
    private $invoice;

    private int $yearsForDelete;
    private Carbon $cutoffDate;
    private $cooperation;
    private ?array $excludedContactIds = null;
    private string $cleanupCodeRef = 'invoices';

    public function __construct(Model $invoice)
    {
        $this->invoice = $invoice;

        $this->cooperation = Cooperation::first();

        $cleanupItem = $this->cooperation?->cleanupItems()->where('code_ref', $this->cleanupCodeRef)->first();
        $this->yearsForDelete = (int)($cleanupItem?->years_for_delete ?? 99);

        $this->cutoffDate = $this->buildCutoffDate($this->yearsForDelete);
    }

    public function cleanup()
    {
        try {
            return $this->delete();
        } catch (\Exception $exception) {
            Log::error("Fout bij opschonen Nota's", [
                'exception' => $exception->getMessage(),
                'errormessages' => implode(' | ', $this->errorMessage),
            ]);
            $this->errorMessage[] = "Fout bij opschonen Nota's. (meld dit bij Econobis support)";
            return $this->errorMessage;
        }
    }

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
            $this->invoice->delete();
        }

        return $this->errorMessage;
    }

    public function canDelete()
    {
        // 1) Draft/to-send zonder invoice_number: altijd ok (geen "bewaarde" nota)
        $isDraft = ($this->invoice->status_id === 'to-send' && (int) $this->invoice->invoice_number === 0);
        if ($isDraft) {
            return true;
        }

        // 2) Extra restrictie voor fiscal-date items:
        // gekoppelde contact_id mag niet in excluded groups zitten
        if ($this->isFiscalRetention()) {
            $contactId = $this->invoice->order?->contact_id;
            if ($contactId && in_array((int)$contactId, $this->getExcludedContactIds(), true)) {
                $this->errorMessage[] =
                    "Nota kan niet worden verwijderd: gekoppeld contact valt in een uitgesloten contactgroep.";
                return false;
            }
        }

        // 3) Bewaarplicht check: date_sent moet ouder zijn dan cutoff
        $dateSent = $this->invoice->date_sent ? Carbon::parse($this->invoice->date_sent)->startOfDay() : null;

        if (! $dateSent) {
            $this->errorMessage[] = "Nota kan niet worden verwijderd: verzenddatum ontbreekt (bewaarde nota).";
            return false;
        }

        if ($dateSent->lt($this->cutoffDate)) {
            return true;
        }

        $this->errorMessage[] =
            "Er is al een nota aangemaakt. Nota kan niet worden verwijderd vanwege de bewaarplicht: "
            . $this->yearsForDelete
            . " jaar (peiljaar: "
            . $this->cutoffDate->year
            . ").";

        return false;
    }

    public function deleteModels()
    {
        foreach ($this->invoice->tasks as $task) {
            $deleteTask = new DeleteTask($task);
            $this->errorMessage = array_merge($this->errorMessage, ($deleteTask->delete() ?? []));
        }
    }

    public function dissociateRelations()
    {
        foreach ($this->invoice->emails as $email) {
            $email->invoice()->dissociate();
            $email->save();
        }

        foreach ($this->invoice->documents as $document) {
            $document->invoice()->dissociate();
            $document->save();
        }
    }

    public function deleteRelations()
    {
    }

    public function customDeleteActions()
    {
    }

    private function buildCutoffDate(int $yearsForDelete): Carbon
    {
        $now = Carbon::now();

        if ($this->isFiscalRetention()) {
            // fiscal-date: 01-01-(currentYear - yearsForDelete)
            return Carbon::create($now->year - $yearsForDelete, 1, 1)->startOfDay();
        }

        // default/date-mode: now - years
        return $now->copy()->subYears($yearsForDelete)->startOfDay();
    }
    private function isFiscalRetention(): bool
    {
        return CleanupRegistry::retentionModeFor($this->cleanupCodeRef) === CleanupRegistry::RETENTION_FISCAL_DATE;
    }
    private function getExcludedContactIds(): array
    {
        if ($this->excludedContactIds !== null) {
            return $this->excludedContactIds;
        }

        $ids = [];
        $groups = $this->cooperation?->cleanupContactsExcludedGroups ?? [];

        foreach ($groups as $excludedGroup) {
            // getAllContacts(true) geeft (waarschijnlijk) IDs terug
            $ids = array_merge($ids, $excludedGroup->contactGroup->getAllContacts(true) ?? []);
        }

        $ids = array_values(array_unique(array_map('intval', $ids)));

        return $this->excludedContactIds = $ids;
    }

}
