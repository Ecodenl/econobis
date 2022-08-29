<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddTwinfieldModifiedAndInProgressToInvoicePaymentTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('invoice_payment', function (Blueprint $table) {
            $table->boolean('in_progress')->default(false);
            $table->dateTime('twinfield_modified')->nullable()->default(null);
            $table->softdeletes();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('invoice_payment', function (Blueprint $table) {
            $table->dropColumn('in_progress');
            $table->dropColumn('twinfield_modified');
            $table->dropColumn('deleted_at');
        });
    }
}
