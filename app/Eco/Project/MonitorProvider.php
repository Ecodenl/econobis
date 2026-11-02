<?php

namespace App\Eco\Project;

use App\Support\Enum\HasLegacyEnumHelpers;

enum MonitorProvider: string
{
    use HasLegacyEnumHelpers;

    case ENERGY_ID = 'energyId';

    public function getName(): string
    {
        return match ($this) {
            self::ENERGY_ID => 'Energie ID',
        };
    }
}