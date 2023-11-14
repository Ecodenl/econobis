<?php

namespace App\Eco\Mailbox;

use JosKolenberg\Enum\EnumWithIdAndName;

class OutgoingServerType extends EnumWithIdAndName
{

    /**
     * Seed the class with Enum instances
     *
     * @return array
     */
    protected static function seed()
    {
        return [
            new static('smtp', 'SMTP'),
            new static('mailgun', 'Mailgun'),
            new static('ms-oauth', 'Microsoft Api'),
        ];
    }
}