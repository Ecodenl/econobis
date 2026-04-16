<?php

namespace App\Eco\ContactGroup;

use App\Support\Enum\HasLegacyEnumHelpers;

enum ContactGroupType: string
{
    use HasLegacyEnumHelpers;

    case STATIC = 'static';
    case DYNAMIC = 'dynamic';
    case COMPOSED = 'composed';
    case SIMULATED = 'SIMULATED';

    public function getName(): string
    {
        return match ($this) {
            self::STATIC => 'Statisch',
            self::DYNAMIC => 'Dynamisch',
            self::COMPOSED => 'Samengesteld',
            self::SIMULATED => 'Gesimuleerd',
        };
    }
}