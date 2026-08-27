<?php

namespace App\Eco\Webform;

use App\Support\Enum\HasLegacyEnumHelpers;

enum WebformApiType: string
{
    use HasLegacyEnumHelpers;

    case WEBFORM_API = 'webform_api';
    case HOOMDOSSIER_API = 'hoomdossier_api';

    public function getName(): string
    {
        return match ($this) {
            self::WEBFORM_API => 'Webform API',
            self::HOOMDOSSIER_API => 'Hoomdossier Endpoint API',
        };
    }
}