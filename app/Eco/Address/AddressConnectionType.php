<?php

namespace App\Eco\Address;

use App\Support\Enum\HasLegacyEnumHelpers;

enum AddressConnectionType: string
{
    use HasLegacyEnumHelpers;

    case SINGLE_10A = '1*10A';
    case SINGLE_25A = '1*25A';
    case SINGLE_30A = '1*30A';
    case SINGLE_35A = '1*35A';
    case SINGLE_40A = '1*40A';
    case THREE_25A = '3*25A';
    case THREE_35A = '3*35A';
    case THREE_63A = '3*63A';
    case THREE_80A = '3*80A';
    case LARGE_CONSUMPTION = 'Grootverbruik';

    public function getName(): string
    {
        return $this->value;
    }
}