<?php

namespace App\Eco\Address;

use App\Support\Enum\HasLegacyEnumHelpers;

enum AddressType: string
{
    use HasLegacyEnumHelpers;

    case DELIVER = 'deliver';
    case INVOICE = 'invoice';
    case POSTAL = 'postal';
    case VISIT = 'visit';
    case OLD = 'old';

    public function getName(): string
    {
        return match ($this) {
            self::DELIVER => 'Bezorg',
            self::INVOICE => 'Nota',
            self::POSTAL => 'Post',
            self::VISIT => 'Bezoek',
            self::OLD => 'Oud',
        };
    }
}