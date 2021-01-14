<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddPaymentReferenceToParticipantMutationsAndInvoicePaymentTables extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('participant_mutations', function (Blueprint $table) {
            $table->string('payment_reference')->after('date_payment')->nullable();
        });
        Schema::table('invoice_payment', function (Blueprint $table) {
            $table->string('payment_reference')->after('date_paid')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('participant_mutations', function (Blueprint $table) {
            $table->dropColumn('payment_reference');
        });
        Schema::table('invoice_payment', function (Blueprint $table) {
            $table->dropColumn('payment_reference');
        });
    }
}
