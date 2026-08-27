<?php

namespace App\Eco\Twinfield;

use App\Support\Enum\HasLegacyEnumHelpers;

enum TwinfieldLogMessageType: string
{
    use HasLegacyEnumHelpers;

    case CONTACT = 'contact';
    case INVOICE = 'invoice';
    case PAYMENT = 'payment';

    public function getName(): string
    {
        return match ($this) {
            self::CONTACT => 'Contacten synchronisatie',
            self::INVOICE => 'Nota\'s synchronisatie',
            self::PAYMENT => 'Betalingen synchronisatie',
        };
    }
}
