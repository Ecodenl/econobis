<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 11-10-2017
 * Time: 10:46
 */

namespace App\Eco\FinancialOverview;

class FinancialOverviewObserver
{

    public function saving(FinancialOverview $financialOverview)
    {
        if(empty($financialOverview->description)) {
            $financialOverview->description = $financialOverview->year . ' ' . $financialOverview->administration->name;
            $financialOverview->save();
        }
    }
}
