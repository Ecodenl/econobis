<?php

use App\Eco\Invoice\Invoice;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class SetIbanEncryptedInInvoicesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('invoices', function (Blueprint $table) {
            $table->text('iban')->change();
            $table->string('iban_old')->nullable();
        });

        $invoices = Invoice::withTrashed()->get();

        foreach ($invoices as $invoice){
            if($invoice->iban){
                $invoice->iban_old = $invoice->iban;
                $invoice->save();
            }
        }

        foreach ($invoices as $invoice){
            if($invoice->iban != null && $invoice->iban_old != null){
                $invoice->iban = $invoice->iban;
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
