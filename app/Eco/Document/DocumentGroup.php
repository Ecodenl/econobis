<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 26-10-2017
 * Time: 11:55
 */

namespace App\Eco\Document;


use JosKolenberg\Enum\Enum;
use JosKolenberg\Enum\EnumWithIdAndName;

class DocumentGroup extends EnumWithIdAndName
{

    /**
     * Seed the class with Enum instances
     *
     * @return array
     */
    protected static function seed()
    {
        return [
            new static('contract', 'Contract'),
            new static('blueprint', 'Werktekening'),
            new static('quotation', 'Offerte'),
        ];
    }
}