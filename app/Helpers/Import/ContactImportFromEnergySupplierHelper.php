<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 2-3-2018
 * Time: 21:37
 *http://localhost/econobis/public/import
 */

namespace App\Helpers\Import;


use App\Eco\Contact\ContactToImport;
use App\Eco\LastNamePrefix\LastNamePrefix;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;

class ContactImportFromEnergySupplierHelper
{
    public function validateImport($file, $file_headers)
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
                $line[0] = $str = str_replace("\xEF\xBB\xBF",'',$line[0]);
                $errorValidationHeader = $this->validateHeaders($line, $file_headers);
                if ($errorValidationHeader) {
                    return [$errorValidationHeader];
                }
            } else {
                array_push($validationLines, $this->validateLine($line, $lineNumber, $file_headers));
            }

        }

        //order by prio
        array_multisort(array_column($validationLines, "prio"), SORT_ASC,
            $validationLines);

        return $validationLines;
    }

    public function validateHeaders($line, $file_headers)
    {
        foreach ($line as $k => $lineField){
            // when encoding isn't UTF-8 encode lineField to utf8.
            $encodingLineField= mb_detect_encoding( $lineField, 'UTF-8', true);
            if(false === $encodingLineField){
                $line[$k] = mb_convert_encoding($lineField, 'UTF-8', mb_list_encodings());
            }
            if(mb_detect_encoding($line[$k]) === false){
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
                'message' => 'Er zijn meer dan .... ' . sizeof($file_headers)
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

    public function validateLine($line, $lineNumber, $file_headers)
    {
        $field = [];
        $value = [];
        $defaultMessage = 'Rij kan succesvol geïmporteerd worden.';
        $message = [];
        $prio = 3;

        if(sizeof($line) < sizeof($file_headers)) {
            return [
                'field' => '',
                'value' => '',
                'line' => $lineNumber,
                'message' => 'Rij kan niet geïmporteerd worden, te weinig data.',
                'prio' => 2
            ];
        }

        if(sizeof($line) > sizeof($file_headers)) {
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
            $encodingLineField= mb_detect_encoding( $lineField, 'UTF-8', true);
            if(false === $encodingLineField){
                $line[$k] = mb_convert_encoding($lineField, 'UTF-8', mb_list_encodings());
            }
            if (mb_detect_encoding($line[$k]) === false) {
                array_push($field, $file_headers[$k]);
                array_push($value, 'Waarde kan niet gelezen worden.');
                array_push($message, 'Veld is niet juist gecodeerd.');
                $prio = 1;
            }
        }

        return [
            'field' => implode(', ', $field),
            'value' => implode(', ', $value),
            'line' => $lineNumber,
            'message' => $message ? implode(', ', $message) : $defaultMessage,
            'prio' => $prio
        ];

    }

    public function import($file, $suppliercodeRef, $warninglines)
    {
        $csv = fopen($file, 'r');

        ContactToImport::truncate();

        $warninglinesArray = explode(',',$warninglines);

        $counter = 1;

        $header = true;
        while ($line = fgetcsv($csv, 1024, ";")) {
            if (!in_array($counter, $warninglinesArray)) {
                Log::info('line');
                foreach ($line as $k => $field) {
                    // when encoding isn't UTF-8 encode lineField to utf8.
                    $encodingLineField = mb_detect_encoding($field, 'UTF-8', true);
                    if (false === $encodingLineField) {
                        $line[$k] = mb_convert_encoding($field, 'UTF-8', mb_list_encodings());
                    }
                };
                if ($header) {
                    $header = false;
                } else {
                    try {
                        DB::beginTransaction();
                        $contactToImport = new ContactToImport();

                        $address = $this->splitAddress($line[12]);
                        Log::info('address', $address);
                        $lastName = $this->splitName($line[3]);
                        Log::info('lastName', $lastName);

                        if ($line[2]) {
                            $contactToImport->first_name = $line[2];
                        }

                        if ($lastName['last_name']) {
                            $contactToImport->last_name = $lastName['last_name'];
                        }

                        if ($lastName['last_name_prefix']) {
                            $contactToImport->last_name_prefix = $lastName['last_name_prefix'];
                        }

                        if ($line[12]) {
                            $contactToImport->address = $line[12];
                        }
                        if ($address['street']) {
                            $contactToImport->street = $address['street'];
                        }
                        if ($address['housenumber']) {
                            $contactToImport->housenumber = $address['housenumber'];
                        }
                        if ($address['addition']) {
                            $contactToImport->addition = $address['addition'];
                        }
                        if ($line[13]) {
                            $contactToImport->postal_code = $line[13];
                        }
                        if ($line[14]) {
                            $contactToImport->city = $line[14];
                        }
                        if ($line[28]) {
                            $contactToImport->email_contact = $line[28];
                        }
                        if ($line[30]) {
                            $contactToImport->phone_number = $line[30];
                        }
                        if ($line[7]) {
                            $contactToImport->ean = $line[7];
                        }
                        if ($line[8]) {
                            $contactToImport->ean_type = $line[8];
                        }
                        if ($line[6]) {
                            $contactToImport->es_number = $line[6];
                        }

                        if ($line[14]) {
                            $contactToImport->member_since = $line[17];
                        }

                        if ($line[18]) {
                            $contactToImport->end_date = $line[18];
                        }

                        $contactToImport->status = 'new';

                        $contactToImport->supplier_code_ref = $suppliercodeRef;

                        $contactToImport->save();

                        DB::commit();
                    } catch (\PDOException $e) {
                        DB::rollBack();
                        Log::error('Error contactToImport import: ' . $e->getMessage());
                        abort(501, 'Er is helaas een fout opgetreden.');
                    }
                }
            }
            $counter++;
        }
        return 'succes';
    }

    //todo: deze code komt van Marco, nog nakijken of alles goed gaat
    private function splitAddress($eanAdres)
    {
        $length = Str::length($eanAdres);
        $splits = explode(' ', $eanAdres);
        $teller = count($splits);
        $teller = $teller - 1;
        Log::info('splits', $splits);
        $straatNaam = '';
        $huisnummer = '';
        $toevoeging = '';
        $toevoegingTemp = '';
        while ($teller > 0) {
            $string = $splits[$teller];
            Log::info('string: ' . $string);
            $substring = substr($string, 0, 1);
            if (1 === preg_match('~[0-9]~', substr($string, 0, 1))) {
                $teller2 = 1;
                $length = Str::length($string);
                while ($teller2 < $length) {
                    if (1 === preg_match('~[0-9]~', substr($string, $teller2, 1))) {
                    } else {
                        $toevoeging = substr($string, $teller2);
                        $toevoeging = str_replace('-', '', $toevoeging);
                        $huisnummer = substr($string, 0, $teller2);
                        $teller2 = $length;
                    }
                    $teller2++;
                }
                if ($toevoeging == '') {
                    $huisnummer = $string;

                }
                $index = 0;
                while ($index < $teller) {
                    // for ($index = 0; $index < $teller ; $index++) {
                    if ($straatNaam == '') {
                        $straatNaam = $splits[$index];
                    } else {
                        $straatNaam = $straatNaam . " " . $splits[$index];
                    }
                    $index++;
                }
                $teller = 0;
            } else {
                $toevoegingTemp = $string;
            }

            if ($toevoegingTemp > '' and $toevoeging > '') {
                $toevoeging = $toevoeging . ' ' . $toevoegingTemp;
            }
            $teller = $teller - 1;
        }

        return ['street' => $straatNaam, 'housenumber' => $huisnummer, 'addition' => $toevoegingTemp];
    }

    //todo: deze code komt van Marco, nog nakijken of alles goed gaat
    private function splitName($klantNaam)
    {
        $naamGesplitst = explode(' ', $klantNaam);
        $prefixTotaal = '';
        $indexAchternaam = 0;

        $last_name_prefixes = LastNamePrefix::pluck('name');

        for ($index = 0; $index < count($naamGesplitst) - 1; $index++) {
            foreach ($last_name_prefixes as $prefix) {
                if ($naamGesplitst[$index] == $prefix) {
                    $prefixTotaal .= ' ' . $naamGesplitst[$index];
                    $indexAchternaam = $index;
                }
            }
        }

        $achterNaam = '';
        if ($prefixTotaal == '') { //if ($indexAchternaam == "0") {
            $achterNaam = $naamGesplitst[0];
        } else {
            for ($index = ($indexAchternaam + 1); $index < count($naamGesplitst); $index++) {
                if ($achterNaam == '') {
                    $achterNaam .= $naamGesplitst[$index];
                } else {
                    $achterNaam .= " " . $naamGesplitst[$index];
                }
            }
        }

        return ['last_name' => $achterNaam, 'last_name_prefix' => $prefixTotaal];
    }

}

