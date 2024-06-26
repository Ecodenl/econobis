<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 26-10-2017
 * Time: 11:55
 */

namespace App\Eco\Mailbox;

use JosKolenberg\Enum\EnumWithIdAndName;

class MailboxIgnoreType extends EnumWithIdAndName
{

    /**
     * Seed the class with Enum instances
     *
     * @return array
     */
    protected static function seed()
    {
        return [
            new static('e-mail', 'E-mail'),
            new static('domain', 'Domein'),
        ];
    }
}