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
use App\Eco\FinancialOverview\FinancialOverview;
use App\Eco\HousingFile\HousingFile;
use App\Eco\Intake\Intake;
use App\Eco\Invoice\Invoice;
use App\Eco\Opportunity\Opportunity;
use App\Eco\Order\Order;
use App\Eco\ParticipantMutation\ParticipantMutationStatus;
use App\Eco\ParticipantProject\ParticipantProject;
use App\Eco\PaymentInvoice\PaymentInvoice;
use App\Eco\Product\Product;
use App\Eco\Project\ProjectRevenue;
use App\Eco\RevenuesKwh\RevenuesKwh;
use App\Eco\Task\Task;
use App\Helpers\Settings\Request;
use Carbon\Carbon;
use Illuminate\Support\Facades\Log;

class CleanupItemHelper
{
    private $cleanupItem;
    private $cleanupDate;
    private $cooperation;


    public function __construct($cleanupItem = null)
    {
        $this->cleanupItem = $cleanupItem;

        $this->cleanupDate = Carbon::now();
        $this->cooperation = Cooperation::first();
    }

    public function updateAmountsAll()
    {
        $cleanupTypes = [
            'invoices',
            'ordersOneoff',
            'ordersPeriodic',
            'financialOverviews',
            'tasks',
            'opportunities',
            'intakes',
            'housingFiles',
            'paymentInvoices',
            'revenues',
            'revenuesKwh',
            'participationsWithoutStatusDefinitive',
            'participationsFinished',
            'incomingEmails',
            'outgoingEmails',
        ];
        $cleanupItems = $this->cooperation->cleanupItems()->whereIn('code_ref', $cleanupTypes)->get();

        foreach($cleanupItems as $cleanupItem) {
            $this->cleanupItem = $cleanupItem;
            $this->updateCleanupItem($this->getNumberItemsToDelete());
        }

        return true;

    }

    public function updateAmountsPerType()
    {
        if(!$this->cleanupItem) {
            return false;
        }

        $this->updateCleanupItem($this->getNumberItemsToDelete());

        return true;
    }

    /**
     * @param int $numberItemsToDelete
     * @return void
     */
    private function updateCleanupItem(int $numberItemsToDelete): void
    {
        $this->cleanupItem->number_of_items_to_delete = $numberItemsToDelete;
        $this->cleanupItem->date_determined = Carbon::now();
        $this->cleanupItem->save();
    }

    /**
     * @return int
     */
    private function getNumberItemsToDelete(): int
    {
        switch ($this->cleanupItem->code_ref) {
            case "invoices":
                $invoicesToDelete = $this->getInvoicesToDelete();
                $numberItemsToDelete = $invoicesToDelete->count();
                break;

            case "ordersOneoff":
                $ordersOneoffToDelete = $this->getOrdersOneoffToDelete();
                $numberItemsToDelete = $ordersOneoffToDelete->count();
                break;

            case "ordersPeriodic":
                $ordersPeriodicToDelete = $this->getOrdersPeriodicToDelete();
                $numberItemsToDelete = $ordersPeriodicToDelete->count();
                break;

            case "financialOverviews":
                $financialOverviewsToDelete = $this->getFinancialOverviewsToDelete();
                $numberItemsToDelete = $financialOverviewsToDelete->count();
                break;

            case "tasks":
                $tasksToDelete = $this->getTasksToDelete();
                $numberItemsToDelete = $tasksToDelete->count();
                break;

            case "opportunities":
                $opportunitiesToDelete = $this->getOpportunitiesToDelete();
                $numberItemsToDelete = $opportunitiesToDelete->count();
                break;

            case "intakes":
                $intakesToDelete = $this->getIntakesToDelete();
                $numberItemsToDelete = $intakesToDelete->count();
                break;

            case "housingFiles":
                $housingFilesToDelete = $this->getHousingFilesToDelete();
                $numberItemsToDelete = $housingFilesToDelete->count();
                break;

            case "paymentInvoices":
                $paymentInvoicesToDelete = $this->getPaymentInvoicesToDelete();
                $numberItemsToDelete = $paymentInvoicesToDelete->count();
                break;

            case "revenues":
                $revenuesToDelete = $this->getRevenuesToDelete();
                $numberItemsToDelete = $revenuesToDelete->count();
                break;

            case "revenuesKwh":
                $revenuesKwhToDelete = $this->getRevenuesKwhToDelete();
                $numberItemsToDelete = $revenuesKwhToDelete->count();
                break;

            case "participationsWithoutStatusDefinitive":
                $participationsWithoutStatusDefinitiveToDelete = $this->getParticipationsWithoutStatusDefinitiveToDelete();
                $numberItemsToDelete = $participationsWithoutStatusDefinitiveToDelete->count();
                break;

            case "participationsFinished":
                $participationsFinishedToDelete = $this->getParticipationsFinishedToDelete();
                $numberItemsToDelete = $participationsFinishedToDelete->count();
                break;

            case "incomingEmails":
                $incomingEmailsToDelete = $this->getIncomingEmailsToDelete();
                $numberItemsToDelete = $incomingEmailsToDelete->count();
                break;

            case "outgoingEmails":
                $outgoingEmailsToDelete = $this->getOutgoingEmailsToDelete();
                $numberItemsToDelete = $outgoingEmailsToDelete->count();
                break;

            case "contactsToDelete":
                $contactsToDeleteToDelete = $this->getContactsToDeleteToDelete();
                $numberItemsToDelete = $contactsToDeleteToDelete->count();
                break;

            case "contactsSoftDeleted":
                $contactsSoftDeletedToDelete = $this->getContactsSoftDeletedToDelete();
                $numberItemsToDelete = $contactsSoftDeletedToDelete->count();
                break;

            default:
                abort(501, 'Fout bij opschonen items, onbekend item: '. $this->cleanupItem->code_ref);

        }
        return $numberItemsToDelete;
    }

