<?php

namespace App\Eco\Twinfield;

use JosKolenberg\Enum\EnumWithIdAndName;

class TwinfieldLogMessageType extends EnumWithIdAndName
{
    static $all;

    protected static function seed()
    {
        return [
            new static('contact', 'Contacten synchronisatie'),
            new static('invoice', 'Nota\'s synchronisatie'),
            new static('payment', 'Betalingen synchronisatie'),
        ];

    }
}