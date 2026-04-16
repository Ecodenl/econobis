<?php

namespace App\Eco\Order;

use App\Support\Enum\HasLegacyEnumHelpers;

enum OrderCollectionFrequency: string
{
    use HasLegacyEnumHelpers;

    case ONCE = 'once';
    case MONTHLY = 'monthly';
    case QUARTERLY = 'quarterly';
    case HALF_YEAR = 'half-year';
    case YEARLY = 'yearly';

    public function getName(): string
    {
        return match ($this) {
            self::ONCE => 'Eenmalig',
            self::MONTHLY => 'Maandelijks',
            self::QUARTERLY => 'Per kwartaal',
            self::HALF_YEAR => 'Per half jaar',
            self::YEARLY => 'Jaarlijks',
        };
    }
}