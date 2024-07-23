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
use App\Eco\EmailAddress\EmailAddress;
use App\Eco\LastNamePrefix\LastNamePrefix;
use App\Eco\PhoneNumber\PhoneNumber;
use App\Eco\Title\Title;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use Particle\Validator\Validator;

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
                array_push($validationLines,
                    $this->validateLine($line, $lineNumber, $file_headers));
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
//                $line[$k] = utf8_encode($lineField);
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

        foreach ($line as $k => $lineField) {
            // when encoding isn't UTF-8 encode lineField to utf8.
            $encodingLineField= mb_detect_encoding( $lineField, 'UTF-8', true);
            if(false === $encodingLineField){
//                $line[$k] = utf8_encode($lineField);
                $line[$k] = mb_convert_encoding($lineField, 'UTF-8', mb_list_encodings());
            }
            if (mb_detect_encoding($line[$k]) === false) {
                array_push($field, $file_headers[$k]);
                array_push($value, 'Waarde kan niet gelezen worden.');
                array_push($message, 'Veld is niet juist gecodeerd.');
                $prio = 1;
            }
        }

        //IDS ophalen van database;
        $titleIds = Title::all()->pluck('id')->toArray();
        $emails = EmailAddress::all()->pluck('email')->toArray();
        $phoneNumbers = PhoneNumber::all()->pluck('number')->toArray();

        //validators
        $emailValidator = new Validator;
        $emailValidator->required('email', 'email', true)->email();

        $houseNumberValidator = new Validator;
        $houseNumberValidator->optional('house_number', 'house_number', true)->integer();

//        todo WM: hieronder nog diverse cleanup

//        $houseNumberAdditionValidator = new Validator;
//        $houseNumberAdditionValidator->optional('house_number_addition', 'house_number_addition', true)->alpha();

//        //prio 1 errors
//        //aanspreektitel_id
//        if ($line[0] && !in_array($line[0], $titleIds)) {
//            array_push($field, self::HEADERS[0]);
//            array_push($value, $line[0]);
//            array_push($message, 'Geen geldig id.');
//            $prio = 1;
//        };

//        //voornaam of achternaam verplicht
//        if (!$line[2] && !$line[4]) {
//            array_push($field, self::HEADERS[2]);
//            array_push($value, $line[2]);
//            array_push($message, 'Voornaam of achternaam is een verplicht veld.');
//            $prio = 1;
//        };

//        if ($line[7] && !$houseNumberValidator->validate(['house_number' => $line[7]])->isValid()) {
//            array_push($field, self::HEADERS[7]);
//            array_push($value, $line[7]);
//            array_push($message, 'Huisnummer moet een getal zijn.');
//            $prio = 1;
//        };

//        if ($line[8] && !$houseNumberAdditionValidator->validate(['house_number_addition' => $line[8]])->isValid()) {
//            array_push($field, self::HEADERS[8]);
//            array_push($value, $line[8]);
//            array_push($message, 'Huisnummer toevoeging moet alfabetisch zijn.');
//            $prio = 1;
//        };

//        if (($line[5] || $line[6] || $line[7] || $line[9]) && (!$line[5] || !$line[6] || !$line[7] || !$line[9]) ) {
//            array_push($field, 'Adres');
//            array_push($value, '');
//            array_push($message, 'Als er een adres is ingevuld moeten zowel de straat, woonplaats, huisnummer en postcode worden ingevuld.');
//            $prio = 1;
//        }

//        if (!$emailValidator->validate(['email' => $line[12]])->isValid()) {
//            array_push($field, self::HEADERS[12]);
//            array_push($value, $line[12]);
//            array_push($message, 'E-mail niet geldig.');
//            $prio = 1;
//        }

//        if (!$emailValidator->validate(['email' => $line[13]])->isValid()) {
//            array_push($field, self::HEADERS[13]);
//            array_push($value, $line[13]);
//            array_push($message, 'E-mail niet geldig.');
//            $prio = 1;
//        }

//        if ($line[14]) {
//            //iban
//            $iban = new IBAN($line[14]);
//            if (!$iban->validate()) {
//                array_push($field, self::HEADERS[14]);
//                array_push($value, $line[14]);
//                array_push($message, 'Iban is niet geldig.');
//                $prio = 1;
//            }
//        }