    /**
     * @return mixed
     */
    public function getInvoicesToDelete(): mixed
    {
        $invoicesCleanupYears = $this->cleanupItem->years_for_delete;
        $invoicesCleanupOlderThen = $this->cleanupDate->copy()->subYears($invoicesCleanupYears);
        $invoicesToDelete = Invoice::whereDate('date_sent', '<', $invoicesCleanupOlderThen);
        return $invoicesToDelete;
    }

    /**
     * @return mixed
     */
    public function getOrdersOneoffToDelete(): mixed
    {
        $ordersOneoffCleanupYears = $this->cleanupItem->years_for_delete;
        $ordersOneoffCleanupOlderThen = $this->cleanupDate->copy()->subYears($ordersOneoffCleanupYears);

        $exceptionProductIds = Product::where('cleanup_exception', 1)->pluck('id');

        $ordersOneoffToDelete = Order::where('collection_frequency_id', 'once')
            ->whereDate('date_next_invoice', '<', $ordersOneoffCleanupOlderThen)
            ->whereDoesntHave('orderProducts', function ($query) use ($exceptionProductIds) {
                $query->whereIn('id', $exceptionProductIds);
            });

        return $ordersOneoffToDelete;
    }

    /**
     * @return mixed
     */
    public function getOrdersPeriodicToDelete(): mixed
    {
        $ordersPeriodicCleanupYears = $this->cleanupItem->years_for_delete;
        $ordersPeriodicCleanupOlderThen = $this->cleanupDate->copy()->subYears($ordersPeriodicCleanupYears);

        $exceptionProductIds = Product::where('cleanup_exception', 1)->pluck('id');

        $ordersPeriodicToDelete = Order::whereNot('collection_frequency_id', 'once')
            ->where('status_id', 'closed')->whereDate('date_next_invoice', '<', $ordersPeriodicCleanupOlderThen)
            ->whereDoesntHave('orderProducts', function ($query) use ($exceptionProductIds) {
                $query->whereIn('id', $exceptionProductIds);
            });

        return $ordersPeriodicToDelete;
    }

    /**
     * @return mixed
     */
    public function getFinancialOverviewsToDelete(): mixed
    {
        $financialOverviewsCleanupYears = $this->cleanupItem->years_for_delete;
        $financialOverviewsCleanupOlderThen = $this->cleanupDate->copy()->subYears($financialOverviewsCleanupYears);
        $financialOverviewsToDelete = FinancialOverview::where('year', '<', $financialOverviewsCleanupOlderThen);
        return $financialOverviewsToDelete;
    }

