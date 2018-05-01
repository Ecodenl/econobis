<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 26-10-2017
 * Time: 11:55
 */

namespace App\Eco\Product;

use JosKolenberg\Enum\EnumWithIdAndName;

class ProductDuration extends EnumWithIdAndName
{

    /**
     * Seed the class with Enum instances
     *
     * @return array
     */
    protected static function seed()
    {
        return [
            new static('none', 'Geen'),
            new static('month', '1 maand'),
            new static('quarter', '1 kwartaal'),
            new static('half_year', 'Half jaar'),
            new static('year', 'Jaar'),
            new static('until_cancellation', 'Tot opzegging'),
        ];
    }
}