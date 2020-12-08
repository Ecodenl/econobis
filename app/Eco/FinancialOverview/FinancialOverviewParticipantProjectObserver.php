<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 11-10-2017
 * Time: 10:46
 */

namespace App\Eco\FinancialOverview;

class FinancialOverviewParticipantProjectObserver
{

    public function saved(FinancialOverviewParticipantProject $financialOverviewParticipantProject)
    {
        // todo hier evt. indien value start en end 0 zijn en er geen mutaties zijn in FO jaar, deleten van record?
    }
}
