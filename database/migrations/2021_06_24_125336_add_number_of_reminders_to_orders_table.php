<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddNumberOfRemindersToOrdersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('orders', function (Blueprint $table) {
            $table->smallInteger('number_of_invoice_reminders')->nullable()->default(null)->after('invoice_text');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        if (Schema::hasColumn('orders', 'number_of_invoice_reminders')) {
            Schema::table('orders', function (Blueprint $table) {
                $table->dropColumn('number_of_invoice_reminders');
            });
        }
    }
}
