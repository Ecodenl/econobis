<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 26-10-2017
 * Time: 11:55
 */

namespace App\Eco\Contact;


use JosKolenberg\Enum\Enum;
use JosKolenberg\Enum\EnumWithIdAndName;

class ContactStatus extends EnumWithIdAndName
{

    /**
     * Seed the class with Enum instances
     *
     * @return array
     */
    protected static function seed()
    {
        return [
            new static('interested', 'Belangstellend'),
            new static('member', 'Lid'),
            new static('memberAspirant', 'Aspirantlid'),
            new static('memberYouth', 'Jeugdlid'),
            new static('stopped', 'Uitgeschreven'),
            new static('donor', 'Donateur'),
            new static('none', 'Geen'),
            new static('portal', 'Portal'),
            new static('webform', 'Webformulier'),
            new static('importEsClient', 'Import energieklant'),
        ];
    }
}