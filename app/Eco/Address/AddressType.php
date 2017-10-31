<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 06-10-2017
 * Time: 15:19
 */

namespace App\Eco\Address;

use JosKolenberg\Enum\EnumWithIdAndName;

class AddressType extends EnumWithIdAndName
{

    static $all;

    protected static function seed()
    {
        return [
            new static('deliver', 'Bezorg'),
            new static('invoice', 'Factuur'),
            new static('postal', 'Post'),
            new static('visit', 'Bezoek'),
        ];
    }
}