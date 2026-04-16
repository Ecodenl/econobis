<?php

namespace App\Eco\PhoneNumber;

use App\Eco\AbstractType\AbstractType;
use App\Eco\AbstractType\TypeCollection;
use App\Support\Enum\HasLegacyEnumHelpers;

enum PhoneNumberType: string
{
    use HasLegacyEnumHelpers;

    case WORK = 'work';
    case HOME = 'home';

    public function getName(): string
    {
        return match ($this) {
            self::WORK => 'Werk',
            self::HOME => 'Prive',
        };
    }
}