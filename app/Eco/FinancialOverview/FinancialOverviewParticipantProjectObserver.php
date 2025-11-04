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

    public function deleted(FinancialOverviewParticipantProject $financialOverviewParticipantProject)
    {
        $financialOverviewId = $financialOverviewParticipantProject->financialOverviewProject->financial_overview_id;
        $contactId = $financialOverviewParticipantProject->participantProject->contact_id;
        $numberOfFOContacts = FinancialOverviewParticipantProject::whereHas('financialOverviewProject', function ($query) use($financialOverviewId){
            $query->where('financial_overview_id', $financialOverviewId);
        })
            ->whereHas('participantProject', function ($query) use($contactId){
                $query->where('contact_id', $contactId);
            })
            ->count();
        // if there are no remaining financial overview participant projects for this financial overview and contact, then delete financial overview contact
        if($numberOfFOContacts == 0){
            $financialOverviewContact = FinancialOverviewContact::where('financial_overview_id',  $financialOverviewId)
                ->where('contact_id',  $contactId)
                ->where('status_id', '!=', 'sent');
            $financialOverviewContact->delete();
        }
    }

}
