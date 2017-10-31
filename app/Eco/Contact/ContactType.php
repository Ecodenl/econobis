<?php

/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 11-10-2017
 * Time: 11:29
 */

namespace App\Eco\Contact;

use JosKolenberg\Enum\EnumWithIdAndName;

class ContactType extends EnumWithIdAndName
{

    const PERSON = 'person';
    const ACCOUNT = 'account';

    protected static function seed()
    {
        return [
            new static(static::PERSON, 'Persoon'),
            new static(static::ACCOUNT, 'Bedrijf'),
        ];
    }

}