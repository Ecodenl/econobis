<?php

namespace App\Eco\Project;

use App\Support\Enum\HasLegacyEnumHelpers;

enum TransactionCostsCodeRef: string
{
    use HasLegacyEnumHelpers;

    case NONE = 'none';
    case AMOUNT_ONCE = 'amount-once';
    case AMOUNT = 'amount';
    case PERCENTAGE = 'percentage';

    public function getName(): string
    {
        return match ($this) {
            self::NONE => 'Geen',
            self::AMOUNT_ONCE => 'Vast bedrag',
            self::AMOUNT => 'Bedrag per participatie',
            self::PERCENTAGE => '% van de inleg',
        };
    }
}
