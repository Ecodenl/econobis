<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 04-01-2018
 * Time: 16:06
 */

namespace App\Jobs\Revenue;

use App\Eco\Jobs\JobsLog;
use App\Eco\Project\ProjectRevenueDistribution;
use App\Eco\User\User;
use App\Http\Controllers\Api\PaymentInvoice\PaymentInvoiceController;
use App\Http\Controllers\Api\Project\ProjectRevenueController;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class CreatePaymentInvoices implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    private $distributionIds;
    private $datePayout;
    private $userId;
    private $description;

    public function __construct($distributionIds, $datePayout, $userId, $description = "")
    {
        $this->distributionIds = $distributionIds;
        $this->datePayout = $datePayout;
        $this->userId = $userId;
        $this->description = $description;

        $jobLog = new JobsLog();
        $jobLog->value = "Start uitkering nota's.";
        $jobLog->job_category_id = 'create-payment-invoice';
        $jobLog->user_id = $userId;
        $jobLog->save();
    }

    public function handle()
    {
        //user voor observer
        Auth::setUser(User::find($this->userId));

        $projectRevenueController = new ProjectRevenueController();
        //create invoices
        $distributions = new ProjectRevenueDistribution();
        foreach(array_chunk($this->distributionIds,900) as $chunk){
            $distributions = $distributions->orWhereIn('id', $chunk);
        }

        $createdInvoices = $projectRevenueController->createInvoices($distributions->get(), $this->datePayout, $this->description);

        if ($createdInvoices) {
            $paymentInvoiceController = new PaymentInvoiceController();
            $paymentInvoiceController->generateSepaFile(collect($createdInvoices));
        } else {
            $jobLog = new JobsLog();
            $jobLog->value = "Geen uitkering nota's gemaakt.";
            $jobLog->job_category_id = 'create-payment-invoice';
            $jobLog->user_id = $this->userId;
            $jobLog->save();
        }

        $jobLog = new JobsLog();
        $jobLog->value = "Uitkering nota's verwerkt.";
        $jobLog->job_category_id = 'create-payment-invoice';
        $jobLog->user_id = $this->userId;
        $jobLog->save();
    }

    public function failed(\Throwable $exception)
    {
        $jobLog = new JobsLog();
        $jobLog->value = "Uitkering nota's mislukt.";
        $jobLog->job_category_id = 'create-payment-invoice';
        $jobLog->user_id = $this->userId;
        $jobLog->save();

        Log::error("Uitkering nota's mislukt:" . $exception->getMessage());
    }
}