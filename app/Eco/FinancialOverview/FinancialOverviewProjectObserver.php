<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 11-10-2017
 * Time: 10:46
 */

namespace App\Eco\FinancialOverview;

class FinancialOverviewProjectObserver
{

    public function saved(FinancialOverviewProject $financialOverviewProject)
    {
        if($financialOverviewProject->isDirty('definitive')) {
            $financialOverviewId = $financialOverviewProject->financial_overview_id;
            // if all financial overview projects of financial overview are set to definitive, than set financial overview also to definitive and vice versa
            $numberOfFOProjectsNotDefinitive = FinancialOverviewProject::where('financial_overview_id', $financialOverviewId)
                ->where('definitive', false)->count();

            $financialOverviewDefinitive = ($numberOfFOProjectsNotDefinitive > 0) ? false : true;
            $financialOverview = FinancialOverview::find($financialOverviewId);
            $financialOverview->definitive = $financialOverviewDefinitive;
            $financialOverview->save();
        }
    }
    public function deleted(FinancialOverviewProject $financialOverviewProject)
    {
        $financialOverviewId = $financialOverviewProject->financial_overview_id;

        $numberOfFOProjects = FinancialOverviewProject::where('financial_overview_id', $financialOverviewId)->count();

        // if there are remaining financial overview projects
        if($numberOfFOProjects > 0){
            // and they are all set to definitive, than set financial overview also to definitive
            $numberOfFOProjectsNotDefinitive = FinancialOverviewProject::where('financial_overview_id', $financialOverviewId)
                ->where('definitive', false)->count();
            if($numberOfFOProjectsNotDefinitive == 0) {
                $financialOverviewDefinitive = true;
                $financialOverview = FinancialOverview::find($financialOverviewId);
                $financialOverview->definitive = $financialOverviewDefinitive;
                $financialOverview->save();
            }
        }
    }
}
