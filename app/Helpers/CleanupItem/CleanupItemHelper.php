<?php
/**
 * Created by PhpStorm.
 * User: StagiarSoftware
 * Date: 27-9-2019
 * Time: 15:20
 */

namespace App\Helpers\CleanupItem;


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
use App\Helpers\Settings\Request;
use Carbon\Carbon;
use Illuminate\Support\Facades\Log;

class CleanupItemHelper
{
    public function updateAmounts($cleanupType = null)
    {
        $dateToday = Carbon::now();
        $cooperation = Cooperation::first();

        if(!$cleanupType) {
            return false;
        }

        $cleanupItems = $cooperation->cleanupItems()->where('code_ref', $cleanupType)->get();

        foreach($cleanupItems as $cleanupItem) {
            $numberItemsToDelete = $this->getNumberItemsToDelete($cooperation, $cleanupItem, $dateToday);
            $this->updateCleanupItem($numberItemsToDelete, $cleanupItem);
        }

        return true;
    }

    public function updateAmountsAll()
    {
        $dateToday = Carbon::now();
        $cooperation = Cooperation::first();

        $cleanupTypes = [
            'invoices',
            'ordersOneoff',
            'ordersPeriodic',
            'intakes',
            'opportunities',
            'participationsWithoutStatusDefinitive',
            'participationsFinished',
            'incomingEmails',
            'outgoingEmails',
        ];
        $cleanupItems = $cooperation->cleanupItems()->whereIn('code_ref', $cleanupTypes)->get();

        foreach($cleanupItems as $cleanupItem) {
            $numberItemsToDelete = $this->getNumberItemsToDelete($cooperation, $cleanupItem, $dateToday);
            $this->updateCleanupItem($numberItemsToDelete, $cleanupItem);
        }

        return true;

    }

    /**
     * @param int $numberItemsToDelete
     * @param mixed $cleanupItem
     * @return void
     */
    private function updateCleanupItem(int $numberItemsToDelete, mixed $cleanupItem): void
    {
        $cleanupItem->number_of_items_to_delete = $numberItemsToDelete;
        $cleanupItem->date_determined = Carbon::now();
        $cleanupItem->save();
    }

