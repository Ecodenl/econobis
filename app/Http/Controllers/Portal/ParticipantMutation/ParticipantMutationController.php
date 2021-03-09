<?php

namespace App\Http\Controllers\Portal\ParticipantMutation;

use App\Eco\ParticipantMutation\ParticipantMutation;
use App\Http\Controllers\Api\ApiController;
use App\Http\Resources\ParticipantMutation\FullParticipantMutation;

class ParticipantMutationController extends ApiController
{
    public function getByCode($code)
    {
        $participationMutation = ParticipantMutation::where('code', $code)->first();

        $participationMutation->load([
            'participation.project',
        ]);

        return FullParticipantMutation::make($participationMutation);
    }
}