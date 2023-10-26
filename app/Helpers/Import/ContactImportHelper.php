<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 2-3-2018
 * Time: 21:37
 *http://localhost/econobis/public/import
 */

namespace App\Helpers\Import;


use App\Eco\Address\Address;
use App\Eco\Contact\Contact;
use App\Eco\EmailAddress\EmailAddress;
use App\Eco\Person\Person;
use App\Eco\PhoneNumber\PhoneNumber;
use App\Eco\Title\Title;
use CMPayments\IBAN;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use InvalidArgumentException;
use Particle\Validator\Validator;

class ContactImportHelper
{
//When changed also change validateLine()
    const HEADERS
        = [
            'aanspreektitel_id',
            'initialen',
            'voornaam',
            'tussenvoegsel',
            'achternaam',
            'straat',
            'woonplaats',
            'huisnummer',
            'huisnummer_toevoeging',
            'postcode',
            'telefoonnummer',
            'telefoonnummer2',
            'email',
            'email2',
            'iban',
            'iban_tnv',
        ];

    public function validateImport($file)
    {
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
                $errorValidationHeader = $this->validateHeaders($line);
                if ($errorValidationHeader) {
                    return [$errorValidationHeader];
                }
            } else {
                array_push($validationLines,
                    $this->validateLine($line, $lineNumber));
            }

        }

        //order by prio
        array_multisort(array_column($validationLines, "prio"), SORT_ASC,
            $validationLines);

        return $validationLines;
    }

    public function validateHeaders($line)
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

        if (sizeof($line) > sizeof(self::HEADERS)) {
            return [
                'field' => 'Header',
                'value' => 'Te lang',
                'line' => 0,
                'message' => 'Er zijn meer dan ' . sizeof(self::HEADERS)
                    . ' headers gevonden',
                'prio' => 1
            ];
        }
        if (sizeof($line) < sizeof(self::HEADERS)) {
            return [
                'field' => 'Header',
                'value' => 'Te kort',
                'line' => 0,
                'message' => 'Er zijn minder dan ' . sizeof(self::HEADERS)
                    . ' headers gevonden',
                'prio' => 1
            ];
        }

        foreach ($line as $k => $v) {
            if (self::HEADERS[$k] !== $v) {
                return [
                    'field' => 'Header',
                    'value' => $v,
                    'line' => 0,
                    'message' => 'Header klopt niet. Verwacht: '
                        . self::HEADERS[$k] . ' Gevonden: ' . $v,
                    'prio' => 1
                ];
            }
        }

        return false;
    }

    public function validateLine($line, $lineNumber)
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
                array_push($field, self::HEADERS[$k]);
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

//        $houseNumberAdditionValidator = new Validator;
//        $houseNumberAdditionValidator->optional('house_number_addition', 'house_number_addition', true)->alpha();

        //prio 1 errors
        //aanspreektitel_id
        if ($line[0] && !in_array($line[0], $titleIds)) {
            array_push($field, self::HEADERS[0]);
            array_push($value, $line[0]);
            array_push($message, 'Geen geldig id.');
            $prio = 1;
        };

        //voornaam of achternaam verplicht
        if (!$line[2] && !$line[4]) {
            array_push($field, self::HEADERS[2]);
            array_push($value, $line[2]);
            array_push($message, 'Voornaam of achternaam is een verplicht veld.');
            $prio = 1;
        };

        if ($line[7] && !$houseNumberValidator->validate(['house_number' => $line[7]])->isValid()) {
            array_push($field, self::HEADERS[7]);
            array_push($value, $line[7]);
            array_push($message, 'Huisnummer moet een getal zijn.');
            $prio = 1;
        };

