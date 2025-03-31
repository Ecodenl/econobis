<?php

namespace App\Http\Controllers\Api\Occupation;

use App\Eco\Contact\Contact;
use App\Eco\Contact\ContactType;
use App\Eco\Occupation\OccupationContact;
use App\Helpers\RequestInput\RequestInput;
use App\Http\Controllers\Api\ApiController;
use App\Http\Resources\Occupation\FullOccupationContact;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class OccupationController extends ApiController
{

    public function store(RequestInput $requestInput)
    {
//        $this->authorize('manage', Measure::class);

        $data = $requestInput
            ->string('occupationId')->validate('required|exists:occupations,id')->alias('occupation_id')->next()
            ->string('primaryContactId')->validate('required|exists:contacts,id')->alias('primary_contact_id')->next()
            ->string('contactId')->validate('required|exists:contacts,id')->alias('contact_id')->next()
            ->date('startDate')->onEmpty(null)->alias('start_date')->next()
            ->date('endDate')->onEmpty(null)->alias('end_date')->next()
            ->boolean('primary')->next()
            ->boolean('allowManageInPortal')->alias('allow_manage_in_portal')->next()
            ->get();

        // link primaryContact = person and contact = orginastion is not allowed.
        // in that case we switch the link:
        //   primaryContact = contact (organisation)
        //   contact = primaryContact (peron)
        $primaryContact = Contact::where('id', $data['primary_contact_id'])->first();
        $secondaryContact = Contact::where('id', $data['contact_id'])->first();
        $switchContact = false;
        if ($primaryContact->type_id == ContactType::PERSON && $secondaryContact->type_id == ContactType::ORGANISATION) {
            $data['primary_contact_id'] = $secondaryContact->id;
            $data['contact_id'] = $primaryContact->id;
            $primaryContact = Contact::where('id', $data['primary_contact_id'])->first();
            $secondaryContact = Contact::where('id', $data['contact_id'])->first();
            $switchContact = true;
        }

        // an organisation can only have 1 contactperson.
        if ($data['primary'] == true) {

            if ($primaryContact->type_id == 'organisation') {
                $organisationOccupations
                    = OccupationContact::where('primary_contact_id',
                    $primaryContact->id)
                    ->orWhere('contact_id', $primaryContact->id)->get();

                foreach ($organisationOccupations as $organisationOccupation) {
                    $organisationOccupation->primary = false;
                    $organisationOccupation->save();
                }
            }

            if ($secondaryContact->type_id == 'organisation') {
                $organisationOccupations
                    = OccupationContact::where('primary_contact_id',
                    $secondaryContact->id)
                    ->orWhere('contact_id', $secondaryContact->id)->get();

                foreach ($organisationOccupations as $organisationOccupation) {
                    $organisationOccupation->primary = false;
                    $organisationOccupation->save();
                }
            }
        }

        //save
        $occupationContact = new OccupationContact();
        $occupationContact->fill($data);
        try {
            $occupationContact->save();
        } catch (\Exception $e) {
            Log::error('error adding occupation: ' . $e);
        }

        if($switchContact)
        {
            $occupationContact = OccupationContact::where('primary_contact_id', $occupationContact->contact_id)->orWhere('contact_id', $occupationContact->primary_contact_id)->orderBy('created_at')->get();
        }else{
            $occupationContact = OccupationContact::where('primary_contact_id', $occupationContact->primary_contact_id)->orWhere('contact_id', $occupationContact->contact_id)->orderBy('created_at')->get();
        }

        $occupationContact->load('occupation', 'primaryContact', 'contact');

        return FullOccupationContact::collection($occupationContact);
    }

    public function update(RequestInput $requestInput, OccupationContact $occupationContact)
    {

        $data = $requestInput
            ->string('occupationId')->validate('required|exists:occupations,id')->alias('occupation_id')->next()
            ->string('primaryContactId')->validate('required|exists:contacts,id')->alias('primary_contact_id')->next()
            ->string('contactId')->validate('required|exists:contacts,id')->alias('contact_id')->next()
            ->date('startDate')->onEmpty(null)->alias('start_date')->next()
            ->date('endDate')->onEmpty(null)->alias('end_date')->next()
            ->boolean('primary')->next()
            ->boolean('allowManageInPortal')->alias('allow_manage_in_portal')->next()
            ->get();

        // link primaryContact = person and contact = orginastion is not allowed.
        // in that case we switch the link:
        //   primaryContact = contact (organisation)
        //   contact = primaryContact (peron)
        $primaryContact = Contact::where('id', $data['primary_contact_id'])->first();
        $secondaryContact = Contact::where('id', $data['contact_id'])->first();
        $switchContact = false;
        if ($primaryContact->type_id == ContactType::PERSON && $secondaryContact->type_id == ContactType::ORGANISATION) {
            $data['primary_contact_id'] = $secondaryContact->id;
            $data['contact_id'] = $primaryContact->id;
            $primaryContact = Contact::where('id', $data['primary_contact_id'])->first();
            $secondaryContact = Contact::where('id', $data['contact_id'])->first();
            $switchContact = true;
        }

        //an organisation can only have 1 contactperson.
        if ($data['primary'] == true) {

            if ($primaryContact->type_id == ContactType::ORGANISATION) {
                $organisationOccupations
                    = OccupationContact::where('primary_contact_id',
                    $primaryContact->id)
                    ->orWhere('contact_id', $primaryContact->id)->get();

                foreach ($organisationOccupations as $organisationOccupation) {
                    $organisationOccupation->primary = false;
                    $organisationOccupation->save();
                }
            }

            if ($secondaryContact->type_id == ContactType::ORGANISATION) {
                $organisationOccupations
                    = OccupationContact::where('primary_contact_id',
                    $secondaryContact->id)
                    ->orWhere('contact_id', $secondaryContact->id)->get();

                foreach ($organisationOccupations as $organisationOccupation) {
                    $organisationOccupation->primary = false;
                    $organisationOccupation->save();
                }
            }
        }

        $occupationContact->fill($data);
        $occupationContact->save();

        if($switchContact)
        {
            $occupationContact = OccupationContact::where('primary_contact_id', $occupationContact->contact_id)->orWhere('contact_id', $occupationContact->primary_contact_id)->orderBy('created_at')->get();
        }else{
            $occupationContact = OccupationContact::where('primary_contact_id', $occupationContact->primary_contact_id)->orWhere('contact_id', $occupationContact->contact_id)->orderBy('created_at')->get();
        }

        $occupationContact->load('occupation', 'primaryContact', 'contact');

        return FullOccupationContact::collection($occupationContact);
    }

    public function destroy(RequestInput $requestInput)
    {
        $data = $requestInput
            ->string('occupationId')->validate('required|exists:occupations,id')->alias('occupation_id')->next()
            ->string('primaryContactId')->validate('required|exists:contacts,id')->alias('primary_contact_id')->next()
            ->string('contactId')->validate('required|exists:contacts,id')->alias('contact_id')->next()
            ->get();

        $occupationContact = OccupationContact::where('occupation_id', $data['occupation_id'])->where('primary_contact_id', $data['primary_contact_id'])->where('contact_id', $data['contact_id'])->first();
        $occupationContact->delete();

        $occupationContact = OccupationContact::where('primary_contact_id', $occupationContact->primary_contact_id)->orWhere('contact_id', $occupationContact->contact_id)->orderBy('created_at')->get();
        $occupationContact->load('occupation', 'primaryContact', 'contact');

        return FullOccupationContact::collection($occupationContact);
    }
}
