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

        $ordersCleanupYears = $cooperation->cleanup_years_periodic_orders_termination_date;
        $ordersCleanupOlderThen = $dateToday->copy()->subYears($ordersCleanupYears);

        $intakesCleanupYears = $cooperation->cleanup_years_intakes_mutation_date;
        $intakesCleanupOlderThen = $dateToday->copy()->subYears($intakesCleanupYears);

        $opportunitiesCleanupYears = $cooperation->cleanup_years_opportunities_mutation_date;
        $opportunitiesCleanupOlderThen = $dateToday->copy()->subYears($opportunitiesCleanupYears);

        $participationsCleanupYears = $cooperation->cleanup_years_participations_change_date;
        $participationsCleanupOlderThen = $dateToday->copy()->subYears($participationsCleanupYears);

        $invoices = Invoice::whereDate('updated_at', '<', $invoicesCleanupOlderThen)->count();
        $orders = Order::whereDate('updated_at', '<', $ordersCleanupOlderThen)->count();
        $intakes = Intake::whereDate('updated_at', '<', $intakesCleanupOlderThen)->count();
        $opportunities = Opportunity::whereDate('updated_at', '<', $opportunitiesCleanupOlderThen)->count();
        $participationsWithStatus = ParticipantProject::whereDate('updated_at', '<', $participationsCleanupOlderThen)->count();
        $participationsFinished = ParticipantProject::whereDate('updated_at', '<', $participationsCleanupOlderThen)->count();

        $return = [];
        $return['invoices'] = $invoices;
        $return['orders'] = $orders;
        $return['intakes'] = $intakes;
        $return['opportunities'] = $opportunities;
        $return['participationsWithStatus'] = $participationsWithStatus;
        $return['participationsFinished'] = $participationsFinished;

        return $return;
    }
}
