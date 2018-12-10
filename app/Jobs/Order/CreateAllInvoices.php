<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 04-01-2018
 * Time: 16:06
 */

namespace App\Jobs\Order;


use App\Eco\Email\Email;
use App\Eco\Invoice\Invoice;
use App\Eco\Jobs\JobsLog;
use App\Eco\User\User;
use App\Helpers\Invoice\InvoiceHelper;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class CreateAllInvoices implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * @var Email
     */
    private $orders;
    private $userId;

    public function __construct($orders, $userId)
    {
        $this->orders = $orders;
        $this->userId = $userId;

        $jobLog = new JobsLog();
        $jobLog->value = 'Start alle facturen aanmaken.';
        $jobLog->user_id = $userId;
        $jobLog->save();
    }

    public function handle()
    {
        //user voor observer
        Auth::setUser(User::find($this->userId));

        foreach ($this->orders as $order){
            if($order->total_price_incl_vat >= 0 && $order->can_create_invoice) {
                $invoice = new Invoice();
                $invoice->status_id = 'to-send';
                $invoice->date_requested = $order->date_next_invoice;
                $invoice->order_id = $order->id;
                $invoice->collection_frequency_id = $order->collection_frequency_id;
                $invoice->save();

                InvoiceHelper::saveInvoiceProducts($invoice, $order);
            }
        }

        $jobLog = new JobsLog();
        $jobLog->value = 'Alle facturen aangemaakt.';
        $jobLog->user_id = $this->userId;
        $jobLog->save();
    }

    public function failed(\Exception $exception)
    {
        $jobLog = new JobsLog();
        $jobLog->value = 'Facturen maken mislukt.';
        $jobLog->user_id = $this->userId;
        $jobLog->save();

        Log::error('Facturen maken mislukt:' . $exception->getMessage());
    }
}