<?php

namespace App\Eco\Mailbox;

use App\Support\Enum\HasLegacyEnumHelpers;

enum OutgoingServerType: string
{
    use HasLegacyEnumHelpers;

    case SMTP = 'smtp';
    case MAILGUN = 'mailgun';
    case MS_OAUTH = 'ms-oauth';

    public function getName(): string
    {
        return match ($this) {
            self::SMTP => 'SMTP',
            self::MAILGUN => 'Mailgun',
            self::MS_OAUTH => 'Microsoft Api',
        };
    }
}