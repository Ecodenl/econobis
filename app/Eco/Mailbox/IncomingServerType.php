<?php

namespace App\Eco\Mailbox;

use App\Support\Enum\HasLegacyEnumHelpers;

enum IncomingServerType: string
{
    use HasLegacyEnumHelpers;

    case IMAP = 'imap';
    case MAILGUN = 'mailgun';
    case MS_OAUTH = 'ms-oauth';

    public function getName(): string
    {
        return match ($this) {
            self::IMAP => 'IMAP',
            self::MAILGUN => 'Mailgun',
            self::MS_OAUTH => 'Microsoft Api',
        };
    }
}