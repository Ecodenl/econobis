<?php
/**
 * Created by PhpStorm.
 * User: StagiarSoftware
 * Date: 10-8-2018
 * Time: 14:37
 */

namespace App\Helpers\Delete\Models;


use App\Eco\FinancialOverview\FinancialOverviewContact;
use App\Eco\ParticipantMutation\ParticipantMutation;
use App\Helpers\Delete\DeleteInterface;
use App\Helpers\Delete\Traits\ChecksExcludedCleanupContacts;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Log;

/**
 * Class DeleteFinancialOverviewParticipantProject
 *
 * Relation: 1-n Emails. Action: dissociate
 * Relation: 1-n Documents. Action: dissociate
 * Relation: 1-n Tasks & notes. Action: call DeleteTask
 * Relation: 1-n Quotation requests. Action: call DeleteQuotationRequest
 *
 * @package App\Helpers\Delete\Models
 */
class DeleteFinancialOverviewParticipantProject implements DeleteInterface
{
    use ChecksExcludedCleanupContacts;

    private bool $isCleanup = false;
    private bool $force = false; // default softdelete
    private $errorMessage = [];
    private $financialOverviewParticipantProject;

    /** Sets the model to delete
     *
     * @param Model $financialOverviewParticipantProject the model to delete
     */

    public function __construct(Model $financialOverviewParticipantProject, bool $isCleanup = false)
    {
        $this->financialOverviewParticipantProject = $financialOverviewParticipantProject;
        $this->isCleanup = $isCleanup;
    }

    public function cleanup(): array
    {
        try {
            $this->isCleanup = true;

            if (! $this->canCleanup()) {
                return $this->errorMessage;
            }

            return $this->delete();
        } catch (\Exception $exception) {
            Log::error('Fout bij opschonen waardestaten deelnemers', [
                'exception' => $exception->getMessage(),
                'errormessages' => implode(' | ', $this->errorMessage),
            ]);

            $this->errorMessage[] =
                "Fout bij opschonen waardestaten deelnemers. "
                . "(meld dit bij Econobis support)";

            return $this->errorMessage;
        }
    }

    public function canCleanup(): bool
    {
        if ($this->isContactExcludedFromCleanup(
            $this->financialOverviewParticipantProject->contact_id
        )) {
            $this->errorMessage[] =
                "Waardestaat deelnemer "
                . "{$this->financialOverviewParticipantProject->id} kan niet "
                . "worden opgeschoond: het gekoppelde contact valt in een "
                . "uitzonderingsgroep.";

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

        if (count($this->errorMessage) === 0) {
            $this->force ? $this->financialOverviewParticipantProject->forceDelete()
                : $this->financialOverviewParticipantProject->delete();
        }
        return $this->errorMessage;
    }

    /** Checks if the model can be deleted and sets error messages
     */
    public function canDelete(): bool
    {
        $isDraft = $this->financialOverviewParticipantProject->status_id === 'concept';

        if ($isDraft) {
            if (! $this->isCleanup) {
                $this->force = true;
            }

            return true;
        }

        $foDescription = $this->financialOverviewParticipantProject->financialOverview?->description ?? '*onbekend*';
        $projectId = $this->financialOverviewParticipantProject?->financialOverviewProject?->project_id ?? '?';
        $projectCode = $this->financialOverviewParticipantProject?->financialOverviewProject?->project?->code ?? 'onbekend';
        $participationId = $this->financialOverviewParticipantProject?->participant_project_id ?? '?';
        $contactId = $this->financialOverviewParticipantProject?->contact_id ?? '?';
        $contactName = $this->financialOverviewParticipantProject?->contact?->full_name_fnf ?? '*contact onbekend*';

        if($this->financialOverviewParticipantProject->status_id === 'sent'){
            array_push($this->errorMessage, "Waardestaat " . $foDescription . " voor deelnemer " . $contactName . " (" . $participationId . ") verzonden bij project " . $projectCode . " (" . $projectId . ")." );
        }
        $hasFinancialOverviewDefinitive = ParticipantMutation::where('participation_id', $this->financialOverviewParticipantProject->participant_project_id)
            ->where('financial_overview_definitive', true)->exists();
        if($hasFinancialOverviewDefinitive){
            array_push($this->errorMessage, "Waardestaat " . $foDescription . " is al definitief voor deelnemer " . $contactName . " (" . $participationId . ") met mutaties bij project " . $projectCode . " (" . $projectId . ").");
        }
        $hasFinancialOverviewContactSent = FinancialOverviewContact::where('financial_overview_id',  $this->financialOverviewParticipantProject->financialOverviewProject->financial_overview_id)
            ->where('contact_id',  $this->financialOverviewParticipantProject->contact_id)
            ->where('status_id', 'sent')->exists();

        if($hasFinancialOverviewContactSent){
            array_push($this->errorMessage, "Waardestaat " . $foDescription . " voor contact " . $contactName . " (" . $contactId . ") verzonden bij project " . $projectCode . " (" . $projectId . ")." );
        }

        return count($this->errorMessage) === 0;
    }

    /** Deletes models recursive
     */
    public function deleteModels()
    {
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