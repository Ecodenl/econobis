<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 03-01-2018
 * Time: 14:07
 */

namespace App\Eco\Mailbox;


use JosKolenberg\Enum\EnumWithIdAndName;

class ImapEncryptionType extends EnumWithIdAndName
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