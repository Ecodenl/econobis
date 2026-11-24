<?php

namespace App\Eco\Product;

use App\Support\Enum\HasLegacyEnumHelpers;

enum ProductDuration: string
{
    use HasLegacyEnumHelpers;

    case NONE = 'none';
    case MONTH = 'month';
    case QUARTER = 'quarter';
    case HALF_YEAR = 'half_year';
    case YEAR = 'year';
    case UNTIL_CANCELLATION = 'until_cancellation';

    public function getName(): string
    {
        return match ($this) {
            self::NONE => 'Geen',
            self::MONTH => 'Maand',
            self::QUARTER => 'Kwartaal',
            self::HALF_YEAR => 'Half jaar',
            self::YEAR => 'Jaar',
            self::UNTIL_CANCELLATION => 'Tot opzegging',
        };
    }
}