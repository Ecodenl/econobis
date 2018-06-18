<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 26-10-2017
 * Time: 11:55
 */

namespace App\Eco\Administration;

use JosKolenberg\Enum\EnumWithIdAndName;

class SepaType extends EnumWithIdAndName
{

    /**
     * Seed the class with Enum instances
     *
     * @return array
     */
    protected static function seed()
    {
        return [
            new static('credit', 'Credit'),
            new static('payment', 'Uitkering'),
        ];
    }
}