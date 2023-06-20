<?php

namespace App\Eco\HousingFile;

use JosKolenberg\Enum\EnumWithIdAndName;

class HousingFileLogMessageType extends EnumWithIdAndName
{
    static $all;

    protected static function seed()
    {
        return [
            new static('gebruik', 'Gebruik/woningdossier synchronisatie'),
            new static('woonplan', 'Woonplan/specificaties synchronisatie'),
        ];

    }
}