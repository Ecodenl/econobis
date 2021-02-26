<?php

namespace App\Eco\Project;

use JosKolenberg\Enum\EnumWithIdAndName;

class TransactionCostsCodeRef extends EnumWithIdAndName
{

    static $all;

    protected static function seed()
    {
        return [
            new static('none', 'Geen'),
            new static('amount', 'Vast bedrag per inleg'),
            new static('percentage', '% van de inleg'),
        ];
    }
}
