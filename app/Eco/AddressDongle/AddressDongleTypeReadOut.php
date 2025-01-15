<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 06-10-2017
 * Time: 15:19
 */

namespace App\Eco\AddressDongle;

use JosKolenberg\Enum\EnumWithIdAndName;

class AddressDongleTypeReadOut extends EnumWithIdAndName
{

    static $all;

    protected static function seed()
    {
        return [
            new static('1', 'Onbekend'),
            new static('2', 'P1'),
            new static('3', 'P4'),
        ];
    }
}