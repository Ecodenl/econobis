<?php

namespace App\Http\Controllers\Api\Cleanup;

use App\Eco\Cooperation\Cooperation;
use App\Eco\Intake\Intake;
use App\Eco\Invoice\Invoice;
use App\Eco\Opportunity\Opportunity;
use App\Eco\Order\Order;
use App\Eco\ParticipantMutation\ParticipantMutationStatus;
use App\Eco\ParticipantProject\ParticipantProject;
use App\Eco\Product\Product;
use App\Helpers\Delete\Models\DeleteIntake;
use App\Helpers\Delete\Models\DeleteInvoice;
use App\Helpers\Delete\Models\DeleteOpportunity;
use App\Helpers\Delete\Models\DeleteOrder;
use App\Helpers\Delete\Models\DeleteParticipation;
use App\Http\Controllers\Controller;
use Carbon\Carbon;

class CleanupController extends Controller
{
    public function getCleanupAmounts(){
        $dateToday = Carbon::now();
        $cooperation = Cooperation::first();

        $invoicesCleanupYears = $cooperation->cleanup_years_invoices_date_send;
        $invoicesCleanupOlderThen = $dateToday->copy()->subYears($invoicesCleanupYears);

        $ordersOneoffCleanupYears = $cooperation->cleanup_years_oneoff_orders_start_date;
        $ordersOneoffCleanupOlderThen = $dateToday->copy()->subYears($ordersOneoffCleanupYears);

        $ordersPeriodicCleanupYears = $cooperation->cleanup_years_periodic_orders_termination_date;
        $ordersPeriodicCleanupOlderThen = $dateToday->copy()->subYears($ordersPeriodicCleanupYears);

        $exceptionProductIds = Product::where('cleanup_exception', 1)->pluck('id');

        $intakesCleanupYears = $cooperation->cleanup_years_intakes_mutation_date;
        $intakesCleanupOlderThen = $dateToday->copy()->subYears($intakesCleanupYears);

        $opportunitiesCleanupYears = $cooperation->cleanup_years_opportunities_mutation_date;
        $opportunitiesCleanupOlderThen = $dateToday->copy()->subYears($opportunitiesCleanupYears);

        $participationsWithStatusCleanupYears = $cooperation->cleanup_years_participations_change_date;
        $participationsWithStatusCleanupOlderThen = $dateToday->copy()->subYears($participationsWithStatusCleanupYears);
        $participationsStatusses = ParticipantMutationStatus::whereIn('code_ref', ['interest','option','granted'])->pluck('id');

        $participationsFinishedCleanupYears = $cooperation->cleanup_years_participations_termination_date;
        $participationsFinishedCleanupOlderThen = $dateToday->copy()->subYears($participationsFinishedCleanupYears);

        $invoices = Invoice::whereDate('date_sent', '<', $invoicesCleanupOlderThen)->count();

        $ordersOneoff = Order::where('collection_frequency_id', 'once')->whereDate('date_next_invoice', '<', $ordersOneoffCleanupOlderThen)->whereDoesntHave('orderProducts', function($query) use ($exceptionProductIds) {
            $query->whereIn('id', $exceptionProductIds);
        })->count();
        $ordersPeriodic = Order::whereNot('collection_frequency_id', 'once')->where('status_id', 'closed')->whereDate('date_next_invoice', '<', $ordersPeriodicCleanupOlderThen)->whereDoesntHave('orderProducts', function($query) use ($exceptionProductIds) {
            $query->whereIn('id', $exceptionProductIds);
        })->count();

        $intakes = Intake::whereDate('updated_at', '<', $intakesCleanupOlderThen)->count();
        $opportunities = Opportunity::whereDate('updated_at', '<', $opportunitiesCleanupOlderThen)->count();
        $participationsWithStatus = ParticipantProject::whereIn('status_id', $participationsStatusses)->whereDate('updated_at', '<', $participationsWithStatusCleanupOlderThen)->count();
        $participationsFinished = ParticipantProject::whereNotNull('date_terminated')->whereDate('date_terminated', '<', $participationsFinishedCleanupOlderThen)->count();

        $return = [];
        $return['invoices'] = $invoices;
        $return['orders'] = $ordersOneoff + $ordersPeriodic;
        $return['intakes'] = $intakes;
        $return['opportunities'] = $opportunities;
        $return['participationsWithStatus'] = $participationsWithStatus;
        $return['participationsFinished'] = $participationsFinished;

        return $return;
    }

