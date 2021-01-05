<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 11-10-2017
 * Time: 10:46
 */

namespace App\Eco\FinancialOverview;

use App\Http\Controllers\Api\FinancialOverview\FinancialOverviewContactController;

class FinancialOverviewObserver
{
    public function saving(FinancialOverview $financialOverview)
    {
        if(empty($financialOverview->description)) {
            $financialOverview->description = $financialOverview->year . ' ' . $financialOverview->administration->name;
        }
//        // default 'concept' alleen bij nieuw maken
//        if(!$financialOverview->definitive && empty($financialOverview->definitive)) {
//            $financialOverview->status_id = 'concept';
//        }
        if($financialOverview->definitive && empty($financialOverview->date_processed)) {
            $financialOverview->status_id = 'definitive';
        }
        if($financialOverview->definitive && !empty($financialOverview->date_processed)) {
            $financialOverview->status_id = 'processed';
        }
    }

    public function saved(FinancialOverview $financialOverview)
    {
        if($financialOverview->isDirty('definitive')) {
            // if financial overview is definitive set all financial overview contact status from concept tot to-send and vice versa
            if($financialOverview->definitive){
                $financialOverviewContacts = FinancialOverviewContact::where('financial_overview_id', $financialOverview->id)
                    ->where('status_id', 'concept')->get();
                foreach ($financialOverviewContacts as $financialOverviewContact) {
                    $financialOverviewContactController = new FinancialOverviewContactController();
                    $emailedTo = $financialOverviewContactController->getContactInfoForFinancialOverview($financialOverviewContact->contact)['email'];
                    $financialOverviewContact->emailed_to = $emailedTo;
                    $financialOverviewContact->status_id = 'to-send';
                    $financialOverviewContact->save();
                }
            }else{
                $financialOverviewContacts = FinancialOverviewContact::where('financial_overview_id', $financialOverview->id)
                    ->where('status_id', 'to-send')->get();
                foreach ($financialOverviewContacts as $financialOverviewContact) {
                    $financialOverviewContact->emailed_to = null;
                    $financialOverviewContact->status_id = 'concept';
                    $financialOverviewContact->save();
                }
            }
        }

    }



}
