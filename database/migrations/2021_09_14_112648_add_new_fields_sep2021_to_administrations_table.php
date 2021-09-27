<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddNewFieldsSep2021ToAdministrationsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('administrations', function (Blueprint $table) {
            $table->date('date_sync_twinfield_invoices')->nullable()->default(null)->after('date_sync_twinfield_payments');
            $table->string('prefix_invoice_number', 5)->default('F')->after('administration_number')->after('number_of_invoice_reminders');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('administrations', function (Blueprint $table) {
            $table->dropColumn('date_sync_twinfield_invoices');
            $table->dropColumn('prefix_invoice_number');
        });
    }
}
