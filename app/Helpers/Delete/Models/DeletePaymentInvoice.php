<?php

namespace App\Helpers\Delete\Models;

use App\Eco\Cooperation\Cooperation;
use App\Eco\DataCleanup\CleanupRegistry;
use App\Helpers\Delete\DeleteInterface;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Log;

/**
 * Class DeletePaymentInvoice
 *
 * @package App\Helpers\Delete\Models
 */
class DeletePaymentInvoice implements DeleteInterface
{
    private $errorMessage = [];
    private $paymentInvoice;

    private int $yearsForDelete;
    private Carbon $cutoffDate;
    private $cooperation;
    private ?array $excludedContactIds = null;
    private string $cleanupCodeRef = 'paymentInvoices';

    public function __construct(Model $paymentInvoice)
    {
        $this->paymentInvoice = $paymentInvoice;

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
            Log::error('Fout bij opschonen Uitkeringsnota\'s', [
                'exception' => $exception->getMessage(),
                'errormessages' => implode(' | ', $this->errorMessage),
            ]);
            $this->errorMessage[] = "Fout bij opschonen Uitkeringsnota's. (meld dit bij Econobis support)";
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
            $this->paymentInvoice->delete();
        }

        return $this->errorMessage;
    }

    public function canDelete()
    {
        // Extra restrictie voor fiscal-date items:
        // gekoppelde contact_id mag niet in excluded groups zitten
        if ($this->isFiscalRetention()) {
            $this->paymentInvoice->loadMissing('revenueDistribution');

            $contactId = $this->paymentInvoice?->revenueDistribution?->contact_id;
            if ($contactId && in_array((int)$contactId, $this->getExcludedContactIds(), true)) {
                $this->errorMessage[] =
                    "Uitkeringsnota kan niet worden verwijderd: gekoppeld contact valt in een uitgesloten contactgroep.";
                return false;
            }
        }

        // Bewaarplicht check: date_paid moet ouder zijn dan cutoff
        $datePaid = $this->paymentInvoice->date_paid ? Carbon::parse($this->paymentInvoice->date_paid)->startOfDay() : null;

        if (! $datePaid) {
            $this->errorMessage[] = "Uitkeringsnota kan niet worden verwijderd: betaalopdrachtdatum ontbreekt (bewaarde uitkeringsnota).";
            return false;
        }

        if ($datePaid->lt($this->cutoffDate)) {
            return true;
        }

        $this->errorMessage[] =
            "Er is al een uitkeringsnota aangemaakt. Uitkeringsnota kan niet worden verwijderd vanwege de bewaarplicht: "
            . $this->yearsForDelete
            . " jaar (peiljaar: "
            . $this->cutoffDate->year
            . ").";

        return false;
    }

    public function deleteModels()
    {
    }

    public function dissociateRelations()
    {
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
