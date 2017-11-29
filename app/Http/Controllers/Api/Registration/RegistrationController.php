<?php
/**
 * Created by PhpStorm.
 * User: Fren
 * Date: 20-10-2017
 * Time: 9:35
 */

namespace App\Http\Controllers\Api\Registration;


use App\Eco\Address\Address;
use App\Eco\Registration\Registration;
use App\Eco\Contact\Contact;
use App\Eco\Registration\RegistrationNote;
use App\Http\Controllers\Api\ApiController;
use App\Http\RequestQueries\Registration\Grid\RequestQuery;
use App\Http\Resources\Registration\FullRegistration;
use Illuminate\Http\Request;
use App\Helpers\RequestInput\RequestInput;

class RegistrationController extends ApiController
{

    public function show(RequestQuery $requestQuery)
    {
        $registrations = $requestQuery->get();

        $registrations->load(['sources', 'address', 'status']);

        return FullRegistration::collection($registrations);
    }

    public function getContactRegistrations(Contact $contact)
    {
        $addresses = $contact->addresses()->get();

        foreach ($addresses as $address) {
            $registration[] = [
                'addressId' => $address->id,
                'addressName' => $address->street . ' ' . $address->number,
                'addressRegistratedAt' => $address->registration()
                    ->pluck('created_at')
            ];
        }

        return $registration;
    }


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

    public function storeMeasureTaken(Request $request)
    {
        $data = $request->validate([
            'address_id' => 'required|exists:addresses,id',
            'measure_id' => 'required|exists:measures,id',
            'measure_date' => 'date',
        ]);

        if (!array_key_exists('measure_date', $data)) {
            $data['measure_date'] = null;
        }

        Address::find($data['address_id'])->measures_taken()
            ->attach($data['measure_id'],
                ['measure_date' => $data['measure_date']]);
    }

    public function storeMeasureRequested(Request $request)
    {
        $data = $request->validate([
            'address_id' => 'required|exists:addresses,id',
            'measure_id' => 'required|exists:measures,id',
            'desired_date' => 'date',
            'degree_interest' => 'integer|between:1,10',
        ]);

        if (!array_key_exists('desired_date', $data)) {
            $data['desired_date'] = null;
        }
        if (!array_key_exists('degree_interest', $data)) {
            $data['degree_interest'] = null;
        }
        Address::find($data['address_id'])->measures_requested()
            ->attach($data['measure_id'],
                [
                    'desired_date' => $data['desired_date'],
                    'degree_interest' => $data['degree_interest']
                ]);
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

    public function getRegistration(Request $request)
    {
        $data = $request->validate([
            'registration' => 'exists:registrations,id',
        ]);

        $registrations = Registration::find($request->registration)
            ->load([
                'address',
                'address.measures_taken',
                'address.measures_requested',
                'sources',
                'status',
                'note'
            ]);

        return $registrations;
    }

    public function updateRegistration(Request $request)
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

        return $registration;
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

    public function deleteMeasureRequested(Request $request)
    {
        $data = $request->validate([
            'measure_id' => 'required:measures,id',
        ]);
        $address
            = Address::find(Registration::find($request->registration)->address_id);
        $address->measures_requested()->detach($data['measure_id']);

        return null;
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

    public function deleteRegistration(Request $request)
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