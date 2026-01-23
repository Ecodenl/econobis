<?php

namespace App\Http\Controllers\Api\Cleanup;

use App\Eco\Cooperation\Cooperation;
use App\Exceptions\CleanupItemFailed;
use App\Helpers\CleanupItem\CleanupItemHelper;
use App\Helpers\Delete\Models\DeleteContact;
use App\Helpers\Delete\Models\DeleteFinancialOverview;
use App\Helpers\Delete\Models\DeleteHousingFile;
use App\Helpers\Delete\Models\DeleteIntake;
use App\Helpers\Delete\Models\DeleteInvoice;
use App\Helpers\Delete\Models\DeleteMail;
use App\Helpers\Delete\Models\DeleteOpportunity;
use App\Helpers\Delete\Models\DeleteOrder;
use App\Helpers\Delete\Models\DeleteParticipation;
use App\Helpers\Delete\Models\DeletePaymentInvoice;
use App\Helpers\Delete\Models\DeleteRevenue;
use App\Helpers\Delete\Models\DeleteRevenuesKwh;
use App\Helpers\Delete\Models\DeleteTask;
use App\Http\Controllers\Controller;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Throwable;

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
                $this->runCleanup($invoices, fn ($invoice) => new DeleteInvoice($invoice), $errorMessageArray);
                break;

            case "ordersOneoff":
                $ordersOneoff = $cleanupItemHelper->getOrdersOneoffToDelete()->get();
                $this->runCleanup($ordersOneoff, fn ($order) => new DeleteOrder($order), $errorMessageArray);
                break;

            case "ordersPeriodic":
                $ordersPeriodic = $cleanupItemHelper->getOrdersPeriodicToDelete()->get();
                $this->runCleanup($ordersPeriodic, fn ($order) => new DeleteOrder($order), $errorMessageArray);
                break;

            case "financialOverviews":
                $financialOverviews = $cleanupItemHelper->getFinancialOverviewsToDelete()->get();
                $this->runCleanup($financialOverviews, fn ($financialOverview) => new DeleteFinancialOverview($financialOverview), $errorMessageArray);
                break;

            case "tasks":
                $tasks = $cleanupItemHelper->getTasksToDelete()->get();
                $this->runCleanup($tasks, fn ($task) => new DeleteTask($task), $errorMessageArray);
                break;

            case "opportunities":
                $opportunities = $cleanupItemHelper->getOpportunitiesToDelete()->get();
                $this->runCleanup($opportunities, fn ($opportunity) => new DeleteOpportunity($opportunity), $errorMessageArray);
                break;

            case "intakes":
                $intakes = $cleanupItemHelper->getIntakesToDelete()->get();
                $this->runCleanup($intakes, fn ($intake) => new DeleteIntake($intake), $errorMessageArray);
                break;

            case "housingFiles":
                $housingFiles = $cleanupItemHelper->getHousingFilesToDelete()->get();
                $this->runCleanup($housingFiles, fn ($housingFile) => new DeleteHousingFile($housingFile), $errorMessageArray);
                break;

            case "paymentInvoices":
                $paymentInvoices = $cleanupItemHelper->getPaymentInvoicesToDelete()->get();
                $this->runCleanup($paymentInvoices, fn ($paymentInvoice) => new DeletePaymentInvoice($paymentInvoice), $errorMessageArray);
                break;

            case "revenues":
                $revenues = $cleanupItemHelper->getRevenuesToDelete()->get();
                $this->runCleanup($revenues, fn ($revenue) => new DeleteRevenue($revenue), $errorMessageArray);
                break;

            case "revenuesKwh":
                $revenuesKwh = $cleanupItemHelper->getRevenuesKwhToDelete()->get();
                $this->runCleanup($revenuesKwh, fn ($revenueKwh) => new DeleteRevenuesKwh($revenueKwh), $errorMessageArray);
                break;

            case "participationsWithoutStatusDefinitive":
                $participantProjects = $cleanupItemHelper->getParticipationsWithoutStatusDefinitiveToDelete()->get();
                $this->runCleanup($participantProjects, fn ($participantProject) => new DeleteParticipation($participantProject), $errorMessageArray);
                break;

            case "participationsFinished":
                $participantProjects = $cleanupItemHelper->getParticipationsFinishedToDelete()->get();
                $this->runCleanup($participantProjects, fn ($participantProject) => new DeleteParticipation($participantProject), $errorMessageArray);
                break;

            case "incomingEmails":
                $mails = $cleanupItemHelper->getIncomingEmailsToDelete()->get();
                $this->runCleanup($mails, fn ($mail) => new DeleteMail($mail), $errorMessageArray);
                break;

            case "outgoingEmails":
                $mails = $cleanupItemHelper->getOutgoingEmailsToDelete()->get();
                $this->runCleanup($mails, fn ($mail) => new DeleteMail($mail), $errorMessageArray);
                break;

            case "contactsToDelete":
                $contacts = $cleanupItemHelper->getContactsToDeleteToDelete()->get();
                $this->runCleanup($contacts, fn ($contact) => new DeleteContact($contact), $errorMessageArray);
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

        $errorMessageArray = array_values(array_unique($errorMessageArray));

        Log::info('errorMessageArray');
        Log::info($errorMessageArray);

        $cleanupItem->date_cleaned_up = $dateToday;
        $cleanupItem->save();

        $cleanupItemHelper->updateAmountsPerType();

        if (!empty($errorMessageArray)) {
            abort(412, implode(';', array_unique($errorMessageArray)));
        }

        return [];
    }

    private function runCleanup(iterable $items, callable $makeDeleter, array &$errorMessageArray = []): void
    {
        foreach ($items as $item) {
            try {
                DB::transaction(function () use ($item, $makeDeleter, &$errorMessageArray) {
                    $deleter = $makeDeleter($item);
                    $errorMessage = $deleter->cleanup();

                    $errors = is_array($errorMessage)
                        ? $errorMessage
                        : (empty($errorMessage) ? [] : [(string) $errorMessage]);

                    if (!empty($errors)) {
                        $errorMessageArray = array_merge($errorMessageArray, $errors);

                        // rollback voor dit item
                        throw new CleanupItemFailed();
                    }
                });
            } catch (\PDOException $e) {
                Log::error($e->getMessage());
                abort(501, 'Er is helaas een fout opgetreden.');
            } catch (CleanupItemFailed $e) {
                // expected: rollback gedaan, ga door met volgende item
                continue;
            } catch (Throwable $e) {
                // onverwacht -> loggen + stoppen (mijn advies)
                Log::error($e->getMessage(), ['exception' => $e]);
                abort(501, 'Er is helaas een fout opgetreden.');
            }
        }
    }
}
