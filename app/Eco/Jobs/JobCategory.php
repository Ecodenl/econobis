<?php

namespace App\Eco\Jobs;

use JosKolenberg\Enum\EnumWithIdAndName;

class JobCategory extends EnumWithIdAndName
{
    static $all;

    protected static function seed()
    {
        return [
            new static('participant', 'Deelnemer rapportage'),
            new static('revenue', 'Opbrengst rapportage'),
        ];

    }
}