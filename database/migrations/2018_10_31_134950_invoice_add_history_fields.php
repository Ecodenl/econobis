<?php

use App\Eco\Invoice\Invoice;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class InvoiceAddHistoryFields extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('invoices', function (Blueprint $table) {
            $table->string('subject')->nullable();
            $table->string('iban')->nullable();
            $table->string('invoice_text')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {

        Schema::table('invoices', function (Blueprint $table) {
            $table->dropColumn('subject');
            $table->dropColumn('iban');
            $table->dropColumn('invoice_text');
        });

    }
}
