<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 26-10-2017
 * Time: 11:55
 */

namespace App\Eco\PaymentInvoice;

use JosKolenberg\Enum\EnumWithIdAndName;

class PaymentInvoiceStatus extends EnumWithIdAndName
{

    /**
     * Seed the class with Enum instances
     *
     * @return array
     */
    protected static function seed()
    {
        return [
            new static('sent', 'Verzonden'),
            new static('not-paid', 'Niet betaald'),
        ];
    }
}