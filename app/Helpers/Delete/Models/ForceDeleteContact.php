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
//                 'trace' => $exception->getTraceAsString(),
                'contact_id' => $this->contact->id ?? null,
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
            $this->dissociateRelations();
            $this->deleteModels();
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
        if ($this->contact->primaryOccupations()->exists()) {
            $this->errorMessage[] = "Er is nog een verbinding aanwezig (primary occupations). Hard verwijderen niet toegestaan.";
            return false;
        }

        if ($this->contact->occupations()->exists()) {
            $this->errorMessage[] = "Er is nog een verbinding aanwezig (occupations). Hard verwijderen niet toegestaan.";
            return false;
        }

        if ($this->contact->portalUser()->exists()) {
            $this->errorMessage[] = "Dit contact heeft nog portal-gebruiker gegevens. Hard verwijderen niet toegestaan.";
            return false;
        }

        $org = $this->contact->organisation;
        if ($org && $org->campaigns()->exists()) {
            $this->errorMessage[] = "Organisatie is nog betrokken bij campagnes. Hard verwijderen niet toegestaan.";
            return false;
        }

        if ($this->contact->coachCampaigns()->exists()) {
            $this->errorMessage[] = "Persoon is als coach betrokken bij campagnes. Hard verwijderen niet toegestaan.";
            return false;
        }

        if ($this->contact->projectManagerCampaigns()->exists()) {
            $this->errorMessage[] = "Persoon is als projectleider betrokken bij campagnes. Hard verwijderen niet toegestaan.";
            return false;
        }

        if ($this->contact->externalPartyCampaigns()->exists()) {
            $this->errorMessage[] = "Persoon is als externe partij betrokken bij campagnes. Hard verwijderen niet toegestaan.";
            return false;
        }

        if ($this->contact->projectRevenueDistributions()->withTrashed()->exists()) {
            $this->errorMessage[] = "Contact heeft opbrengstverdelingen. Hard verwijderen niet toegestaan.";
            return false;
        }

        if ($this->contact->revenueDistributionKwh()->withTrashed()->exists()) {
            $this->errorMessage[] = "Contact heeft kWh-verdelingen. Hard verwijderen niet toegestaan.";
            return false;
        }

        // guards (extra)
        if ($this->contact->invoices()->withTrashed()->whereHas('invoicesToSend')->exists()) {
            $this->errorMessage[] = "Contact heeft nota('s) met open verzendproces. Hard verwijderen niet toegestaan.";
            return false;
        }
        if ($this->contact->financialOverviewContacts()->withTrashed()->whereHas('financialOverviewsToSend')->exists()) {
            $this->errorMessage[] = "Contact heeft waardestaat-contact(en) met open verzendproces. Hard verwijderen niet toegestaan.";
            return false;
        }

        return true;
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

    private function deleteModels(): void
    {
        // Organisation / Person (hasOne + softdeletable)
        if ($this->contact->isOrganisation()) {
            $org = $this->contact->organisation()->withTrashed()->first();
            if ($org) {
                // Personen die gekoppeld zijn aan deze organisatie loskoppelen (FK nullable vereist)
                DB::table('people')->where('organisation_id', $org->id)->update(['organisation_id' => null]);

                $org->forceDelete();
            }
        }
        if ($this->contact->isPerson()) {
            $person = $this->contact->person()->withTrashed()->first();
            if ($person) $person->forceDelete();
        }

        // Orders + Invoices (hard delete in juiste volgorde)
        $this->contact->orders()->withTrashed()->get()->each(function ($order) {

            // Invoices die aan deze order hangen eerst weg
            $order->invoices()->withTrashed()->get()->each(function ($inv) {
                // Guard: open verzendproces? dan eerder al geblokkeerd in canForceDelete, maar extra veiligheid:
                if ($inv->invoicesToSend()->exists()) {
                    throw new \RuntimeException("Invoice {$inv->id} heeft open verzendproces (invoices_to_send).");
                }

                // emails dissociate
                $inv->emails()->withTrashed()->get()->each(function ($email) {
                    $email->invoice()->dissociate();
                    $email->save();
                });

                // child records (nu softdeletable bij jou, behalve invoices_to_send)
                $inv->documents()->withTrashed()->get()->each->forceDelete();
                $inv->invoiceProducts()->withTrashed()->get()->each->forceDelete();
                $inv->molliePayments()->withTrashed()->get()->each->forceDelete();
                $inv->payments()->withTrashed()->get()->each->forceDelete();
                $inv->tasks()->withTrashed()->get()->each->forceDelete();

                $inv->forceDelete();
            });

            $order->emails()->withTrashed()->get()->each(function ($email) {
                $email->order()->dissociate();
                $email->save();
            });

            $order->documents()->withTrashed()->get()->each(function ($doc) {
                $doc->order()->dissociate();
                $doc->save();
            });

            // Order products en tasks hard weg
            $order->orderProducts()->withTrashed()->get()->each->forceDelete();
            $order->tasks()->withTrashed()->get()->each->forceDelete();

            // order zelf hard weg
            $order->forceDelete();
        });

        // financialOverviewParticipantProjects / Participations (softdeletable)
        $this->contact->participations()->withTrashed()->get()->each(function ($pp) {
            // PP = ParticipantProject
            $pp->financialOverviewParticipantProjects()->withTrashed()->get()->each->forceDelete();
            $pp->forceDelete();
        });

        $this->contact->financialOverviewContacts()->withTrashed()->get()->each->forceDelete();

        // Intakes (softdeletable)
        $this->contact->intakes()->withTrashed()->get()->each(function ($intake) {
            $this->forceDeleteIntake($intake);
        });

        $this->contact->addresses()->withTrashed()->get()->each(function ($address) {
            // address_energy_suppliers eerst weg
            $address->addressEnergySuppliers()->withTrashed()->get()->each(function ($aes) {
                $aes->forceDelete();
            });

            // intakes onder address eerst weg
//            $address->intakes()->withTrashed()->get()->each(function ($intake) {
//                $this->forceDeleteIntake($intake);
//            });

            // housingfiles onder address eerst weg
//            $address->housingFiles()->withTrashed()->get()->each->forceDelete();

            if ($address->housingFiles()->withTrashed()->exists()) {
                throw new \RuntimeException("Address {$address->id} heeft housingfiles; hard delete contact niet toegestaan (nog niet geïmplementeerd).");
            }

            if ($address->participations()->withTrashed()->exists()) {
                throw new \RuntimeException("Address {$address->id} heeft participations; hard delete contact niet toegestaan.");
            }

            $address->forceDelete();
        });

        // Tasks / Notes (softdeletable)
        $this->contact->notes()->withTrashed()->get()->each->forceDelete();
        $this->contact->tasks()->withTrashed()->get()->each->forceDelete();
    }

    private function deleteRelations(): void
    {
        // softdeletable
        $this->contact->phoneNumbers()->withTrashed()->get()->each->forceDelete();
        $this->contact->emailAddresses()->withTrashed()->get()->each->forceDelete();
        $this->contact->contactNotes()->withTrashed()->get()->each->forceDelete();

        $this->contact->freeFieldsFieldRecords()->withTrashed()->get()->each(function ($fffr) {
            $fffr->freeFieldsFieldLogs()->delete();
            $fffr->forceDelete();
        });

        $this->contact->portalFreeFieldsFieldRecords()->withTrashed()->get()->each(function ($pfffr) {
            $pfffr->freeFieldsFieldLogs()->delete();
            $pfffr->forceDelete();
        });
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

    private function forceDeleteIntake($intake): void
    {
// Opportunities onder intake: hard weg (incl. kansacties)
        $intake->opportunities()->withTrashed()->get()->each(function ($opp) {

            // Quotation requests (kansacties) onder opportunity
            $opp->quotationRequests()->withTrashed()->get()->each(function ($qr) {

                // emails/docs dissociate (zoals DeleteQuotationRequest)
                $qr->emails()->withTrashed()->get()->each(function ($email) {
                    $email->quotationRequest()->dissociate();
                    $email->save();
                });

                $qr->documents()->withTrashed()->get()->each(function ($doc) {
                    $doc->quotationRequest()->dissociate();
                    $doc->save();
                });

                // actions log delete
                $qr->actionsLog()->delete();


                $qr->forceDelete();
            });

            // Opportunity tasks/notes hard weg (opportunity model filtert op finished, maar relation bestaat)
            $opp->tasks()->withTrashed()->get()->each->forceDelete();
            $opp->notes()->withTrashed()->get()->each->forceDelete();

            // opportunity emails/docs dissociate (zoals DeleteOpportunity)
            $opp->emails()->withTrashed()->get()->each(function ($email) {
                $email->opportunity()->dissociate();
                $email->save();
            });
            $opp->documents()->withTrashed()->get()->each(function ($doc) {
                $doc->opportunity()->dissociate();
                $doc->save();
            });

            $opp->measures()->detach();

            $opp->forceDelete();
        });

        // tasks + notes hard weg
        $intake->tasks()->withTrashed()->get()->each->forceDelete();
        $intake->notes()->withTrashed()->get()->each->forceDelete();

        // emails/docs dissociate
        $intake->emails()->withTrashed()->get()->each(function ($email) {
            $email->intake()->dissociate();
            $email->save();
        });
        $intake->documents()->withTrashed()->get()->each(function ($doc) {
            $doc->intake()->dissociate();
            $doc->save();
        });

        // pivots intake_measure_requested, intake_reasons en intake_sources eerst detachen
        $intake->measuresRequested()->detach();
        $intake->reasons()->detach();
        $intake->sources()->detach();


        $intake->forceDelete();
    }

}