    /**
     * @param mixed $cleanupItem
     * @param Carbon $dateToday
     * @return int
     */
    private function getNumberItemsToDelete(Cooperation $cooperation, mixed $cleanupItem, Carbon $dateToday): int
    {
        switch ($cleanupItem->code_ref) {
            case "invoices":
                $invoicesCleanupYears = $cleanupItem->years_for_delete;
                $invoicesCleanupOlderThen = $dateToday->copy()->subYears($invoicesCleanupYears);
                $numberItemsToDelete = Invoice::whereDate('date_sent', '<', $invoicesCleanupOlderThen)->count();
                break;

            case "ordersOneoff":
                $ordersOneoffCleanupYears = $cleanupItem->years_for_delete;
                $ordersOneoffCleanupOlderThen = $dateToday->copy()->subYears($ordersOneoffCleanupYears);

                $exceptionProductIds = Product::where('cleanup_exception', 1)->pluck('id');

                $numberItemsToDelete = Order::where('collection_frequency_id', 'once')->whereDate('date_next_invoice', '<', $ordersOneoffCleanupOlderThen)->whereDoesntHave('orderProducts', function ($query) use ($exceptionProductIds) {
                    $query->whereIn('id', $exceptionProductIds);
                })->count();
                break;

            case "ordersPeriodic":
                $ordersPeriodicCleanupYears = $cleanupItem->years_for_delete;
                $ordersPeriodicCleanupOlderThen = $dateToday->copy()->subYears($ordersPeriodicCleanupYears);

                $exceptionProductIds = Product::where('cleanup_exception', 1)->pluck('id');

                $numberItemsToDelete = Order::whereNot('collection_frequency_id', 'once')->where('status_id', 'closed')->whereDate('date_next_invoice', '<', $ordersPeriodicCleanupOlderThen)->whereDoesntHave('orderProducts', function ($query) use ($exceptionProductIds) {
                    $query->whereIn('id', $exceptionProductIds);
                })->count();
                break;

            case "intakes":
                $intakesCleanupYears = $cleanupItem->years_for_delete;
                $intakesCleanupOlderThen = $dateToday->copy()->subYears($intakesCleanupYears);

                $numberItemsToDelete = Intake::whereDate('updated_at', '<', $intakesCleanupOlderThen)->count();
                break;

            case "opportunities":
                $opportunitiesCleanupYears = $cleanupItem->years_for_delete;
                $opportunitiesCleanupOlderThen = $dateToday->copy()->subYears($opportunitiesCleanupYears);

                $numberItemsToDelete = Opportunity::whereDate('updated_at', '<', $opportunitiesCleanupOlderThen)->count();
                break;

            case "participationsWithoutStatusDefinitive":
                $participationsWithoutStatusDefinitiveCleanupYears = $cleanupItem->years_for_delete;
                $participationsWithoutStatusDefinitiveCleanupOlderThen = $dateToday->copy()->subYears($participationsWithoutStatusDefinitiveCleanupYears);

                $mutationStatusFinal = ParticipantMutationStatus::where('code_ref', 'final')->first()->id;

                $numberItemsToDelete = ParticipantProject::whereNull('date_terminated')
                    // géén mutatie met status 'final'
                    ->whereDoesntHave('mutations', function ($query) use ($mutationStatusFinal) {
                        $query->where('status_id', $mutationStatusFinal);
                    })
                    // wel mutaties, maar allemaal ouder dan 1 jaar
                    ->whereHas('mutations', function ($query) use ($participationsWithoutStatusDefinitiveCleanupOlderThen) {
                        $query->where('updated_at', '<', $participationsWithoutStatusDefinitiveCleanupOlderThen);
                    })
                    ->count();
                Log::info('participationsWithoutStatusDefinitive: ' . $numberItemsToDelete);
                break;

            case "participationsFinished":
                $participationsFinishedCleanupYears = $cleanupItem->years_for_delete;
                $participationsFinishedCleanupOlderThen = $dateToday->copy()->subYears($participationsFinishedCleanupYears);

                $numberItemsToDelete = ParticipantProject::whereNotNull('date_terminated')
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
                Log::info('participationsFinished: ' . $numberItemsToDelete);
                break;

            case "incomingEmails":
                $incomingMailsCleanupYears = $cleanupItem->years_for_delete;
                $incomingMailsCleanupOlderThen = $dateToday->copy()->subYears($incomingMailsCleanupYears);

                $numberItemsToDelete = Email::whereNull('date_removed')->where('folder', 'inbox')->whereDate('created_at', '<', $incomingMailsCleanupOlderThen)->count();
                break;

            case "outgoingEmails":
                $outgoingMailsCleanupYears = $cleanupItem->years_for_delete;
                $outgoingMailsCleanupOlderThen = $dateToday->copy()->subYears($outgoingMailsCleanupYears);

                $numberItemsToDelete = Email::whereNull('date_removed')->where('folder', 'sent')->whereDate('created_at', '<', $outgoingMailsCleanupOlderThen)->count();
                break;

            case "contactsToDelete":
                $contactsToDeleteCleanupYears = $cleanupItem->years_for_delete;
                $contactsToDeleteCleanupOlderThen = $dateToday->copy()->subYears($contactsToDeleteCleanupYears);

                $exceptionContactIds = [];
                foreach ($cooperation->cleanupContactsExcludedGroups as $cleanupContactsExcludedGroup) {
                    $exceptionContactIds = array_unique( array_merge($exceptionContactIds, $cleanupContactsExcludedGroup->contactGroup->getAllContacts(true)) );
                }

                $numberItemsToDelete = Contact::whereDate('created_at', '<', $contactsToDeleteCleanupOlderThen)
                    ->whereDoesntHave('invoices')
                    ->whereDoesntHave('orders')
                    ->whereDoesntHave('intakes')
//                ->whereDoesntHave('opportunities') // gaan via intakes
                    ->whereDoesntHave('quotationRequests')
                    ->whereDoesntHave('participations')
                    ->whereNotIn('id', $exceptionContactIds)
                    ->count();

                break;

            case "contactsSoftDeleted":
                $numberItemsToDelete = Contact::onlyTrashed()->count();
                break;

            default:
                abort(501, 'Fout bij opschonen items, onbekend item: '. $cleanupItem->code_ref);

        }
        return $numberItemsToDelete;
    }

}