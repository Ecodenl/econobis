<?php

namespace App\Eco\Order;

use App\Support\Enum\HasLegacyEnumHelpers;

enum OrderPaymentType: string
{
    use HasLegacyEnumHelpers;

    case COLLECTION = 'collection';
    case TRANSFER = 'transfer';

    public function getName(): string
    {
        return match ($this) {
            self::COLLECTION => 'Incasso',
            self::TRANSFER => 'Overboeken',
        };
    }
}