<?php

namespace App\Http\Controllers\Api\Cleanup;

use App\Eco\Contact\Contact;
use App\Eco\ContactGroup\ContactGroup;
use App\Eco\Cooperation\Cooperation;
use App\Eco\Cooperation\CooperationCleanupItem;
use App\Eco\Email\Email;
use App\Eco\Intake\Intake;
use App\Eco\Invoice\Invoice;
use App\Eco\Opportunity\Opportunity;
use App\Eco\Order\Order;
use App\Eco\ParticipantMutation\ParticipantMutationStatus;
use App\Eco\ParticipantProject\ParticipantProject;
use App\Eco\Product\Product;
use App\Helpers\CleanupItem\CleanupItemHelper;
use App\Helpers\Delete\Models\DeleteContact;
use App\Helpers\Delete\Models\DeleteIntake;
use App\Helpers\Delete\Models\DeleteInvoice;
use App\Helpers\Delete\Models\DeleteMail;
use App\Helpers\Delete\Models\DeleteOpportunity;
use App\Helpers\Delete\Models\DeleteOrder;
use App\Helpers\Delete\Models\DeleteParticipation;
use App\Helpers\RequestInput\RequestInput;
use App\Http\Controllers\Controller;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class CleanupController extends Controller
{
    public function updateAmountsAll()
    {
        $helper = new CleanupItemHelper();
        $helper->updateAmountsAll();
    }
    public function updateAmountsPerType($cleanupType)
    {
        $cooperation = Cooperation::first();
        $cleanupItem = $cooperation?->cleanupItems()->where('code_ref', $cleanupType)->first() ?? null;

        $helper = new CleanupItemHelper($cleanupItem);
        $helper->updateAmountsPerType();
    }

    // todo WM: opsplitsen naar items, emails en contacts ?
    public function getCleanupItems(){

        $cooperation = Cooperation::first();

        $cleanupItems = [];

        foreach($cooperation->cleanupItems as $cleanupItem) {
            $cleanupItems[$cleanupItem->code_ref]['name'] = $cleanupItem->name;
            $cleanupItems[$cleanupItem->code_ref]['years_for_delete'] = $cleanupItem->years_for_delete;
            $cleanupItems[$cleanupItem->code_ref]['code_ref'] = $cleanupItem->code_ref;
            $cleanupItems[$cleanupItem->code_ref]['number_of_items_to_delete'] = $cleanupItem->number_of_items_to_delete;
            $cleanupItems[$cleanupItem->code_ref]['date_cleaned_up'] = $cleanupItem->date_cleaned_up;
            $cleanupItems[$cleanupItem->code_ref]['date_determined'] = $cleanupItem->date_determined;
        }

        return $cleanupItems;
    }

    public function cleanupItems($cleanupType){
        $dateToday = Carbon::now();
        $cooperation = Cooperation::first();
        $cleanupItem = $cooperation?->cleanupItems()->where('code_ref', $cleanupType)->first() ?? null;
        $cleanupDate = $dateToday->copy()->subYears($cleanupItem->years_for_delete);

        $cleanupItemHelper = new CleanupItemHelper($cleanupItem);

        $errorMessageArray = [];

        switch ($cleanupType) {
            case "invoices":

                $invoices = $cleanupItemHelper->getInvoicesToDelete()->get();
                foreach($invoices as $invoice) {
                    $deleteInvoice = new DeleteInvoice($invoice);
                    $errorMessage = $deleteInvoice->cleanup();

                    if(is_array($errorMessage)) {
                        $errorMessageArray = array_merge($errorMessageArray, $errorMessage);
                    }
                }
                break;

            case "ordersOneoff":
                $ordersOneoff = $cleanupItemHelper->getOrdersOneoffToDelete()->get();

                foreach($ordersOneoff as $order) {
                    $deleteOrder = new DeleteOrder($order);
                    $errorMessage = $deleteOrder->cleanup();
                    if(is_array($errorMessage)) {
                        $errorMessageArray = array_merge($errorMessageArray,$errorMessage);
                    }
                }
                break;

            case "ordersPeriodic":
                $ordersPeriodic = $cleanupItemHelper->getOrdersPeriodicToDelete()->get();

                foreach($ordersPeriodic as $order) {
                    $deleteOrder = new DeleteOrder($order);
                    $errorMessage = $deleteOrder->cleanup();
                    if(is_array($errorMessage)) {
                        $errorMessageArray = array_merge($errorMessageArray,$errorMessage);
                    }
                }
                break;

            case "intakes":
                $intakes = $cleanupItemHelper->getIntakesToDelete()->get();

                foreach($intakes as $intake) {
                    $deleteIntake = new DeleteIntake($intake);
                    $errorMessage = $deleteIntake->cleanup();
                    if(is_array($errorMessage)) {
                        $errorMessageArray = array_merge($errorMessageArray,$errorMessage);
                    }
                }
                break;

            case "opportunities":
                $opportunities = $cleanupItemHelper->getOpportunitiesToDelete()->get();

                foreach($opportunities as $opportunity) {
                    $deleteOpportunity = new DeleteOpportunity($opportunity);
                    $errorMessage = $deleteOpportunity->cleanup();
                    print_r($errorMessage);
                    if(is_array($errorMessage)) {
                        $errorMessageArray = array_merge($errorMessageArray,$errorMessage);
                    }
                }
                break;

            case "participationsWithoutStatusDefinitive":
                $participantProjects = $cleanupItemHelper->getParticipationsWithoutStatusDefinitiveToDelete()->get();

                foreach($participantProjects as $participantProject) {
                    $deleteParticipation = new DeleteParticipation($participantProject);
                    $errorMessage = $deleteParticipation->cleanup();
                    if(is_array($errorMessage)) {
                        $errorMessageArray = array_merge($errorMessageArray,$errorMessage);
                    }
                }
                break;

            case "participationsFinished":
                $participantProjects = $cleanupItemHelper->getParticipationsFinishedToDelete()->get();

                foreach($participantProjects as $participantProject) {
                    $deleteParticipation = new DeleteParticipation($participantProject);
                    $errorMessage = $deleteParticipation->cleanup();
                    if(is_array($errorMessage)) {
                        $errorMessageArray = array_merge($errorMessageArray,$errorMessage);
                    }
                }
                break;

            case "incomingEmails":
                $mails = $cleanupItemHelper->getIncomingEmailsToDelete()->get();

                foreach($mails as $mail) {
                    $deleteMail = new DeleteMail($mail);
                    $errorMessage = $deleteMail->cleanup();
                    if(is_array($errorMessage)) {
                        $errorMessageArray = array_merge($errorMessageArray,$errorMessage);
                    }
                }
                break;

            case "outgoingEmails":
                $mails = $cleanupItemHelper->getOutgoingEmailsToDelete()->get();

                foreach($mails as $mail) {
                    $deleteMail = new DeleteMail($mail);
                    $errorMessage = $deleteMail->cleanup();
                    if(is_array($errorMessage)) {
                        $errorMessageArray = array_merge($errorMessageArray,$errorMessage);
                    }
                }
                break;

            case "contactsToDelete":
                $contacts = $cleanupItemHelper->getContactsToDeleteToDelete()->get();

                foreach($contacts as $contact) {

                    try {
                        DB::beginTransaction();

                        $deleteContact = new DeleteContact($contact);
                        $errorMessage = $deleteContact->cleanup();
                        if(is_array($errorMessage)) {
                            $errorMessageArray = array_merge($errorMessageArray,$errorMessage);
                        }

                        if(count($errorMessage) > 0){
                            DB::rollBack();
                            abort(412, implode(";", array_unique($errorMessage)));
                        }

                        DB::commit();
                    } catch (\PDOException $e) {
                        DB::rollBack();
                        Log::error($e->getMessage());
                        abort(501, 'Er is helaas een fout opgetreden.');
                    }

                }

                break;

            case "contactsSoftDeleted":
                // TODO Hier komt dan het echte verwijderen van contact uit database!!!
//                $contacts = $cleanupItemHelper->getContactsSoftDeletedToDelete()->get();
//                foreach($contacts as $contact) {
//                    //
//                }

                break;

            default:

        }

        Log::info('errorMessageArray');
        Log::info($errorMessageArray);

        $cleanupItem->date_cleaned_up = $dateToday;
//        number_of_items_to_delete opnieuw bepalen via helper
//        $cleanupItem->number_of_items_to_delete = 0;
        $cleanupItem->save();

        $cleanupItemHelper->updateAmountsPerType();

        return $errorMessageArray;
    }


}
