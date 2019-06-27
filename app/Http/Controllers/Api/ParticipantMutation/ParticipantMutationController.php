<?php

namespace App\Http\Controllers\Api\ParticipantMutation;

use App\Eco\ParticipantMutation\ParticipantMutation;
use App\Helpers\RequestInput\RequestInput;
use App\Http\Controllers\Api\ApiController;
use App\Http\Resources\ParticipantMutation\FullParticipantMutation;
use Illuminate\Support\Facades\DB;

class ParticipantMutationController extends ApiController
{
    public function store(RequestInput $requestInput)
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
            ->get();

        $participantMutation = new ParticipantMutation();

        $participantMutation->fill($data);

        DB::transaction(function () use ($participantMutation) {
            // Calculate participation worth based on current book worth of project
            if($participantMutation->status->code_ref === 'final' && $participantMutation->participation->project->projectType->code_ref !== 'loan') {
                $currentBookWorthOfProject = $participantMutation->participation->project->currentBookWorth() * $participantMutation->quantity;

                $participantMutation->participation_worth = $currentBookWorthOfProject;
            }

            $participantMutation->save();

            // Herbereken de afhankelijke gegevens op het participantProject
            $participantMutation->participation->calculator()->run()->save();

            // Herbereken de afhankelijke gegevens op het project
            $participantMutation->participation->project->calculator()->run()->save();
        });


    }

    public function update(RequestInput $requestInput, ParticipantMutation $participantMutation)
    {
        $this->authorize('manage', ParticipantMutation::class);

        $data = $requestInput
            ->integer('typeId')->validate('required|exists:participant_mutation_types,id')->alias('type_id')->next()
            ->integer('statusId')->onEmpty(null)->validate('required|exists:participant_mutation_statuses,id')->alias('status_id')->next()
            ->string('entry')->onEmpty('')->next()
            ->date('dateInterest')->validate('nullable|date')->onEmpty(null)->alias('date_interest')->next()
            ->date('dateOption')->validate('nullable|date')->onEmpty(null)->alias('date_option')->next()
            ->date('dateGranted')->validate('nullable|date')->onEmpty(null)->alias('date_granted')->next()
            ->date('dateContractRetour')->validate('nullable|date')->onEmpty(null)->alias('date_contract_retour')->next()
            ->date('datePayment')->validate('nullable|date')->onEmpty(null)->alias('date_payment')->next()
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

            ->get();

        $participantMutation->fill($data);

        DB::transaction(function () use ($participantMutation) {
            // Calculate participation worth based on current book worth of project
            if($participantMutation->status->code_ref === 'final' && $participantMutation->participation->project->projectType->code_ref !== 'loan') {
                $currentBookWorthOfProject = $participantMutation->participation->project->currentBookWorth() * $participantMutation->quantity;

                $participantMutation->participation_worth = $currentBookWorthOfProject;
            }

            $participantMutation->save();

            // Herbereken de afhankelijke gegevens op het participantProject
            $participantMutation->participation->calculator()->run()->save();

            // Herbereken de afhankelijke gegevens op het project
            $participantMutation->participation->project->calculator()->run()->save();
        });
    }

    public function destroy(ParticipantMutation $participantMutation)
    {
        $this->authorize('manage', ParticipantMutation::class);

        DB::transaction(function () use ($participantMutation) {
            $participantProject = $participantMutation->participation;

            $participantMutation->delete();

            // Herbereken de afhankelijke gegevens op het participantProject
            $participantProject->calculator()->run()->save();

            // Herbereken de afhankelijke gegevens op het project
            $participantProject->project->calculator()->run()->save();
        });

    }
}