<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddNumberOfRemindersToInvoicesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('invoices', function (Blueprint $table) {
            $table->smallInteger('number_of_invoice_reminders')->default(3)->after('date_collection');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        if (Schema::hasColumn('invoices', 'number_of_invoice_reminders')) {
            Schema::table('invoices', function (Blueprint $table) {
                $table->dropColumn('number_of_invoice_reminders');
            });
        }
    }
}
