<?php

/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 11-10-2017
 * Time: 11:29
 */

namespace App\Eco\ContactGroup;

use JosKolenberg\Enum\EnumWithIdAndName;

class ContactGroupType extends EnumWithIdAndName
{
    protected static function seed()
    {
        return [
            new static('static', 'Statisch'),
            new static('dynamic', 'Dynamisch'),
            new static('composed', 'Samengesteld'),
        ];
    }

}