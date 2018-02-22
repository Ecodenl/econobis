<?php

namespace App\Http\Controllers\Api\Occupation;

use App\Eco\Occupation\OccupationPerson;
use App\Helpers\RequestInput\RequestInput;
use App\Http\Controllers\Api\ApiController;
use App\Http\Resources\Occupation\FullOccupationPerson;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class OccupationController extends ApiController
{

    public function store(RequestInput $requestInput)
    {
//        $this->authorize('manage', Measure::class);

        $data = $requestInput
            ->string('occupationId')->validate('required|exists:occupations,id')->alias('occupation_id')->next()
            ->string('personId')->validate('required|exists:people,id')->alias('person_id')->next()
            ->string('organisationId')->validate('required|exists:organisations,id')->alias('organisation_id')->next()
            ->date('startDate')->onEmpty(null)->alias('start_date')->next()
            ->date('endDate')->onEmpty(null)->alias('end_date')->next()
            ->boolean('primary')->next()
            ->get();

        //an organisation can only have 1 contactperson.
        if ($data['primary'] == true) {
            $primaryOccupationPerson = OccupationPerson::where('primary', true)
                ->where('organisation_id', $data['organisation_id'])->first();

            if ($primaryOccupationPerson) {
                $primaryOccupationPerson->primary = false;
                $primaryOccupationPerson->save();
            }
        }

        //save
        $occupationPerson = new OccupationPerson();
        $occupationPerson->fill($data);
        try {
            $occupationPerson->save();
        } catch (\Exception $e) {
            Log::error('error adding occupation: ' . $e);
        }

        return FullOccupationPerson::collection(OccupationPerson::where('person_id', $occupationPerson->person_id)->orderBy('created_at')->with('occupation', 'organisation', 'person')->get());
    }

    public function update(RequestInput $requestInput, Request $request)
    {

        $data = $requestInput
            ->string('occupationId')->validate('required|exists:occupations,id')->alias('occupation_id')->next()
            ->string('personId')->validate('required|exists:people,id')->alias('person_id')->next()
            ->string('organisationId')->validate('required|exists:organisations,id')->alias('organisation_id')->next()
            ->date('startDate')->onEmpty(null)->alias('start_date')->next()
            ->date('endDate')->onEmpty(null)->alias('end_date')->next()
            ->boolean('primary')->next()
            ->get();

        $oldOccupationPerson = OccupationPerson::where('occupation_id', $request['oldOccupationId'])->where('person_id', $data['person_id'])->where('organisation_id', $request['oldOrganisationId'])->first();
        $oldOccupationPerson->delete();

        //an organisation can only have 1 contactperson.
        if ($data['primary'] == true) {
            $primaryOccupationPerson = OccupationPerson::where('primary', true)
                ->where('organisation_id', $data['organisation_id'])->first();
            if ($primaryOccupationPerson) {
                $primaryOccupationPerson->primary = false;
                $primaryOccupationPerson->save();
            }
        }

        $occupationPerson = new OccupationPerson();
        $occupationPerson->fill($data);
        $occupationPerson->save();

        $occupationsPerson = OccupationPerson::where('person_id', $occupationPerson->person_id)->orderBy('created_at')->get();
        $occupationsPerson->load('occupation', 'organisation', 'person');

        return FullOccupationPerson::collection($occupationsPerson);
    }

    public function destroy(RequestInput $requestInput)
    {
        $data = $requestInput
            ->string('occupationId')->validate('required|exists:occupations,id')->alias('occupation_id')->next()
            ->string('personId')->validate('required|exists:people,id')->alias('person_id')->next()
            ->string('organisationId')->validate('required|exists:organisations,id')->alias('organisation_id')->next()
            ->get();

        $occupationPerson = OccupationPerson::where('occupation_id', $data['occupation_id'])->where('person_id', $data['person_id'])->where('organisation_id', $data['organisation_id'])->first();
        $occupationPerson->delete();

        $occupationsPerson = OccupationPerson::where('person_id', $occupationPerson->person_id)->orderBy('created_at')->get();
        $occupationsPerson->load('occupation', 'organisation', 'person');

        return FullOccupationPerson::collection($occupationsPerson);
    }
}
