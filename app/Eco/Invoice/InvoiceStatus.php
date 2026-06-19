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
            new static('in-progress', 'Wordt definitief gemaakt'),
            new static('error-making', 'Fout bij maken'),
            new static('is-sending', 'Wordt verstuurd'),
            new static('error-sending', 'Opnieuw te verzenden'),
            new static('is-resending', 'Wordt opnieuw verstuurd'),
            new static('sent', 'Verzonden'),
            new static('is-exporting', 'Wordt gesynchroniseerd naar Twinfield'),
            new static('error-exporting', 'Fout bij synchroniseren naar Twinfield'),
            new static('exported', 'Geboekt naar Twinfield'),
            new static('paid', 'Betaald'),
            new static('irrecoverable', 'Oninbaar'),
        ];
    }
}