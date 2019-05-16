<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 26-10-2017
 * Time: 11:55
 */

namespace App\Eco\Invoice;

use JosKolenberg\Enum\EnumWithIdAndName;

class InvoiceStatus extends EnumWithIdAndName
{

    /**
     * Seed the class with Enum instances
     *-
     * @return array
     */
    protected static function seed()
    {
        //Also edit InvoicesListFilter!
        //Also edit InvoiceObserver!
        return [
            new static('to-send', 'Te verzenden'),
            new static('sent', 'Verzonden'),
            new static('exported', 'Geboekt'),
            new static('paid', 'Betaald'),
            new static('irrecoverable', 'Oninbaar'),
        ];
    }
}