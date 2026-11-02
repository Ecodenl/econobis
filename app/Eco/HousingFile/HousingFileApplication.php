<?php

namespace App\Eco\HousingFile;

use App\Support\Enum\HasLegacyEnumHelpers;

enum HousingFileApplication: string
{
    use HasLegacyEnumHelpers;

    case HOOM = 'hoom';
    case ECONOBIS = 'econobis';

    public function getName(): string
    {
        return match ($this) {
            self::HOOM => 'Hoom',
            self::ECONOBIS => 'Econobis',
        };
    }
}
