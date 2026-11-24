<?php

namespace App\Eco\Order;

use App\Support\Enum\HasLegacyEnumHelpers;

enum OrderStatusToSelect: string
{
    use HasLegacyEnumHelpers;

    case CONCEPT = 'concept';
    case ACTIVE = 'active';
    case CLOSED = 'closed';

    public function getName(): string
    {
        return match ($this) {
            self::CONCEPT => 'Concept',
            self::ACTIVE => 'Actief',
            self::CLOSED => 'Beëindigd',
        };
    }
}