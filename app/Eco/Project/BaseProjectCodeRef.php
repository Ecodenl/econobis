<?php

namespace App\Eco\Project;

use App\Support\Enum\HasLegacyEnumHelpers;

enum BaseProjectCodeRef: string
{
    use HasLegacyEnumHelpers;

    case SOLAR_ENERGY = 'solar-energy';
    case WIND = 'wind';
    case HYDROPOWER = 'hydropower';

    public function getName(): string
    {
        return match ($this) {
            self::SOLAR_ENERGY => 'Zonne energie project',
            self::WIND => 'Wind project',
            self::HYDROPOWER => 'Wind Waterkracht project',
        };
    }
}