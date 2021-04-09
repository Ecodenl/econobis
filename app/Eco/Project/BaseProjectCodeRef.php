<?php

namespace App\Eco\Project;

use JosKolenberg\Enum\EnumWithIdAndName;

class BaseProjectCodeRef extends EnumWithIdAndName
{

    static $all;

    protected static function seed()
    {
        return [
            new static('solar-energy', 'Zonne energie project'),
            new static('wind', 'Wind project'),
            new static('hydropower', 'Waterkracht project'),
        ];
    }
}
