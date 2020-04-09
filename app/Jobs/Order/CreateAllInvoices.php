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
    private $countOrders;
    private $ordersOk;
    private $ordersError;

    public function __construct($orders, $userId)
    {
        $this->orders = $orders;
        $this->userId = $userId;

        $countOrders = $orders ? $orders->count() : 0;
        $this->countOrders = $countOrders;
        $this->ordersOk = 0;
        $this->ordersError = 0;

        $jobLog = new JobsLog();
        $jobLog->value = "Start alle nota's (". $countOrders .") aanmaken vanuit orders.";
        $jobLog->job_category_id = 'create-invoice';
        $jobLog->user_id = $userId;
        $jobLog->save();
    }

    public function handle()
    {
        //user voor observer
        Auth::setUser(User::find($this->userId));

        foreach ($this->orders as $order){
            $jobLog = new JobsLog();
            $jobLog->value = 'Maak nota vanuit order ('.$order->number.').';
            $jobLog->job_category_id = 'create-invoice';
            $jobLog->user_id = $this->userId;
            $jobLog->save();

            if($order->status_id === 'in-progress') {
                $invoice = new Invoice();
                $invoice->status_id = 'to-send';
                $invoice->date_requested = $order->date_next_invoice;
                $invoice->order_id = $order->id;
                $invoice->collection_frequency_id = $order->collection_frequency_id;
                $invoice->save();

                InvoiceHelper::saveInvoiceProducts($invoice, $order);

                $this->ordersOk += 1;
                $jobLog = new JobsLog();
                $jobLog->value = 'Nota gemaakt vanuit order ('.$order->number.').';
                $jobLog->job_category_id = 'create-invoice';
                $jobLog->user_id = $this->userId;
                $jobLog->save();
            }else{
                $this->ordersError += 1;
                $jobLog = new JobsLog();
                $jobLog->value = 'Nota kon niet gemaakt worden vanuit order ('.$order->number.').';
                $jobLog->job_category_id = 'create-invoice';
                $jobLog->user_id = $this->userId;
                $jobLog->save();
            }
            // Order weer terug naar status active (ook als hij dus niet kon worden gemaakt.
            $order->status_id = 'active';
            $order->save();
        }

        $jobLog = new JobsLog();
        if($this->ordersError>0){
            $jobLog->value = "Fouten bij maken nota's vanuit orders. Gemaakte nota's: ".$this->ordersOk.". Niet gemaakte nota's: ".$this->ordersError."." ;
        }else{
            $jobLog->value = "Alle nota's (". $this->countOrders .") vanuit orders aangemaakt.";
        }
        $jobLog->job_category_id = 'create-invoice';
        $jobLog->user_id = $this->userId;
        $jobLog->save();
    }

    public function failed(\Exception $exception)
    {
        $jobLog = new JobsLog();
        $jobLog->value = "Nota's maken vanuit orders mislukt.";
        $jobLog->job_category_id = 'create-invoice';
        $jobLog->user_id = $this->userId;
        $jobLog->save();

        Log::error("Nota's maken mislukt: " . $exception->getMessage());
    }
}