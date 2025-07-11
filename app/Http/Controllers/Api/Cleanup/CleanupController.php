<?php

namespace App\Http\Controllers\Api\Cleanup;

use App\Eco\ContactGroup\ContactGroup;
use App\Eco\Cooperation\Cooperation;
use App\Eco\Email\Email;
use App\Eco\Intake\Intake;
use App\Eco\Invoice\Invoice;
use App\Eco\Opportunity\Opportunity;
use App\Eco\Order\Order;
use App\Eco\ParticipantMutation\ParticipantMutationStatus;
use App\Eco\ParticipantProject\ParticipantProject;
use App\Eco\Product\Product;
use App\Helpers\CleanupItem\CleanupItemHelper;
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

class CleanupController extends Controller
{
    public function updateAmounts($cleanupType)
    {
        $helper = new CleanupItemHelper();
        $helper->updateAmounts($cleanupType);
    }

    public function updateCleanupItem(Request $request, RequestInput $requestInput, $cleanupItemId)
    {
        $cooperation = Cooperation::first();

        $cleanupItem = $cooperation->cleanupItems()->where('id', $cleanupItemId)->first();
        $cleanupItem->years_for_delete = $request->yearsForDelete;
        $this->getCleanupItem($cleanupItem)->save();

        return $cleanupItem;
    }

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
        $cooporation = Cooperation::first();

        $errorMessageArray = [];

        $cleanupItem = $cooporation->cleanupItems()->where('code_ref', $cleanupType)->first();
        $cleanupDate = $dateToday->copy()->subYears($cleanupItem->years_for_delete);

        if($cleanupType === 'invoices') {
            $invoices = Invoice::whereDate('date_sent', '<', $cleanupDate)->get();

            foreach($invoices as $invoice) {
                $deleteInvoice = new DeleteInvoice($invoice);
                $errorMessage = $deleteInvoice->cleanup();
                if(is_array($errorMessage)) {
                    $errorMessageArray = array_merge($errorMessageArray, $errorMessage);
                }
            }
        }

        if($cleanupType === 'intakes') {
            $intakes = Intake::whereDate('updated_at', '<', $cleanupDate)->get();

            foreach($intakes as $intake) {
                $deleteIntake = new DeleteIntake($intake);
                $errorMessage = $deleteIntake->cleanup();
                if(is_array($errorMessage)) {
                    $errorMessageArray = array_merge($errorMessageArray,$errorMessage);
                }
            }
        }

        if($cleanupType === 'opportunities') {
            $opportunities = Opportunity::whereDate('updated_at', '<', $cleanupDate)->get();

            foreach($opportunities as $opportunity) {
                $deleteOpportunity = new DeleteOpportunity($opportunity);
                $errorMessage = $deleteOpportunity->cleanup();
                print_r($errorMessage);
                if(is_array($errorMessage)) {
                    $errorMessageArray = array_merge($errorMessageArray,$errorMessage);
                }
            }
        }

        if($cleanupType === 'participationsFinished') {
            $participantProjects = ParticipantProject::whereNotNull('date_terminated')->whereDate('date_terminated', '<', $cleanupDate)->get();

            foreach($participantProjects as $participantProject) {
                $deleteParticipation = new DeleteParticipation($participantProject);
                $errorMessage = $deleteParticipation->cleanup('participationsFinished');
                if(is_array($errorMessage)) {
                    $errorMessageArray = array_merge($errorMessageArray,$errorMessage);
                }
            }
        }

        if($cleanupType === 'participationsWithoutStatusDefinitive') {
            $participationsStatusses = ParticipantMutationStatus::whereIn('code_ref', ['interest','option','granted'])->pluck('id');
            $participantProjects = ParticipantProject::whereIn('status_id', $participationsStatusses)->whereDate('updated_at', '<', $cleanupDate)->get();

            foreach($participantProjects as $participantProject) {
                $deleteParticipation = new DeleteParticipation($participantProject);
                $errorMessage = $deleteParticipation->cleanup('participationsWithoutStatusDefinitive');
                if(is_array($errorMessage)) {
                    $errorMessageArray = array_merge($errorMessageArray,$errorMessage);
                }
            }
        }

