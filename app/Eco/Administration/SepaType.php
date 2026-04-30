<?php

namespace App\Eco\Administration;

use App\Support\Enum\HasLegacyEnumHelpers;

enum SepaType: string
{
    use HasLegacyEnumHelpers;

    case CREDIT = 'credit';
    case PAYMENT = 'payment';

    public function getName(): string
    {
        return match ($this) {
            self::CREDIT => 'Credit',
            self::PAYMENT => 'Uitkering',
        };
    }
}