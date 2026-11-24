<?php

namespace App\Eco\InspectionPersonType;

use App\Support\Enum\HasLegacyEnumHelpers;

enum InspectionPersonType: string
{
    use HasLegacyEnumHelpers;

    case COACH = 'coach';
    case PROJECT_MANAGER = 'projectmanager';
    case EXTERNAL_PARTY = 'externalparty';

    public function getName(): string
    {
        return match ($this) {
            self::COACH => 'Is coach',
            self::PROJECT_MANAGER => 'Is Projectleider',
            self::EXTERNAL_PARTY => 'Is Externe partij',
        };
    }
}