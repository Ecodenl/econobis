<?php
/**
 * Created by PhpStorm.
 * User: Fren
 * Date: 20-10-2017
 * Time: 9:35
 */

namespace App\Http\Controllers\Api\ParticipantTransaction;

use App\Eco\ParticipantTransaction\ParticipantTransaction;
use App\Helpers\RequestInput\RequestInput;
use App\Http\Controllers\Api\ApiController;
use App\Http\Resources\ParticipantTransaction\FullParticipantTransaction;

class ParticipantTransactionController extends ApiController
{
    public function store(RequestInput $requestInput)
    {
        $this->authorize('manage', ParticipantTransaction::class);

        $data = $requestInput
            ->integer('participationId')->validate('required|exists:participation_production_project,id')->alias('participation_id')->next()
            ->integer('typeId')->validate('required|exists:participant_transaction_type,id')->alias('type_id')->next()
            ->date('dateTransaction')->validate('required|date')->alias('date_transaction')->next()
            ->integer('amount')->validate('required')->next()
            ->string('iban')->onEmpty(null)->next()
            ->integer('referral')->onEmpty(null)->next()
            ->integer('entry')->onEmpty(null)->next()
            ->date('dateBooking')->validate('nullable|date')->onEmpty(null)->alias('date_booking')->next()

            ->get();

        $participantTransaction = new ParticipantTransaction();

        $participantTransaction->fill($data);

        $participantTransaction->save();

        return FullParticipantTransaction::collection(ParticipantTransaction::where('participation_id', $participantTransaction->participation_id)->orderBy('date_transaction', 'desc')->with('createdBy', 'type')->get());
    }

    public function update(RequestInput $requestInput, ParticipantTransaction $participantTransaction)
    {
        $this->authorize('manage', ParticipantTransaction::class);

        $data = $requestInput
            ->integer('typeId')->validate('required|exists:participant_transaction_type,id')->alias('type_id')->next()
            ->date('dateTransaction')->validate('required|date')->alias('date_transaction')->next()
            ->integer('amount')->validate('required')->next()
            ->string('iban')->onEmpty(null)->next()
            ->integer('referral')->onEmpty(null)->next()
            ->integer('entry')->onEmpty(null)->next()
            ->date('dateBooking')->validate('nullable|date')->onEmpty(null)->alias('date_booking')->next()

            ->get();

        $participantTransaction->fill($data);

        $participantTransaction->save();

        return FullParticipantTransaction::collection(ParticipantTransaction::where('participation_id', $participantTransaction->participation_id)->orderBy('date_transaction', 'desc')->with('createdBy', 'type')->get());
    }

    public function destroy(ParticipantTransaction $participantTransaction)
    {
        $this->authorize('manage', ParticipantTransaction::class);

        $participantTransaction->forceDelete();
    }
}