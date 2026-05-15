<?php

namespace App\Helpers\Delete\Models;

use App\Eco\Cooperation\Cooperation;
use App\Eco\DataCleanup\CleanupRegistry;
use App\Helpers\Delete\DeleteInterface;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Log;

/**
 * Class DeleteFinancialOverview
 *
 * @package App\Helpers\Delete\Models
 */
class DeleteFinancialOverview implements DeleteInterface
{
    private $errorMessage = [];
    private $financialOverview;

    private int $yearsForDelete;
//    private Carbon $cutoffDate;
    private $cooperation;
    private ?array $excludedContactIds = null;
    private string $cleanupCodeRef = 'financialOverviews';

    public function __construct(Model $financialOverview)
    {
        $this->financialOverview = $financialOverview;

        $this->cooperation = Cooperation::first();

        $cleanupItem = $this->cooperation?->cleanupItems()->where('code_ref', $this->cleanupCodeRef)->first();
        $this->yearsForDelete = (int)($cleanupItem?->years_for_delete ?? 99);

//        $this->cutoffDate = $this->buildCutoffDate($this->yearsForDelete);
    }

    public function cleanup()
    {
        try {
            return $this->delete();
        } catch (\Exception $exception) {
            Log::error('Fout bij opschonen Waardestaten', [
                'exception' => $exception->getMessage(),
                'errormessages' => implode(' | ', $this->errorMessage),
            ]);
            $this->errorMessage[] = "Fout bij opschonen Waardestaten. (meld dit bij Econobis support)";
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
            $this->financialOverview->delete();
        }

        return $this->errorMessage;
    }

    public function canDelete(): bool
    {
        // We houden de oude logica aan:
        // - Als NIET definitief: alleen blokkeren als er “definitieve projecten / contacten in behandeling / postbestanden” zijn.
        //   (dus concept zonder blokkades: mag altijd weg, ongeacht jaar)
        // - Als WEL definitief: bewaarplicht (jaar < cutoffYear) bepaalt of het mag.
        // - Extra (nieuw) voor fiscal-date: als er gekoppelde contacten in excluded groups zitten => blokkeren (zodra het een “bewaarde” waardestaat is).

        $isDefinitive = (bool) $this->financialOverview->definitive;

        // Pre-load collections (zodat we consistent dezelfde data gebruiken)
        $projects = $this->financialOverview->financialOverviewProjects;
        $contacts = $this->financialOverview->financialOverviewContacts;
        $posts    = $this->financialOverview->financialOverviewPosts;

        // 1) Niet definitief: alleen blokkeren op dezelfde checks als vroeger
        if (! $isDefinitive) {
            if ($projects->where('definitive', true)->count() > 0) {
                $this->errorMessage[] = "Er zijn al definitieve projecten gekoppeld aan deze waardestaat.";
                return false;
            }

            if ($contacts->where('status_id', '!=', 'concept')->count() > 0) {
                $this->errorMessage[] = "Er zijn al contacten in behandeling voor deze waardestaat.";
                return false;
            }

            if ($posts->count() > 0) {
                $this->errorMessage[] = "Er zijn al bestanden waardestaten post gemaakt.";
                return false;
            }


            // Concept zonder blokkades: mag weg (oude gedrag)
            return true;
        }

        // 2) Wel definitief: fiscal-excluded check (alleen relevant als fiscal retention aan staat)
        if ($this->isFiscalRetention()) {
            $contactIds = $contacts->pluck('contact_id')->filter()->map(fn ($id) => (int) $id)->all();

            if (! empty($contactIds)) {
                $excluded = $this->getExcludedContactIds(); // verwacht ints
                if (! empty(array_intersect($contactIds, $excluded))) {
                    $this->errorMessage[] =
                        "Waardestaat kan niet worden verwijderd: gekoppeld contact valt in een uitgesloten contactgroep.";
                    return false;
                }
            }
        }

        // 3) Bewaarplicht voor definitieve waardestaten: year < cutoffYear
        $year = (int) $this->financialOverview->year;

        if ($year <= 0) {
            $this->errorMessage[] = "Waardestaat kan niet worden verwijderd: jaar ontbreekt (bewaarde waardestaat).";
            return false;
        }

        if ($year < $this->cutoffYear()) {
            return true;
        }

        $this->errorMessage[] =
            "Deze waardestaat is al definitief. Waardestaat kan niet worden verwijderd vanwege de bewaarplicht: "
            . $this->yearsForDelete
            . " jaar (peiljaar: "
            . $this->cutoffYear()
            . ").";
        return false;
    }

    public function deleteModels()
    {
        foreach ($this->financialOverview->financialOverviewProjects as $financialOverviewProject){
            $deleteFinancialOverviewProject = new DeleteFinancialOverviewProject($financialOverviewProject);
            $this->errorMessage = array_merge($this->errorMessage, ( $deleteFinancialOverviewProject->delete() ?? [] ) );
        }

        foreach ($this->financialOverview->financialOverviewContacts as $financialOverviewContact){
            $deleteFinancialOverviewContact = new DeleteFinancialOverviewContact($financialOverviewContact);
            $this->errorMessage = array_merge($this->errorMessage, ( $deleteFinancialOverviewContact->delete() ?? [] ) );
        }

        foreach ($this->financialOverview->financialOverviewPosts as $financialOverviewPost){
            $deleteFinancialOverviewPost = new DeleteFinancialOverviewPost($financialOverviewPost);
            $this->errorMessage = array_merge($this->errorMessage, ( $deleteFinancialOverviewPost->delete() ?? [] ) );
        }

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


}
