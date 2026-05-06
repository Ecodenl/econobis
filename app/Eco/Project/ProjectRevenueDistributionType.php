<?php

namespace App\Eco\Project;

use App\Support\Enum\HasLegacyEnumHelpers;

enum ProjectRevenueDistributionType: string
{
    use HasLegacyEnumHelpers;

    case IN_POSSESSION_OF = 'inPossessionOf';
    case HOW_LONG_IN_POSSESSION = 'howLongInPossession';

    public function getName(): string
    {
        return match ($this) {
            self::IN_POSSESSION_OF => 'In bezit op',
            self::HOW_LONG_IN_POSSESSION => 'Hoe lang in bezit',
        };
    }
}