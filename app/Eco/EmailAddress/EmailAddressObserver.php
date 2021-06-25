<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 30-10-2017
 * Time: 13:54
 */

namespace App\Eco\EmailAddress;

use App\Helpers\Laposta\LapostaMemberHelper;
use App\Http\Controllers\Api\FinancialOverview\FinancialOverviewContactController;

class EmailAddressObserver
{

    public function creating(EmailAddress $emailAddress)
    {
        // Als dit het eerste emailadres voor deze contact is wordt deze altijd primary
        if(!$emailAddress->contact->emailAddresses()->exists()){
            $emailAddress->primary = true;
        }
    }

    public function saved(EmailAddress $emailAddress)
    {
        if($emailAddress->isDirty('primary') && $emailAddress->primary == true){
            // Als er een oud primary emailadres is dan deze niet meer primary maken
            $oldPrimaryEmailAddress = $emailAddress->contact->emailAddresses()
                ->where('primary', true)
                ->where('id', '<>', $emailAddress->id)
                ->first();

            if($oldPrimaryEmailAddress){
                $oldPrimaryEmailAddress->primary = false;
                $oldPrimaryEmailAddress->save();
            }

            foreach($emailAddress->contact->groups as $contactGroup){
                if($contactGroup->laposta_list_id) {
                    $contactGroupsPivot= $contactGroup->pivot;
                    if($contactGroupsPivot->laposta_member_id){
                        $lapostaMemberHelper = new LapostaMemberHelper($contactGroup, $emailAddress->contact);
                        $lapostaMemberHelper->updateMember();
                    }else{
                        $lapostaMemberHelper = new LapostaMemberHelper($contactGroup, $emailAddress->contact);
                        $lapostaMemberHelper->createMember();
                    }
                }
            }
        }

        if( $emailAddress->isDirty('email') )
        {
            // Check if any financial overview contacts are present with status to-send
            // If so, then renew emailaddress for financial overview contact
            $financialOverviewContacts = $emailAddress->contact->financialOverviewContacts->whereIn('status_id', ['to-send', 'error-sending']);
            if($financialOverviewContacts->count() > 0)
            {
                $financialOverviewContactController = new FinancialOverviewContactController();
                foreach($financialOverviewContacts as $financialOverviewContact) {
                    $emailedTo = $financialOverviewContactController->getContactInfoForFinancialOverview($financialOverviewContact->contact)['email'];
                    $financialOverviewContact->emailed_to = $emailedTo;
                    $financialOverviewContact->save();

                }

            }
        }

    }

    public function deleted(EmailAddress $emailAddress)
    {
        // Als primary emailaddress verwijderd wordt, dan evt. ook laposta members verwijderen.
        if($emailAddress->primary == true) {
            foreach ($emailAddress->contact->groups as $contactGroup) {
                if ($contactGroup->laposta_list_id) {
                    $contactGroupsPivot = $contactGroup->pivot;
                    if ($contactGroupsPivot->laposta_member_id) {
                        $lapostaMemberHelper = new LapostaMemberHelper($contactGroup, $emailAddress->contact);
                        $lapostaMemberHelper->deleteMember();
                    }
                }
            }
        }
    }


}