        if($cleanupType === 'ordersOneoff') {
            $cleanupYearsOrdersOneoff = $cooporation->cleanup_years_oneoff_orders_start_date;

            $cleanupDateOrdersOneoff = $dateToday->copy()->subYears($cleanupYearsOrdersOneoff);

            $exceptionProductIds = Product::where('cleanup_exception', 1)->pluck('id');

            $ordersOneoff = Order::where('collection_frequency_id', 'once')->whereDate('date_next_invoice', '<', $cleanupDateOrdersOneoff)->whereDoesntHave('orderProducts', function($query) use ($exceptionProductIds) {
                $query->whereIn('id', $exceptionProductIds);
            })->get();

            foreach($ordersOneoff as $order) {
                $deleteOrder = new DeleteOrder($order);
                $errorMessage = $deleteOrder->cleanup();
                if(is_array($errorMessage)) {
                    $errorMessageArray = array_merge($errorMessageArray,$errorMessage);
                }
            }
        }

        if($cleanupType === 'ordersPeriodic') {
            $cleanupYearsOrdersPeriodic = $cooporation->cleanup_years_periodic_orders_termination_date;

            $cleanupDateOrdersPeriodic = $dateToday->copy()->subYears($cleanupYearsOrdersPeriodic);

            $exceptionProductIds = Product::where('cleanup_exception', 1)->pluck('id');

            $ordersPeriodic = Order::whereNot('collection_frequency_id', 'once')->where('status_id', 'closed')->whereDate('date_next_invoice', '<', $cleanupDateOrdersPeriodic)->whereDoesntHave('orderProducts', function($query) use ($exceptionProductIds) {
                $query->whereIn('id', $exceptionProductIds);
            })->get();

            foreach($ordersPeriodic as $order) {
                $deleteOrder = new DeleteOrder($order);
                $errorMessage = $deleteOrder->cleanup();
                if(is_array($errorMessage)) {
                    $errorMessageArray = array_merge($errorMessageArray,$errorMessage);
                }
            }
        }

        if($cleanupType === 'incomingEmails' || $cleanupType === 'outgoingEmails') {
            if($cleanupType === 'incomingEmails') {
                $mails = Email::whereNull('date_removed')->where('folder', 'inbox')->whereDate('created_at', '<', $cleanupDate)->get();
            } else if($cleanupType === 'outgoingEmails') {
                $mails = Email::whereNull('date_removed')->where('folder', 'sent')->whereDate('created_at', '<', $cleanupDate)->get();
            }

            foreach($mails as $mail) {
                $deleteMail = new DeleteMail($mail);
                $errorMessage = $deleteMail->cleanup($cleanupType);
                if(is_array($errorMessage)) {
                    $errorMessageArray = array_merge($errorMessageArray,$errorMessage);
                }
            }
        }

        return $errorMessageArray;
    }

    public function excludedGroups(){
        $cooporation = Cooperation::first();

        $excludedGroupIds = $cooporation->cleanup_excluded_group_ids;
        $excludedGroupIdsArray = explode(",", $excludedGroupIds);

        $excludedGroups = ContactGroup::whereIn('id', $excludedGroupIdsArray)->get();

        return $excludedGroups;
    }

    public function excludedGroupDelete($groupId){
        $cooporation = Cooperation::first();

        $excludedGroupIds = $cooporation->cleanup_excluded_group_ids;
        $excludedGroupIdsArray = explode(",", $excludedGroupIds);

        while(($i = array_search($groupId, $excludedGroupIdsArray)) !== false) {
            unset($excludedGroupIdsArray[$i]);
        }

        $cooporation->cleanup_excluded_group_ids = implode(',', $excludedGroupIdsArray);
        $cooporation->save();

        $excludedGroups = ContactGroup::whereIn('id', $excludedGroupIdsArray)->get();

        return $excludedGroups;
    }

    public function excludedGroupAdd($groupId){
        $cooporation = Cooperation::first();

        $excludedGroupIds = $cooporation->cleanup_excluded_group_ids;
        $excludedGroupIdsArray = explode(",", $excludedGroupIds);

        // Check if $newId is already in the array
        if (!in_array($groupId, $excludedGroupIdsArray)) {
            $excludedGroupIdsArray[] = $groupId; // Add the new ID
        }

        $cooporation->cleanup_excluded_group_ids = implode(',', $excludedGroupIdsArray);
        $cooporation->save();

        $excludedGroups = ContactGroup::whereIn('id', $excludedGroupIdsArray)->get();

        return $excludedGroups;
    }

    /**
     * @param $cleanupItem
     * @return mixed
     */
    public function getCleanupItem($cleanupItem)
    {
        return $cleanupItem;
    }
}
