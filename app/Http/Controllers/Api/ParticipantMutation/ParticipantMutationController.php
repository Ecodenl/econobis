<?php
/**
 * Created by PhpStorm.
 * User: Fren
 * Date: 20-10-2017
 * Time: 9:35
 */

namespace App\Http\Controllers\Api\ParticipantMutation;

use App\Eco\ParticipantMutation\ParticipantMutation;
use App\Helpers\RequestInput\RequestInput;
use App\Http\Controllers\Api\ApiController;
use App\Http\Resources\ParticipantMutation\FullParticipantMutation;

class ParticipantMutationController extends ApiController
{
    public function store(RequestInput $requestInput)
    {
        $this->authorize('manage', ParticipantMutation::class);

        $data = $requestInput
            ->integer('participationId')->validate('required|exists:participation_project,id')->alias('participation_id')->next()
            ->integer('typeId')->validate('required|exists:participant_mutation_type,id')->alias('type_id')->next()
            ->date('dateMutation')->validate('required|date')->alias('date_mutation')->next()
            ->integer('amount')->validate('required')->next()
            ->string('iban')->onEmpty(null)->next()
            ->integer('referral')->onEmpty(null)->next()
            ->integer('entry')->onEmpty(null)->next()
            ->date('dateBooking')->validate('nullable|date')->onEmpty(null)->alias('date_booking')->next()

            ->get();

        $participantMutation = new ParticipantMutation();

        $participantMutation->fill($data);

        $participantMutation->save();

        return FullParticipantMutation::collection(ParticipantMutation::where('participation_id', $participantMutation->participation_id)->orderBy('date_mutation', 'desc')->with('createdBy', 'type')->get());
    }

    public function update(RequestInput $requestInput, ParticipantMutation $participantMutation)
    {
        $this->authorize('manage', ParticipantMutation::class);

        $data = $requestInput
            ->integer('typeId')->validate('required|exists:participant_mutation_type,id')->alias('type_id')->next()
            ->date('dateMutation')->validate('required|date')->alias('date_mutation')->next()
            ->integer('amount')->validate('required')->next()
            ->string('iban')->onEmpty(null)->next()
            ->integer('referral')->onEmpty(null)->next()
            ->integer('entry')->onEmpty(null)->next()
            ->date('dateBooking')->validate('nullable|date')->onEmpty(null)->alias('date_booking')->next()

            ->get();

        $participantMutation->fill($data);

        $participantMutation->save();

        return FullParticipantMutation::collection(ParticipantMutation::where('participation_id', $participantMutation->participation_id)->orderBy('date_mutation', 'desc')->with('createdBy', 'type')->get());
    }

    public function destroy(ParticipantMutation $participantMutation)
    {
        $this->authorize('manage', ParticipantMutation::class);

        $participantMutation->delete();
    }
}