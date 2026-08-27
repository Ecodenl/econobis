<?php

namespace App\Eco\Product;

use App\Support\Enum\HasLegacyEnumHelpers;

enum ProductPaymentType: string
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