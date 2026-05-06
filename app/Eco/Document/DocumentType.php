<?php

namespace App\Eco\Document;

use App\Support\Enum\HasLegacyEnumHelpers;

enum DocumentType: string
{
    use HasLegacyEnumHelpers;

    case INTERNAL = 'internal';
    case UPLOAD = 'upload';

    public function getName(): string
    {
        return match ($this) {
            self::INTERNAL => 'Intern',
            self::UPLOAD => 'Upload',
        };
    }
}