<?php

namespace App\Http\Controllers\Api\Cleanup;

use App\Eco\Cooperation\Cooperation;
use App\Eco\Intake\Intake;
use App\Eco\Invoice\Invoice;
use App\Eco\Opportunity\Opportunity;
use App\Eco\Order\Order;
use App\Eco\ParticipantMutation\ParticipantMutation;
use App\Eco\ParticipantMutation\ParticipantMutationStatus;
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
        $ordersOneoff = Order::where('collection_frequency_id', 'once')->whereDate('date_next_invoice', '<', $ordersOneoffCleanupOlderThen)->count();
        $ordersPeriodic = Order::whereNot('collection_frequency_id', 'once')->where('status_id', 'closed')->whereDate('date_next_invoice', '<', $ordersPeriodicCleanupOlderThen)->count();
        $intakes = Intake::whereDate('updated_at', '<', $intakesCleanupOlderThen)->count();
        $opportunities = Opportunity::whereDate('updated_at', '<', $opportunitiesCleanupOlderThen)->count();
        $participationsWithStatus = ParticipantMutation::whereIn('status_id', $participationsStatusses)->whereDate('updated_at', '<', $participationsWithStatusCleanupOlderThen)->count();
        $participationsFinished = ParticipantMutation::whereHas('participation', function ($query) use($participationsFinishedCleanupOlderThen) {
            $query->whereNotNull('date_terminated')->whereDate('date_terminated', '<', $participationsFinishedCleanupOlderThen);
        })->count();

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
}