    public function getLastCleanupDates(){
        $cooperation = Cooperation::first();

        $invoicesLastCleanupDate = $cooperation->cleanup_invoices_last_run_at !== null ? Carbon::parse($cooperation->cleanup_invoices_last_run_at)->format('d-m-Y H:i:s') : 'nooit';
        $ordersOneoffLastCleanupDate = $cooperation->cleanup_oneoff_orders_last_run_at !== null ? Carbon::parse($cooperation->cleanup_oneoff_orders_last_run_at)->format('d-m-Y H:i:s') : 'nooit';
        $ordersPeriodicLastCleanupDate = $cooperation->cleanup_periodic_orders_last_run_at !== null ? Carbon::parse($cooperation->cleanup_periodic_orders_last_run_at)->format('d-m-Y H:i:s') : 'nooit';
        $intakesLastCleanupDate = $cooperation->cleanup_intakes_last_run_at !== null ? Carbon::parse($cooperation->cleanup_intakes_last_run_at)->format('d-m-Y H:i:s') : 'nooit';
        $opportunitiesLastCleanupDate = $cooperation->cleanup_opportunities_last_run_at !== null ? Carbon::parse($cooperation->cleanup_opportunities_last_run_at)->format('d-m-Y H:i:s') : 'nooit';
        $participationsWithStatusLastCleanupDate = $cooperation->cleanup_participations_change_date_last_run_at !== null ? Carbon::parse($cooperation->cleanup_participations_change_date_last_run_at)->format('d-m-Y H:i:s') : 'nooit';
        $participationsFinishedLastCleanupDate = $cooperation->cleanup_participations_termination_date_last_run_at !== null ? Carbon::parse($cooperation->cleanup_participations_termination_date_last_run_at)->format('d-m-Y H:i:s') : 'nooit';

        $return = [];
        $return['invoices'] = $invoicesLastCleanupDate;
        $return['ordersOneOff'] = $ordersOneoffLastCleanupDate;
        $return['ordersPeriodic'] = $ordersPeriodicLastCleanupDate;
        $return['intakes'] = $intakesLastCleanupDate;
        $return['opportunities'] = $opportunitiesLastCleanupDate;
        $return['participationsWithStatus'] = $participationsWithStatusLastCleanupDate;
        $return['participationsFinished'] = $participationsFinishedLastCleanupDate;

        return $return;
    }

    public function getCleanupYears(){
        $cooperation = Cooperation::first();

        $invoicesCleanupYears = $cooperation->cleanup_years_invoices_date_send;
        $ordersOneoffCleanupYears = $cooperation->cleanup_years_oneoff_orders_start_date;
        $ordersPeriodicCleanupYears = $cooperation->cleanup_years_periodic_orders_termination_date;
        $intakesCleanupYears = $cooperation->cleanup_years_intakes_mutation_date;
        $opportunitiesCleanupYears = $cooperation->cleanup_years_opportunities_mutation_date;
        $participationsWithStatusCleanupYears = $cooperation->cleanup_years_participations_change_date;
        $participationsFinishedCleanupYears = $cooperation->cleanup_years_participations_termination_date;

        $return = [];
        $return['invoices'] = $invoicesCleanupYears;
        $return['ordersOneOff'] = $ordersOneoffCleanupYears;
        $return['ordersPeriodic'] = $ordersPeriodicCleanupYears;
        $return['intakes'] = $intakesCleanupYears;
        $return['opportunities'] = $opportunitiesCleanupYears;
        $return['participationsWithStatus'] = $participationsWithStatusCleanupYears;
        $return['participationsFinished'] = $participationsFinishedCleanupYears;

        return $return;
    }

