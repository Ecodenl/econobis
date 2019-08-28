<?php

/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 11-10-2017
 * Time: 11:29
 */

namespace App\Eco\Project;

use JosKolenberg\Enum\EnumWithIdAndName;

class ProjectRevenueDistributionType extends EnumWithIdAndName
{

    const INPOSSESSIONOF = 'inPossessionOf';
    const HOWLONGINPOSSESSION = 'howLongInPossession';

    protected static function seed()
    {
        return [
            new static(static::INPOSSESSIONOF, 'In bezit op'),
            new static(static::HOWLONGINPOSSESSION, 'Hoe lang in bezit'),
        ];
    }

}