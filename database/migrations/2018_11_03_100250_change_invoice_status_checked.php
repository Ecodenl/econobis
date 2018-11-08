<?php

use App\Eco\Invoice\Invoice;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class ChangeInvoiceStatusChecked extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $invoicesChecked = Invoice::where('status_id', 'checked')->get();

        foreach($invoicesChecked as $invoiceChecked){
            $invoiceChecked->status_id = 'to-send';
            $invoiceChecked->save();
        }
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {

    }
}
