<?php

namespace App\Http\Controllers\Api\Contact;

use App\Eco\Contact\Contact;
use App\Eco\Contact\ContactToImport;
use App\Eco\EnergySupplier\EnergySupplier;
use App\Eco\LastNamePrefix\LastNamePrefix;
use App\Helpers\CSV\ContactToImportCSVHelper;
use App\Http\Controllers\Controller;
use App\Http\RequestQueries\ContactToImport\Grid\RequestQuery;
use App\Http\Resources\Contact\GridContactForImport;
use App\Http\Resources\Contact\GridContactToImport;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class ContactToImportController extends Controller
{
    public function index(Request $request, RequestQuery $requestQuery)
    {
        $contactToImports = $requestQuery->getQueryNoPagination()->get();

        $limit =  (int)$requestQuery->getRequest()->limit;
        $offset = (int)$requestQuery->getRequest()->offset;
        $selectAllNew = $requestQuery->getRequest()->selectAllNew == 'true';
        $selectAllUpdate = $requestQuery->getRequest()->selectAllUpdate == 'true';

        $filteredContactToImports = $this->getFilteredContactToImports($contactToImports, $selectAllNew, $selectAllUpdate);

        $totalImports = $filteredContactToImports->count();
        $totalImportIds = $filteredContactToImports->pluck('id');
        // Pluck all IDs of related contactForImports and flatten them into a single array
        $totalContactIds = $filteredContactToImports->pluck('contactForImports.*.id')->flatten();

        // Apply pagination (offset and limit)
        if ($offset || $limit) {
            $filteredContactToImports = $filteredContactToImports->slice($offset, $limit ? $limit : null)->values();
        }

        return GridContactToImport::collection($filteredContactToImports)
            ->additional([
                'meta' => [
                    'total' => $totalImports,
                    'totalImportIds' => $totalImportIds,
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

    public function createNewContactFromContactToImport(Request $request)
    {
        $contactToImport = contactToImport::find($request->contactToImport);

        $energySupplier = EnergySupplier::where('abbreviation', $contactToImport->supplier_code_ref)->first();

        if($contactToImport->last_name_prefix) {
            $lastNamePrefix = LastNamePrefix::where('name', $contactToImport->last_name_prefix)->first();
            $lastNamePrefixId = $lastNamePrefix ?  $lastNamePrefix->id : null;
        } else {
            $lastNamePrefixId = null;
        }

        $return = [];

        $return['person']['contactToImport'] = $contactToImport->id;

        $return['person']['ownerId'] = 1;
        $return['person']['didAgreeAvg'] = 0;
        $return['person']['inspectionPersonTypeId'] = '';
        $return['person']['hoomAccountId'] = null;

        $return['person']['initials'] = '';
        $return['person']['firstName'] = $contactToImport->first_name;
        $return['person']['lastName'] =  $contactToImport->last_name;
        $return['person']['lastNamePrefix'] = $lastNamePrefixId;
        $return['person']['titleId'] = 3;
        $return['person']['dateOfBirth'] = null;

        $return['emailAddress'] = [];
        $return['emailAddress']['primary'] = true;
        $return['emailAddress']['typeId'] = 'home';
        $return['emailAddress']['email'] = $contactToImport->email_contact;

        $return['address'] = [];
        $return['address']['primary'] = true;
        $return['address']['street'] = $contactToImport->street;
        $return['address']['number'] = $contactToImport->housenumber;
        $return['address']['addition'] = $contactToImport->addition ?? '';
        $return['address']['city'] = $contactToImport->city;
        $return['address']['postalCode'] = $contactToImport->postal_code;
        $return['address']['eanElectricity'] = $contactToImport->ean; //todo Patrick alleen ean_electricity?
        $return['address']['typeId'] = 'visit';

        $return['addressEnergySupplier'] = [];
        $return['addressEnergySupplier']['energySupplyTypeId'] = 2; //todo Patrick welke moet hier?
        $return['addressEnergySupplier']['energySupplierId'] = $energySupplier->id;
        $return['addressEnergySupplier']['isCurrentSupplier'] = 1;
        $return['addressEnergySupplier']['memberSince'] = $contactToImport->member_since->format('Y-m-d');
        $return['addressEnergySupplier']['esNumber'] = $contactToImport->es_number;
        if ($contactToImport->end_date != null) { $return['addressEnergySupplier']['endDate'] = $contactToImport->end_date->format('Y-m-d'); }

        $return['phoneNumber'] = [];
        $return['phoneNumber']['primary'] = true;
        $return['phoneNumber']['typeId'] = 'home';
        $return['phoneNumber']['number'] = $contactToImport->phone_number;

        return $return;
    }

    public function setContactToImportStatus(contactToImport $contactToImport, $status, $contactForImport)
    {
        $contactToImport->status = $status;
        $contactToImport->contact_id = $contactForImport;
        $contactToImport->save();
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
            $matchedContactIds = [];
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
                'supplierIgnoreLastName' => fn($query) => $query
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
                'contactIgnoreLastName' => fn($query) => $query
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
                'supplierIgnoreLastName' => ['matchDescription' => 'Klant minus achternaam', 'matchColor' => '#FF8000'],
                'contactMatch' => ['matchDescription' => 'Contact', 'matchColor' => 'repeating-linear-gradient(45deg,#00FF00,#ECECEC 2px,#00FF00 4px)'],
                'contactIgnoreAddress' => ['matchDescription' => 'Contact minus adres', 'matchColor' => 'repeating-linear-gradient(45deg,#80FF00,#ECECEC 2px,#80FF00 4px)'],
                'contactIgnoreEmail' => ['matchDescription' => 'Contact minus e-mail', 'matchColor' => 'repeating-linear-gradient(45deg,#FFFF00,#ECECEC 2px,#FFFF00 4px)'],
                'contactIgnoreLastName' => ['matchDescription' => 'Contact minus achternaam', 'matchColor' => 'repeating-linear-gradient(45deg,#FF8000,#ECECEC 2px,#FF8000 4px)'],
            ];

            $uniqueContactIds = [];  // Array to track unique contact IDs

            foreach ($matchConditions as $matchCode => $matchCondition) {
                $query = Contact::where($matchCondition);
                // Log::info('Query: ');
                // Log::info($query->toSql());

                $contactForImports = $query->get();

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
                $contactToImport->contactForImports = $matches;
            } else {
                $contactToImport->importMatchCode = 'no-match';
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
