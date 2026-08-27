<?php

namespace App\Eco\EmailAddress;

use App\Support\Enum\HasLegacyEnumHelpers;

enum EmailAddressType: string
{
    use HasLegacyEnumHelpers;

    case WORK = 'work';
    case HOME = 'home';
    case GENERAL = 'general';
    case ADMINISTRATION = 'administration';
    case INVOICE = 'invoice';

    public function getName(): string
    {
        return match ($this) {
            self::WORK => 'Werk',
            self::HOME => 'Privé',
            self::GENERAL => 'Algemeen',
            self::ADMINISTRATION => 'Administratie',
            self::INVOICE => 'Nota',
        };
    }
}