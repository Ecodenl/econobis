<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 26-10-2017
 * Time: 11:55
 */

namespace App\Eco\Email;


use JosKolenberg\Enum\Enum;
use JosKolenberg\Enum\EnumWithIdAndName;

class EmailStatus extends EnumWithIdAndName
{

    /**
     * Seed the class with Enum instances
     *
     * @return array
     */
    protected static function seed()
    {
        return [
            new static('unread', 'Ongelezen'),
            new static('read', 'Gelezen'),
            new static('in_progress', 'In behandeling'),
            new static('urgent', 'Urgent'),
            new static('closed', 'Afgehandeld'),
        ];
    }
}