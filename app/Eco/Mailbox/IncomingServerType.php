<?php

namespace App\Eco\Mailbox;

use JosKolenberg\Enum\EnumWithIdAndName;

class IncomingServerType extends EnumWithIdAndName
{

    /**
     * Seed the class with Enum instances
     *
     * @return array
     */
    protected static function seed()
    {
        return [
            new static('imap', 'IMAP'),
            new static('gmail', 'Gmail'),
        ];
    }
}