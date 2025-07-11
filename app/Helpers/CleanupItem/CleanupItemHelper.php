<?php
/**
 * Created by PhpStorm.
 * User: StagiarSoftware
 * Date: 27-9-2019
 * Time: 15:20
 */

namespace App\Helpers\CleanupItem;


use App\Eco\Cooperation\Cooperation;
use App\Eco\Email\Email;
use App\Eco\Intake\Intake;
use App\Eco\Invoice\Invoice;
use App\Eco\Opportunity\Opportunity;
use App\Eco\Order\Order;
use App\Eco\ParticipantMutation\ParticipantMutationStatus;
use App\Eco\ParticipantProject\ParticipantProject;
use App\Eco\Product\Product;
use App\Helpers\Settings\Request;
use Carbon\Carbon;
use Illuminate\Support\Facades\Log;

class CleanupItemHelper
{
    public function updateAmounts($cleanupType = null)
    {
        $dateToday = Carbon::now();
        $cooperation = Cooperation::first();

        if($cleanupType) {
            $cleanupItems = $cooperation->cleanupItems()->where('code_ref', $cleanupType)->get();
        } else {
            $cleanupItems = $cooperation->cleanupItems;
        }

        foreach($cleanupItems as $cleanupItem) {
            switch($cleanupItem->code_ref) {
                case "invoices":
                    $invoicesCleanupYears = $cleanupItem->years_for_delete;
                    $invoicesCleanupOlderThen = $dateToday->copy()->subYears($invoicesCleanupYears);
                    $invoices = Invoice::whereDate('date_sent', '<', $invoicesCleanupOlderThen)->count();

                    $cleanupItem->number_of_items_to_delete = $invoices;
                    $cleanupItem->date_determined = Carbon::now();
                    $cleanupItem->save();

                    break;

                case "ordersOneoff":
                    $ordersOneoffCleanupYears = $cleanupItem->years_for_delete;
                    $ordersOneoffCleanupOlderThen = $dateToday->copy()->subYears($ordersOneoffCleanupYears);

                    $exceptionProductIds = Product::where('cleanup_exception', 1)->pluck('id');

                    $ordersOneoff = Order::where('collection_frequency_id', 'once')->whereDate('date_next_invoice', '<', $ordersOneoffCleanupOlderThen)->whereDoesntHave('orderProducts', function($query) use ($exceptionProductIds) {
                        $query->whereIn('id', $exceptionProductIds);
                    })->count();

                    $cleanupItem->number_of_items_to_delete = $ordersOneoff;
                    $cleanupItem->date_determined = Carbon::now();
                    $cleanupItem->save();

                    break;

                case "ordersPeriodic":
                    $ordersPeriodicCleanupYears = $cleanupItem->years_for_delete;
                    $ordersPeriodicCleanupOlderThen = $dateToday->copy()->subYears($ordersPeriodicCleanupYears);

                    $exceptionProductIds = Product::where('cleanup_exception', 1)->pluck('id');

                    $ordersPeriodic = Order::whereNot('collection_frequency_id', 'once')->where('status_id', 'closed')->whereDate('date_next_invoice', '<', $ordersPeriodicCleanupOlderThen)->whereDoesntHave('orderProducts', function($query) use ($exceptionProductIds) {
                        $query->whereIn('id', $exceptionProductIds);
                    })->count();

                    $cleanupItem->number_of_items_to_delete = $ordersPeriodic;
                    $cleanupItem->date_determined = Carbon::now();
                    $cleanupItem->save();

                    break;

                case "intakes":
                    $intakesCleanupYears = $cleanupItem->years_for_delete;
                    $intakesCleanupOlderThen = $dateToday->copy()->subYears($intakesCleanupYears);

                    $intakes = Intake::whereDate('updated_at', '<', $intakesCleanupOlderThen)->count();

                    $cleanupItem->number_of_items_to_delete = $intakes;
                    $cleanupItem->date_determined = Carbon::now();
                    $cleanupItem->save();

                    break;

                case "opportunities":
                    $opportunitiesCleanupYears = $cleanupItem->years_for_delete;
                    $opportunitiesCleanupOlderThen = $dateToday->copy()->subYears($opportunitiesCleanupYears);

                    $opportunities = Opportunity::whereDate('updated_at', '<', $opportunitiesCleanupOlderThen)->count();

                    $cleanupItem->number_of_items_to_delete = $opportunities;
                    $cleanupItem->date_determined = Carbon::now();
                    $cleanupItem->save();

                    break;

                case "participationsWithoutStatusDefinitive":
                    $participationsWithoutStatusDefinitiveCleanupYears = $cleanupItem->years_for_delete;
                    $participationsWithoutStatusDefinitiveCleanupOlderThen = $dateToday->copy()->subYears($participationsWithoutStatusDefinitiveCleanupYears);

                    $mutationStatusFinal = ParticipantMutationStatus::where('code_ref', 'final')->first()->id;

                    $participationsWithoutStatusDefinitive = ParticipantProject::whereNull('date_terminated')
                        // géén mutatie met status 'final'
                        ->whereDoesntHave('mutations', function ($query) use ($mutationStatusFinal) {
                            $query->where('status_id', $mutationStatusFinal);
                        })
                        // wel mutaties, maar allemaal ouder dan 1 jaar
                        ->whereHas('mutations', function ($query) use ($participationsWithoutStatusDefinitiveCleanupOlderThen) {
                            $query->where('updated_at', '<', $participationsWithoutStatusDefinitiveCleanupOlderThen);
                        })
                        ->count();

                    $cleanupItem->number_of_items_to_delete = $participationsWithoutStatusDefinitive;
                    $cleanupItem->date_determined = Carbon::now();
                    $cleanupItem->save();

                    break;

                case "participationsFinished":
                    $participationsFinishedCleanupYears = $cleanupItem->years_for_delete;
                    $participationsFinishedCleanupOlderThen = $dateToday->copy()->subYears($participationsFinishedCleanupYears);

                    $participationsFinished = ParticipantProject::whereNotNull('date_terminated')
                        ->whereDate('date_terminated', '<', $participationsFinishedCleanupOlderThen)
                        // participation mag niet voorkomen in projectRevenue die nog geen status processed heeft.
                        ->whereDoesntHave('projectRevenues', function ($query) {
                            $query->where('project_revenues.status', '!=', 'processed');
                        })
                        // participation mag niet voorkomen in revenuesKwh die nog geen status processed heeft.
                        ->whereDoesntHave('revenuesKwh', function ($query) {
                            $query->where('revenues_kwh.status', '!=', 'processed');
                        })
                        ->count();

                    $cleanupItem->number_of_items_to_delete = $participationsFinished;
                    $cleanupItem->date_determined = Carbon::now();
                    $cleanupItem->save();

                    break;

                case "incomingEmails":
                    $incomingMailsCleanupYears = $cleanupItem->years_for_delete;
                    $incomingMailsCleanupOlderThen = $dateToday->copy()->subYears($incomingMailsCleanupYears);

                    $incomingMails = Email::whereNull('date_removed')->where('folder', 'inbox')->whereDate('created_at', '<', $incomingMailsCleanupOlderThen)->count();

                    $cleanupItem->number_of_items_to_delete = $incomingMails;
                    $cleanupItem->date_determined = Carbon::now();
                    $cleanupItem->save();

                    break;

                case "outgoingEmails":
                    $outgoingMailsCleanupYears = $cleanupItem->years_for_delete;
                    $outgoingMailsCleanupOlderThen = $dateToday->copy()->subYears($outgoingMailsCleanupYears);

                    $outgoingMails = Email::whereNull('date_removed')->where('folder', 'sent')->whereDate('created_at', '<', $outgoingMailsCleanupOlderThen)->count();

                    $cleanupItem->number_of_items_to_delete = $outgoingMails;
                    $cleanupItem->date_determined = Carbon::now();
                    $cleanupItem->save();

                    break;

                case "contacts":

                    break;

            }
        }

        return true;
    }

}