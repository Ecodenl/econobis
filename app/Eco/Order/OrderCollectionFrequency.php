<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 26-10-2017
 * Time: 11:55
 */

namespace App\Eco\Order;

use JosKolenberg\Enum\EnumWithIdAndName;

class OrderCollectionFrequency extends EnumWithIdAndName
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
            new static('monthly', 'Maandelijks'),
            new static('quarterly', 'Per kwartaal'),
            new static('half-year', 'Per half jaar'),
            new static('yearly', 'Jaarlijks'),
        ];
    }
}