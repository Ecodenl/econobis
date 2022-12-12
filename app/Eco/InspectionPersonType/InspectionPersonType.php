<?php

namespace App\Eco\InspectionPersonType;

use JosKolenberg\Enum\EnumWithIdAndName;

class InspectionPersonType extends EnumWithIdAndName
{

    static $all;

    protected static function seed()
    {
        return [
            new static('coach', 'Is coach'),
            new static('projectmanager', 'Is Projectleider'),
            new static('externalparty', 'Is Externe partij'),
        ];
    }
}