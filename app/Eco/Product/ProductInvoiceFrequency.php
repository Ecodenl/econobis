<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 26-10-2017
 * Time: 11:55
 */

namespace App\Eco\Product;

use JosKolenberg\Enum\EnumWithIdAndName;

class ProductInvoiceFrequency extends EnumWithIdAndName
{

    /**
     * Seed the class with Enum instances
     *
     * @return array
     */
    protected static function seed()
    {
        return [
            new static('once', 'Eenmalig'),
            new static('monthly', 'Maand'),
            new static('quarterly', 'Kwartaal'),
            new static('yearly', 'Jaar'),
        ];
    }
}