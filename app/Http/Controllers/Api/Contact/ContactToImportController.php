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

class ContactToImportController extends Controller
{
    public function index(Request $request, RequestQuery $requestQuery)
    {
        $contactToImports = $requestQuery->get();

        foreach($contactToImports as $contactToImport) {
            $matchKlant = collect();
            $matchKlantMinusKlantnummer = collect();
            $matchKlantMinusAddress = collect();
            $matchKlantMinusEmail = collect();
            $matchContact = collect();
            $matchContactMinusEmail = collect();
            $matchContactMinusAddress = collect();
            $matchContactMinusLastName = collect();

            $matchedContactIds = [];

            //get the ID for the energysupplier for this $contactToImport
            $energySupplier = EnergySupplier::where('abbreviation', $contactToImport->supplier_code_ref)->first();
            $energySupplierId = $energySupplier->id;

            /* The matches must be from important to less important because we also save the id's of contacts that already have a match */

            /* Match klant */
            if (count($contactForImports =
                    Contact::
                        whereNotIn('id', $matchedContactIds)
                        ->whereHas('person', function ($query) use ($contactToImport) {
                            $query->where('first_name', $contactToImport->first_name);
                            $query->where('last_name', $contactToImport->last_name);
                            if($contactToImport->last_name_prefix != null) {
                                $query->where('last_name_prefix', $contactToImport->last_name_prefix);
                            }
                        })
                        ->whereHas('addressesWithoutOld', function ($query) use ($contactToImport, $energySupplierId) {
                            $query->where('postal_code', str_replace(' ', '', $contactToImport->postal_code));
                            $query->where('number', $contactToImport->housenumber);
                            if($contactToImport->addition === null) {
                                $query->where('addition', '');
                            } else {
                                $query->where('addition', $contactToImport->addition);
                            }
                            $query->whereHas('currentAddressEnergySupplierElectricityAndGas', function ($query2) use ($contactToImport, $energySupplierId) {
                                $query2->where('energy_supplier_id', $energySupplierId);
                                $query2->where('es_number', $contactToImport->es_number)->orWhere('es_number', '');
                            });
                        })
                        ->whereHas('emailAddresses', function ($query) use ($contactToImport) {
                            $query->where('email', $contactToImport->email_contact);
                        })
                        ->get()) > 0) {

                foreach($contactForImports as $contactForImport) {
                    $contactForImport->street = $contactToImport->street;
                    $contactForImport->housenumber = $contactToImport->housenumber;
                    $contactForImport->addition = $contactToImport->addition;
                    $contactForImport->postal_code = $contactToImport->postal_code;
                    $contactForImport->primaryEmailAddress->email = $contactToImport->email_contact;
                    $contactForImport->match = 'Match klant';

                    array_push($matchedContactIds, $contactForImport->id);
                }

                $matchKlant = GridContactForImport::collection($contactForImports);
            }
            /* End match klant */

            /* Match klant minus klantnummer */
            if (count($contactForImports =
                    Contact::
                        whereNotIn('id', $matchedContactIds)
                        ->whereHas('person', function ($query) use ($contactToImport) {
                            $query->where('first_name', $contactToImport->first_name);
                            $query->where('last_name', $contactToImport->last_name);
                            if($contactToImport->last_name_prefix != null) {
                                $query->where('last_name_prefix', $contactToImport->last_name_prefix);
                            }
                        })
                        ->whereHas('addressesWithoutOld', function ($query) use ($contactToImport, $energySupplierId) {
                            $query->where('postal_code', str_replace(' ', '', $contactToImport->postal_code));
                            $query->where('number', $contactToImport->housenumber);
                            if($contactToImport->addition === null) {
                                $query->where('addition', '');
                            } else {
                                $query->where('addition', $contactToImport->addition);
                            }
                            $query->whereHas('currentAddressEnergySupplierElectricityAndGas', function ($query2) use ($contactToImport, $energySupplierId) {
                                $query2->where('energy_supplier_id', $energySupplierId);
                                $query2->where('es_number', '!=', $contactToImport->es_number)->where('es_number', '!=', '');
                            });
                        })
                        ->whereHas('emailAddresses', function ($query) use ($contactToImport) {
                            $query->where('email', $contactToImport->email_contact);
                        })
                        ->get()) > 0) {

                foreach($contactForImports as $contactForImport) {
                    $contactForImport->street = $contactToImport->street;
                    $contactForImport->housenumber = $contactToImport->housenumber;
                    $contactForImport->addition = $contactToImport->addition;
                    $contactForImport->postal_code = $contactToImport->postal_code;
                    $contactForImport->primaryEmailAddress->email = $contactToImport->email_contact;
                    $contactForImport->match = 'Match klant minus klantnummer';

                    array_push($matchedContactIds, $contactForImport->id);
                }

                $matchKlantMinusKlantnummer = GridContactForImport::collection($contactForImports);
            }
            /* End match klant minus klantnummer */

            /* Match klant minus adres */
            if (count($contactForImports =
                    Contact::
                        whereNotIn('id', $matchedContactIds)
                        ->whereHas('person', function ($query) use ($contactToImport) {
                            $query->where('first_name', $contactToImport->first_name);
                            $query->where('last_name', $contactToImport->last_name);
                            if($contactToImport->last_name_prefix != null) {
                                $query->where('last_name_prefix', $contactToImport->last_name_prefix);
                            }
                        })
                        ->whereHas('addressesWithoutOld', function ($query) use ($contactToImport, $energySupplierId) {
                            $query->whereHas('currentAddressEnergySupplierElectricityAndGas', function ($query2) use ($contactToImport, $energySupplierId) {
                                $query2->where('energy_supplier_id', $energySupplierId);
                                $query2->where('es_number', $contactToImport->es_number)->orWhere('es_number', null);
                            });
                        })
                        ->whereHas('emailAddresses', function ($query) use ($contactToImport) {
                            $query->where('email', $contactToImport->email_contact);
                        })
                        ->get()) > 0) {

                foreach($contactForImports as $contactForImport) {
                    $contactForImport->primaryEmailAddress->email = $contactToImport->email_contact;
                    $contactForImport->match = 'Match klant minus adres';

                    array_push($matchedContactIds, $contactForImport->id);
                }

                $matchKlantMinusAddress = GridContactForImport::collection($contactForImports);
            }
            /* End match klant minus adres */

            /* Match klant minus email */
            if (count($contactForImports =
                    Contact::
                    whereNotIn('id', $matchedContactIds)
                        ->whereHas('person', function ($query) use ($contactToImport) {
                            $query->where('first_name', $contactToImport->first_name);
                            $query->where('last_name', $contactToImport->last_name);
                            if($contactToImport->last_name_prefix != null) {
                                $query->where('last_name_prefix', $contactToImport->last_name_prefix);
                            }
                        })
                        ->whereHas('addressesWithoutOld', function ($query) use ($contactToImport, $energySupplierId) {
                            $query->where('postal_code', str_replace(' ', '', $contactToImport->postal_code));
                            $query->where('number', $contactToImport->housenumber);
                            if($contactToImport->addition === null) {
                                $query->where('addition', '');
                            } else {
                                $query->where('addition', $contactToImport->addition);
                            }
                            $query->whereHas('currentAddressEnergySupplierElectricityAndGas', function ($query2) use ($contactToImport, $energySupplierId) {
                                $query2->where('energy_supplier_id', $energySupplierId);
                                $query2->where('es_number', $contactToImport->es_number)->orWhere('es_number', null);
                            });
                        })
                        ->get()) > 0) {

                foreach($contactForImports as $contactForImport) {
                    $contactForImport->street = $contactToImport->street;
                    $contactForImport->housenumber = $contactToImport->housenumber;
                    $contactForImport->addition = $contactToImport->addition;
                    $contactForImport->postal_code = $contactToImport->postal_code;
                    $contactForImport->match = 'Match klant minus e-mail';

                    array_push($matchedContactIds, $contactForImport->id);
                }

                $matchKlant = GridContactForImport::collection($contactForImports);
            }
            /* End match klant minus email */

            /* Match klant minus last_name */
            if (count($contactForImports =
                    Contact::
                    whereNotIn('id', $matchedContactIds)
                        ->whereHas('person', function ($query) use ($contactToImport) {
                            $query->where('first_name', $contactToImport->first_name);
                            $query->where('last_name', '!=', $contactToImport->last_name);
                        })
                        ->whereHas('addressesWithoutOld', function ($query) use ($contactToImport, $energySupplierId) {
                            $query->where('postal_code', str_replace(' ', '', $contactToImport->postal_code));
                            $query->where('number', $contactToImport->housenumber);
                            if($contactToImport->addition === null) {
                                $query->where('addition', '');
                            } else {
                                $query->where('addition', $contactToImport->addition);
                            }
                            $query->whereHas('currentAddressEnergySupplierElectricityAndGas', function ($query2) use ($contactToImport, $energySupplierId) {
                                $query2->where('energy_supplier_id', $energySupplierId);
                                $query2->where('es_number', $contactToImport->es_number)->orWhere('es_number', null);
                            });
                        })
                        ->whereHas('emailAddresses', function ($query) use ($contactToImport) {
                            $query->where('email', $contactToImport->email_contact);
                        })
                        ->get()) > 0) {

                foreach($contactForImports as $contactForImport) {
                    $contactForImport->street = $contactToImport->street;
                    $contactForImport->housenumber = $contactToImport->housenumber;
                    $contactForImport->addition = $contactToImport->addition;
                    $contactForImport->postal_code = $contactToImport->postal_code;
                    $contactForImport->primaryEmailAddress->email = $contactToImport->email_contact;
                    $contactForImport->match = 'Match klant minus achternaam';

                    array_push($matchedContactIds, $contactForImport->id);
                }

                $matchKlant = GridContactForImport::collection($contactForImports);
            }
            /* End match klant minus last_name */

            /* Match contact */
            if (count($contactForImports =
                    Contact::
                    whereNotIn('id', $matchedContactIds)
                        ->whereHas('person', function ($query) use ($contactToImport) {
                            $query->where('first_name', $contactToImport->first_name);
                            $query->where('last_name', $contactToImport->last_name);
                            if($contactToImport->last_name_prefix != null) {
                                $query->where('last_name_prefix', $contactToImport->last_name_prefix);
                            }
                        })
                        ->whereHas('addressesWithoutOld', function ($query) use ($contactToImport, $energySupplierId) {
                            $query->where('postal_code', str_replace(' ', '', $contactToImport->postal_code));
                            $query->where('number', $contactToImport->housenumber);
                            if($contactToImport->addition === null) {
                                $query->where('addition', '');
                            } else {
                                $query->where('addition', $contactToImport->addition);
                            }
                            $query->whereHas('currentAddressEnergySupplierElectricityAndGas', function ($query2) use ($energySupplierId) {
                                $query2->where('energy_supplier_id', '!=', $energySupplierId);
                            });
                        })
                        ->whereHas('emailAddresses', function ($query) use ($contactToImport) {
                            $query->where('email', $contactToImport->email_contact);
                        })
                        ->get()) > 0) {

                foreach($contactForImports as $contactForImport) {
                    $contactForImport->street = $contactToImport->street;
                    $contactForImport->housenumber = $contactToImport->housenumber;
                    $contactForImport->addition = $contactToImport->addition;
                    $contactForImport->postal_code = $contactToImport->postal_code;
                    $contactForImport->primaryEmailAddress->email = $contactToImport->email_contact;
                    $contactForImport->match = 'Match contact';

                    array_push($matchedContactIds, $contactForImport->id);
                }

                $matchContact = GridContactForImport::collection($contactForImports);
            }
            /* End match contact */

            /* Match contact minus adres */
            if (count($contactForImports =
                    Contact::
                    whereNotIn('id', $matchedContactIds)
                        ->whereHas('person', function ($query) use ($contactToImport) {
                            $query->where('first_name', $contactToImport->first_name);
                            $query->where('last_name', $contactToImport->last_name);
                            if($contactToImport->last_name_prefix != null) {
                                $query->where('last_name_prefix', $contactToImport->last_name_prefix);
                            }
                        })
                        ->whereHas('addressesWithoutOld', function ($query) use ($contactToImport, $energySupplierId) {
                            $query->whereHas('currentAddressEnergySupplierElectricityAndGas', function ($query2) use ($energySupplierId) {
                                $query2->where('energy_supplier_id', '!=', $energySupplierId);
                            });
                        })
                        ->whereHas('emailAddresses', function ($query) use ($contactToImport) {
                            $query->where('email', $contactToImport->email_contact);
                        })
                        ->get()) > 0) {

                foreach($contactForImports as $contactForImport) {
                    $contactForImport->primaryEmailAddress->email = $contactToImport->email_contact;
                    $contactForImport->match = 'Match contact minus adres';

                    array_push($matchedContactIds, $contactForImport->id);
                }

                $matchContactMinusAddress = GridContactForImport::collection($contactForImports);
            }
            /* End match contact minus adres */

            /* Match contact minus email */
            if (count($contactForImports =
                    Contact::
                    whereNotIn('id', $matchedContactIds)
                        ->whereHas('person', function ($query) use ($contactToImport) {
                            $query->where('first_name', $contactToImport->first_name);
                            $query->where('last_name', $contactToImport->last_name);
                            if($contactToImport->last_name_prefix != null) {
                                $query->where('last_name_prefix', $contactToImport->last_name_prefix);
                            }
                        })
                        ->whereHas('addressesWithoutOld', function ($query) use ($contactToImport, $energySupplierId) {
                            $query->where('postal_code', str_replace(' ', '', $contactToImport->postal_code));
                            $query->where('number', $contactToImport->housenumber);
                            if($contactToImport->addition === null) {
                                $query->where('addition', '');
                            } else {
                                $query->where('addition', $contactToImport->addition);
                            }
                            $query->whereHas('currentAddressEnergySupplierElectricityAndGas', function ($query2) use ($energySupplierId) {
                                $query2->where('energy_supplier_id', '!=', $energySupplierId);
                            });
                        })
                        ->get()) > 0) {

                foreach($contactForImports as $contactForImport) {
                    $contactForImport->street = $contactToImport->street;
                    $contactForImport->housenumber = $contactToImport->housenumber;
                    $contactForImport->addition = $contactToImport->addition;
                    $contactForImport->postal_code = $contactToImport->postal_code;
                    $contactForImport->match = 'Match contact minus e-mail';

                    array_push($matchedContactIds, $contactForImport->id);
                }

                $matchContactMinusEmail = GridContactForImport::collection($contactForImports);
            }
            /* End match contact minus email */

            /* Match contact minus last_name */
            if (count($contactForImports =
                    Contact::
                    whereNotIn('id', $matchedContactIds)
                        ->whereHas('person', function ($query) use ($contactToImport) {
                            $query->where('first_name', $contactToImport->first_name);
                            $query->where('last_name', '!=', $contactToImport->last_name);
                        })
                        ->whereHas('addressesWithoutOld', function ($query) use ($contactToImport, $energySupplierId) {
                            $query->where('postal_code', str_replace(' ', '', $contactToImport->postal_code));
                            $query->where('number', $contactToImport->housenumber);
                            if($contactToImport->addition === null) {
                                $query->where('addition', '');
                            } else {
                                $query->where('addition', $contactToImport->addition);
                            }
                            $query->whereHas('currentAddressEnergySupplierElectricityAndGas', function ($query2) use ($energySupplierId) {
                                $query2->where('energy_supplier_id', '!=', $energySupplierId);
                            });
                        })
                        ->whereHas('emailAddresses', function ($query) use ($contactToImport) {
                            $query->where('email', $contactToImport->email_contact);
                        })
                        ->get()) > 0) {

                foreach($contactForImports as $contactForImport) {
                    $contactForImport->street = $contactToImport->street;
                    $contactForImport->housenumber = $contactToImport->housenumber;
                    $contactForImport->addition = $contactToImport->addition;
                    $contactForImport->postal_code = $contactToImport->postal_code;
                    $contactForImport->primaryEmailAddress->email = $contactToImport->email_contact;
                    $contactForImport->match = 'Match contact minus achternaam';

                    array_push($matchedContactIds, $contactForImport->id);
                }

                $matchContactMinusLastName = GridContactForImport::collection($contactForImports);
            }
            /* End match contact minus last_name */

            /* Combine alle collections */
            $contactForImports = $matchKlant->concat($matchKlantMinusKlantnummer)->concat($matchKlantMinusAddress)->concat($matchKlantMinusEmail)->concat($matchContact)->concat($matchContactMinusEmail)->concat($matchContactMinusAddress)->concat($matchContactMinusLastName);

            /* add the contacts sollection to the contactToImport collections, if empty then set the match code */
            if(count($contactForImports) > 0) {
                $contactToImport->match = "";
                $contactToImport->contactForImports = $contactForImports;
            } else {
                $contactToImport->match = "Geen match";
                $contactToImport->contactForImports = [];
            }
        }

        return GridContactToImport::collection($contactToImports)
            ->additional(
                ['meta' => [
                    'total' => $requestQuery->total(),
                ]
            ]);
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

        $return['person']['owner_id'] = 1;
        $return['person']['did_agree_avg'] = 0;
        $return['person']['inspection_person_type_id'] = null;
        $return['person']['hoom_account_id'] = null;

        $return['person']['initials'] = '';
        $return['person']['first_name'] = $contactToImport->first_name;
        $return['person']['last_name'] =  $contactToImport->last_name;
        $return['person']['last_name_prefix'] = $lastNamePrefixId;
        $return['person']['title_id'] = 3;
        $return['person']['date_of_birth'] = null;

        $return['emailAddress'] = [];
        $return['emailAddress']['primary'] = true;
        $return['emailAddress']['email'] = $contactToImport->email_contact;

        $return['address'] = [];
        $return['address']['primary'] = true;
        $return['address']['street'] = $contactToImport->street;
        $return['address']['number'] = $contactToImport->housenumber;
        $return['address']['addition'] = $contactToImport->addition ?? '';
        $return['address']['city'] = $contactToImport->city;
        $return['address']['postalCode'] = $contactToImport->postal_code;
        $return['address']['ean_electricity'] = $contactToImport->ean; //todo Patrick alleen ean_electricity?
        $return['address']['typeId'] = 'visit'; //todo Patrick welke type moet hier?

        $return['addressEnergySupplier'] = [];
        $return['addressEnergySupplier']['energySupplyTypeId'] = 2; //todo Patrick welke moet hier?
        $return['addressEnergySupplier']['typeId'] = 'visit'; //todo Patrick welke type moet hier?
        $return['addressEnergySupplier']['energy_supplier_id'] = $energySupplier->id;
        $return['addressEnergySupplier']['isCurrentSupplier'] = 1;
        $return['addressEnergySupplier']['memberSince'] = $contactToImport->member_since->format('Y-m-d');
        $return['addressEnergySupplier']['esNumber'] = $contactToImport->es_number;
        if ($contactToImport->end_date != null) { $return['addressEnergySupplier']['endDate'] = $contactToImport->end_date->format('Y-m-d'); }

        $return['phoneNumber'] = [];
        $return['phoneNumber']['primary'] = true;
        $return['phoneNumber']['number'] = $contactToImport->phone_number;

        return $return;
    }

    public function setContactToImportStatus(contactToImport $contactToImport, $status)
    {
        $contactToImport->status = $status;
        $contactToImport->save();
    }

}