//        //prio 2 warnings
//        //telefoon
//        if ($line[10] && in_array($line[10], $phoneNumbers)) {
//            array_push($field, self::HEADERS[10]);
//            array_push($value, $line[10]);
//            array_push($message, 'Telefoonnummer bestaat al.');
//            $prio == 1 ? $prio = 1 : $prio = 2;
//        };

//        //telefoon2
//        if ($line[11] && in_array($line[11], $phoneNumbers)) {
//            array_push($field, self::HEADERS[11]);
//            array_push($value, $line[11]);
//            array_push($message, 'Telefoonnummer bestaat al.');
//            $prio == 1 ? $prio = 1 : $prio = 2;
//        };

//        //email
//        if ($line[12] && in_array($line[12], $emails)) {
//            array_push($field, self::HEADERS[12]);
//            array_push($value, $line[12]);
//            array_push($message, 'E-mail bestaat al.');
//            $prio == 1 ? $prio = 1 : $prio = 2;
//        };

//        //email2
//        if ($line[13] && in_array($line[13], $emails)) {
//            array_push($field, self::HEADERS[13]);
//            array_push($value, $line[13]);
//            array_push($message, 'E-mail bestaat al.');
//            $prio == 1 ? $prio = 1 : $prio = 2;
//        };

        return [
            'field' => implode(', ', $field),
            'value' => implode(', ', $value),
            'line' => $lineNumber,
            'message' => $message ? implode(', ', $message) : $defaultMessage,
            'prio' => $prio
        ];

    }

    public function import($file, $suppliercodeRef)
    {
        $csv = fopen($file, 'r');

        $header = true;
        while ($line = fgetcsv($csv, 1024, ";")) {
            Log::info('line');
            foreach($line as $k => $field){
                // when encoding isn't UTF-8 encode lineField to utf8.
                $encodingLineField= mb_detect_encoding( $field, 'UTF-8', true);
                if(false === $encodingLineField){
                    $line[$k] = mb_convert_encoding($field, 'UTF-8', mb_list_encodings());
                }
            };
            if ($header) {
                $header = false;
            } else {
                try {
                    DB::beginTransaction();
                    $contact = new ContactToImport();

                    $address = $this->splitAddress($line[12]);
                        Log::info('address', $address);
                    $lastName = $this->splitName($line[3]);
                        Log::info('lastName', $lastName);

                    if ($line[2]) {
                        $contact->first_name = $line[2];
                    }

                    if ($lastName['last_name']) {
                        $contact->last_name = $lastName['last_name'];
                    }

                    if ($lastName['last_name_prefix']) {
                        $contact->last_name_prefix = $lastName['last_name_prefix'];
                    }

                    if ($line[12]) {
                        $contact->address = $line[12];
                    }
                    if ($address['street']) {
                        $contact->street = $address['street'];
                    }
                    if ($address['housenumber']) {
                        $contact->housenumber = $address['housenumber'];
                    }
                    if ($address['addition']) {
                        $contact->addition = $address['addition'];
                    }
                    if ($line[13]) {
                        $contact->postal_code = $line[13];
                    }
                    if ($line[14]) {
                        $contact->city = $line[14];
                    }
                    if ($line[28]) {
                        $contact->email_contact = $line[28];
                    }
                    if ($line[30]) {
                        $contact->phone_number = $line[30];
                    }
                    if ($line[7]) {
                        $contact->ean = $line[7];
                    }
                    if ($line[6]) {
                        $contact->es_number = $line[6];
                    }

                    if ($line[14]) {
                        $contact->member_since = $line[17];
                    }

                    if ($line[18]) {
                        $contact->end_date = $line[18];
                    }

                    $contact->supplier_code_ref = $suppliercodeRef;

                    $contact->save();

                    DB::commit();
                } catch (\PDOException $e) {
                    DB::rollBack();
                    Log::error('Error contactToImport import: ' . $e->getMessage());
                    abort(501, 'Er is helaas een fout opgetreden.');
                }
            }
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

