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
use Illuminate\Support\Facades\Log;

class CleanupController extends Controller
{
    public function updateAmountsAll()
    {
        $helper = new CleanupItemHelper();
        $helper->updateAmountsAll();
    }
    public function updateAmounts($cleanupType)
    {
        $helper = new CleanupItemHelper();
        $helper->updateAmounts($cleanupType);
    }

    public function updateCleanupItem(Request $request, RequestInput $requestInput, CooperationCleanupItem $cooperationCleanupItem)
    {
        $cooperationCleanupItem->years_for_delete = $request->yearsForDelete;
        $cooperationCleanupItem->save();

        return $cooperationCleanupItem;
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

        $errorMessageArray = [];

        $cleanupItem = $cooperation->cleanupItems()->where('code_ref', $cleanupType)->first();
        $cleanupDate = $dateToday->copy()->subYears($cleanupItem->years_for_delete);

        if($cleanupType === 'invoices') {
            $invoices = Invoice::whereDate('date_sent', '<', $cleanupDate)->get();

            foreach($invoices as $invoice) {
                $deleteInvoice = new DeleteInvoice($invoice);
                $errorMessage = $deleteInvoice->cleanup('invoices');

                if(is_array($errorMessage)) {
                    $errorMessageArray = array_merge($errorMessageArray, $errorMessage);
                }
            }
        }

        if($cleanupType === 'intakes') {
            $intakes = Intake::whereDate('updated_at', '<', $cleanupDate)->get();

            foreach($intakes as $intake) {
                $deleteIntake = new DeleteIntake($intake);
                $errorMessage = $deleteIntake->cleanup('intakes');
                if(is_array($errorMessage)) {
                    $errorMessageArray = array_merge($errorMessageArray,$errorMessage);
                }
            }
        }

        if($cleanupType === 'opportunities') {
            $opportunities = Opportunity::whereDate('updated_at', '<', $cleanupDate)->get();

            foreach($opportunities as $opportunity) {
                $deleteOpportunity = new DeleteOpportunity($opportunity);
                $errorMessage = $deleteOpportunity->cleanup('opportunities');
                print_r($errorMessage);
                if(is_array($errorMessage)) {
                    $errorMessageArray = array_merge($errorMessageArray,$errorMessage);
                }
            }
        }

        if($cleanupType === 'participationsFinished') {
            $participantProjects = ParticipantProject::whereNotNull('date_terminated')
                ->whereDate('date_terminated', '<', $cleanupDate)
                // participation mag niet voorkomen in projectRevenue die nog geen status processed heeft.
                ->whereDoesntHave('projectRevenues', function ($query) {
                    $query->where('project_revenues.status', '!=', 'processed');
                })
                // participation mag niet voorkomen in revenuesKwh die nog geen status processed heeft.
                ->whereDoesntHave('revenuesKwh', function ($query) {
                    $query->where('revenues_kwh.status', '!=', 'processed');
                })
                // ToDo: moet anders:
                //  dit is momenteel nog een harde check in deleteParticipation, dus zetten we hem ook nog even hier
                ->whereDoesntHave('mutations')
                ->get();


            foreach($participantProjects as $participantProject) {
                $deleteParticipation = new DeleteParticipation($participantProject);
                $errorMessage = $deleteParticipation->cleanup('participationsFinished');
                if(is_array($errorMessage)) {
                    $errorMessageArray = array_merge($errorMessageArray,$errorMessage);
                }
            }
        }

        if($cleanupType === 'participationsWithoutStatusDefinitive') {
            $participantProjects = ParticipantProject::whereDoesntHave('mutationsDefinitive')
                ->whereDate('updated_at', '<', $cleanupDate)->get();

            foreach($participantProjects as $participantProject) {
                $deleteParticipation = new DeleteParticipation($participantProject);
                $errorMessage = $deleteParticipation->cleanup('participationsWithoutStatusDefinitive');
                if(is_array($errorMessage)) {
                    $errorMessageArray = array_merge($errorMessageArray,$errorMessage);
                }
            }
        }

        if($cleanupType === 'ordersOneoff') {
            $cleanupYearsOrdersOneoff = $cooperation->cleanup_years_oneoff_orders_start_date;

            $cleanupDateOrdersOneoff = $dateToday->copy()->subYears($cleanupYearsOrdersOneoff);

            $exceptionProductIds = Product::where('cleanup_exception', 1)->pluck('id');

            // alle eenmalige orders zonder die met producten die uitgezonderd zijn voor opschonen
            $ordersOneoff = Order::where('collection_frequency_id', 'once')
                ->whereDate('date_next_invoice', '<', $cleanupDateOrdersOneoff)
                ->whereDoesntHave('orderProducts', function($query) use ($exceptionProductIds) {
                    $query->whereIn('id', $exceptionProductIds);
                })->get();

            foreach($ordersOneoff as $order) {
                $deleteOrder = new DeleteOrder($order);
                $errorMessage = $deleteOrder->cleanup('ordersOneoff');
                if(is_array($errorMessage)) {
                    $errorMessageArray = array_merge($errorMessageArray,$errorMessage);
                }
            }
        }

        if($cleanupType === 'ordersPeriodic') {
            $cleanupYearsOrdersPeriodic = $cooperation->cleanup_years_periodic_orders_termination_date;

            $cleanupDateOrdersPeriodic = $dateToday->copy()->subYears($cleanupYearsOrdersPeriodic);

            $exceptionProductIds = Product::where('cleanup_exception', 1)->pluck('id');

            // alle periodieke orders zonder die met producten die uitgezonderd zijn voor opschonen
            $ordersPeriodic = Order::whereNot('collection_frequency_id', 'once')
                ->where('status_id', 'closed')
                ->whereDate('date_next_invoice', '<', $cleanupDateOrdersPeriodic)
                ->whereDoesntHave('orderProducts', function($query) use ($exceptionProductIds) {
                    $query->whereIn('id', $exceptionProductIds);
                })->get();

            foreach($ordersPeriodic as $order) {
                $deleteOrder = new DeleteOrder($order);
                $errorMessage = $deleteOrder->cleanup('ordersPeriodic');
                if(is_array($errorMessage)) {
                    $errorMessageArray = array_merge($errorMessageArray,$errorMessage);
                }
            }
        }

        if($cleanupType === 'incomingEmails') {
            $mails = Email::whereNull('date_removed')->where('folder', 'inbox')->whereDate('created_at', '<', $cleanupDate)->get();

            foreach($mails as $mail) {
                $deleteMail = new DeleteMail($mail);
                $errorMessage = $deleteMail->cleanup($cleanupType);
                if(is_array($errorMessage)) {
                    $errorMessageArray = array_merge($errorMessageArray,$errorMessage);
                }
            }
        }

        if($cleanupType === 'outgoingEmails') {
            $mails = Email::whereNull('date_removed')->where('folder', 'sent')->whereDate('created_at', '<', $cleanupDate)->get();

            foreach($mails as $mail) {
                $deleteMail = new DeleteMail($mail);
                $errorMessage = $deleteMail->cleanup($cleanupType);
                if(is_array($errorMessage)) {
                    $errorMessageArray = array_merge($errorMessageArray,$errorMessage);
                }
            }
        }

        if($cleanupType === 'contactsToDelete') {

            $exceptionContactIds = [];
            foreach ($cooperation->cleanupContactsExcludedGroups as $cleanupContactsExcludedGroup) {
                $exceptionContactIds = array_unique( array_merge($exceptionContactIds, $cleanupContactsExcludedGroup->contactGroup->getAllContacts(true)) );
            }

            $contacts = Contact::whereDate('created_at', '<', $cleanupDate)
                ->whereDoesntHave('invoices')
                ->whereDoesntHave('orders')
                ->whereDoesntHave('intakes')
//                ->whereDoesntHave('opportunities') // gaan via intakes
                ->whereDoesntHave('quotationRequests')
                ->whereDoesntHave('participations')
                ->whereNotIn('id', $exceptionContactIds)
                ->get();

            foreach($contacts as $contact) {
                $deleteContact = new DeleteContact($contact);
//                Log::info('hier softdeleten van contact: ' . $contact->id . ' ' . $contact->full_name);
                $errorMessage = $deleteContact->cleanup('contactsToDelete');
                if(is_array($errorMessage)) {
                    $errorMessageArray = array_merge($errorMessageArray,$errorMessage);
                }
            }

        }

        if($cleanupType === 'contactsSoftDeleted') {
            // TODO Hier komt dan het echte verwijderen van contact uit database!!!
        }

        Log::info('errorMessageArray');
        Log::info($errorMessageArray);

        return $errorMessageArray;
    }


}
