<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class MoveMollieCodeToInvoicesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('invoice_mollie_payments', function (Blueprint $table) {
            $table->dropColumn('code');
        });

        Schema::table('invoices', function (Blueprint $table) {
            $table->string('code');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('invoice_mollie_payments', function (Blueprint $table) {
            $table->string('code');
        });

        Schema::table('invoices', function (Blueprint $table) {
            $table->dropColumn('code');
        });
    }
}
