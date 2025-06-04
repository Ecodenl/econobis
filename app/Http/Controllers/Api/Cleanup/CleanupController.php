<?php

namespace App\Http\Controllers\Api\Cleanup;

use App\Eco\Cooperation\Cooperation;
use App\Eco\Intake\Intake;
use App\Eco\Invoice\Invoice;
use App\Eco\Opportunity\Opportunity;
use App\Eco\Order\Order;
use App\Eco\ParticipantProject\ParticipantProject;
use App\Http\Controllers\Controller;

class CleanupController extends Controller
{
    public function getCleanupAmounts(){
        $dateToday = \Carbon\Carbon::now();
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

        $participationsCleanupYears = $cooperation->cleanup_years_participations_change_date;
        $participationsCleanupOlderThen = $dateToday->copy()->subYears($participationsCleanupYears);

        $invoices = Invoice::whereDate('date_sent', '<', $invoicesCleanupOlderThen)->count();
        $ordersOneoff = Order::where('collection_frequency_id', 'once')->whereDate('date_next_invoice', '<', $ordersOneoffCleanupOlderThen)->count();
        $ordersPeriodic = Order::whereNot('collection_frequency_id', 'once')->where('status_id', 'closed')->whereDate('date_next_invoice', '<', $ordersPeriodicCleanupOlderThen)->count();
        $intakes = Intake::whereDate('updated_at', '<', $intakesCleanupOlderThen)->count();
        $opportunities = Opportunity::whereDate('updated_at', '<', $opportunitiesCleanupOlderThen)->count();
        $participationsWithStatus = ParticipantProject::whereDate('updated_at', '<', $participationsCleanupOlderThen)->count();
        $participationsFinished = ParticipantProject::whereDate('updated_at', '<', $participationsCleanupOlderThen)->count();

        $return = [];
        $return['invoices'] = $invoices;
        $return['orders'] = $ordersOneoff + $ordersPeriodic;
        $return['intakes'] = $intakes;
        $return['opportunities'] = $opportunities;
        $return['participationsWithStatus'] = $participationsWithStatus;
        $return['participationsFinished'] = $participationsFinished;

        return $return;
    }
}
