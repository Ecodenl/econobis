<?php

namespace App\Eco\Product;

use App\Support\Enum\HasLegacyEnumHelpers;

enum ProductInvoiceFrequency: string
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
            self::MONTHLY => 'Maand',
            self::QUARTERLY => 'Kwartaal',
            self::HALF_YEAR => 'Half jaar',
            self::YEARLY => 'Jaar',
        };
    }
}