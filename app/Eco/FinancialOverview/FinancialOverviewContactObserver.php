<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 11-10-2017
 * Time: 10:46
 */

namespace App\Eco\FinancialOverview;

use Carbon\Carbon;

class FinancialOverviewContactObserver
{
    public function saved(FinancialOverviewContact $financialOverviewContact)
    {
        $this->checkFinancialOverviewProcessed($financialOverviewContact);
    }
    public function deleted(FinancialOverviewContact $financialOverviewContact)
    {
        $this->checkFinancialOverviewProcessed($financialOverviewContact);
    }

    /**
     * @param FinancialOverviewContact $financialOverviewContact
     */
    protected function checkFinancialOverviewProcessed(FinancialOverviewContact $financialOverviewContact)
    {
        $financialOverviewId = $financialOverviewContact->financial_overview_id;

        $numberOfFOContacts = FinancialOverviewContact::where('financial_overview_id', $financialOverviewId)->count();

        // if there are remaining financial overview contacts
        if ($numberOfFOContacts > 0) {
            if ($financialOverviewContact->isDirty('status_id')) {
                // if all financial overview contacts of financial overview are sent, than set financial overview to processed
                $numberOfFOContatcsNotSent = FinancialOverviewContact::where('financial_overview_id', $financialOverviewId)
                    ->where('status_id', '!=', 'sent')->count();

                if ($numberOfFOContatcsNotSent == 0) {
                    $financialOverview = FinancialOverview::find($financialOverviewId);
                    $financialOverview->date_processed = Carbon::today();
                    $financialOverview->save();
                }
            }
        }
    }
}
