<?php

use App\Eco\Invoice\Invoice;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Str;

class SeedEmptyInvoiceCode extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $invoices = Invoice::all();

        foreach ($invoices as $invoice){
            if($invoice->code == null || empty($invoice->code)){
                $invoice->code = Str::random(32);
                $invoice->save();
            }
        }
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
    }
}
