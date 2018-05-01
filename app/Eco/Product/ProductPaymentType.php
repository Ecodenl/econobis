<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 26-10-2017
 * Time: 11:55
 */

namespace App\Eco\Product;

use JosKolenberg\Enum\EnumWithIdAndName;

class ProductPaymentType extends EnumWithIdAndName
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