    public function cleanupItems($cleanupType){
        $dateToday = Carbon::now();
        $cooporation = Cooperation::first();

        $errorMessageArray = [];

        if($cleanupType === 'invoices') {
            $cleanupYears = $cooporation->cleanup_years_invoices_date_send;
            $cleanupDate = $dateToday->copy()->subYears($cleanupYears);

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
            $cleanupYears = $cooporation->cleanup_years_intakes_mutation_date;
            $cleanupDate = $dateToday->copy()->subYears($cleanupYears);

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
            $cleanupYears = $cooporation->cleanup_years_opportunities_mutation_date;
            $cleanupDate = $dateToday->copy()->subYears($cleanupYears);

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
            $cleanupYears = $cooporation->cleanup_years_participations_termination_date;
            $cleanupDate = $dateToday->copy()->subYears($cleanupYears);

            $participantProjects = ParticipantProject::whereNotNull('date_terminated')->whereDate('date_terminated', '<', $cleanupDate)->get();

            foreach($participantProjects as $participantProject) {
                $deleteParticipation = new DeleteParticipation($participantProject);
                $errorMessage = $deleteParticipation->cleanup('participationsFinished');
                if(is_array($errorMessage)) {
                    $errorMessageArray = array_merge($errorMessageArray,$errorMessage);
                }
            }
        }

        if($cleanupType === 'participationsWithStatus') {
            $cleanupYears = $cooporation->cleanup_years_participations_termination_date;
            $cleanupDate = $dateToday->copy()->subYears($cleanupYears);

            $participationsStatusses = ParticipantMutationStatus::whereIn('code_ref', ['interest','option','granted'])->pluck('id');
            $participantProjects = ParticipantProject::whereIn('status_id', $participationsStatusses)->whereDate('updated_at', '<', $cleanupDate)->get();

            foreach($participantProjects as $participantProject) {
                $deleteParticipation = new DeleteParticipation($participantProject);
                $errorMessage = $deleteParticipation->cleanup('participationsWithStatus');
                if(is_array($errorMessage)) {
                    $errorMessageArray = array_merge($errorMessageArray,$errorMessage);
                }
            }
        }

        if($cleanupType === 'orders') {
            $cleanupYearsOrdersOneoff = $cooporation->cleanup_years_oneoff_orders_start_date;
            $cleanupYearsOrdersPeriodic = $cooporation->cleanup_years_periodic_orders_termination_date;

            $cleanupDateOrdersOneoff = $dateToday->copy()->subYears($cleanupYearsOrdersOneoff);
            $cleanupDateOrdersPeriodic = $dateToday->copy()->subYears($cleanupYearsOrdersPeriodic);

            $exceptionProductIds = Product::where('cleanup_exception', 1)->pluck('id');

            $ordersOneoff = Order::where('collection_frequency_id', 'once')->whereDate('date_next_invoice', '<', $cleanupDateOrdersOneoff)->whereDoesntHave('orderProducts', function($query) use ($exceptionProductIds) {
                $query->whereIn('id', $exceptionProductIds);
            })->get();
            $ordersPeriodic = Order::whereNot('collection_frequency_id', 'once')->where('status_id', 'closed')->whereDate('date_next_invoice', '<', $cleanupDateOrdersPeriodic)->whereDoesntHave('orderProducts', function($query) use ($exceptionProductIds) {
                $query->whereIn('id', $exceptionProductIds);
            })->get();

            $orders = $ordersOneoff->merge($ordersPeriodic);

            foreach($orders as $order) {
                $deleteOrder = new DeleteOrder($order);
                $errorMessage = $deleteOrder->cleanup();
                if(is_array($errorMessage)) {
                    $errorMessageArray = array_merge($errorMessageArray,$errorMessage);
                }
            }
        }

        return $errorMessageArray;
    }
}
