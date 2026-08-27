<?php

namespace App\Eco\HousingFile;

use App\Support\Enum\HasLegacyEnumHelpers;

enum HousingFileLogMessageType: string
{
    use HasLegacyEnumHelpers;

    case GEBRUIK = 'gebruik';
    CASE WOONPLAN = 'woonplan';

    public function getName(): string
    {
        return match ($this) {
            self::GEBRUIK => 'Gebruik/woningdossier synchronisatie',
            self::WOONPLAN => 'Woonplan/specificaties synchronisatie',
        };
    }
}