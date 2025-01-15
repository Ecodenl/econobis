<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 06-10-2017
 * Time: 15:19
 */

namespace App\Eco\AddressDongle;

use JosKolenberg\Enum\EnumWithIdAndName;

class AddressDongleTypeDongle extends EnumWithIdAndName
{

    static $all;

    protected static function seed()
    {
        return [
            new static('1', 'Smartstuff type A'),
            new static('2', 'Smartstuff type B'),
            new static('3', 'Ander merk'),
        ];
    }
}