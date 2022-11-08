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
            new static('general', 'Algemeen'),
            new static('contract', 'Contract'),
            new static('participation', 'Deelname'),
            new static('registration', 'Inschrijvingsbevestiging'),
            new static('infrared', 'Infraroodopnames'),
            new static('cost-estimate', 'Kostenraming'),
            new static('membership', 'Lidmaatschap'),
            new static('invoice', 'Nota'),
            new static('quotation', 'Offerte'),
            new static('revenue', 'Opbrengst'),
            new static('order', 'Order'),
            new static('privacy', 'Privacyverklaring'),
            new static('quickscan', 'Quickscan'),
            new static('consultation', 'Verslag adviesgesprek'),
            new static('pre-registration', 'Voorinschrijving'),
            new static('financial-overview', 'Waardestaat'),
        ];
    }
}