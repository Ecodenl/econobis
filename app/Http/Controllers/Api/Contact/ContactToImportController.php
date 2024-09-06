<?php

namespace App\Http\Controllers\Api\Contact;

use App\Eco\Address\Address;
use App\Eco\AddressEnergySupplier\AddressEnergySupplier;
use App\Eco\Contact\Contact;
use App\Eco\Contact\ContactToImport;
use App\Eco\Contact\ContactType;
use App\Eco\EmailAddress\EmailAddress;
use App\Eco\EnergySupplier\EnergySupplier;
use App\Eco\Person\Person;
use App\Eco\PhoneNumber\PhoneNumber;
use App\Helpers\CSV\ContactToImportCSVHelper;
use App\Http\Controllers\Controller;
use App\Http\RequestQueries\ContactToImport\Grid\RequestQuery;
use App\Http\Resources\Contact\GridContactForImport;
use App\Http\Resources\Contact\GridContactToImport;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class ContactToImportController extends Controller
{
    public function index(Request $request, RequestQuery $requestQuery)
    {
        $contactToImports = collect($requestQuery->getQueryNoPagination()->get());

        $allowUpdateAction = false;

        $limit = (int)$requestQuery->getRequest()->limit;
        $offset = (int)$requestQuery->getRequest()->offset;
        $selectAllNew = $requestQuery->getRequest()->selectAllNew == 'true';
        $selectAllUpdate = $requestQuery->getRequest()->selectAllUpdate == 'true';

        $filteredContactToImports = $this->getFilteredContactToImports($contactToImports, $selectAllNew, $selectAllUpdate);

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

    public function csvFromEnergySupplier(RequestQuery $requestQuery)
    {
        set_time_limit(0);
        $contacts = $requestQuery->getQueryNoPagination()->get();

        $contactCSVHelper = new ContactToImportCSVHelper($contacts);

        return $contactCSVHelper->downloadCSV();
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

        $contactNew = Contact::create([
            'type_id' => 'person', // todo: Later komt organistion er denk ik ook nog bij ?
            'status_id' => 'importEsClient',
            'created_with' => 'econobis',
            'owner_id' => $userId,
        ]);

        $person = Person::create([
            'contact_id' => $contactNew->id,
            'title_id' => null,
            'initials' => '',
            'first_name' => $contactToImport->first_name ?? '',
            'last_name' => $contactToImport->last_name ?? '',
            'last_name_prefix' => $contactToImport->last_name_prefix,
            'date_of_birth' => null,
        ]);

        // contact opnieuw ophalen tbv contactwijzigingen via PersonObserver
        $contact = Contact::find($contactNew->id);

        $emailaddress = EmailAddress::create([
            'contact_id' => $contact->id,
            'type_id' => 'home',
            'email' => $contactToImport->email_contact,
        ]);

        $phoneNumber = PhoneNumber::create([
            'contact_id' => $contact->id,
            'type_id' => 'home',
            'number' => $contactToImport->phone_number,
        ]);

        $eanGas = null;
        $eanElectricity = null;
        $energySupplyTypeId = 3;
        if($contactToImport->ean_type === 'Elektriciteit'){
            $energySupplyTypeId = 2;
            $eanElectricity = $contactToImport->ean;
        } elseif ($contactToImport->ean_type === 'Gas'){
            $energySupplyTypeId = 1;
            $eanGas = $contactToImport->ean;;
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
            'ean_electricity' => $eanElectricity,
            'ean_gas' => $eanGas,
        ]);

        $addressEnergySupplier = AddressEnergySupplier::create([
            'address_id' => $address->id,
            'energy_supplier_id' => $energySupplier->id,
            'es_number' => $contactToImport->es_number,
            'energy_supply_type_id' => $energySupplyTypeId,
            'member_since' => $contactToImport->member_since ?: null,
            'endDate' => $contactToImport->end_date ?: null,
        ]);

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

        $eanGas = null;
        $eanElectricity = null;
        $energySupplyTypeId = 3;
        if($contactToImport->ean_type === 'Elektriciteit'){
            $energySupplyTypeId = 2;
            $eanElectricity = $contactToImport->ean;
        } elseif ($contactToImport->ean_type === 'Gas'){
            $energySupplyTypeId = 1;
            $eanGas = $contactToImport->ean;;
        }

        if($contact->primaryAddress){
            $contact->primaryAddress->street = $contactToImport->street;
            $contact->primaryAddress->number = $contactToImport->housenumber;
            $contact->primaryAddress->addition = $contactToImport->addition;
            $contact->primaryAddress->city = $contactToImport->city;
            if($energySupplyTypeId == 2 || $energySupplyTypeId == 3){
                $contact->primaryAddress->ean_electricity = $eanElectricity;
            }
            if($energySupplyTypeId == 1 || $energySupplyTypeId == 3){
                $contact->primaryAddress->ean_gas = $eanGas;
            }
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

    /**
     * @param $contactToImports
     * @param bool $selectAllNew
     * @param bool $selectAllUpdate
     * @return \Illuminate\Support\Collection
     */
    private function getFilteredContactToImports($contactToImports, bool $selectAllNew, bool $selectAllUpdate): \Illuminate\Support\Collection
    {
        $filteredContactToImports = collect();

        foreach ($contactToImports as $contactToImport) {
//            $matchedContactIds = [];
            $matches = collect();
            $energySupplierId = EnergySupplier::where('abbreviation', $contactToImport->supplier_code_ref)->first()->id;
            if (!$energySupplierId) continue;

            $matchConditions = [
                'supplierFullMatch' => fn($query) => $query
                    ->whereHas('currentAddressEnergySuppliers', function ($query) use ($energySupplierId, $contactToImport) {
                        $query->where('energy_supplier_id', $energySupplierId);
                        $query->where(function ($query2) use ($contactToImport) {
                            $query2->where('es_number', $contactToImport->es_number)
                                ->orWhere('es_number', '')
                                ->orWhereNull('es_number');
                        });
                    })
                    ->whereHas('person', function ($query) use ($contactToImport) {
                        $query->where('first_name', $contactToImport->first_name);
                        $query->where('last_name', $contactToImport->last_name);
                        if ($contactToImport->last_name_prefix != null) {
                            $query->where('last_name_prefix', $contactToImport->last_name_prefix);
                        }
                    })
                    ->whereHas('addressesWithoutOld', function ($query) use ($contactToImport, $energySupplierId) {
                        $query->where('postal_code', str_replace(' ', '', $contactToImport->postal_code));
                        $query->where('number', $contactToImport->housenumber);
                        if ($contactToImport->addition === null) {
                            $query->where('addition', '');
                        } else {
                            $query->where('addition', $contactToImport->addition);
                        }
                    })
                    ->whereHas('emailAddresses', function ($query) use ($contactToImport) {
                        $query->where('email', $contactToImport->email_contact);
                    }),
                'supplierIgnoreEsNumber' => fn($query) => $query
                    ->whereHas('currentAddressEnergySuppliers', function ($query) use ($contactToImport) {
                        $query->where('es_number', '!=', $contactToImport->es_number);
                    })
                    ->whereHas('person', function ($query) use ($contactToImport) {
                        $query->where('first_name', $contactToImport->first_name);
                        $query->where('last_name', $contactToImport->last_name);
                        if ($contactToImport->last_name_prefix != null) {
                            $query->where('last_name_prefix', $contactToImport->last_name_prefix);
                        }
                    })
                    ->whereHas('addressesWithoutOld', function ($query) use ($contactToImport, $energySupplierId) {
                        $query->where('postal_code', str_replace(' ', '', $contactToImport->postal_code));
                        $query->where('number', $contactToImport->housenumber);
                        if ($contactToImport->addition === null) {
                            $query->where('addition', '');
                        } else {
                            $query->where('addition', $contactToImport->addition);
                        }
                    })
                    ->whereHas('emailAddresses', function ($query) use ($contactToImport) {
                        $query->where('email', $contactToImport->email_contact);
                    }),
                'supplierIgnoreAddress' => fn($query) => $query
                    ->whereHas('currentAddressEnergySuppliers', function ($query) use ($contactToImport) {
                        $query->where('es_number', $contactToImport->es_number)->orWhere('es_number', '')->orWhereNull('es_number');
                    })
                    ->whereHas('person', function ($query) use ($contactToImport) {
                        $query->where('first_name', $contactToImport->first_name);
                        $query->where('last_name', $contactToImport->last_name);
                        if ($contactToImport->last_name_prefix != null) {
                            $query->where('last_name_prefix', $contactToImport->last_name_prefix);
                        }
                    })
// todo: adres afwijkend
//                    ->whereHas('addressesWithoutOld', function ($query) use ($contactToImport, $energySupplierId) {
//                        $query->where('postal_code', str_replace(' ', '', $contactToImport->postal_code));
//                        $query->where('number', $contactToImport->housenumber);
//                        if($contactToImport->addition === null) {
//                            $query->where('addition', '');
//                        } else {
//                            $query->where('addition', $contactToImport->addition);
//                        }
//                    })
                    ->whereHas('emailAddresses', function ($query) use ($contactToImport) {
                        $query->where('email', $contactToImport->email_contact);
                    }),
                'supplierIgnoreEmail' => fn($query) => $query
                    ->whereHas('currentAddressEnergySuppliers', function ($query) use ($contactToImport) {
                        $query->where('es_number', $contactToImport->es_number)->orWhere('es_number', '')->orWhereNull('es_number');
                    })
                    ->whereHas('person', function ($query) use ($contactToImport) {
                        $query->where('first_name', $contactToImport->first_name);
                        $query->where('last_name', $contactToImport->last_name);
                        if ($contactToImport->last_name_prefix != null) {
                            $query->where('last_name_prefix', $contactToImport->last_name_prefix);
                        }
                    })
                    ->whereHas('addressesWithoutOld', function ($query) use ($contactToImport, $energySupplierId) {
                        $query->where('postal_code', str_replace(' ', '', $contactToImport->postal_code));
                        $query->where('number', $contactToImport->housenumber);
                        if ($contactToImport->addition === null) {
                            $query->where('addition', '');
                        } else {
                            $query->where('addition', $contactToImport->addition);
                        }
                    })
                    ->where(function ($query2) use ($contactToImport) {
                        $query2->whereHas('emailAddresses', function ($query) use ($contactToImport) {
                            $query->where('email', $contactToImport->email_contact);
                        })
                            ->orWhereDoesntHave('emailAddresses');
                    }),
                'supplierIgnoreName' => fn($query) => $query
                    ->whereHas('currentAddressEnergySuppliers', function ($query) use ($contactToImport) {
                        $query->where('es_number', $contactToImport->es_number)->orWhere('es_number', '')->orWhereNull('es_number');
                    })
// todo: naam afwijkend
//                    ->whereHas('person', function ($query) use ($contactToImport) {
//                        $query->where('first_name', $contactToImport->first_name);
//                        $query->where('last_name', $contactToImport->last_name);
//                        if($contactToImport->last_name_prefix != null) {
//                            $query->where('last_name_prefix', $contactToImport->last_name_prefix);
//                        }
//                    })
                    ->whereHas('addressesWithoutOld', function ($query) use ($contactToImport, $energySupplierId) {
                        $query->where('postal_code', str_replace(' ', '', $contactToImport->postal_code));
                        $query->where('number', $contactToImport->housenumber);
                        if ($contactToImport->addition === null) {
                            $query->where('addition', '');
                        } else {
                            $query->where('addition', $contactToImport->addition);
                        }
                    })
                    ->whereHas('emailAddresses', function ($query) use ($contactToImport) {
                        $query->where('email', $contactToImport->email_contact);
                    }),
                'contactMatch' => fn($query) => $query
                    ->where(function ($query2) use ($contactToImport) {
                        $query2->whereHas('currentAddressEnergySuppliers', function ($query3) use ($contactToImport) {
                            $query3->where('energy_supplier_id', '!=', $contactToImport->es_number);
                        })
                            ->orWhereDoesntHave('currentAddressEnergySuppliers');
                    })
                    ->whereHas('person', function ($query) use ($contactToImport) {
                        $query->where('first_name', $contactToImport->first_name);
                        $query->where('last_name', $contactToImport->last_name);
                        if ($contactToImport->last_name_prefix != null) {
                            $query->where('last_name_prefix', $contactToImport->last_name_prefix);
                        }
                    })
                    ->whereHas('addressesWithoutOld', function ($query) use ($contactToImport, $energySupplierId) {
                        $query->where('postal_code', str_replace(' ', '', $contactToImport->postal_code));
                        $query->where('number', $contactToImport->housenumber);
                        if ($contactToImport->addition === null) {
                            $query->where('addition', '');
                        } else {
                            $query->where('addition', $contactToImport->addition);
                        }
                    })
                    ->whereHas('emailAddresses', function ($query) use ($contactToImport) {
                        $query->where('email', $contactToImport->email_contact);
                    }),
                'contactIgnoreAddress' => fn($query) => $query
                    ->where(function ($query2) use ($contactToImport) {
                        $query2->whereHas('currentAddressEnergySuppliers', function ($query3) use ($contactToImport) {
                            $query3->where('energy_supplier_id', '!=', $contactToImport->es_number);
                        })
                            ->orWhereDoesntHave('currentAddressEnergySuppliers');
                    })
                    ->whereHas('person', function ($query) use ($contactToImport) {
                        $query->where('first_name', $contactToImport->first_name);
                        $query->where('last_name', $contactToImport->last_name);
                        if ($contactToImport->last_name_prefix != null) {
                            $query->where('last_name_prefix', $contactToImport->last_name_prefix);
                        }
                    })
// todo: adres afwijkend
//                    ->whereHas('addressesWithoutOld', function ($query) use ($contactToImport, $energySupplierId) {
//                        $query->where('postal_code', str_replace(' ', '', $contactToImport->postal_code));
//                        $query->where('number', $contactToImport->housenumber);
//                        if($contactToImport->addition === null) {
//                            $query->where('addition', '');
//                        } else {
//                            $query->where('addition', $contactToImport->addition);
//                        }
//                    })
                    ->whereHas('emailAddresses', function ($query) use ($contactToImport) {
                        $query->where('email', $contactToImport->email_contact);
                    }),
                'contactIgnoreEmail' => fn($query) => $query
                    ->where(function ($query2) use ($contactToImport) {
                        $query2->whereHas('currentAddressEnergySuppliers', function ($query3) use ($contactToImport) {
                            $query3->where('energy_supplier_id', '!=', $contactToImport->es_number);
                        })
                            ->orWhereDoesntHave('currentAddressEnergySuppliers');
                    })
                    ->whereHas('person', function ($query) use ($contactToImport) {
                        $query->where('first_name', $contactToImport->first_name);
                        $query->where('last_name', $contactToImport->last_name);
                        if ($contactToImport->last_name_prefix != null) {
                            $query->where('last_name_prefix', $contactToImport->last_name_prefix);
                        }
                    })
                    ->whereHas('addressesWithoutOld', function ($query) use ($contactToImport, $energySupplierId) {
                        $query->where('postal_code', str_replace(' ', '', $contactToImport->postal_code));
                        $query->where('number', $contactToImport->housenumber);
                        if ($contactToImport->addition === null) {
                            $query->where('addition', '');
                        } else {
                            $query->where('addition', $contactToImport->addition);
                        }
                    })
                    ->where(function ($query2) use ($contactToImport) {
                        $query2->whereHas('emailAddresses', function ($query) use ($contactToImport) {
                            $query->where('email', $contactToImport->email_contact);
                        })
                            ->orWhereDoesntHave('emailAddresses');
                    }),
                'contactIgnoreName' => fn($query) => $query
                    ->where(function ($query2) use ($contactToImport) {
                        $query2->whereHas('currentAddressEnergySuppliers', function ($query3) use ($contactToImport) {
                            $query3->where('energy_supplier_id', '!=', $contactToImport->es_number);
                        })
                            ->orWhereDoesntHave('currentAddressEnergySuppliers');
                    })
// todo: naam afwijkend
//                    ->whereHas('person', function ($query) use ($contactToImport) {
//                        $query->where('first_name', $contactToImport->first_name);
//                        $query->where('last_name', $contactToImport->last_name);
//                        if($contactToImport->last_name_prefix != null) {
//                            $query->where('last_name_prefix', $contactToImport->last_name_prefix);
//                        }
//                    })
                    ->whereHas('addressesWithoutOld', function ($query) use ($contactToImport, $energySupplierId) {
                        $query->where('postal_code', str_replace(' ', '', $contactToImport->postal_code));
                        $query->where('number', $contactToImport->housenumber);
                        if ($contactToImport->addition === null) {
                            $query->where('addition', '');
                        } else {
                            $query->where('addition', $contactToImport->addition);
                        }
                    })
                    ->whereHas('emailAddresses', function ($query) use ($contactToImport) {
                        $query->where('email', $contactToImport->email_contact);
                    }),
            ];

            $matchCases = [
                'supplierFullMatch' => ['matchDescription' => 'Klant', 'matchColor' => '#00FF00'],
                'supplierIgnoreEsNumber' => ['matchDescription' => 'Klant minus klantnummer', 'matchColor' => '#80FF00'],
                'supplierIgnoreAddress' => ['matchDescription' => 'Klant minus adres', 'matchColor' => '#00FF00'],
                'supplierIgnoreEmail' => ['matchDescription' => 'Klant minus email', 'matchColor' => '#FFFF00'],
                'supplierIgnoreName' => ['matchDescription' => 'Klant minus naam', 'matchColor' => '#FF8000'],
                'contactMatch' => ['matchDescription' => 'Contact', 'matchColor' => 'repeating-linear-gradient(45deg,#00FF00,#ECECEC 2px,#00FF00 4px)'],
                'contactIgnoreAddress' => ['matchDescription' => 'Contact minus adres', 'matchColor' => 'repeating-linear-gradient(45deg,#80FF00,#ECECEC 2px,#80FF00 4px)'],
                'contactIgnoreEmail' => ['matchDescription' => 'Contact minus e-mail', 'matchColor' => 'repeating-linear-gradient(45deg,#FFFF00,#ECECEC 2px,#FFFF00 4px)'],
                'contactIgnoreName' => ['matchDescription' => 'Contact minus naam', 'matchColor' => 'repeating-linear-gradient(45deg,#FF8000,#ECECEC 2px,#FF8000 4px)'],
            ];

            $uniqueContactIds = [];  // Array to track unique contact IDs

            foreach ($matchConditions as $matchCode => $matchCondition) {
                $query = Contact::where($matchCondition);
//                if($matchCode == 'supplierFullMatch' && $contactToImport->id == 4){
//                    Log::info('Query: ');
//                    $sql = str_replace(array('?'), array('\'%s\''), $query->toSql());
//                    $sql = vsprintf($sql, $query->getBindings());
//                    Log::info($sql);
//                    $contactForImports = $query->get();
//                    Log::info($contactForImports);
//                }

                $contactForImports = $query->get();
                $contactForImports->load([
                    'primaryAddress',
                    'primaryAddress.currentAddressEnergySupplierElectricity',
                    'primaryAddress.currentAddressEnergySupplierGas',
                    'primaryEmailAddress',
                    'primaryphoneNumber',
                ]);
                if ($contactForImports->isNotEmpty()) {
                    foreach ($contactForImports as $contactForImport) {
                        // Check if the contact ID is already in the uniqueContactIds array
                        if (!in_array($contactForImport->id, $uniqueContactIds)) {
                            // If not, add it to the array and the matches collection
                            $contactForImport->matchCode = $matchCode;
                            $contactForImport->matchDescription = $matchCases[$matchCode]['matchDescription'];
                            $contactForImport->matchColor = $matchCases[$matchCode]['matchColor'];

                            // Add the contact ID to the uniqueContactIds array
                            $uniqueContactIds[] = $contactForImport->id;

                            // Add the contact to the matches collection
                            $matches = $matches->merge(GridContactForImport::collection([$contactForImport]));
                        }
                    }
                }
            }

            if ($matches->isNotEmpty()) {
                $contactToImport->importMatchCode = 'match';
                $contactToImport->importMatchDescription = 'Match(es)';
                $contactToImport->contactForImports = $matches;
            } else {
                $contactToImport->importMatchCode = 'no-match';
                $contactToImport->importMatchDescription = 'Geen match';
                $contactToImport->contactForImports = [];
            }

            if ($selectAllNew && $matches->isEmpty()) {
                // Add to the collection only if no matches are found
                $filteredContactToImports->push($contactToImport);
            } elseif ($selectAllUpdate && $matches->count() === 1) {
                // Add to the collection only if exactly one match is found
                $filteredContactToImports->push($contactToImport);
            } elseif (!$selectAllNew && !$selectAllUpdate) {
                // If neither flag is set, add all records as normal
                $filteredContactToImports->push($contactToImport);
            }
        }
        return $filteredContactToImports;
    }

}
