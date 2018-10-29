<?php

use App\Eco\Invoice\Invoice;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class NewInvoiceFields extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('invoices', function (Blueprint $table) {
            $table->integer('days_to_expire')->nullable();
            $table->integer('days_last_reminder')->nullable();
        });

        $invoices = Invoice::withTrashed()->get();
        foreach ($invoices as $invoice){
            $invoice->setDaysLastReminder();
            $invoice->setDaysToExpire();
        }
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('invoices', function (Blueprint $table) {
            $table->dropColumn('days_to_expire');
            $table->dropColumn('days_last_reminder');
        });
    }
}
