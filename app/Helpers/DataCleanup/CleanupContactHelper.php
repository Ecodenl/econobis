<?php
/**
 * Created by PhpStorm.
 * User: StagiarSoftware
 * Date: 27-9-2019
 * Time: 15:20
 */

namespace App\Helpers\DataCleanup;


use App\Eco\Contact\Contact;
use App\Eco\Cooperation\Cooperation;
use App\Eco\Email\Email;
use App\Eco\Intake\Intake;
use App\Eco\Invoice\Invoice;
use App\Eco\Opportunity\Opportunity;
use App\Eco\Order\Order;
use App\Eco\ParticipantMutation\ParticipantMutationStatus;
use App\Eco\ParticipantProject\ParticipantProject;
use App\Eco\Product\Product;
use App\Helpers\Delete\Models\DeleteContact;
use App\Helpers\Settings\Request;
use Carbon\Carbon;
use Illuminate\Support\Facades\Log;

class CleanupContactHelper
{
    public function checkContactsForDeleting($cleanupType = null)
    {
        $contactsToCheck = Contact::all();

        foreach($contactsToCheck as $contact) {
            $this->checkContactForDeleting($contact);
        }

        return true;
    }

    /**
     * @param int checkContactForDeleting
     * @param Contact $contact
     * @return void
     */
    private function checkContactForDeleting(Contact $contact): void
    {

    }

    /**
     * @param int checkContactForDeleting
     * @param Contact $contact
     * @return void
     */
    private function createOrUpdateContactToDelete($contactId, $contactToDeleteData): void
    {
//id
//contact_id
//date_last_invoice
//date_last_orders_one_off
//date_last_orders_periodic
//date_last_intakes
//date_last_opportunities
//date_last_participations_without_status_definitive
//date_last_participations_finished
//date_last_incoming_emails
//date_last_outgoing_emails
//date_last_contacts_soft_deleted
//has_passed_checks_for_deletion
//blocked_for_deletion
//blocked_for_deletion_date
//blocked_for_deletion_reason
//blocked_for_deletion_by
//portal_request_for_deletion
//portal_request_deletion_date
//portal_request_cancel_planned_visit
//portal_request_cancel_open_quotation_request
//deletion_failed
//deletion_failed_date
//deletion_failed_message

    }



}