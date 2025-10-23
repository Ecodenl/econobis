<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 2-3-2018
 * Time: 21:37
 *http://localhost/econobis/public/import
 */

namespace App\Helpers\Import;


use App\Eco\Contact\Contact;
use App\Eco\Contact\ContactForImport;
use App\Eco\Contact\ContactToImport;
use App\Eco\EnergySupplier\EnergySupplier;
use App\Eco\LastNamePrefix\LastNamePrefix;
use App\Eco\Title\Title;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class ContactImportFromEnergySupplierHelper
{
    public function validateImport($file, $supplierCodeRef, $file_headers)
    {
        $file_headers = explode(';', $file_headers);

        if (!$file) {
            return [
                [
                    'field' => 'Bestand',
                    'value' => 'Leeg',
                    'line' => 0,
                    'message' => 'Geen geldig bestand geüpload',
                    'prio' => 1
                ]
            ];
        }

        if (substr($file->getClientOriginalName(), -4) !== '.csv') {
            return [
                [
                    'field' => 'Bestand',
                    'value' => 'Verkeerd',
                    'line' => 0,
                    'message' => 'Bestand is geen .csv',
                    'prio' => 1
                ]
            ];
        }
        $csv = fopen($file, 'r');
        $lineNumber = 0;

        $validationLines = [];

        while ($line = fgetcsv($csv, 1024, ";")) {
            $lineNumber++;
            if ($lineNumber === 1) {
                //bom weg
                $line[0] = str_replace("\xEF\xBB\xBF", '', $line[0]);
                $errorValidationHeader = $this->validateHeaders($line, $file_headers);
                if ($errorValidationHeader) {
                    return [$errorValidationHeader];
                }
            } else {
                array_push($validationLines, $this->validateLine($supplierCodeRef, $line, $lineNumber, $file_headers));
            }

        }

        //order by prio
        array_multisort(array_column($validationLines, "prio"), SORT_ASC,
            $validationLines);

        return $validationLines;
    }

    public function validateHeaders($line, $file_headers)
    {
        foreach ($line as $k => $lineField) {
            // when encoding isn't UTF-8 encode lineField to utf8.
            $encodingLineField = mb_detect_encoding($lineField, 'UTF-8', true);
            if (false === $encodingLineField) {
                $line[$k] = mb_convert_encoding($lineField, 'UTF-8', mb_list_encodings());
            }
            if (mb_detect_encoding($line[$k]) === false) {
                return [
                    'field' => 'Bestand',
                    'value' => 'Fout gecodeerd',
                    'line' => 0,
                    'message' => 'Het bestand is fout gecodeerd.',
                    'prio' => 1
                ];
            }
        }

        if (sizeof($line) > sizeof($file_headers)) {
            return [
                'field' => 'Header',
                'value' => 'Te lang',
                'line' => 0,
                'message' => 'Er zijn meer dan ' . sizeof($file_headers)
                    . ' headers gevonden',
                'prio' => 1
            ];
        }
        if (sizeof($line) < sizeof($file_headers)) {
            return [
                'field' => 'Header',
                'value' => 'Te kort',
                'line' => 0,
                'message' => 'Er zijn minder dan ' . sizeof($file_headers)
                    . ' headers gevonden',
                'prio' => 1
            ];
        }

        foreach ($line as $k => $v) {
            if ($file_headers[$k] !== $v) {
                return [
                    'field' => 'Header',
                    'value' => $v,
                    'line' => 0,
                    'message' => 'Header klopt niet. Verwacht: '
                        . $file_headers[$k] . ' Gevonden: ' . $v,
                    'prio' => 1
                ];
            }
        }

        return false;
    }

    public function validateLine($supplierCodeRef, $line, $lineNumber, $file_headers)
    {
        $field = [];
        $value = [];
        $defaultMessage = 'Rij kan succesvol geïmporteerd worden.';
        $message = [];
        $prio = 3;

        if( $supplierCodeRef === 'OM'){
            $firstNameHeaderId = 3;
            $lastNameHeaderId = 5;
            $kvkNumberHeaderId = 22;
        } else {
            $firstNameHeaderId = null;
            $lastNameHeaderId = null;
            $kvkNumberHeaderId =  null;
        }

        if (sizeof($line) < sizeof($file_headers)) {
            return [
                'field' => '',
                'value' => '',
                'line' => $lineNumber,
                'message' => 'Rij kan niet geïmporteerd worden, te weinig data.',
                'prio' => 2
            ];
        }

        if (sizeof($line) > sizeof($file_headers)) {
            return [
                'field' => '',
                'value' => '',
                'line' => $lineNumber,
                'message' => 'Rij kan niet geïmporteerd worden, te veel data.',
                'prio' => 2
            ];
        }

        foreach ($line as $k => $lineField) {
            // when encoding isn't UTF-8 encode lineField to utf8.
            $encodingLineField = mb_detect_encoding($lineField, 'UTF-8', true);
            if (false === $encodingLineField) {
                $line[$k] = mb_convert_encoding($lineField, 'UTF-8', mb_list_encodings());
            }
            if (mb_detect_encoding($line[$k]) === false) {
                array_push($field, $file_headers[$k]);
                array_push($value, 'Waarde kan niet gelezen worden.');
                array_push($message, 'Veld is niet juist gecodeerd.');
                $prio = 1;
            }
        }

        // Indien zakelijk (kvk number is ingevuld), dan achternaam verplicht
        if ($kvkNumberHeaderId
            && $lastNameHeaderId
            && !$line[$kvkNumberHeaderId]
            && !$line[$lastNameHeaderId]) {
            array_push($field, $file_headers[$lastNameHeaderId]);
            array_push($value, $line[$lastNameHeaderId]);
            array_push($message, 'Achternaam is een verplicht veld voor organisatie.');
            $prio = 1;
        };
        // Indien particulier (kvk number is niet ingevuld), an voornaam of achternaam verplicht
        if ($kvkNumberHeaderId != 0
            && $firstNameHeaderId != 0
            && $lastNameHeaderId != 0
            && $line[$kvkNumberHeaderId]
            && !$line[$firstNameHeaderId]
            && !$line[$lastNameHeaderId]) {
            array_push($field, $file_headers[$firstNameHeaderId]);
            array_push($value, $line[$firstNameHeaderId]);
            array_push($message, 'Voornaam of achternaam is een verplicht veld voor persoon.');
            $prio = 1;
        };


        return [
            'field' => implode(', ', $field),
            'value' => implode(', ', $value),
            'line' => $lineNumber,
            'message' => $message ? implode(', ', $message) : $defaultMessage,
            'prio' => $prio
        ];

    }

    public function import($file, $supplierCodeRef, $warninglines)
    {
        if( $supplierCodeRef === 'OM'){
            $kvkNumberHeaderId = 22;
        } else {
            $kvkNumberHeaderId =  null;
        }

        $csv = fopen($file, 'r');

        ContactToImport::query()->delete();

        $warninglinesArray = explode(',', $warninglines);

        $counter = 1;

        //bom weg
        $firstLine = fgets($csv); // Read the first line
        $bom = pack('H*', 'EFBBBF'); // UTF-8 BOM
        // Remove the BOM if it's present at the start of the first line
        if (strpos($firstLine, $bom) === 0) {
            $firstLine = substr($firstLine, 3); // Strip the BOM
        }

        while ($line = fgetcsv($csv, 1024, ";")) {
            if (!in_array($counter, $warninglinesArray)) {
                foreach ($line as $k => $field) {
//                    Log::info('Key: ' . $k);
//                    Log::info('Field: ' . $field);

                    // when encoding isn't UTF-8 encode lineField to utf8.
                    $encodingLineField = mb_detect_encoding($field, 'UTF-8', true);
                    if (false === $encodingLineField) {
                        $line[$k] = mb_convert_encoding($field, 'UTF-8', mb_list_encodings());
                    }
                };

                try {
                    DB::beginTransaction();
                    $contactToImport = new ContactToImport();

                    // als KvK number ingevuld is, dan zakelijk anders particulier
                    $contactType = $kvkNumberHeaderId &&  $line[$kvkNumberHeaderId] ? 'Zakelijk' : 'Particulier';
                    $contactToImport->contact_type = $contactType;

                    if ($line[0]) {
                        $contactToImport->es_number = $line[0];
                    }

                    if ($line[1]) {
                        $contactToImport->gender = $line[1];
                    }
                    if ($line[1] || $line[2]) {
                        $title= $this->getTitle($line[1], $line[2]);
//        Log::info('Gender in: ' . $line[1] . ' en title in: ' . $line[2] . ', title uit: ' . $title);
                        $contactToImport->title = $title;
                    }

                    if ($line[3]) {
                        $firstNameArray = $this->splitFirstName($line[3]);
//        Log::info('klantVoorNaam in: ' . $line[3] . ', initials uit: ' . $firstNameArray['initials'] . ', first_Name uit: ' . $firstNameArray['first_name']);
                        if ($firstNameArray['initials']) {
                            $contactToImport->initials = $firstNameArray['initials'];
                        }
                        if ($firstNameArray['first_name']) {
                            $contactToImport->first_name = $firstNameArray['first_name'];
                        }
                    } else {
                        $contactToImport->initials = '';
                        $contactToImport->first_name = '';
                    }

                    if ($line[4] || $line[5]) {

                        $lastNameArray = $this->splitLastName($line[4], $line[5]);
//        Log::info('Person_Infix in: ' . $line[4] . ' en Person_LastName in: ' . $line[5] . ', last_name_prefix uit: ' . $lastNameArray['last_name_prefix'] . ', last_name uit: ' . $lastNameArray['last_name']);

                        if ($lastNameArray['last_name']) {
                            $contactToImport->last_name = $lastNameArray['last_name'];
                        }
                        if ($lastNameArray['last_name_prefix']) {
                            $contactToImport->last_name_prefix = $lastNameArray['last_name_prefix'];
                        }

                    }

                    if ($line[6]) {
                        $contactToImport->date_of_birth = $line[6];
                    }

                    // 7 t/m 12 = Mailing address (importeren we niet)

                    if ($line[13]) {
                        $contactToImport->street = $line[13];
                    }
                    if ($line[14]) {
                        $contactToImport->housenumber = $line[14];
                    }
                    if ($line[15]) {
                        $contactToImport->addition = $line[15];
                    }

                    // full address gebruiken we niet meer, nu komt adres altijd binnen met street, housenumber en addition.
                    $contactToImport->address = '';

                    if ($line[16]) {
                        $contactToImport->city = $line[16];
                    }
                    if ($line[17]) {
                        $contactToImport->postal_code = $line[17];
                    }
                    // hier al encrypten ?
                    if ($line[18]) {
                        $contactToImport->iban = $line[18];
                    }
                    if ($line[19]) {
                        $contactToImport->email_contact = $line[19];
                    } else {
                        $contactToImport->email_contact = '';
                    }
                    if ($line[20]) {
                        $contactToImport->email_contact_financial = $line[20];
                    }
                    if ($line[21]) {
                        $contactToImport->phone_number = $line[21];
                    } else {
                        $contactToImport->phone_number = '';
                    }
                    if ($line[22]) {
                        $contactToImport->chamber_of_commerce_number = $line[22];
                    }

                    // 23 = Channel (importeren we niet)

                    // Ean gegevens alleen als we type weten
                    if ($line[25]) {

                        // Electricity
                        if ($line[25] === 'Electricity') {
                            $contactToImport->ean_type = 'Elektriciteit';
                            if ($line[24]) {
                                $contactToImport->ean = $line[24];
                            }

                            // 26 t/m 43 = diverse velden (importeren we niet)

                            if ($line[44]) {
                                $contactToImport->member_since = $line[44];
                            }

                            if ($line[45]) {
                                $contactToImport->end_date = $line[45];
                            }
                            $contactToImport->ean_gas = '';
                            $contactToImport->member_since_gas = null;
                            $contactToImport->end_date_gas = null;
                        }
                        // Gas
                        if ($line[25] === 'Gas') {
                            $contactToImport->ean_type = 'Gas';
                            $contactToImport->ean = '';
                            $contactToImport->member_since = null;
                            $contactToImport->end_date = null;
                            if ($line[24]) {
                                $contactToImport->ean_gas = $line[24];
                            }
                            // 26 t/m 43 = diverse velden (importeren we niet)

                            if ($line[44]) {
                                $contactToImport->member_since_gas = $line[44];
                            }

                            if ($line[45]) {
                                $contactToImport->end_date_gas = $line[45];
                            }
                        }


                    }

                    // 46 = resellerOrganizationId (importeren we niet)

                    $contactToImport->status = 'new';

                    $contactToImport->supplier_code_ref = $supplierCodeRef;

                    $contactToImport->save();

                    DB::commit();
                } catch (\PDOException $e) {
                    DB::rollBack();
                    Log::error('Error contactToImport import: ' . $e->getMessage());
                    abort(501, 'Er is helaas een fout opgetreden.');
                }
            }
            $counter++;
        }

        self::mergeDoubleImports();
        self::processContactMatches();

        return 'succes';
    }

    public function updateContactMatches()
    {
        self::processContactMatches();

        return 'succes';
    }


    private function splitFirstName($klantVoornaam) {

        // Find the position of the last point
        $containsPoint = str_contains($klantVoornaam, '.');

        // If no point is found, set initials as an empty string and first_name as the first_name
        if ($containsPoint === false) {
            return [
                'initials' => '',
                'first_name' => $klantVoornaam
            ];
        }

        // If point found, set first_name as initials and first_name as an empty string
        return [
            'initials' => $klantVoornaam,
            'first_name' => ''
        ];

    }

    private function getTitle($gender, $title) {

        if ($title) {
            // Check if the potential prefix exists in the LastNamePrefix table
            $titleExists = Title::where('name', $title)->exists();
            if($titleExists) {
                return $title;
            }
        }
        if (trim($gender) === 'Man') {
            return Title::where('name', 'Dhr')->first()?->name ?? '';
        }
        if (trim($gender) === 'Vrouw') {
            return Title::where('name', 'Mevr')->first()?->name ?? '';
        }
        return '';
    }

    private function splitLastName($tussenvoegsel, $klantAchternaam) {

        if ($tussenvoegsel) {
            // Check if the potential prefix exists in the LastNamePrefix table
            $prefixExists = LastNamePrefix::where('name', $tussenvoegsel)->exists();
            if($prefixExists) {
                return [
                    'last_name_prefix' => $tussenvoegsel,
                    'last_name' => $klantAchternaam
                ];
            } else {
                return [
                    'last_name_prefix' => '',
                    'last_name' => $klantAchternaam . ', ' . $tussenvoegsel
                ];
            }
        }
        return [
            'last_name_prefix' => '',
            'last_name' => $klantAchternaam
        ];

    }

    public static function mergeDoubleImports(): void
    {
        // Process ContactToImport in chunks of 100 (or a number that suits your memory constraints)
        ContactToImport::where('ean_type', 'Electricity')->chunk(5, function ($contactToImports) {
            foreach ($contactToImports as $contactToImport) {
                $contactToImportSameForGas = ContactToImport::where('ean_type', 'Gas')
                    ->where('es_number', $contactToImport->es_number)
                    ->where('gender', $contactToImport->gender)
                    ->where('title', $contactToImport->title)
                    ->where('contact_type', $contactToImport->contact_type)
                    ->where('initials', $contactToImport->initials)
                    ->where('first_name', $contactToImport->first_name)
                    ->where('last_name', $contactToImport->last_name)
                    ->where('last_name_prefix', $contactToImport->last_name_prefix)
                    ->where('date_of_birth', $contactToImport->date_of_birth)
                    ->where('street', $contactToImport->street)
                    ->where('housenumber', $contactToImport->housenumber)
                    ->where('addition', $contactToImport->addition)
                    ->where('postal_code', $contactToImport->postal_code)
                    ->where('city', $contactToImport->city)
                    ->where('email_contact', $contactToImport->email_contact)
                    ->where('email_contact_financial', $contactToImport->email_contact_financial)
                    ->where('phone_number', $contactToImport->phone_number)
                    ->where('chamber_of_commerce_number', $contactToImport->chamber_of_commerce_number)
                    ->first();
                if($contactToImportSameForGas && $contactToImport->iban === $contactToImportSameForGas->iban) {
                    $contactToImport->ean_type = 'Elektriciteit en gas';
                    $contactToImport->ean_gas = $contactToImportSameForGas->ean_gas;
                    $contactToImport->member_since_gas = $contactToImportSameForGas->member_since_gas;
                    $contactToImport->end_date_gas = $contactToImportSameForGas->end_date_gas;
                    $contactToImport->save();
                    $contactToImportSameForGas->delete();
                }

            }
        });
    }

    public static function processContactMatches(): void
    {
        // Truncate the ContactForImport table to start fresh
        ContactForImport::query()->delete();

        // Process ContactToImport in chunks of 100 (or a number that suits your memory constraints)
        ContactToImport::chunk(100, function ($contactToImports) {
            foreach ($contactToImports as $contactToImport) {
                self::processSingleContactToImport($contactToImport);
            }
        });
    }

    public static function processSingleContactToImport(ContactToImport $contactToImport): void
    {

        // Pre-fetch energy suppliers
        $energySuppliers = EnergySupplier::pluck('id', 'abbreviation');

        $energySupplierId = $energySuppliers[$contactToImport->supplier_code_ref] ?? null;
        if (!$energySupplierId) {
            return;
        }

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
                ->where(function ($query) use($contactToImport) {
                    if($contactToImport->contact_type === 'Zakelijk' ){
                        $query->whereHas('organisation', function ($query2) use ($contactToImport) {
                            $query2->where('name', $contactToImport->last_name);
//                                ->orWhere('statutory_name', $contactToImport->last_name);
                        });

                    } else {
                        $query->whereHas('person', function ($query) use ($contactToImport) {
                            if ($contactToImport->initials != null) {
                                $query->whereRaw('SUBSTRING(`people`.`first_name`, 1, 1) = "' . substr($contactToImport->initials, 0, 1).'"');
                            } else {
                                $query->where('first_name', $contactToImport->first_name);
                            }
                            $query->where('last_name', $contactToImport->last_name);
                            if ($contactToImport->last_name_prefix != null) {
                                $query->where('last_name_prefix', $contactToImport->last_name_prefix);
                            }
                        });
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
            'supplierIgnoreName' => fn($query) => $query
                ->whereHas('currentAddressEnergySuppliers', function ($query) use ($contactToImport) {
                    $query->where('es_number', $contactToImport->es_number);
                })
// naam afwijkend: geen check nodig volgens mij, want indien niet afwijkend dan is ie al gematcht als 'supplierFullMatch'
//                ->where(function ($query) use($contactToImport) {
//                    if($contactToImport->contact_type === 'Zakelijk' ){
//                        $query->whereHas('organisation', function ($query2) use ($contactToImport) {
//                            $query2->where('name', $contactToImport->last_name);
//                                ->orWhere('statutory_name', $contactToImport->last_name);
//                        });
//
//                    } else {
//                        $query->whereHas('person', function ($query) use ($contactToImport) {
//                            if ($contactToImport->initials != null) {
//                                $query->whereRaw('SUBSTRING(`people`.`first_name`, 1, 1) = "' . substr($contactToImport->initials, 0, 1).'"');
//                            } else {
//                                $query->where('first_name', $contactToImport->first_name);
//                            }
//                            $query->where('last_name', $contactToImport->last_name);
//                            if ($contactToImport->last_name_prefix != null) {
//                                $query->where('last_name_prefix', $contactToImport->last_name_prefix);
//                            }
//                        });
//                    }
//                })
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
                    $query->where('es_number', $contactToImport->es_number);
                })
                ->where(function ($query) use($contactToImport) {
                    if($contactToImport->contact_type === 'Zakelijk' ){
                        $query->whereHas('organisation', function ($query2) use ($contactToImport) {
                            $query2->where('name', $contactToImport->last_name);
//                                ->orWhere('statutory_name', $contactToImport->last_name);
                        });

                    } else {
                        $query->whereHas('person', function ($query) use ($contactToImport) {
                            if ($contactToImport->initials != null) {
                                $query->whereRaw('SUBSTRING(`people`.`first_name`, 1, 1) = "' . substr($contactToImport->initials, 0, 1).'"');
                            } else {
                                $query->where('first_name', $contactToImport->first_name);
                            }
                            $query->where('last_name', $contactToImport->last_name);
                            if ($contactToImport->last_name_prefix != null) {
                                $query->where('last_name_prefix', $contactToImport->last_name_prefix);
                            }
                        });
                    }
                })
// adres afwijkend: geen check nodig volgens mij, want indien niet afwijkend dan is ie al gematcht als 'supplierFullMatch'
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
                    $query->where('es_number', $contactToImport->es_number);
                })
                ->where(function ($query) use($contactToImport) {
                    if($contactToImport->contact_type === 'Zakelijk' ){
                        $query->whereHas('organisation', function ($query2) use ($contactToImport) {
                            $query2->where('name', $contactToImport->last_name);
//                                ->orWhere('statutory_name', $contactToImport->last_name);
                        });

                    } else {
                        $query->whereHas('person', function ($query) use ($contactToImport) {
                            if ($contactToImport->initials != null) {
                                $query->whereRaw('SUBSTRING(`people`.`first_name`, 1, 1) = "' . substr($contactToImport->initials, 0, 1).'"');
                            } else {
                                $query->where('first_name', $contactToImport->first_name);
                            }
                            $query->where('last_name', $contactToImport->last_name);
                            if ($contactToImport->last_name_prefix != null) {
                                $query->where('last_name_prefix', $contactToImport->last_name_prefix);
                            }
                        });
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
                }),
// email afwijkend: geen check nodig volgens mij, want indien niet afwijkend dan is ie al gematcht als 'supplierFullMatch'
//                ->where(function ($query2) use ($contactToImport) {
//                    $query2->whereDoesntHave('emailAddresses', function ($query) use ($contactToImport) {
//                        $query->where('email', $contactToImport->email_contact);
//                    })
//                        ->orWhereDoesntHave('emailAddresses');
//                }),
            'supplierIgnoreNameAndEmail' => fn($query) => $query
                ->whereHas('currentAddressEnergySuppliers', function ($query) use ($contactToImport) {
                    $query->where('es_number', $contactToImport->es_number);
                })
// naam afwijkend: geen check nodig volgens mij, want indien niet afwijkend dan is ie al gematcht als 'supplierFullMatch' of 'supplierIgnoreEmail'
//                ->where(function ($query) use($contactToImport) {
//                    if($contactToImport->contact_type === 'Zakelijk' ){
//                        $query->whereHas('organisation', function ($query2) use ($contactToImport) {
//                            $query2->where('name', $contactToImport->last_name);
//                                ->orWhere('statutory_name', $contactToImport->last_name);
//                        });
//
//                    } else {
//                        $query->whereHas('person', function ($query) use ($contactToImport) {
//                            if ($contactToImport->initials != null) {
//                                $query->whereRaw('SUBSTRING(`people`.`first_name`, 1, 1) = "' . substr($contactToImport->initials, 0, 1).'"');
//                            } else {
//                                $query->where('first_name', $contactToImport->first_name);
//                            }
//                            $query->where('last_name', $contactToImport->last_name);
//                            if ($contactToImport->last_name_prefix != null) {
//                                $query->where('last_name_prefix', $contactToImport->last_name_prefix);
//                            }
//                        });
//                    }
//                })
                ->whereHas('addressesWithoutOld', function ($query) use ($contactToImport, $energySupplierId) {
                    $query->where('postal_code', str_replace(' ', '', $contactToImport->postal_code));
                    $query->where('number', $contactToImport->housenumber);
                    if ($contactToImport->addition === null) {
                        $query->where('addition', '');
                    } else {
                        $query->where('addition', $contactToImport->addition);
                    }
                }),
// naam afwijkend: geen check nodig volgens mij, want indien niet afwijkend dan is ie al gematcht als 'supplierFullMatch' of 'supplierIgnoreName'
//                ->where(function ($query2) use ($contactToImport) {
//                    $query2->whereDoesntHave('emailAddresses', function ($query) use ($contactToImport) {
//                        $query->where('email', $contactToImport->email_contact);
//                    })
//                        ->orWhereDoesntHave('emailAddresses');
//                }),
            'supplierIgnoreEsNumber' => fn($query) => $query
                ->whereHas('currentAddressEnergySuppliers', function ($query) use ($contactToImport) {
                    $query->where('es_number', '!=', $contactToImport->es_number);
                })
                ->where(function ($query) use($contactToImport) {
                    if($contactToImport->contact_type === 'Zakelijk' ){
                        $query->whereHas('organisation', function ($query2) use ($contactToImport) {
                            $query2->where('name', $contactToImport->last_name);
//                                ->orWhere('statutory_name', $contactToImport->last_name);
                        });

                    } else {
                        $query->whereHas('person', function ($query) use ($contactToImport) {
                            if ($contactToImport->initials != null) {
                                $query->whereRaw('SUBSTRING(`people`.`first_name`, 1, 1) = "' . substr($contactToImport->initials, 0, 1).'"');
                            } else {
                                $query->where('first_name', $contactToImport->first_name);
                            }
                            $query->where('last_name', $contactToImport->last_name);
                            if ($contactToImport->last_name_prefix != null) {
                                $query->where('last_name_prefix', $contactToImport->last_name_prefix);
                            }
                        });
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
            'contactMatch' => fn($query) => $query
                ->where(function ($query2) use ($contactToImport) {
                    $query2->whereHas('currentAddressEnergySuppliers', function ($query3) use ($contactToImport) {
                        $query3->where('energy_supplier_id', '!=', $contactToImport->es_number);
                    })
                        ->orWhereDoesntHave('currentAddressEnergySuppliers');
                })
                ->where(function ($query) use($contactToImport) {
                    if($contactToImport->contact_type === 'Zakelijk' ){
                        $query->whereHas('organisation', function ($query2) use ($contactToImport) {
                            $query2->where('name', $contactToImport->last_name);
//                                ->orWhere('statutory_name', $contactToImport->last_name);
                        });

                    } else {
                        $query->whereHas('person', function ($query) use ($contactToImport) {
                            if ($contactToImport->initials != null) {
                                $query->whereRaw('SUBSTRING(`people`.`first_name`, 1, 1) = "' . substr($contactToImport->initials, 0, 1).'"');
                            } else {
                                $query->where('first_name', $contactToImport->first_name);
                            }
                            $query->where('last_name', $contactToImport->last_name);
                            if ($contactToImport->last_name_prefix != null) {
                                $query->where('last_name_prefix', $contactToImport->last_name_prefix);
                            }
                        });
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
                ->where(function ($query) use($contactToImport) {
                    if($contactToImport->contact_type === 'Zakelijk' ){
                        $query->whereHas('organisation', function ($query2) use ($contactToImport) {
                            $query2->where('name', $contactToImport->last_name);
//                                ->orWhere('statutory_name', $contactToImport->last_name);
                        });

                    } else {
                        $query->whereHas('person', function ($query) use ($contactToImport) {
                            if ($contactToImport->initials != null) {
                                $query->whereRaw('SUBSTRING(`people`.`first_name`, 1, 1) = "' . substr($contactToImport->initials, 0, 1).'"');
                            } else {
                                $query->where('first_name', $contactToImport->first_name);
                            }
                            $query->where('last_name', $contactToImport->last_name);
                            if ($contactToImport->last_name_prefix != null) {
                                $query->where('last_name_prefix', $contactToImport->last_name_prefix);
                            }
                        });
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
                ->where(function ($query) use($contactToImport) {
                    if($contactToImport->contact_type === 'Zakelijk' ){
                        $query->whereHas('organisation', function ($query2) use ($contactToImport) {
                            $query2->where('name', $contactToImport->last_name);
//                                ->orWhere('statutory_name', $contactToImport->last_name);
                        });

                    } else {
                        $query->whereHas('person', function ($query) use ($contactToImport) {
                            if ($contactToImport->initials != null) {
                                $query->whereRaw('SUBSTRING(`people`.`first_name`, 1, 1) = "' . substr($contactToImport->initials, 0, 1).'"');
                            } else {
                                $query->where('first_name', $contactToImport->first_name);
                            }
                            $query->where('last_name', $contactToImport->last_name);
                            if ($contactToImport->last_name_prefix != null) {
                                $query->where('last_name_prefix', $contactToImport->last_name_prefix);
                            }
                        });
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
//                ->where(function ($query) use($contactToImport) {
//                    if($contactToImport->contact_type === 'Zakelijk' ){
//                        $query->whereHas('organisation', function ($query2) use ($contactToImport) {
//                            $query2->where('name', $contactToImport->last_name);
//                                ->orWhere('statutory_name', $contactToImport->last_name);
//                        });
//
//                    } else {
//                        $query->whereHas('person', function ($query) use ($contactToImport) {
//                            if ($contactToImport->initials != null) {
//                                $query->whereRaw('SUBSTRING(`people`.`first_name`, 1, 1) = "' . substr($contactToImport->initials, 0, 1).'"');
//                            } else {
//                                $query->where('first_name', $contactToImport->first_name);
//                            }
//                            $query->where('last_name', $contactToImport->last_name);
//                            if ($contactToImport->last_name_prefix != null) {
//                                $query->where('last_name_prefix', $contactToImport->last_name_prefix);
//                            }
//                        });
//                    }
//                })
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
            'supplierIgnoreName' => ['matchDescription' => 'Klant minus naam', 'matchColor' => '#FF8000'],
            'supplierIgnoreAddress' => ['matchDescription' => 'Klant minus adres', 'matchColor' => '#00FF00'],
            'supplierIgnoreEmail' => ['matchDescription' => 'Klant minus email', 'matchColor' => '#FFFF00'],
            'supplierIgnoreNameAndEmail' => ['matchDescription' => 'Klant minus naam/email', 'matchColor' => '#FF8000'],
            'supplierIgnoreEsNumber' => ['matchDescription' => 'Klant minus klantnummer', 'matchColor' => '#80FF00'],
            'contactMatch' => ['matchDescription' => 'Contact', 'matchColor' => 'repeating-linear-gradient(45deg,#00FF00,#ECECEC 2px,#00FF00 4px)'],
            'contactIgnoreAddress' => ['matchDescription' => 'Contact minus adres', 'matchColor' => 'repeating-linear-gradient(45deg,#80FF00,#ECECEC 2px,#80FF00 4px)'],
            'contactIgnoreEmail' => ['matchDescription' => 'Contact minus e-mail', 'matchColor' => 'repeating-linear-gradient(45deg,#FFFF00,#ECECEC 2px,#FFFF00 4px)'],
            'contactIgnoreName' => ['matchDescription' => 'Contact minus naam', 'matchColor' => 'repeating-linear-gradient(45deg,#FF8000,#ECECEC 2px,#FF8000 4px)'],
        ];

        // Collect the records to insert
        $insertRecords = [];
        $uniqueContactIds = [];  // Use an associative array for better performance

        foreach ($matchConditions as $matchCode => $matchCondition) {

            // Pluck only the 'id' of matching contacts
            $contactIds = Contact::where($matchCondition)->pluck('id');

            foreach ($contactIds as $contactId) {
                if (!isset($uniqueContactIds[$contactId])) {
                    $uniqueContactIds[$contactId] = true;

                    $insertRecords[] = [
                        'contact_to_import_id' => $contactToImport->id,
                        'contact_id' => $contactId,
                        'match_code' => $matchCode,
                        'match_description' => $matchCases[$matchCode]['matchDescription'],
                        'match_color' => $matchCases[$matchCode]['matchColor'],
                    ];
                }
            }

        }

        // Bulk insert the records
        if (!empty($insertRecords)) {
            ContactForImport::insert($insertRecords);
        }

    }

}

