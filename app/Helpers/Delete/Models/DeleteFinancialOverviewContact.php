<?php

namespace App\Helpers\Delete\Models;

use App\Eco\Cooperation\Cooperation;
use App\Eco\DataCleanup\CleanupRegistry;
use App\Eco\FinancialOverview\FinancialOverviewParticipantProject;
use App\Helpers\Delete\DeleteInterface;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Log;

/**
 * Class DeleteFinancialOverviewContact
 *
 * @package App\Helpers\Delete\Models
 */
class DeleteFinancialOverviewContact implements DeleteInterface
{
    private bool $isCleanup = false;
    private bool $force = false; // default softdelete
    private array $errorMessage = [];
    private $financialOverviewContact;

    private $yearsForDelete;
//    private Carbon $cutoffDate;
    private $cooperation;
    private ?array $excludedContactIds = null;
    private string $cleanupCodeRef = 'financialOverviewContacts';

    public function __construct(Model $financialOverviewContact)
    {
        $this->financialOverviewContact = $financialOverviewContact;

        $this->cooperation = Cooperation::first();

        $cleanupItem = $this->cooperation?->cleanupItems()->where('code_ref', $this->cleanupCodeRef)->first();
        $this->yearsForDelete = (int)($cleanupItem?->years_for_delete ?? 99);

//        $this->cutoffDate = $this->buildCutoffDate($this->yearsForDelete);
    }

    public function cleanup()
    {
        try {
            $this->isCleanup = true;
            $this->force = false;     // cleanup = altijd soft
            return $this->delete();
        } catch (\Exception $exception) {
            Log::error('Fout bij opschonen Waardestaat contacten', [
                'exception' => $exception->getMessage(),
                'errormessages' => implode(' | ', $this->errorMessage),
            ]);
            $this->errorMessage[] = "Fout bij opschonen Waardestaat contacten. (meld dit bij Econobis support)";
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
            $this->force ? $this->financialOverviewContact->forceDelete()
                : $this->financialOverviewContact->delete();
        }

        return $this->errorMessage;
    }

    public function canDelete(): bool
    {
        if ($this->financialOverviewContact->financialOverviewsToSend()->exists()) {
            $this->errorMessage[] =
                "Waardestaat contact kan nu niet worden verwijderd: er staat nog een verzendproces open.";
            return false;
        }

        // Concept: UI mag hard delete, vanuit cleanup blijft soft
        $isDraft = ($this->financialOverviewContact->status_id) === 'concept';
        if ($isDraft) {
            if (! $this->isCleanup) {
                $this->force = true; // alleen UI delete hard bij concept
            }
            return true;
        }

        // Status guard: tijdens verstuur/maak-proces nooit verwijderen
        $status = $this->financialOverviewContact->status_id ?? '';

        // UI: alleen concept toegestaan
        if (! $this->isCleanup) {
            $this->errorMessage[] =
                "Waardestaat contact kan niet worden verwijderd. "
                . "Verwijderen is alleen toegestaan bij status 'concept'.";
            return false;
        }

        // Cleanup: alleen 'sent' toegestaan (na proces)
        if ($status !== 'sent') {
            $this->errorMessage[] =
                "Waardestaat contact kan niet worden opgeschoond (status: {$status}). "
                . "Opschonen is alleen toegestaan bij status 'sent'.";
            return false;
        }

        // Wel definitief: fiscal-excluded check (alleen relevant als fiscal retention aan staat)
        if ($this->isFiscalRetention()) {
            $contactId = $this->financialOverviewContact->contact_id;
            if ($contactId && in_array((int)$contactId, $this->getExcludedContactIds(), true)) {
                $this->errorMessage[] =
                    "Waardestaat contact kan niet worden verwijderd: gekoppeld contact valt in een uitgesloten contactgroep.";
                return false;
            }
        }

        // Bewaarplicht voor definitieve waardestaten: year < cutoffYear
        $fo = $this->financialOverviewContact->financialOverview;
        $year = (int) ($fo?->year ?? -1);

        if ($year <= 0) {
            $this->errorMessage[] = "Waardestaat contact kan niet worden verwijderd: jaar ontbreekt (bewaarde waardestaat).";
            return false;
        }

        if ($year < $this->cutoffYear()) {
            return true;
        }

        $this->errorMessage[] =
            "Deze waardestaat is al definitief. Waardestaat contact kan niet worden verwijderd vanwege de bewaarplicht: "
            . $this->yearsForDelete
            . " jaar (peiljaar: "
            . $this->cutoffYear()
            . ").";
        return false;
    }

    public function deleteModels()
    {
        $this->deleteLinkedFinancialOverviewParticipantProjects();
    }

    public function dissociateRelations(): void
    {
    }

    public function deleteRelations(): void
    {
        // financial_overviews_to_send is niet softdeletable → altijd hard delete
//        $this->financialOverviewContact->financialOverviewsToSend()->delete();
    }

    public function customDeleteActions(): void
    {
    }

    private function cutoffYear(): int
    {
        return Carbon::now()->year - $this->yearsForDelete;
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

    /**
     * Verwijder (soft/hard) alle FinancialOverviewParticipantProject records
     * die horen bij:
     * - dezelfde FinancialOverview (via financial_overview_project_id -> FOProject -> financial_overview_id)
     * - participant_project waarvan contact_id == deze contact_id
     */
    private function deleteLinkedFinancialOverviewParticipantProjects(): void
    {
        $fo = $this->financialOverviewContact->financialOverview;
        $contactId = $this->financialOverviewContact->contact_id;

        if (! $fo || ! $contactId) {
            return;
        }

        // Haal alle FOProject ids van deze waardestaat op
        $foProjectIds = $fo->financialOverviewProjects()->pluck('id')->all();

        if (empty($foProjectIds)) {
            return;
        }

        // Selecteer alle FOPP records die:
        // - bij 1 van deze FOProjecten horen
        // - en een participant_project hebben met dit contact_id
        $query = FinancialOverviewParticipantProject::query()
            ->whereIn('financial_overview_project_id', $foProjectIds)
            ->whereHas('participantProject', function ($q) use ($contactId) {
                $q->where('contact_id', $contactId);
            });

        if ($this->force) {
            // force-delete: ook eventueel reeds softdeleted meepakken
            $query->withTrashed()->get()->each->forceDelete();
        } else {
            // soft-delete
            $query->get()->each->delete();
        }
    }

}