    /**
     * @return mixed
     */
    public function getTasksToDelete(): mixed
    {
        $tasksCleanupYears = $this->cleanupItem->years_for_delete;
        $tasksCleanupOlderThen = $this->cleanupDate->copy()->subYears($tasksCleanupYears);

        $tasksToDelete = Task::whereDate('updated_at', '<', $tasksCleanupOlderThen);
        return $tasksToDelete;
    }

    /**
     * @return mixed
     */
    public function getOpportunitiesToDelete(): mixed
    {
        $opportunitiesCleanupYears = $this->cleanupItem->years_for_delete;
        $opportunitiesCleanupOlderThen = $this->cleanupDate->copy()->subYears($opportunitiesCleanupYears);

        $opportunitiesToDelete = Opportunity::whereDate('updated_at', '<', $opportunitiesCleanupOlderThen);
        return $opportunitiesToDelete;
    }

    /**
     * @return mixed
     */
    public function getIntakesToDelete(): mixed
    {
        $intakesCleanupYears = $this->cleanupItem->years_for_delete;
        $intakesCleanupOlderThen = $this->cleanupDate->copy()->subYears($intakesCleanupYears);

        $intakesToDelete = Intake::whereDate('updated_at', '<', $intakesCleanupOlderThen);
        return $intakesToDelete;
    }

    /**
     * @return mixed
     */
    public function getHousingFilesToDelete(): mixed
    {
        $housingFilesCleanupYears = $this->cleanupItem->years_for_delete;
        $housingFilesCleanupOlderThen = $this->cleanupDate->copy()->subYears($housingFilesCleanupYears);
        $housingFilesToDelete = HousingFile::whereDate('updated_at', '<', $housingFilesCleanupOlderThen);
        return $housingFilesToDelete;
    }

    /**
     * @return mixed
     */
    public function getPaymentInvoicesToDelete(): mixed
    {
        $paymentInvoicesCleanupYears = $this->cleanupItem->years_for_delete;
        $paymentInvoicesCleanupOlderThen = $this->cleanupDate->copy()->subYears($paymentInvoicesCleanupYears);
        $paymentInvoicesToDelete = PaymentInvoice::whereDate('created_at', '<', $paymentInvoicesCleanupOlderThen);
        return $paymentInvoicesToDelete;
    }

    /**
     * @return mixed
     */
    public function getRevenuesToDelete(): mixed
    {
        $revenuesCleanupYears = $this->cleanupItem->years_for_delete;
        $revenuesCleanupOlderThen = $this->cleanupDate->copy()->subYears($revenuesCleanupYears);
        $revenuesToDelete = ProjectRevenue::whereDate('date_end', '<', $revenuesCleanupOlderThen)
        ->where('status', 'processed');
        return $revenuesToDelete;
    }

    /**
     * @return mixed
     */
    public function getRevenuesKwhToDelete(): mixed
    {
        $revenuesKwhCleanupYears = $this->cleanupItem->years_for_delete;
        $revenuesKwhCleanupOlderThen = $this->cleanupDate->copy()->subYears($revenuesKwhCleanupYears);
        $revenuesKwhToDelete = RevenuesKwh::whereDate('date_end', '<', $revenuesKwhCleanupOlderThen)
        ->where('status', 'processed');
        return $revenuesKwhToDelete;
    }

    /**
     * @return mixed
     */
    public function getParticipationsWithoutStatusDefinitiveToDelete(): mixed
    {
        $participationsWithoutStatusDefinitiveCleanupYears = $this->cleanupItem->years_for_delete;
        $participationsWithoutStatusDefinitiveCleanupOlderThen = $this->cleanupDate->copy()->subYears($participationsWithoutStatusDefinitiveCleanupYears);

        $mutationStatusFinal = ParticipantMutationStatus::where('code_ref', 'final')->first()->id;

        $participationsWithoutStatusDefinitiveToDelete = ParticipantProject::whereNull('date_terminated')
            // géén mutatie met status 'final'
            ->whereDoesntHave('mutations', function ($query) use ($mutationStatusFinal) {
                $query->where('status_id', $mutationStatusFinal);
            })
            // wel mutaties, maar allemaal ouder dan 1 jaar
            ->whereHas('mutations', function ($query) use ($participationsWithoutStatusDefinitiveCleanupOlderThen) {
                $query->where('updated_at', '<', $participationsWithoutStatusDefinitiveCleanupOlderThen);
            });
        return $participationsWithoutStatusDefinitiveToDelete;
    }

