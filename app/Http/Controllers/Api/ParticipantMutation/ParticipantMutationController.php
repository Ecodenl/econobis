<?php

namespace App\Http\Controllers\Api\ParticipantMutation;

use App\Eco\ParticipantMutation\ParticipantMutation;
use App\Eco\ParticipantMutation\ParticipantMutationStatus;
use App\Eco\Project\ProjectValueCourse;
use App\Helpers\RequestInput\RequestInput;
use App\Http\Controllers\Api\ApiController;
use App\Http\Resources\ParticipantMutation\FullParticipantMutation;
use Carbon\Carbon;
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

        $this->recalculateParticipantMutation($participantMutation);


    }

    public function update(RequestInput $requestInput, ParticipantMutation $participantMutation)
    {
        $this->authorize('manage', ParticipantMutation::class);

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

        DB::transaction(function () use ($participantMutation) {
            $participantProject = $participantMutation->participation;

            if( !$participantProject->participantInDefinitiveRevenue )
            {
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
            }

        });

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
        });
    }
}