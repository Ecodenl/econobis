<?php

namespace App\Http\Controllers\Api\Organisation;

use App\Eco\Organisation\Organisation;
use App\Eco\Contact\Contact;
use App\Eco\Contact\ContactStatus;
use App\Http\Controllers\Api\ApiController;
use App\Http\Controllers\Api\Contact\ContactController;
use App\Http\Resources\Organisation\OrganisationPeek;
use App\Rules\EnumExists;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class OrganisationController extends ApiController
{

    public function store(Request $request)
    {
        $this->authorize('create', Organisation::class);

        $contactData = $request->validate([
            'newsletter' => 'boolean',
            'iban' => '',
            'ibanAttn' => '',
            'liable' => 'boolean',
            'liabilityAmount' => 'numeric',
            'ownerId' => 'exists:users,id',
            'didAgreeAvg' => 'boolean',
            'isCollectMandate' => 'boolean',
            'collectMandateCode' => '',
            'collectMandateSignatureDate' => 'date',
            'collectMandateFirstRunDate' => 'date',
            'collectMandateCollectionSchema' => '',
        ]);

        $organisationData = $request->validate([
            'typeId' => 'exists:organisation_types,id',
            'name' => '',
            'website' => '',
            'chamberOfCommerceNumber' => '',
            'vatNumber' => '',
            'industryId' => 'exists:industries,id',
            'squareMeters' => 'integer',
        ]);

        $contactData = $this->sanitizeData($contactData, [
            'ownerId' => 'nullable',
            'newsletter' => 'boolean',
            'liable' => 'boolean',
            'isCollectMandate' => 'boolean'
        ]);
        $contact = new Contact($this->arrayKeysToSnakeCase($contactData));

        $organisationData = $this->sanitizeData($organisationData, [
            'typeId' => 'nullable',
            'industryId' => 'nullable',
            'squareMeters' => 'integer',
        ]);
        $organisation = new Organisation($this->arrayKeysToSnakeCase($organisationData));

        DB::transaction(function () use ($organisation, $contact) {
            $contact->save();
            $organisation->contact_id = $contact->id;
            $organisation->save();
        });

        // Contact exact zo teruggeven als bij het openen van een bestaand contact
        // Dus kan hier gebruik maken van bestaande controller
        return (new ContactController())->show($contact->fresh(), $request);
    }

    public function update(Request $request, Organisation $organisation)
    {
        $this->authorize('update', $organisation);

        $contactData = $request->validate([
            'newsletter' => 'boolean',
            'iban' => '',
            'ibanAttn' => '',
            'liable' => 'boolean',
            'liabilityAmount' => 'numeric',
            'didAgreeAvg' => 'boolean',
            'isCollectMandate' => 'boolean',
            'collectMandateCode' => '',
            'collectMandateSignatureDate' => 'date',
            'collectMandateFirstRunDate' => 'date',
            'collectMandateCollectionSchema' => '',
        ]);

        $organisationData = $request->validate([
            'typeId' => 'exists:organisation_types,id',
            'name' => '',
            'website' => '',
            'chamberOfCommerceNumber' => '',
            'vatNumber' => '',
            'industryId' => 'exists:industries,id',
            'squareMeters' => 'integer',
        ]);

        $contactData = $this->sanitizeData($contactData, [
            'ownerId' => 'nullable',
            'newsletter' => 'boolean',
            'liable' => 'boolean',
            'isCollectMandate' => 'boolean'
        ]);

        $contact = $organisation->contact;

        if(array_key_exists('iban', $contactData) && $contact->iban != $contactData['iban']) $this->authorize('updateIban', $contact);

        $contact->fill($this->arrayKeysToSnakeCase($contactData));

        $contact->save();

        $organisationData = $this->sanitizeData($organisationData, [
            'typeId' => 'nullable',
            'industryId' => 'nullable',
            'squareMeters' => 'integer',
        ]);
        $organisation->fill($this->arrayKeysToSnakeCase($organisationData));
        $organisation->save();

        // Contact exact zo teruggeven als bij het openen van een bestaand contact
        // Dus kan hier gebruik maken van bestaande controller
        return (new ContactController())->show($contact->fresh(), $request);
    }

    public function peek(Request $request)
    {
        $organisations = Organisation::orderBy('name', 'asc')->get();

        return OrganisationPeek::collection($organisations);
    }
}
