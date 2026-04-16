<?php

namespace App\Eco\Twinfield;

use App\Support\Enum\HasLegacyEnumHelpers;

enum TwinfieldConnectionType: string
{
    use HasLegacyEnumHelpers;

    case OPENID = 'openid';

    public function getName(): string
    {
        return match ($this) {
            self::OPENID => 'OpenId connection (Oauth2)',
        };
    }
}