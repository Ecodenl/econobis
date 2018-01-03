<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 03-01-2018
 * Time: 14:01
 */

namespace App\Eco\Mailbox;


use JosKolenberg\Enum\EnumWithIdAndName;

class SmtpEncryptionType extends EnumWithIdAndName
{

    /**
     * Seed the class with Enum instances
     *
     * @return array
     */
    protected static function seed()
    {
        return [
            new static(null, ''),
            new static('tls', 'tls'),
            new static('ssl', 'ssl'),
        ];
    }
}