    /**
     * @return mixed
     */
    public function getParticipationsFinishedToDelete(): mixed
    {
        $participationsFinishedCleanupYears = $this->cleanupItem->years_for_delete;
        $participationsFinishedCleanupOlderThen = $this->cleanupDate->copy()->subYears($participationsFinishedCleanupYears);

        $participationsFinishedToDelete = ParticipantProject::whereNotNull('date_terminated')
            ->whereDate('date_terminated', '<', $participationsFinishedCleanupOlderThen)
            // participation mag niet voorkomen in projectRevenue die nog geen status processed heeft.
            ->whereDoesntHave('projectRevenues', function ($query) {
                $query->where('project_revenues.status', '!=', 'processed');
            })
            // participation mag niet voorkomen in revenuesKwh die nog geen status processed heeft.
            ->whereDoesntHave('revenuesKwh', function ($query) {
                $query->where('revenues_kwh.status', '!=', 'processed');
            });
        return $participationsFinishedToDelete;
    }

    /**
     * @return mixed
     */
    public function getIncomingEmailsToDelete(): mixed
    {
        $incomingMailsCleanupYears = $this->cleanupItem->years_for_delete;
        $incomingMailsCleanupOlderThen = $this->cleanupDate->copy()->subYears($incomingMailsCleanupYears);

        $incomingEmailsToDelete = Email::whereNull('date_removed')->where('folder', 'inbox')->whereDate('created_at', '<', $incomingMailsCleanupOlderThen);
        return $incomingEmailsToDelete;
    }

    /**
     * @return mixed
     */
    public function getOutgoingEmailsToDelete(): mixed
    {
        $outgoingMailsCleanupYears = $this->cleanupItem->years_for_delete;
        $outgoingMailsCleanupOlderThen = $this->cleanupDate->copy()->subYears($outgoingMailsCleanupYears);

        $outgoingEmailsToDelete = Email::whereNull('date_removed')->where('folder', 'sent')->whereDate('created_at', '<', $outgoingMailsCleanupOlderThen);
        return $outgoingEmailsToDelete;
    }

    /**
     * @return mixed
     */
    public function getContactsToDeleteToDelete(): mixed
    {
        $contactsToDeleteCleanupYears = $this->cleanupItem->years_for_delete;
        $contactsToDeleteCleanupOlderThen = $this->cleanupDate->copy()->subYears($contactsToDeleteCleanupYears);

        $exceptionContactIds = [];
        foreach ($this->cooperation->cleanupContactsExcludedGroups as $cleanupContactsExcludedGroup) {
            $exceptionContactIds = array_unique(array_merge($exceptionContactIds, $cleanupContactsExcludedGroup->contactGroup->getAllContacts(true)));
        }

        $contactsToDeleteToDelete = Contact::whereDate('created_at', '<', $contactsToDeleteCleanupOlderThen)
            ->whereDoesntHave('invoices')
            ->whereDoesntHave('orders')
            ->whereDoesntHave('intakes')
            ->whereDoesntHave('opportunities') // gaan via intakes
            ->whereDoesntHave('quotationRequests')
            ->whereDoesntHave('participations')
            ->whereNotIn('id', $exceptionContactIds);
        return $contactsToDeleteToDelete;
    }

    /**
     * @return mixed
     */
//    private function getContactsSoftDeletedToDelete(): \Illuminate\Database\Eloquent\Builder
    public function getContactsSoftDeletedToDelete(): mixed
    {
//                $contactsSoftDeletedCleanupYears = $this->cleanupItem->years_for_delete;
//                $contactsSoftDeletedCleanupOlderThen = $this->cleanupDate->copy()->subYears($contactsSoftDeletedCleanupYears);
//                $numberItemsToDelete = Contact::onlyTrashed()->whereDate('created_at', '<', $contactsSoftDeletedCleanupOlderThen);
        $contactsSoftDeletedToDelete = Contact::onlyTrashed();

        return $contactsSoftDeletedToDelete;
    }

}