<?php
/**
 * Created by PhpStorm.
 * User: Fren
 * Date: 20-10-2017
 * Time: 9:35
 */

namespace App\Http\Controllers\Api\Registration;


use App\Eco\Address\Address;
use App\Eco\Measure\MeasureTaken;
use App\Eco\Registration\Registration;
use App\Eco\Contact\Contact;
use App\Eco\Registration\RegistrationNote;
use App\Eco\Registration\RegistrationStatus;
use App\Http\Controllers\Api\ApiController;
use App\Http\RequestQueries\Registration\Grid\RequestQuery;
use App\Http\Resources\Measure\MeasureRequested;
use App\Http\Resources\Registration\FullRegistration;
use App\Http\Resources\Registration\GridRegistration;
use Illuminate\Http\Request;
use App\Helpers\RequestInput\RequestInput;

class RegistrationController extends ApiController
{

    public function grid(RequestQuery $requestQuery)
    {
        $registrations = $requestQuery->get();

        $registrations->load(['sources', 'address', 'status']);

        return GridRegistration::collection($registrations);
    }

    /**
     * Geef de data die React nodig heeft om het scherm op te bouwen voor een nieuwe registration
     */
    public function getStore(Request $request)
    {
        $contact = Contact::find($request->contact);
        $info[] = $contact->getPrettyAddresses();

        return $info;
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'addressId' => 'required|exists:addresses,id',
            'statusId' => 'exists:registration_status,id',
            'campaignId' => 'exists:campaigns,id',
            'buildingTypeId' => 'exists:building_types,id',
            'buildYear' => 'integer|between:1500,3000',
            'owner' => 'boolean',
            'sourceIds' => '',
            'registrationReasonIds' => ''
        ]);

        //basic registration
        $registration = new Registration();
        $registration->address_id = $data['addressId'];
        if ($data['statusId']) {
            $registration->registration_status_id
                = $data['statusId'];
        }
        if ($data['campaignId']) {
            $registration->campaign_id = $data['campaignId'];
        }
        $registration->save();

        //relations
        if ($data['sourceIds']) {
            foreach ($data['sourceIds'] as $source_id) {
                $registration->sources()->attach($source_id);
            }
        }
        if ($data['registrationReasonIds']) {
            foreach ($data['registrationReasonIds'] as $registration_reason) {
                $registration->reasons()->attach($registration_reason);
            }
        }

        //rest is saved on Address
        $address = Address::find($data['addressId']);
        if ($data['buildingTypeId']) {
            $address->building_type_id = $data['buildingTypeId'];
        }
        if ($data['buildYear']) {
            $address->build_year = $data['buildYear'];
        }
        if ($data['owner']) {
            $address->owner = $data['owner'];
        }

        $address->save();

        return $registration;
    }

    public function storeMeasureTaken(Request $request, RequestInput $requestInput)
    {
        $data = $requestInput->string('addressId')->validate('required|exists:addresses,id')->alias('address_id')->next()
            ->string('measureId')->validate('required|exists:measures,id')->alias('measure_id')->next()
            ->string('measureDate')->whenMissing(null)->onEmpty(null)->alias('measure_date')->next()
            ->string('energyLabelId')->whenMissing(null)->onEmpty(null)->alias('energy_label_id')->next()
            ->get();

        $measureTaken = new MeasureTaken($data);
        $measureTaken->save();

        return \App\Http\Resources\Measure\MeasureTaken::make($measureTaken->fresh());
    }

    public function storeMeasureRequested(Request $request, RequestInput $requestInput)
    {
        $data = $requestInput->string('addressId')->validate('required|exists:addresses,id')->alias('address_id')->next()
            ->string('measureId')->validate('required|exists:measures,id')->alias('measure_id')->next()
            ->string('desiredDate')->whenMissing(null)->onEmpty(null)->alias('desired_date')->next()
            ->string('degreeInterest')->whenMissing(0)->onEmpty(0)->alias('degree_interest')->next()
            ->get();

        $measureRequested = new \App\Eco\Measure\MeasureRequested($data);
        $measureRequested->save();

        return \App\Http\Resources\Measure\MeasureTaken::make($measureRequested->fresh());
    }

    public function storeNote(Request $request)
    {
        $data = $request->validate([
            'registration_id' => 'required|exists:registrations,id',
            'note' => 'required',
        ]);
        $registrationNote = new RegistrationNote();
        $registrationNote->registration_id = $data['registration_id'];
        $registrationNote->note = $data['note'];
        $registrationNote->save();

        return $registrationNote;
    }

    public function show(Request $request, Registration $registration)
    {
        $registration->load([
            'address.building_type',
            'address.measures_taken',
            'address.measures_requested',
            'sources',
            'status',
            'notes',
            'campaign',
            'reasons',
        ]);

        return FullRegistration::make($registration);
    }

    public function update(Request $request)
    {

        $data = $request->validate([
            'registration_status_id' => 'exists:registration_status,id',
            'campaign_id' => 'exists:campaigns,id',
            'building_type_id' => 'exists:building_types,id',
            'build_year' => 'integer|between:1500,3000',
            'owner' => 'boolean',
            'source_ids' => '',
            'registration_reasons' => ''
        ]);

        //basic registration
        $registration = Registration::find($request->registration);
        if (!$registration) {
            return 'Registratie met id:' . $request->registration
                . 'niet gevonden';
        }
        if (array_key_exists('address_id', $data)
            || array_key_exists('registration_status_id', $data)
            || array_key_exists('campaign_id', $data)
        ) {
            if (array_key_exists('address_id', $data)) {
                $registration->address_id = $data['address_id'];
            }
            if (array_key_exists('registration_status_id', $data)) {
                $registration->registration_status_id
                    = $data['registration_status_id'];
            }
            if (array_key_exists('campaign_id', $data)) {
                $registration->campaign_id = $data['campaign_id'];
            }
            $registration->save();
        }

        //relations
        if (array_key_exists('source_ids', $data)) {
            foreach ($data['source_ids'] as $source_id) {
                $registration->sources()->attach($source_id);
            }
        }
        if (array_key_exists('registration_reasons', $data)) {
            foreach ($data['registration_reasons'] as $registration_reason) {
                $registration->reasons()->attach($registration_reason);
            }
        }

        //rest is saved on Address
        if (array_key_exists('building_type_id', $data)
            || array_key_exists('build_year', $data)
            || array_key_exists('owner', $data)
        ) {
            $address = Address::find($registration->address_id);
            if (array_key_exists('building_type_id', $data)) {
                $address->building_type_id = $data['building_type_id'];
            }
            if (array_key_exists('build_year', $data)) {
                $address->build_year = $data['build_year'];
            }
            if (array_key_exists('owner', $data)) {
                $address->owner = $data['owner'];
            }

            $address->save();
        }

        $registration = $registration->fresh();
        $registration->load([
            'address.building_type',
            'address.measures_taken',
            'address.measures_requested',
            'sources',
            'status',
            'notes',
            'campaign',
            'reasons',
        ]);

        return FullRegistration::make($registration);
    }

    public function deleteMeasureTaken(Request $request)
    {
        $data = $request->validate([
            'measure_id' => 'required:measures,id',
        ]);
        $address
            = Address::find(Registration::find($request->registration)->address_id);
        $address->measures_taken()->detach($data['measure_id']);

        return null;
    }

    public function deleteMeasureRequested(Request $request, Registration $registration)
    {
        $data = $request->validate([
            'measure_id' => 'required:measures,id',
        ]);
        $measureTaken = MeasureTaken::where('address_id', $registration->address_id)
            ->where('measure_id', $data['measure_id']);
        $measureTaken->delete();
    }

    public function updateNote(Request $request)
    {
        {
            $data = $request->validate([
                'note_text' => 'required',
            ]);
            $note = registrationNote::find($request->note);
            $note->note = $data['note_text'];
            $note->save();

            return $note;
        }
    }

    public function deleteNote(Request $request)
    {
        {
            $note = RegistrationNote::find($request->note);
            $note->delete();

            return null;
        }
    }

    public function destroy(Request $request)
    {
        {
            $registration = Registration::find($request->registration);
            $registration->notes()->delete();
            $registration->sources()->delete();
            $registration->reasons()->delete();
            $registration->delete();

            return null;
        }
    }

}