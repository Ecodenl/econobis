<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddNumberOfRemindersToAdministrationsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('administrations', function (Blueprint $table) {
            $table->smallInteger('number_of_invoice_reminders')->default(3)->after('default_payment_term');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
            if (Schema::hasColumn('administrations', 'number_of_invoice_reminders')) {
                Schema::table('administrations', function (Blueprint $table) {
                    $table->dropColumn('number_of_invoice_reminders');
                });
            }
    }
}
