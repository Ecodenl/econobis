<?php

namespace App\Http\Controllers\Api\ParticipantMutation;

use App\Eco\ContactGroup\ContactGroup;
use App\Eco\FinancialOverview\FinancialOverviewParticipantProject;
use App\Eco\FinancialOverview\FinancialOverviewProject;
use App\Eco\ParticipantMutation\ParticipantMutation;
use App\Eco\ParticipantMutation\ParticipantMutationStatus;
use App\Eco\ParticipantProject\ParticipantProject;
use App\Eco\Project\ProjectValueCourse;
use App\Helpers\Delete\Models\DeleteFinancialOverviewParticipantProject;
use App\Helpers\RequestInput\RequestInput;
use App\Http\Controllers\Api\ApiController;
use App\Http\Controllers\Api\FinancialOverview\FinancialOverviewParticipantProjectController;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class ParticipantMutationController extends ApiController
{
    public function store(RequestInput $requestInput, Request $request)
    {
        $this->authorize('manage', ParticipantMutation::class);

        $data = $requestInput
            ->integer('participationId')->validate('required|exists:participation_project,id')->alias('participation_id')->next()
            ->integer('typeId')->validate('required|exists:participant_mutation_types,id')->alias('type_id')->next()
            ->integer('statusId')->onEmpty(null)->validate('required|exists:participant_mutation_statuses,id')->alias('status_id')->next()
            ->string('entry')->onEmpty('')->next()
            ->date('dateInterest')->validate('nullable|date')->onEmpty(null)->alias('date_interest')->next()
            ->date('dateOption')->validate('nullable|date')->onEmpty(null)->alias('date_option')->next()
            ->date('dateGranted')->validate('nullable|date')->onEmpty(null)->alias('date_granted')->next()
            ->date('dateContractRetour')->validate('nullable|date')->onEmpty(null)->alias('date_contract_retour')->next()
            ->date('datePayment')->validate('nullable|date')->onEmpty(null)->alias('date_payment')->next()
            ->string('paymentReference')->onEmpty(null)->alias('payment_reference')->next()
            ->date('dateEntry')->validate('nullable|date')->onEmpty(null)->alias('date_entry')->next()
            ->double('amount')->onEmpty(null)->next()
            ->double('amountInterest')->onEmpty(null)->alias('amount_interest')->next()
            ->double('amountOption')->onEmpty(null)->alias('amount_option')->next()
            ->double('amountGranted')->onEmpty(null)->alias('amount_granted')->next()
            ->double('amountFinal')->onEmpty(null)->alias('amount_final')->next()
            ->integer('quantity')->onEmpty(null)->next()
            ->integer('quantityInterest')->onEmpty(null)->alias('quantity_interest')->next()
            ->integer('quantityOption')->onEmpty(null)->alias('quantity_option')->next()
            ->integer('quantityGranted')->onEmpty(null)->alias('quantity_granted')->next()
            ->integer('quantityFinal')->onEmpty(null)->alias('quantity_final')->next()
            ->double('returns')->onEmpty(null)->next()
            ->double('payoutKwh')->onEmpty(null)->alias('payout_kwh')->next()
            ->double('indicationOfRestitutionEnergyTax')->onEmpty(null)->alias('indication_of_restitution_energy_tax')->next()
            ->string('paidOn')->onEmpty(null)->alias('paid_on')->next()
            ->boolean('financialOverviewDefinitive')->onEmpty(false)->alias('financial_overview_definitive')->next()
            ->get();

        $participantProject = ParticipantProject::find($data['participation_id']);
        if($participantProject){
            $dateRegisterOld = $participantProject->dateEntryFirstDeposit;
        }
        else{
            $dateRegisterOld = Carbon::parse('9999-12-31');
        }

        if(ParticipantMutationStatus::find( $data['status_id'] )->code_ref == 'final'
            && isset( $data['date_granted'] ) )
        {
            if(isset($data['amount_final']) && ($data['amount_final'] <> 0 && !isset( $data['amount_granted']) ) )
            {
                $data = array_merge($data, ['amount_granted' =>  $data['amount_final']]);
            }elseif(isset($data['quantity_final']) && ($data['quantity_final'] <> 0 && !isset( $data['quantity_granted']) ) )
            {
                $data = array_merge($data, ['quantity_granted' =>  $data['quantity_final']]);
            }
        }

        $participantMutation = new ParticipantMutation();

        $participantMutation->fill($data);

        $differentTransactionCostsAmount = $request->get('differentTransactionCostsAmount');
        if($differentTransactionCostsAmount == ''){
            $differentTransactionCostsAmount = null;
        }
        if($differentTransactionCostsAmount === null ){
            $participantMutation->transaction_costs_amount = $this->calculationTransactionCosts($participantMutation);
        } else {
            $participantMutation->transaction_costs_amount = $differentTransactionCostsAmount;
        }

        $result = $this->checkMutationAllowed($participantMutation);

        $this->recalculateParticipantMutation($participantMutation);

        $dateRegisterNew = $participantMutation->participation->dateEntryFirstDeposit;
        $melding = null;

        if($dateRegisterOld != $dateRegisterNew )
        {
            $melding[] = "De eerste ingangsdatum is gewijzigd.";
            $melding[] = "Oorspronkelijke eerste ingangsdatum was: " . Carbon::parse($dateRegisterOld)->format('d-m-Y') . ".";
            $melding[] = "Nieuwe eerste ingangsdatum is geworden: " . Carbon::parse($dateRegisterNew)->format('d-m-Y') . ".";
        }

        return $melding;
   }

    public function update(RequestInput $requestInput, Request $request, ParticipantMutation $participantMutation)
    {
        $this->authorize('manage', ParticipantMutation::class);

        $participantMutationOld = ParticipantMutation::find($participantMutation->id);
        $result = $this->checkMutationAllowed($participantMutationOld);

        $dateRegisterOld = $participantMutation->participation->dateEntryFirstDeposit;

        $data = $requestInput
            ->integer('typeId')->validate('required|exists:participant_mutation_types,id')->alias('type_id')->next()
            ->integer('statusId')->onEmpty(null)->validate('required|exists:participant_mutation_statuses,id')->alias('status_id')->next()
            ->string('entry')->onEmpty('')->next()
            ->date('dateInterest')->validate('nullable|date')->onEmpty(null)->alias('date_interest')->next()
            ->date('dateOption')->validate('nullable|date')->onEmpty(null)->alias('date_option')->next()
            ->date('dateGranted')->validate('nullable|date')->onEmpty(null)->alias('date_granted')->next()
            ->date('dateContractRetour')->validate('nullable|date')->onEmpty(null)->alias('date_contract_retour')->next()
            ->date('datePayment')->validate('nullable|date')->onEmpty(null)->alias('date_payment')->next()
            ->string('paymentReference')->onEmpty(null)->alias('payment_reference')->next()
            ->date('dateEntry')->validate('nullable|date')->onEmpty(null)->alias('date_entry')->next()
            ->double('amount')->onEmpty(null)->next()
            ->double('amountInterest')->onEmpty(null)->alias('amount_interest')->next()
            ->double('amountOption')->onEmpty(null)->alias('amount_option')->next()
            ->double('amountGranted')->onEmpty(null)->alias('amount_granted')->next()
            ->double('amountFinal')->onEmpty(null)->alias('amount_final')->next()
            ->integer('quantity')->onEmpty(null)->next()
            ->integer('quantityInterest')->onEmpty(null)->alias('quantity_interest')->next()
            ->integer('quantityOption')->onEmpty(null)->alias('quantity_option')->next()
            ->integer('quantityGranted')->onEmpty(null)->alias('quantity_granted')->next()
            ->integer('quantityFinal')->onEmpty(null)->alias('quantity_final')->next()
            ->double('returns')->onEmpty(null)->next()
            ->double('payoutKwh')->onEmpty(null)->alias('payout_kwh')->next()
            ->double('indicationOfRestitutionEnergyTax')->onEmpty(null)->alias('indication_of_restitution_energy_tax')->next()
            ->string('paidOn')->onEmpty(null)->alias('paid_on')->next()
            ->boolean('financialOverviewDefinitive')->onEmpty(false)->alias('financial_overview_definitive')->next()

            ->get();

        $participantMutation->fill($data);

        $differentTransactionCostsAmount = $request->get('differentTransactionCostsAmount');
        if($differentTransactionCostsAmount == ''){
            $differentTransactionCostsAmount = null;
        }
        if($differentTransactionCostsAmount === null ){
            if (($participantMutation->participation->project->projectType->code_ref === 'loan' && $participantMutation->getOriginal('amount') != $participantMutation->amount)
                || ($participantMutation->participation->project->projectType->code_ref !== 'loan' && $participantMutation->getOriginal('quantity') != $participantMutation->quantity)) {
                $participantMutation->transaction_costs_amount = $this->calculationTransactionCosts($participantMutation);
            }
        } else {
            $participantMutation->transaction_costs_amount = $differentTransactionCostsAmount;
        }

        $result = $this->checkMutationAllowed($participantMutation);

        $this->recalculateParticipantMutation($participantMutation);

        $dateRegisterNew = $participantMutation->participation->dateEntryFirstDeposit;
        $melding = null;
        if($dateRegisterOld != $dateRegisterNew )
        {
            $melding[] = "De eerste ingangsdatum deelname is gewijzigd.";
            $melding[] = "Oorspronkelijke eerste ingangsdatum deelname was: " . Carbon::parse($dateRegisterOld)->format('d-m-Y') . ".";
            $melding[] = "Nieuwe eerste ingangsdatum deelname is geworden: " . Carbon::parse($dateRegisterNew)->format('d-m-Y') . ".";
        }

        return $melding;
    }

    public function destroy(ParticipantMutation $participantMutation)
    {
        $this->authorize('manage', ParticipantMutation::class);

        $result = $this->checkMutationAllowed($participantMutation);

        $melding = null;

        $participantProject = $participantMutation->participation;

        $dateRegisterOld = $participantProject->dateEntryFirstDeposit;

        if($participantMutation->status->code_ref == 'final'){
            if ($participantMutation->change_allowed == false) {
                abort(409, 'Deelnemer komt al voor in een definitieve verdeling, definitieve mutaties kunnen niet meer verwijderd worden.');
            }
            if ($participantProject->date_terminated != null) {
                abort(409, 'Deelnemer is beëindigd, definitieve mutaties kunnen niet meer verwijderd worden.');
            }
            if ($participantMutation->financial_overview_definitive) {
                abort(409, 'Mutatie komt al voor in een definitieve waardestaat.');
            }
            if ($participantMutation->isPaidByMollie) {
                abort(409, 'Mutatie heeft al definitieve mollie betaling.');
            }
        }

        DB::transaction(function () use ($participantMutation, $participantProject) {

            $molliePayments = $participantMutation->molliePayments->whereNull('date_paid');
            foreach ($molliePayments as $molliePayment)
            {
                $molliePayment->delete();
            }
            $statusLogs = $participantMutation->statusLog;
            foreach ($statusLogs as $statusLog)
            {
                $statusLog->delete();
            }
            $participantMutation->delete();

            // Herbereken de afhankelijke gegevens op het participantProject
            $participantProject->calculator()->run()->save();

            // Herbereken de afhankelijke gegevens op het project
            $participantProject->project->calculator()->run()->save();

            // Indien participation project in concept waardestaat / waardestaten, dan die ook herberekenen.
            if($participantProject->project->financialOverviewProjects
                && $participantProject->project->financialOverviewProjects->where('definitive', false)->count() > 0)
            {
                // Verwijder eerst bestaande FinancialOverviewParticipantProject records behorende bij participantProject en nog niet definitieve waardestaten.
                // Indien nodig worden ze via recalculateParticipantProjectForFinancialOverviews daarna eventueel weer nieuw aangemaakt.
                $financialOverviewParticipantProjects = FinancialOverviewParticipantProject::where('participant_project_id', $participantProject->id)->get();
                foreach ($financialOverviewParticipantProjects as $financialOverviewParticipantProject){
                    if($financialOverviewParticipantProject->financialOverviewProject->financialOverview->definitive == false){
                        try {
                            DB::beginTransaction();

                            $deleteFinancialOverviewParticipantProject = new DeleteFinancialOverviewParticipantProject($financialOverviewParticipantProject);
                            $result = $deleteFinancialOverviewParticipantProject->delete();

                            if(count($result) > 0){
                                DB::rollBack();
                                abort(412, implode(";", array_unique($result)));
                            }

                            DB::commit();
                        } catch (\PDOException $e) {
                            DB::rollBack();
                            Log::error($e->getMessage());
                            abort(501, 'Er is helaas een fout opgetreden.');
                        }
                    }
                }

                $financialOverviewParticipantProjectController = new FinancialOverviewParticipantProjectController();
                $financialOverviewParticipantProjectController->recalculateParticipantProjectForFinancialOverviews($participantProject);
            }

        });

        $dateRegisterNew = $participantProject->dateEntryFirstDeposit;

        if($dateRegisterOld != $dateRegisterNew )
        {
            $melding[] = "De eerste ingangsdatum is gewijzigd.";
            $melding[] = "Oorspronkelijke eerste ingangsdatum was: " . Carbon::parse($dateRegisterOld)->format('d-m-Y') . ".";
            $melding[] = "Nieuwe eerste ingangsdatum is geworden: " . Carbon::parse($dateRegisterNew)->format('d-m-Y') . ".";
        }
        return $melding;
    }

    /**
     * @param ParticipantMutation $participantMutation
     */
    public function recalculateParticipantMutation(ParticipantMutation $participantMutation): void
    {
        DB::transaction(function () use ($participantMutation) {
            // Calculate participation worth based on current book worth of project
            if ($participantMutation->status
                && $participantMutation->status->code_ref === 'final'
                && $participantMutation->participation->project->projectType->code_ref !== 'loan'
                && ($participantMutation->type->code_ref === 'first_deposit' || $participantMutation->type->code_ref === 'deposit' || $participantMutation->type->code_ref === 'withDrawal')
                && $participantMutation->quantity !== null
            ) {
                $bookWorth = ProjectValueCourse::where('project_id', $participantMutation->participation->project_id)
                    ->where('date', '<=', $participantMutation->date_entry)
                    ->orderBy('date', 'desc')
                    ->value('book_worth');

                $participantMutation->participation_worth = $bookWorth * $participantMutation->quantity;
            }

            $participantMutation->save();

            // Herbereken de afhankelijke gegevens op het participantProject
            $participantMutation->participation->calculator()->run()->save();

            // Herbereken de afhankelijke gegevens op het project
            $participantMutation->participation->project->calculator()->run()->save();

            // Indien participation project in concept waardestaat / waardestaten, dan die ook herberekenen.
            if($participantMutation->participation->project->financialOverviewProjects
                && $participantMutation->participation->project->financialOverviewProjects->where('definitive', false)->count() > 0)
            {
                // Verwijder eerst bestaande FinancialOverviewParticipantProject records behorende bij participantProject en nog niet definitieve waardestaten.
                // Indien nodig worden ze via recalculateParticipantProjectForFinancialOverviews daarna eventueel weer nieuw aangemaakt.
                $financialOverviewParticipantProjects = FinancialOverviewParticipantProject::where('participant_project_id', $participantMutation->participation->id)
                    ->where('status_id', '!=', 'sent')
                    ->get();
                foreach ($financialOverviewParticipantProjects as $financialOverviewParticipantProject){
                    if($financialOverviewParticipantProject->financialOverviewProject->financialOverview->definitive == false){
                        try {
                            DB::beginTransaction();

                            $deleteFinancialOverviewParticipantProject = new DeleteFinancialOverviewParticipantProject($financialOverviewParticipantProject);
                            $result = $deleteFinancialOverviewParticipantProject->delete();

                            if(count($result) > 0){
                                DB::rollBack();
                                abort(412, implode(";", array_unique($result)));
                            }

                            DB::commit();
                        } catch (\PDOException $e) {
                            DB::rollBack();
                            Log::error($e->getMessage());
                            abort(501, 'Er is helaas een fout opgetreden.');
                        }
                    }
                }

                $financialOverviewParticipantProjectController = new FinancialOverviewParticipantProjectController();
                $financialOverviewParticipantProjectController->recalculateParticipantProjectForFinancialOverviews($participantMutation->participation);
            }

        });

    }

    /**
     * @param $participantProject
     */
    protected function checkMutationAllowed($participantMutation)
    {
        $project = $participantMutation->participation->project;
        $mutationStatusFinal = (ParticipantMutationStatus::where('code_ref', 'final')->first())->id;

        if($participantMutation->status_id === $mutationStatusFinal){
            $dateEntryYear = Carbon::parse($participantMutation->date_entry)->year;
            $financialOverviewProjectQuery = FinancialOverviewProject::where('project_id', $project->id)
                ->where('definitive', true)
                ->whereHas('financialOverview', function ($query) use ($project, $dateEntryYear) {
                    $query->where('administration_id', $project->administration->id)
                        ->where('year', $dateEntryYear);
                });

            if ($financialOverviewProjectQuery->exists()) {
                $financialOverview = $financialOverviewProjectQuery->first()->financialOverview;
                abort(409, 'Project komt al voor in definitive waardestaat ' . $financialOverview->description . '. Deze mutatie is niet meer mogelijk.');
                return false;
            }
        }
        return true;
    }

    public function calculationTransactionCosts($participantMutation)
    {
        // TransactionCosts only for (first_)deposit mutation types, otherwise return 0.
        if(!$participantMutation->type || !in_array($participantMutation->type->code_ref, ['deposit', 'first_deposit'])) {
            return 0;
        }

        $project = $participantMutation->participation->project;
        $participation = $participantMutation->participation;

        // indien transactie_costs niet meer gewijzigd mag worden, dan laten we transaction_costs_amount zoals het was.
        // voorwaarde voor niet meer wijzigen:
        // - mutationstatus is final (Definitief) en (mutation change allowed false of waardestaat definitief)
        if($participantMutation->status->code_ref == 'final' &&
            ( $participantMutation->change_allowed == false || $participantMutation->financial_overview_definitive )
        ){
            return $participantMutation->transaction_costs_amount;
        }

        // Indien Transactie kosten ook bij lidmaatschap (use_transaction_costs_with_membership) = false
        if (!$project->use_transaction_costs_with_membership) {

            //$belongsToMembershipGroup = in_array( $project->question_about_membership_group_id, $participation->contact->getAllGroups() );
            if(!$project->question_about_membership_group_id) {
                $belongsToMembershipGroup = false;
            } else {
                $questionAboutMembershipGroupContactsIds = ContactGroup::find($project->question_about_membership_group_id)->getAllContacts(true);
                $belongsToMembershipGroup = in_array($participation->contact_id, $questionAboutMembershipGroupContactsIds);
            }

            // Indien Vragen over lid worden aan of uit (show_question_about_membership) = true en deelnemer zit al in leden groep, dan Transactioncosts = 0
            if ($project->show_question_about_membership && $belongsToMembershipGroup) {
                return 0;
            }

            // Indien Vragen over lid worden aan of uit (show_question_about_membership) = true en deelnemer heeft wel gekozen voor lidmaatschap, dan Transactioncosts = 0
            if ($project->show_question_about_membership && $participation->choice_membership === 1) {
                return 0;
            }
        }

        $varAmount = 0;
        $varQuantity = 0;
        $transactionCosts = 0;

        switch ($participantMutation->status->code_ref) {
            case 'interest':
                if ($project->projectType->code_ref === 'loan' ) {
                    $varAmount = $participantMutation->amount_interest;
                } else {
                    $varQuantity = $participantMutation->quantity_interest;
                }
                break;
            case 'option':
                if ($project->projectType->code_ref === 'loan' ) {
                    $varAmount = $participantMutation->amount_option;
                } else {
                    $varQuantity = $participantMutation->quantity_option;
                }
                break;
            case 'granted':
                if ($project->projectType->code_ref === 'loan' ) {
                    $varAmount = $participantMutation->amount_granted;
                } else {
                    $varQuantity = $participantMutation->quantity_granted;
                }
                break;
            case 'final':
                if ($project->projectType->code_ref === 'loan' ) {
                    $varAmount = $participantMutation->amount_final;
                } else {
                    $varQuantity = $participantMutation->quantity_final;
                }
                break;
        }

        switch ($project->getTransactionCostsCodeRef()) {
            case 'amount-once':
                $transactionCosts = $project->transaction_costs_amount;
                break;
            case 'amount':
                if ($project->projectType->code_ref === 'loan') {
                    $transactionCosts = $project->transaction_costs_amount;
                } else {
                    $transactionCosts = $project->transaction_costs_amount * $varQuantity;
                }
                break;
            case 'percentage':
                if ($project->projectType->code_ref === 'loan') {
                    $amount = $varAmount;
                } else {
                    $amount = $varQuantity * $project->current_book_worth;
                }

                if ($amount != 0) {
                    if ($project->transaction_costs_amount_3 !== null && $amount >= $project->transaction_costs_amount_3) {
                        $transactionCosts = floatval($amount * $project->transaction_costs_percentage_3 / 100);
                    } else if ($project->transaction_costs_amount_2 !== null && $amount >= $project->transaction_costs_amount_2) {
                        $transactionCosts = floatval($amount * $project->transaction_costs_percentage_2 / 100);
                    } else if ($project->transaction_costs_amount !== null && $amount >= $project->transaction_costs_amount) {
                        $transactionCosts = floatval($amount * $project->transaction_costs_percentage / 100);
                    } else {
                        $transactionCosts = 0;
                    }
                }
                break;
            default:
                $transactionCosts = 0;
                break;
        }

        if ($project->getTransactionCostsCodeRef() && $project->getTransactionCostsCodeRef() !== 'none') {
            if ($project->transaction_costs_amount_min !== null && $transactionCosts < $project->transaction_costs_amount_min) {
                $transactionCosts = $project->transaction_costs_amount_min;
            }
            if ($project->transaction_costs_amount_max !== null && $transactionCosts > $project->transaction_costs_amount_max) {
                $transactionCosts = $project->transaction_costs_amount_max;
            }
        }

        return $transactionCosts;
    }
}