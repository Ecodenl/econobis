<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 06-10-2017
 * Time: 15:19
 */

namespace App\Eco\PhoneNumber;


use App\Eco\AbstractType\AbstractType;
use App\Eco\AbstractType\TypeCollection;
use JosKolenberg\Enum\EnumWithIdAndName;

class PhoneNumberType extends EnumWithIdAndName
{

    const WORK = 'work';
    const HOME = 'home';

    protected static function seed()
    {
        return [
            new static(static::WORK, 'Werk'),
            new static(static::HOME, 'Prive'),
        ];
    }
}