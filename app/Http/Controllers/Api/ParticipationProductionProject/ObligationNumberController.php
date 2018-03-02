<?php
/**
 * Created by PhpStorm.
 * User: Fren
 * Date: 20-10-2017
 * Time: 9:35
 */

namespace App\Http\Controllers\Api\ParticipationProductionProject;

use App\Eco\ParticipantProductionProject\ObligationNumber;
use App\Helpers\RequestInput\RequestInput;
use App\Http\Controllers\Api\ApiController;
use App\Http\Resources\GenericResource;

class ObligationNumberController extends ApiController
{
    public function store(RequestInput $requestInput)
    {
        $this->authorize('manage', ObligationNumber::class);

        $data = $requestInput
            ->integer('participationId')->validate('required|exists:participation_production_project,id')->alias('participation_id')->next()
            ->string('number')->validate('required')->next()

            ->get();

        $obligationNumber = new ObligationNumber();

        $obligationNumber->fill($data);

        $obligationNumber->save();

        return GenericResource::make($obligationNumber);
    }

    public function update(RequestInput $requestInput, ObligationNumber $obligationNumber)
    {
        $this->authorize('manage', ObligationNumber::class);

        $data = $requestInput
            ->string('number')->validate('required')->next()

            ->get();

        $obligationNumber->fill($data);

        $obligationNumber->save();

        return GenericResource::make($obligationNumber);
    }

    public function destroy(ObligationNumber $obligationNumber)
    {
        $this->authorize('manage', ObligationNumber::class);

        $obligationNumber->forceDelete();
    }
}