<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 26-10-2017
 * Time: 11:55
 */

namespace App\Eco\Order;

use JosKolenberg\Enum\EnumWithIdAndName;

class OrderPaymentType extends EnumWithIdAndName
{

    /**
     * Seed the class with Enum instances
     *
     * @return array
     */
    protected static function seed()
    {
        return [
            new static('collection', 'Incasso'),
            new static('transfer', 'Overboeken'),
        ];
    }
}