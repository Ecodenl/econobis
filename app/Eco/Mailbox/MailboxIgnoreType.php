<?php

namespace App\Eco\Mailbox;

use App\Support\Enum\HasLegacyEnumHelpers;

enum MailboxIgnoreType: string
{
    use HasLegacyEnumHelpers;

    case EMAIL = 'e-mail';
    case DOMAIN = 'domain';

    public function getName(): string
    {
        return match ($this) {
            self::EMAIL => 'E-mail',
            self::DOMAIN => 'Domein',
        };
    }
}