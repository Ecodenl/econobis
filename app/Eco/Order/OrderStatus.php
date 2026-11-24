<?php

namespace App\Eco\Order;

use App\Support\Enum\HasLegacyEnumHelpers;

enum OrderStatus: string
{
    use HasLegacyEnumHelpers;

    case CONCEPT = 'concept';
    case ACTIVE = 'active';
    case IN_PROGRESS = 'in-progress';
    case CLOSED = 'closed';

    public function getName(): string
    {
        return match ($this) {
            self::CONCEPT => 'Concept',
            self::ACTIVE => 'Actief',
            self::IN_PROGRESS => 'Concept nota wordt gemaakt',
            self::CLOSED => 'Beëindigd',
        };
    }
}