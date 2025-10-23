<?php

namespace App\Http\Controllers\Api\Contact;

use App\Eco\Address\Address;
use App\Eco\AddressEnergySupplier\AddressEnergySupplier;
use App\Eco\Contact\Contact;
use App\Eco\Contact\ContactToImport;
use App\Eco\Contact\ContactType;
use App\Eco\EmailAddress\EmailAddress;
use App\Eco\EnergySupplier\EnergySupplier;
use App\Eco\Organisation\Organisation;
use App\Eco\Person\Person;
use App\Eco\PhoneNumber\PhoneNumber;
use App\Eco\Title\Title;
use App\Helpers\Excel\ContactToImportExcelHelper;
use App\Http\Controllers\Controller;
use App\Http\RequestQueries\ContactToImport\Grid\RequestQuery;
use App\Http\Resources\Contact\GridContactToImport;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class ContactToImportController extends Controller
{
    public function index(Request $request, RequestQuery $requestQuery)
    {
        set_time_limit(0);

        $contactToImports = collect($requestQuery->getQueryNoPagination()->get()->load([
            'contactForImports',
            'contactForImports.contact',
            'contactForImports.contact.primaryAddress',
            'contactForImports.contact.primaryEmailAddress',
            'contactForImports.contact.primaryphoneNumber',
            'contactForImports.contact.primaryAddress.currentAddressEnergySupplierElectricity',
            'contactForImports.contact.primaryAddress.currentAddressEnergySupplierElectricity.energySupplyType',
            'contactForImports.contact.primaryAddress.currentAddressEnergySupplierGas',
            'contactForImports.contact.primaryAddress.currentAddressEnergySupplierGas.energySupplyType',
        ]));
        $allowUpdateAction = false;

        $limit = (int)$requestQuery->getRequest()->limit;
        $offset = (int)$requestQuery->getRequest()->offset;
        $selectAllNew = $requestQuery->getRequest()->selectAllNew == 'true';
        $selectAllUpdate = $requestQuery->getRequest()->selectAllUpdate == 'true';

        $filteredContactToImports = collect();

        foreach ($contactToImports as $contactToImport) {
            $contactForImportsCollection = collect($contactToImport->contactForImports); // Ensure it's a collection

            if ($contactForImportsCollection->isNotEmpty()) {
                $contactToImport->importMatchCode = 'match';
                $contactToImport->importMatchDescription = 'Match(es)';
            } else {
                $contactToImport->importMatchCode = 'no-match';
                $contactToImport->importMatchDescription = 'Geen match';
                $contactToImport->contactForImports = [];
            }

            if ($selectAllNew && $contactForImportsCollection->isEmpty()) {
                // Add to the collection only if no matches are found
                $filteredContactToImports->push($contactToImport);
            } elseif ($selectAllUpdate && $contactForImportsCollection->count() === 1) {
                // Add to the collection only if exactly one match is found
                $filteredContactToImports->push($contactToImport);
            } elseif (!$selectAllNew && !$selectAllUpdate) {
                // If neither flag is set, add all records as normal
                $filteredContactToImports->push($contactToImport);
            }
        }

        $totalImports = $filteredContactToImports->count();

        $totalImportIds = $filteredContactToImports->map(function($import) {
            return [
                'importId' => $import->id,
                'blocked' => false,
            ];
        });

        // Ensure contactForImports is treated as a collection
        $totalContactIds = collect([]);

        if($allowUpdateAction){
            $totalContactIds = $filteredContactToImports->flatMap(function($import) {
                return collect($import->contactForImports)->map(function($contact) use ($import) {
                    return [
                        'importId' => $import->id,
                        'contactId' => $contact['id'],
                        'blocked' => false,
                    ];
                });
            });
        }

        // Apply pagination (offset and limit)
        if ($offset || $limit) {
            $filteredContactToImports = $filteredContactToImports->slice($offset, $limit ? $limit : null)->values();
        }

        return GridContactToImport::collection($filteredContactToImports)
            ->additional([
                'meta' => [
                    'total' => $totalImports,
                    'totalImportIds' => $totalImportIds,
                    'allowUpdateAction' => $allowUpdateAction,
                    'totalContactIds' => $totalContactIds,
                ],
            ]);
    }
    public function peekWithStatus(Request $request)
    {
        $status = $request->input('status');
        $contactToImports = ContactToImport::whereRaw("status = $status")->count();

        return $contactToImports;
    }

    public function excelContactToImport(RequestQuery $requestQuery)
    {
        set_time_limit(0);
        $contactToImports = $requestQuery->getQueryNoPagination()->get();

        $filteredContactToImports = collect();

        foreach ($contactToImports as $contactToImport) {
            if ($contactToImport->contactForImports) {
                $contactToImport->importMatchCode = 'match';
                $contactToImport->importMatchDescription = 'Match(es)';
            } else {
                $contactToImport->importMatchCode = 'no-match';
                $contactToImport->importMatchDescription = 'Geen match';
                $contactToImport->contactForImports = [];
            }

            // If neither flag is set, add all records as normal
            $filteredContactToImports->push($contactToImport);
        }

        // Use the GridContactToImport resource for transformation
        $transformedContactToImports = GridContactToImport::collection($filteredContactToImports)->toArray(request());

        // Convert transformed data to an Eloquent Collection
        $contactToImportExcelHelper = new ContactToImportExcelHelper(collect($transformedContactToImports));

        return $contactToImportExcelHelper->downloadExcel();
    }

    public function createContactsFromImport(Request $request)
    {
        $this->authorize('import', Contact::class);

        // Retrieve the array from the request
        $selectedImportsNew = $request->input('selectedImportsNew');

        $contactToImports = ContactToImport::whereIn('id', $selectedImportsNew)->with('contact')->get();

        foreach ($contactToImports as $contactToImport) {
            $contact = $this->createContactFromImport($contactToImport);

            if($contact){
                $contactToImport->status = 'created';
                $contactToImport->contact_id = $contact->id;
                $contactToImport->save();
            }

        }

    }
    private function createContactFromImport(ContactToImport $contactToImport)
    {
        $userId = Auth::id();

        $energySupplier = EnergySupplier::where('abbreviation', $contactToImport->supplier_code_ref)->first();
        if(!$energySupplier) return false;

        $titleId = Title::where('name', $contactToImport->title)->first()?->id;

        $contactNew = Contact::create([
            'type_id' =>$contactToImport->contact_type === 'Zakelijk' ? 'organisation' : 'person',
            'status_id' => 'importEsClient',
            'created_with' => 'econobis',
            'owner_id' => $userId,
            'iban' => $contactToImport->iban ?? '',
        ]);

        if($contactToImport->contact_type === 'Zakelijk' ){
            Organisation::create([
                'contact_id' => $contactNew->id,
                'name' => $contactToImport->last_name ?? '',
                'statutory_name' => '',
                'chamber_of_commerce_number' => $contactToImport->chamber_of_commerce_number ?? '',
            ]);
        } else {
            Person::create([
                'contact_id' => $contactNew->id,
                'title_id' => $titleId ?? null,
                'initials' => $contactToImport->initials ?? '',
                'first_name' => $contactToImport->first_name ?? '',
                'last_name' => $contactToImport->last_name ?? '',
                'last_name_prefix' => $contactToImport->last_name_prefix ?? null,
                'date_of_birth' => $contactToImport->date_of_birth ?? null,
            ]);

        }

        // contact opnieuw ophalen tbv contactwijzigingen via PersonObserver
        $contact = Contact::find($contactNew->id);

        if($contactToImport->email_contact) {
            $emailaddress = EmailAddress::create([
                'contact_id' => $contact->id,
                'type_id' => 'home',
                'email' => $contactToImport->email_contact,
            ]);
        }

        if($contactToImport->email_contact_financial) {
            $emailaddressFinancial = EmailAddress::create([
                'contact_id' => $contact->id,
                'type_id' => 'invoice',
                'email' => $contactToImport->email_contact_financial,
            ]);
        }

        if($contactToImport->phone_number) {
            $phoneNumber = PhoneNumber::create([
                'contact_id' => $contact->id,
                'type_id' => 'home',
                'number' => $contactToImport->phone_number,
            ]);
        }

        $address = Address::create([
            'contact_id' => $contact->id,
            'type_id' => 'visit',
            'street' => $contactToImport->street,
            'number' => $contactToImport->housenumber,
            'addition' => $contactToImport->addition ?? '',
            'city' => $contactToImport->city,
            'postal_code' => $contactToImport->postal_code,
            'country_id' => null,
            'ean_electricity' => $contactToImport->ean,
            'ean_gas' => $contactToImport->ean_gas,
        ]);

        if($contactToImport->ean_type === 'Elektriciteit en gas'){
            if($contactToImport->member_since === $contactToImport->member_since_gas
            && $contactToImport->end_date === $contactToImport->end_date_gas) {
                AddressEnergySupplier::create([
                    'address_id' => $address->id,
                    'energy_supplier_id' => $energySupplier->id,
                    'es_number' => $contactToImport->es_number,
                    'energy_supply_type_id' => 3,
                    'member_since' => $contactToImport->member_since ?: null,
                    'endDate' => $contactToImport->end_date ?: null,
                ]);
            } else {
                AddressEnergySupplier::create([
                    'address_id' => $address->id,
                    'energy_supplier_id' => $energySupplier->id,
                    'es_number' => $contactToImport->es_number,
                    'energy_supply_type_id' => 2,
                    'member_since' => $contactToImport->member_since ?: null,
                    'endDate' => $contactToImport->end_date ?: null,
                ]);
                AddressEnergySupplier::create([
                    'address_id' => $address->id,
                    'energy_supplier_id' => $energySupplier->id,
                    'es_number' => $contactToImport->es_number,
                    'energy_supply_type_id' => 1,
                    'member_since' => $contactToImport->member_since_gas ?: null,
                    'endDate' => $contactToImport->end_date_gas ?: null,
                ]);
            }

        } elseif($contactToImport->ean_type === 'Elektriciteit'){
            AddressEnergySupplier::create([
                'address_id' => $address->id,
                'energy_supplier_id' => $energySupplier->id,
                'es_number' => $contactToImport->es_number,
                'energy_supply_type_id' => 2,
                'member_since' => $contactToImport->member_since ?: null,
                'endDate' => $contactToImport->end_date ?: null,
            ]);
        } elseif ($contactToImport->ean_type === 'Gas'){
            AddressEnergySupplier::create([
                'address_id' => $address->id,
                'energy_supplier_id' => $energySupplier->id,
                'es_number' => $contactToImport->es_number,
                'energy_supply_type_id' => 1,
                'member_since' => $contactToImport->member_since_gas ?: null,
                'endDate' => $contactToImport->end_date_gas ?: null,
            ]);
        }

        return $contact;
    }

    public function updateContactsFromImport(Request $request)
    {
        $this->authorize('import', Contact::class);

        // Retrieve the array from the request
        $selectedContactsUpdate = $request->input('selectedContactsUpdate');

        // Sort the array by importId and then by contactId
        usort($selectedContactsUpdate, function ($a, $b) {
            if ($a['importId'] == $b['importId']) {
                return $a['contactId'] <=> $b['contactId'];
            }
            return $a['importId'] <=> $b['importId'];
        });

        // Extract importIds and contactIds for batch fetching
        $importIds = array_column($selectedContactsUpdate, 'importId');
        $contactIds = array_column($selectedContactsUpdate, 'contactId');

        // Fetch all contacts and imports in a single query to reduce DB hits
        $contactsToImport = ContactToImport::whereIn('id', $importIds)->get()->keyBy('id');
        $contacts = Contact::whereIn('id', $contactIds)->get()->keyBy('id');

        // Iterate through each item in the sorted array
        foreach ($selectedContactsUpdate as $item) {
            $importId = $item['importId'];
            $contactId = $item['contactId'];

            $contactToImport = $contactsToImport->get($importId);
            $contact = $contacts->get($contactId);

            if ($contactToImport && $contact) {
                $updateOk = $this->updateContactFromImport($contactToImport, $contact);

                if($updateOk){
                    $contactToImport->status = 'updated';
                    $contactToImport->contact_id = $contact->id;
                    $contactToImport->save();
                }

            } else {
                // Optionally log or handle the error case
                Log::warning("ContactToImport or Contact not found for importId: $importId, contactId: $contactId");
            }
        }

//        return response()->json([ 'error' => 409, 'message' => 'error'], 409);

        return response()->json(['message' => 'Contacts updated successfully']);

    }
    private function updateContactFromImport(ContactToImport $contactToImport, Contact $contact)
    {
        $userId = Auth::id();

        // vooralsnog allen persons
        if($contact->type_id != ContactType::PERSON) return false;

        $contact->person->first_name = $contactToImport->first_name ?? '';
        $contact->person->last_name = $contactToImport->last_name ?? '';
        $contact->person->last_name_prefix = $contactToImport->last_name_prefix;
        $contact->person->update();

        if($contact->primaryEmailAddress){
            $contact->primaryEmailAddress->email = $contactToImport->email_contact;
            $contact->primaryEmailAddress->update();
        }

        if($contact->primaryphoneNumber){
            $contact->primaryphoneNumber->number = $contactToImport->phone_number;
            $contact->primaryphoneNumber->update();
        }

        if($contact->primaryAddress){
            $contact->primaryAddress->street = $contactToImport->street;
            $contact->primaryAddress->number = $contactToImport->housenumber;
            $contact->primaryAddress->addition = $contactToImport->addition;
            $contact->primaryAddress->city = $contactToImport->city;
            $contact->primaryAddress->ean_electricity = $contactToImport->ean;
            $contact->primaryAddress->ean_gas = $contactToImport->ean_gas;
            $contact->primaryAddress->update();
        }
//
//        $addressEnergySupplier = AddressEnergySupplier::create([
//            'address_id' => $address->id,
//            'energy_supplier_id' => $energySupplier->id,
//            'es_number' => $contactToImport->es_number,
//            'energy_supply_type_id' => $energySupplyTypeId,
//            'member_since' => $contactToImport->member_since ?: null,
//            'endDate' => $contactToImport->end_date ?: null,
//        ]);

        return true;
    }

}
