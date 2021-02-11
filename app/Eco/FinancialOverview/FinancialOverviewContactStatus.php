<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 26-10-2017
 * Time: 11:55
 */

namespace App\Eco\FinancialOverview;

use JosKolenberg\Enum\EnumWithIdAndName;

class FinancialOverviewContactStatus extends EnumWithIdAndName
{

    /**
     * Seed the class with Enum instances
     *-
     * @return array
     */
    protected static function seed()
    {
        //Also edit FinancialOverview observers!
        return [
            new static('concept', 'Concept'),
            new static('to-send', 'Te verzenden'),
            new static('in-progress', 'Wordt definitief gemaakt'),
            new static('error-making', 'Fout bij maken'),
            new static('is-sending', 'Wordt verstuurd'),
            new static('error-sending', 'Opnieuw te verzenden'),
            new static('is-resending', 'Wordt opnieuw verstuurd'),
            new static('sent', 'Verzonden'),
        ];
    }
}