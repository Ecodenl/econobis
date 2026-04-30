<?php

namespace App\Eco\DocumentTemplate;

use App\Support\Enum\HasLegacyEnumHelpers;

enum DocumentTemplateType: string
{
    use HasLegacyEnumHelpers;

    case GENERAL = 'general';
    case BASE = 'base';
    case HEADER = 'header';
    case FOOTER = 'footer';

    public function getName(): string
    {
        return match ($this) {
            self::GENERAL => 'Template',
            self::BASE => 'Basis',
            self::HEADER => 'Koptekst',
            self::FOOTER => 'Voettekst',
        };
    }
}