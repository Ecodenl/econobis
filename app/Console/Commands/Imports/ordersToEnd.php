<?php

namespace App\Console\Commands\Imports;

use App\Eco\Contact\Contact;
use App\Eco\Intake\Intake;
use App\Eco\Opportunity\Opportunity;
use App\Eco\Order\Order;
use App\Eco\User\User;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class ordersToEnd extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'orders:setOrdersToEnd';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Set orders to End';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {

// CREATE TABLE `_orders_to_end` (
// `contact_id` int(10) unsigned NOT NULL,
// `order_id` int(10) unsigned NOT NULL,
// `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL
// ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

        Log::info('Set orders to End');

        Auth::setUser(User::find(1));

//        Loop door tabel _orders_to_end.
        $endOrders = DB::table('_orders_to_end')->get();
        foreach($endOrders as $endOrder) {

            $contactId = $endOrder->contact_id;
            $orderId = $endOrder->order_id;
            $email = $endOrder->email;

            $order = Order::where('id', $orderId)
                ->where('contact_id', $contactId)
                ->where('deleted_at', null)
                ->first();

            if(!$order){
                Log::info('Order not found inzake contactId: ' . $contactId . ' - Email: ' . $email  . ' - OrderId: ' . $orderId );
                Log::info('Order not found!');
            } elseif ($order->status_id == 'closed'){
                Log::info('Order al beeindigt inzake contactid: ' . $contactId . ' - Email: ' . $email  . ' - OrderId: ' . $orderId );
            } else {
                if($order->contact->primaryEmailAddress->email != $email){
                    Log::info('verschil email: ' . $order->contact->primaryEmailAddress->email );
                }

                $order->status_id = 'closed';
                $order->date_next_invoice = null;
                $order->save();
                Log::info('Order beeindigt inzake contactid: ' . $contactId . ' - Email: ' . $email  . ' - OrderId: ' . $orderId );

                foreach ($order->orderProducts as $orderProduct) {
                    $orderProduct->date_end = '2022-09-30';
                    $orderProduct->save();
                    Log::info('Orderproduct (id: ' . $orderProduct->id . ') beeindigt op 30-09-2022');
                }
                foreach ($order->invoices as $invoice) {
                    if( $invoice->status_id == 'sent'){
                        $invoice->status_id = 'irrecoverable';
                        $invoice->save();
                        Log::info('Verzonden nota (id: ' . $invoice->id . ') op oninbaar gezet');
                    }
                }

            }

        }

    }
}
