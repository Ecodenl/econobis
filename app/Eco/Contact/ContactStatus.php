<?php

namespace App\Eco\Contact;

use App\Support\Enum\HasLegacyEnumHelpers;

enum ContactStatus: string
{
    use HasLegacyEnumHelpers;

    case INTERESTED = 'interested';
    case MEMBER = 'member';
    case MEMBER_ASPIRANT = 'memberAspirant';
    case MEMBER_YOUTH = 'memberYouth';
    case STOPPED = 'stopped';
    case DONOR = 'donor';
    case NONE = 'none';
    case PORTAL = 'portal';
    case WEBFORM = 'webform';
    case IMPORT_ES_CLIENT = 'importEsClient';

    public function getName(): string
    {
        return match ($this) {
            self::INTERESTED => 'Belangstellend',
            self::MEMBER => 'Lid',
            self::MEMBER_ASPIRANT => 'Aspirantlid',
            self::MEMBER_YOUTH => 'Jeugdlid',
            self::STOPPED => 'Uitgeschreven',
            self::DONOR => 'Donateur',
            self::NONE => 'Geen',
            self::PORTAL => 'Portal',
            self::WEBFORM => 'Webformulier',
            self::IMPORT_ES_CLIENT => 'Import energieklant',
        };
    }
}