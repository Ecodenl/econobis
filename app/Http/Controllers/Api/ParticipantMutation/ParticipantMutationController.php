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
            ->date('datePayment')->validate('nullable|date')->onEmpty(null)->alias('date_payment')->next()
            ->double('amount')->onEmpty(null)->next()
            ->integer('quantity')->onEmpty(null)->next()
            ->double('returns')->onEmpty(null)->next()
            ->double('payoutKwh')->onEmpty(null)->alias('payout_kwh')->next()
            ->double('indicationOfRestitutionEnergyTax')->onEmpty(null)->alias('indication_of_restitution_energy_tax')->next()
            ->string('paidOn')->onEmpty(null)->alias('paid_on')->next()
            ->get();

        $participantMutation = new ParticipantMutation();

        $participantMutation->fill($data);

        DB::transaction(function () use ($participantMutation) {
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
            ->date('datePayment')->validate('nullable|date')->onEmpty(null)->alias('date_payment')->next()
            ->double('amount')->onEmpty(null)->next()
            ->integer('quantity')->onEmpty(null)->next()
            ->double('returns')->onEmpty(null)->next()
            ->double('payoutKwh')->onEmpty(null)->alias('payout_kwh')->next()
            ->double('indicationOfRestitutionEnergyTax')->onEmpty(null)->alias('indication_of_restitution_energy_tax')->next()
            ->string('paidOn')->onEmpty(null)->alias('paid_on')->next()

            ->get();

        $participantMutation->fill($data);

        DB::transaction(function () use ($participantMutation) {
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