<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 06-10-2017
 * Time: 15:19
 */

namespace App\Eco\EmailAddress;


use JosKolenberg\Enum\EnumWithIdAndName;

class EmailAddressType extends EnumWithIdAndName
{

    const WORK = 'work';
    const HOME = 'home';
    const GENERAL = 'general';
    const ADMINISTRATION = 'administration';
    const INVOICE = 'invoice';

    protected static function seed()
    {
        return [
            new static(static::WORK, 'Werk'),
            new static(static::HOME, 'Privé'),
            new static(static::GENERAL, 'Algemeen'),
            new static(static::ADMINISTRATION, 'Administratie'),
            new static(static::INVOICE, 'Nota'),
        ];
    }
}