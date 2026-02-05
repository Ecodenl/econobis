<?php

namespace App\Helpers\Delete\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class ForceDeleteContact
{
    private array $errorMessage = [];
    private Model $contact;

    public function __construct(Model $contact)
    {
        $this->contact = $contact;
    }

    public function cleanup(): array
    {
        try {
            return $this->forceDelete();
        } catch (\Exception $exception) {
            Log::error('Fout bij hard verwijderen (force delete) Contact', [
                'exception' => $exception->getMessage(),
                'contact_id' => $this->contact->id ?? null,
                'errormessages' => implode(' | ', $this->errorMessage),
            ]);

            $this->errorMessage[] = "Fout bij hard verwijderen Contact. (meld dit bij Econobis support)";
            return $this->errorMessage;
        }
    }

    private function forceDelete(): array
    {
        if (! $this->canForceDelete()) {
            return $this->errorMessage;
        }

        DB::transaction(function () {
            $this->deleteModels();
            $this->dissociateRelations();
            $this->deleteRelations();
            $this->customDeleteActions();

            if (count($this->errorMessage) === 0) {
                $this->contact->forceDelete();
            }
        });

        return $this->errorMessage;
    }

    private function canForceDelete(): bool
    {
        if (! method_exists($this->contact, 'trashed') || ! $this->contact->trashed()) {
            $this->errorMessage[] = 'Hard verwijderen kan alleen op een contact dat al (soft) verwijderd is.';
            return false;
        }

        // guards (zelfde intentie als DeleteContact)
        if ($this->contact->primaryOccupations()->count() > 0) {
            $this->errorMessage[] = "Er is nog een verbinding aanwezig (primary occupations). Hard verwijderen niet toegestaan.";
            return false;
        }

        if ($this->contact->occupations()->count() > 0) {
            $this->errorMessage[] = "Er is nog een verbinding aanwezig (occupations). Hard verwijderen niet toegestaan.";
            return false;
        }

        if ($this->contact->portalUser()->count() > 0) {
            $this->errorMessage[] = "Dit contact heeft nog portal-gebruiker gegevens. Hard verwijderen niet toegestaan.";
            return false;
        }

        if ($this->contact->organisation && $this->contact->organisation->campaigns->count() > 0) {
            $this->errorMessage[] = "Organisatie is nog betrokken bij campagnes. Hard verwijderen niet toegestaan.";
            return false;
        }

        if ($this->contact->coachCampaigns->count() > 0) {
            $this->errorMessage[] = "Persoon is als coach betrokken bij campagnes. Hard verwijderen niet toegestaan.";
            return false;
        }

        if ($this->contact->projectManagerCampaigns->count() > 0) {
            $this->errorMessage[] = "Persoon is als projectleider betrokken bij campagnes. Hard verwijderen niet toegestaan.";
            return false;
        }

        if ($this->contact->externalPartyCampaigns->count() > 0) {
            $this->errorMessage[] = "Persoon is als externe partij betrokken bij campagnes. Hard verwijderen niet toegestaan.";
            return false;
        }

        return true;
    }

    private function deleteModels(): void
    {
        // Addresses / Tasks / Notes (softdeletable)
        $this->contact->addresses()->withTrashed()->get()->each->forceDelete();
        $this->contact->tasks()->withTrashed()->get()->each->forceDelete();
        $this->contact->notes()->withTrashed()->get()->each->forceDelete();

        // Organisation / Person (hasOne + softdeletable)
        if ($this->contact->isOrganisation()) {
            $org = $this->contact->organisation()->withTrashed()->first();
            if ($org) $org->forceDelete();
        }
        if ($this->contact->isPerson()) {
            $person = $this->contact->person()->withTrashed()->first();
            if ($person) $person->forceDelete();
        }

        // Revenue distributions (als softdeletable)
        $this->contact->projectRevenueDistributions()->withTrashed()->get()->each->forceDelete();
        $this->contact->revenueDistributionKwh()->withTrashed()->get()->each->forceDelete();

        // Orders / Participations / Intakes (bevestigd softdeletable)
        $this->contact->orders()->withTrashed()->get()->each->forceDelete();
        $this->contact->participations()->withTrashed()->get()->each->forceDelete();
        $this->contact->intakes()->withTrashed()->get()->each->forceDelete();

        // FinancialOverviewContacts (NIET softdeletable)
        $this->contact->financialOverviewContacts()->delete();
    }

    private function dissociateRelations(): void
    {
        // gifted/legal rep FK’s in participant_projects
        $this->contact->participationsGifted()->withTrashed()->get()->each(function ($p) {
            $p->giftedByContact()->dissociate();
            $p->save();
        });

        $this->contact->participationsLegalRep()->withTrashed()->get()->each(function ($p) {
            $p->legalRepContact()->dissociate();
            $p->save();
        });

        // Documents: contact_id nullen
        $this->contact->documents()->withTrashed()->get()->each(function ($doc) {
            $doc->contact()->dissociate();
            $doc->save();
        });

        // QuotationRequests: FK’s nullen
        $this->contact->quotationRequests()->update(['contact_id' => null]);
        $this->contact->quotationRequestsAsProjectManager()->update(['project_manager_id' => null]);
        $this->contact->quotationRequestsAsExternalParty()->update(['external_party_id' => null]);

        // Pivots
        $this->contact->manualEmails()->detach();
        $this->contact->groups()->detach();
    }

    private function deleteRelations(): void
    {
        // softdeletable
        $this->contact->phoneNumbers()->withTrashed()->get()->each->forceDelete();
        $this->contact->emailAddresses()->withTrashed()->get()->each->forceDelete();
        $this->contact->contactNotes()->withTrashed()->get()->each->forceDelete();
        $this->contact->freeFieldsFieldRecords()->withTrashed()->get()->each->forceDelete();
        $this->contact->portalFreeFieldsFieldRecords()->withTrashed()->get()->each->forceDelete();

        // niet softdeletable
        $this->contact->contactEmails()->delete();
        $this->contact->responses()->delete();
        $this->contact->twinfieldNumbers()->delete();
        $this->contact->twinfieldLogs()->delete();
        $this->contact->availabilities()->delete();
    }

    private function customDeleteActions(): void
    {
        // evt. bestanden opschonen etc.
    }
}
