<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 11-10-2017
 * Time: 10:46
 */

namespace App\Eco\FinancialOverview;

use App\Helpers\Delete\Models\DeleteFinancialOverviewContact;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class FinancialOverviewParticipantProjectObserver
{

    public function saved(FinancialOverviewParticipantProject $financialOverviewParticipantProject)
    {
        // todo hier evt. indien value start en end 0 zijn en er geen mutaties zijn in FO jaar, deleten van record?
    }

    public function deleted(FinancialOverviewParticipantProject $financialOverviewParticipantProject)
    {
        $financialOverviewId = $financialOverviewParticipantProject->financialOverviewProject->financial_overview_id;
        $contactId = $financialOverviewParticipantProject->contact_id;
        $numberOfFOContacts = FinancialOverviewParticipantProject::whereHas('financialOverviewProject', function ($query) use($financialOverviewId, $contactId){
            $query->where('financial_overview_id', $financialOverviewId);
        })
            ->where('contact_id', $contactId)
            ->count();
        // if there are no remaining financial overview participant projects for this financial overview and contact, then delete financial overview contact
        if($numberOfFOContacts == 0){
            $financialOverviewContact = FinancialOverviewContact::where('financial_overview_id',  $financialOverviewId)
                ->where('contact_id',  $contactId)
                ->where('status_id', '!=', 'sent')->first();
            if($financialOverviewContact){
                try {
                    DB::beginTransaction();

                    $deleteFinancialOverviewContact = new DeleteFinancialOverviewContact($financialOverviewContact);
                    $result = $deleteFinancialOverviewContact->delete();

                    if(count($result) > 0){
                        DB::rollBack();
                        abort(412, implode(";", array_unique($result)));
                    }

                    DB::commit();
                } catch (\PDOException $e) {
                    DB::rollBack();
                    Log::error($e->getMessage());
                    abort(501, 'Er is helaas een fout opgetreden.');
                }
            }
        }
    }

}
