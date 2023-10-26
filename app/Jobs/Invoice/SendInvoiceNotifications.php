<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 04-01-2018
 * Time: 16:06
 */

namespace App\Jobs\Invoice;


use App\Eco\Email\Email;
use App\Eco\Jobs\JobsLog;
use App\Helpers\Invoice\InvoiceHelper;
use App\Http\Controllers\Api\Order\OrderController;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;

class SendInvoiceNotifications implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * @var Email
     */
    private $invoice;
    private $userId;
    private $contactInfo;

    public function __construct($invoice, $userId)
    {
        $this->invoice = $invoice;
        $this->userId = $userId;
        $orderController = new OrderController();
        $contactInfo = $orderController->getContactInfoForOrder($invoice->order->contact);
        $this->contactInfo = $contactInfo;

        $jobLog = new JobsLog();
        $jobLog->value = 'Start versturen herinnering nota ('.$invoice->number.') naar '.$contactInfo['contactPerson'].' ('.$invoice->order->contact_id.').';
        $jobLog->job_category_id = 'sent-invoice-reminder';
        $jobLog->user_id = $userId;
        $jobLog->save();
    }

    public function handle()
    {
        InvoiceHelper::sendNotification($this->invoice, $this->userId);

        $jobLog = new JobsLog();
        $jobLog->value = 'Herinnering nota ('.$this->invoice->number.') naar '.$this->contactInfo['contactPerson'].' ('.$this->invoice->order->contact_id.') verstuurd.';
        $jobLog->job_category_id = 'sent-invoice-reminder';
        $jobLog->user_id = $this->userId;
        $jobLog->save();
    }

    public function failed(\Throwable $exception)
    {
        $jobLog = new JobsLog();
        $jobLog->value = 'Versturen herinnering nota ('.$this->invoice->number.') naar '.$this->contactInfo['contactPerson'].' ('.$this->invoice->order->contact_id.') mislukt.';
        $jobLog->job_category_id = 'sent-invoice-reminder';
        $jobLog->user_id = $this->userId;
        $jobLog->save();

        Log::error($jobLog->value. ": " . $exception->getMessage());
    }
}