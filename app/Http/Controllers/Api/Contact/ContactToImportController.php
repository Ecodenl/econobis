<?php

namespace App\Http\Controllers\Api\Contact;

use App\Eco\Contact\Contact;
use App\Eco\EnergySupplier\EnergySupplier;
use App\Helpers\CSV\ContactToImportCSVHelper;
use App\Http\Controllers\Controller;
use App\Http\RequestQueries\ContactToImport\Grid\RequestQuery;
use App\Http\Resources\Contact\GridContactForImport;
use App\Http\Resources\Contact\GridContactToImport;
use Illuminate\Http\Request;

/* The matches must be from important to less important because we also save the id's of contacts that already have a match */

class ContactToImportController extends Controller
{
    public function index(Request $request, RequestQuery $requestQuery)
    {
        $contactsToImport = $requestQuery->get();

        foreach($contactsToImport as $contactToImport) {
            $matchKlant = collect();
            $matchKlantMinusKlantnummer = collect();
            $matchKlantMinusAddress = collect();
            $matchKlantMinusEmail = collect();
            $matchContact = collect();
            $matchContactMinusEmail = collect();
            $matchContactMinusAddress = collect();

            $matchedContactIds = [];

            //get the ID for the energysupplier for this $contactToImport
            $energySupplier = EnergySupplier::where('abbreviation', $contactToImport->supplier_code_ref)->first();
            $energySupplierId = $energySupplier->id;

            /* Match klant */
            if (count($contactForImports =
                    Contact::
                        whereNotIn('id', $matchedContactIds)
//                        ->where('full_name', $contactToImport->last_name . ', ' . $contactToImport->first_name)
                        ->whereHas('person', function ($query) use ($contactToImport) {
                            $query->where('first_name', $contactToImport->first_name);
                            $query->where('last_name', $contactToImport->last_name);
                            if($contactToImport->last_name_prefix === null) {
                                $query->where('last_name_prefix', '');
                            } else {
                                $query->where('last_name_prefix', $contactToImport->last_name_prefix);
                            }
                        })
                        ->whereHas('emailAddresses', function ($query) use ($contactToImport) {
                            $query->where('email', $contactToImport->email_contact);
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
                                $query2->where('es_number', $contactToImport->es_number);
                            });
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
//                        ->where('full_name', $contactToImport->last_name . ', ' . $contactToImport->first_name)
                        ->whereHas('person', function ($query) use ($contactToImport) {
                            $query->where('first_name', $contactToImport->first_name);
                            $query->where('last_name', $contactToImport->last_name);
                            if($contactToImport->last_name_prefix === null) {
                                $query->where('last_name_prefix', '');
                            } else {
                                $query->where('last_name_prefix', $contactToImport->last_name_prefix);
                            }
                        })
                        ->whereHas('emailAddresses', function ($query) use ($contactToImport) {
                            $query->where('email', $contactToImport->email_contact);
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
                                $query2->where('es_number', '!=', $contactToImport->es_number);
                            });
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
//                        ->where('full_name', $contactToImport->last_name . ', ' . $contactToImport->first_name)
                        ->whereHas('person', function ($query) use ($contactToImport) {
                            $query->where('first_name', $contactToImport->first_name);
                            $query->where('last_name', $contactToImport->last_name);
                            if($contactToImport->last_name_prefix === null) {
                                $query->where('last_name_prefix', '');
                            } else {
                                $query->where('last_name_prefix', $contactToImport->last_name_prefix);
                            }
                        })
                        ->whereHas('emailAddresses', function ($query) use ($contactToImport) {
                            $query->where('email', $contactToImport->email_contact);
                        })
                        ->whereHas('addressesWithoutOld', function ($query) use ($contactToImport, $energySupplierId) {
                            $query->whereHas('currentAddressEnergySupplierElectricityAndGas', function ($query2) use ($contactToImport, $energySupplierId) {
                                $query2->where('energy_supplier_id', $energySupplierId);
                                $query2->where('es_number', $contactToImport->es_number);
                            });
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

                $matchKlantMinusAddress = GridContactForImport::collection($contactForImports);
            }
            /* End match klant minus adres */

            /* Match klant minus email */
            /* Match klant */
            if (count($contactForImports =
                    Contact::
                    whereNotIn('id', $matchedContactIds)
//                        ->where('full_name', $contactToImport->last_name . ', ' . $contactToImport->first_name)
                        ->whereHas('person', function ($query) use ($contactToImport) {
                            $query->where('first_name', $contactToImport->first_name);
                            $query->where('last_name', $contactToImport->last_name);
                            if($contactToImport->last_name_prefix === null) {
                                $query->where('last_name_prefix', '');
                            } else {
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
                                $query2->where('es_number', $contactToImport->es_number);
                            });
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
            /* End match klant minus email */

            /* Match contact */
            if (count($contactForImports =
                    Contact::
                        whereNotIn('id', $matchedContactIds)
//                        ->where('full_name', $contactToImport->last_name . ', ' . $contactToImport->first_name)
                        ->whereHas('person', function ($query) use ($contactToImport) {
                            $query->where('first_name', $contactToImport->first_name);
                            $query->where('last_name', $contactToImport->last_name);
                            if($contactToImport->last_name_prefix === null) {
                                $query->where('last_name_prefix', '');
                            } else {
                                $query->where('last_name_prefix', $contactToImport->last_name_prefix);
                            }
                        })
                        ->whereHas('emailAddresses', function ($query) use ($contactToImport) {
                            $query->where('email', $contactToImport->email_contact);
                        })
                        ->whereHas('addressesWithoutOld', function ($query) use ($contactToImport) {
                            $query->where('postal_code', str_replace(' ', '', $contactToImport->postal_code));
                            $query->where('number', $contactToImport->housenumber);
                            if($contactToImport->addition === null) {
                                $query->where('addition', '');
                            } else {
                                $query->where('addition', $contactToImport->addition);
                            }
                            $query->whereDoesntHave('currentAddressEnergySupplierElectricityAndGas', function ($query2) use ($contactToImport) {
                                $query2->where('es_number', $contactToImport->es_number);
                            });
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

            /* Match contact minus e-mail */
            if (count($contactForImports =
                Contact::
                    whereNotIn('id', $matchedContactIds)
//                    ->where('full_name', $contactToImport->last_name . ', ' . $contactToImport->first_name)
                    ->whereHas('person', function ($query) use ($contactToImport) {
                        $query->where('first_name', $contactToImport->first_name);
                        $query->where('last_name', $contactToImport->last_name);
                        if($contactToImport->last_name_prefix === null) {
                            $query->where('last_name_prefix', '');
                        } else {
                            $query->where('last_name_prefix', $contactToImport->last_name_prefix);
                        }
                    })
                    ->whereHas('addressesWithoutOld', function ($query) use ($contactToImport) {
                        $query->where('postal_code', str_replace(' ', '', $contactToImport->postal_code));
                        $query->where('number', $contactToImport->housenumber);
                        if($contactToImport->addition === null) {
                            $query->where('addition', '');
                        } else {
                            $query->where('addition', $contactToImport->addition);
                        }
                    })
                    ->wheredoesntHave('emailAddresses', function ($query) use ($contactToImport) {
                        $query->where('email', $contactToImport->email_contact);
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
            /* End match contact minus e-mail */

            /* Match contact minus adres */
            if (count($contactForImports =
                Contact::
                    whereNotIn('id', $matchedContactIds)
//                    ->where('full_name', $contactToImport->last_name . ', ' . $contactToImport->first_name)
                    ->whereHas('person', function ($query) use ($contactToImport) {
                        $query->where('first_name', $contactToImport->first_name);
                        $query->where('last_name', $contactToImport->last_name);
                        if($contactToImport->last_name_prefix === null) {
                            $query->where('last_name_prefix', '');
                        } else {
                            $query->where('last_name_prefix', $contactToImport->last_name_prefix);
                        }
                    })
                    ->whereHas('emailAddresses', function ($query) use ($contactToImport) {
                        $query->where('email', $contactToImport->email_contact);
                    })
                    ->whereDoesntHave('addressesWithoutOld', function ($query) use ($contactToImport) {
                        $query->where('postal_code', str_replace(' ', '', $contactToImport->postal_code));
                        $query->where('number', $contactToImport->housenumber);
                        if($contactToImport->addition === null) {
                            $query->where('addition', '');
                        } else {
                            $query->where('addition', $contactToImport->addition);
                        }
                    })
                    ->get()) > 0) {

                foreach($contactForImports as $contactForImport) {
                    $contactForImport->match = 'Match contact minus address';

                    array_push($matchedContactIds, $contactForImport->id);
                }

                $matchContactMinusAddress = GridContactForImport::collection($contactForImports);
            }
            /* End match contact minus adres */

            /* Combine alle collections */
            $contactForImports = $matchKlant->concat($matchKlantMinusKlantnummer)->concat($matchKlantMinusAddress)->concat($matchKlantMinusEmail)->concat($matchContact)->concat($matchContactMinusEmail)->concat($matchContactMinusAddress);

            /* add the contacts sollection to the contactToImport collections, if empty then set the match code */
            if(count($contactForImports) > 0) {
                $contactToImport->match = "";
                $contactToImport->contactForImports = $contactForImports;
            } else {
                $contactToImport->match = "Geen match";
                $contactToImport->contactForImports = [];
            }
        }

        return GridContactToImport::collection($contactsToImport)
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
}
