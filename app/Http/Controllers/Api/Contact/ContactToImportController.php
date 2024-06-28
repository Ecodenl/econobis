<?php

namespace App\Http\Controllers\Api\Contact;

use App\Eco\Contact\Contact;
use App\Http\Controllers\Controller;
use App\Http\RequestQueries\ContactToImport\Grid\RequestQuery;
use App\Http\Resources\Contact\GridContactForImport;
use App\Http\Resources\Contact\GridContactToImport;
use Illuminate\Http\Request;

class ContactToImportController extends Controller
{
    public function index(Request $request, RequestQuery $requestQuery)
    {
        $contactsToImport = $requestQuery->get();

        foreach($contactsToImport as $contactToImport) {
            $matchContact = collect();
            $matchContactMinusEmail = collect();
            $matchContactMinusAddress = collect();

            /* Match contact */
            if (count($contactForImports =
                    Contact::
                    where('full_name', $contactToImport->last_name . ', ' . $contactToImport->first_name)
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
                    })
                    ->get()) > 0) {

                foreach($contactForImports as $contactForImport) {
                    $contactForImport->street = $contactToImport->street;
                    $contactForImport->housenumber = $contactToImport->housenumber;
                    $contactForImport->addition = $contactToImport->addition;
                    $contactForImport->postal_code = $contactToImport->postal_code;
                    $contactForImport->match = 'Match contact';
                }

                $matchContact = GridContactForImport::collection($contactForImports);
            }

            /* Match contact minus e-mail */
            if (count($contactForImports =
                Contact::
                    where('full_name', $contactToImport->last_name . ', ' . $contactToImport->first_name)
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
                }

                $matchContactMinusEmail = GridContactForImport::collection($contactForImports);
            }

            /* Match contact minus adres */
            if (count($contactForImports =
                    Contact::
                    where('full_name', $contactToImport->last_name . ', ' . $contactToImport->first_name)
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
                }

                $matchContactMinusAddress = GridContactForImport::collection($contactForImports);
            }

            $contactForImports = $matchContact->concat($matchContactMinusEmail)->concat($matchContactMinusAddress);

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


}
