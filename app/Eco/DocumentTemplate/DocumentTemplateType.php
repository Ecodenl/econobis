<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 26-10-2017
 * Time: 11:55
 */

namespace App\Eco\DocumentTemplate;


use JosKolenberg\Enum\Enum;
use JosKolenberg\Enum\EnumWithIdAndName;

class DocumentTemplateType extends EnumWithIdAndName
{

    /**
     * Seed the class with Enum instances
     *
     * @return array
     */
    protected static function seed()
    {
        return [
            new static('general', 'Template'),
            new static('base', 'Basis'),
            new static('header', 'Koptekst'),
            new static('footer', 'Voettekst'),
        ];
    }
}