//        if ($line[8] && !$houseNumberAdditionValidator->validate(['house_number_addition' => $line[8]])->isValid()) {
//            array_push($field, self::HEADERS[8]);
//            array_push($value, $line[8]);
//            array_push($message, 'Huisnummer toevoeging moet alfabetisch zijn.');
//            $prio = 1;
//        };

        if (($line[5] || $line[6] || $line[7] || $line[9]) && (!$line[5] || !$line[6] || !$line[7] || !$line[9]) ) {
            array_push($field, 'Adres');
            array_push($value, '');
            array_push($message, 'Als er een adres is ingevuld moeten zowel de straat, woonplaats, huisnummer en postcode worden ingevuld.');
            $prio = 1;
        }

        if (!$emailValidator->validate(['email' => $line[12]])->isValid()) {
            array_push($field, self::HEADERS[12]);
            array_push($value, $line[12]);
            array_push($message, 'E-mail niet geldig.');
            $prio = 1;
        }

        if (!$emailValidator->validate(['email' => $line[13]])->isValid()) {
            array_push($field, self::HEADERS[13]);
            array_push($value, $line[13]);
            array_push($message, 'E-mail niet geldig.');
            $prio = 1;
        }

        if ($line[14]) {
            //iban
            $iban = new IBAN($line[14]);
            if (!$iban->validate()) {
                array_push($field, self::HEADERS[14]);
                array_push($value, $line[14]);
                array_push($message, 'Iban is niet geldig.');
                $prio = 1;
            }
        }

        //prio 2 warnings
        //telefoon
        if ($line[10] && in_array($line[10], $phoneNumbers)) {
            array_push($field, self::HEADERS[10]);
            array_push($value, $line[10]);
            array_push($message, 'Telefoonnummer bestaat al.');
            $prio == 1 ? $prio = 1 : $prio = 2;
        };

        //telefoon2
        if ($line[11] && in_array($line[11], $phoneNumbers)) {
            array_push($field, self::HEADERS[11]);
            array_push($value, $line[11]);
            array_push($message, 'Telefoonnummer bestaat al.');
            $prio == 1 ? $prio = 1 : $prio = 2;
        };

        //email
        if ($line[12] && in_array($line[12], $emails)) {
            array_push($field, self::HEADERS[12]);
            array_push($value, $line[12]);
            array_push($message, 'E-mail bestaat al.');
            $prio == 1 ? $prio = 1 : $prio = 2;
        };

        //email2
        if ($line[13] && in_array($line[13], $emails)) {
            array_push($field, self::HEADERS[13]);
            array_push($value, $line[13]);
            array_push($message, 'E-mail bestaat al.');
            $prio == 1 ? $prio = 1 : $prio = 2;
        };

        return [
            'field' => implode(', ', $field),
            'value' => implode(', ', $value),
            'line' => $lineNumber,
            'message' => $message ? implode(', ', $message) : $defaultMessage,
            'prio' => $prio
        ];

    }

    public function import($file)
    {
        $csv = fopen($file, 'r');

        $header = true;
        while ($line = fgetcsv($csv, 1024, ";")) {
            foreach($line as $k => $field){
                // when encoding isn't UTF-8 encode lineField to utf8.
                $encodingLineField= mb_detect_encoding( $field, 'UTF-8', true);
                if(false === $encodingLineField){
//                    $line[$k] = utf8_encode($field);
                    $line[$k] = mb_convert_encoding($field, 'UTF-8', mb_list_encodings());
                }
            };
            if ($header) {
                $header = false;
            } else {
                try {
                DB::beginTransaction();
                $contact = new Contact();
                $contact->type_id = 'person';
                $contact->status_id = 'interested';
                $contact->full_name = 'temp';
                if ($line[14]) {
                    $contact->iban = $line[14];
                }
                if ($line[15]) {
                    $contact->iban_attn = $line[15];
                }
                $contact->save();

                $person = new Person();
                $person->contact_id = $contact->id;
                $person->title_id = $line[0] ? $line[0] : null;
                $person->initials = $line[1];
                $person->first_name = $line[2];
                $person->last_name_prefix = $line[3];
                $person->last_name = $line[4];
                $person->save();

                if ($line[5] || $line[6] || $line[7] || $line[9]) {
                    $address = new Address();
                    $address->contact_id = $contact->id;
                    $address->street = $line[5] ? $line[5] : '';
                    $address->city = $line[6] ? $line[6] : '';
                    $address->number = $line[7];
                    $address->addition = $line[8];
                    if(preg_match('/^\d{4}\s[A-Za-z]{2}$/', $line[9])){
                        $address->postal_code = preg_replace('/\s+/', '', $line[9]);
                    }else{
                        $address->postal_code = $line[9] ? $line[9] : '';

                    }
                    $address->primary = 1;
                    $address->type_id = 'visit';
                    $address->save();
                }

                if ($line[10]) {
                    $phonenumber = new PhoneNumber();
                    $phonenumber->contact_id = $contact->id;
                    $phonenumber->number = $line[10];
                    $phonenumber->primary = 1;
                    $phonenumber->type_id = 'home';
                    $phonenumber->save();
                }

                if ($line[11]) {
                    $phonenumber = new PhoneNumber();
                    $phonenumber->contact_id = $contact->id;
                    $phonenumber->number = $line[11];
                    $phonenumber->primary = 0;
                    $phonenumber->type_id = 'home';
                    $phonenumber->save();
                }

                if ($line[12]) {
                    $email = new EmailAddress();
                    $email->contact_id = $contact->id;
                    $email->email = $line[12];
                    $email->primary = 1;
                    $email->type_id = 'general';
                    $email->save();
                }

                if ($line[13]) {
                    $email = new EmailAddress();
                    $email->contact_id = $contact->id;
                    $email->email = $line[13];
                    $email->primary = 0;
                    $email->type_id = 'general';
                    $email->save();
                }

                DB::commit();
                } catch (\PDOException $e) {
                    DB::rollBack();
                    Log::error('Error contat import: ' . $e->getMessage());
                    abort(501, 'Er is helaas een fout opgetreden.');
                }
            }
        }
        return 'succes';
    }
}

