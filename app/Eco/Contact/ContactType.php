<?php

namespace App\Eco\Contact;

use App\Support\Enum\HasLegacyEnumHelpers;

enum ContactType: string
{
    use HasLegacyEnumHelpers;

    case PERSON = 'person';
    case ORGANISATION = 'organisation';

    public function getName(): string
    {
        return match ($this) {
            self::PERSON => 'Persoon',
            self::ORGANISATION => 'Organisatie',
        };
    }
}