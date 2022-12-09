<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class ChangeDateApprovedFieldsInQuotationRequestsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('quotation_requests', function (Blueprint $table) {
            $table->dateTime('date_approved_external')->change();
            $table->dateTime('date_approved_project_manager')->change();
            $table->dateTime('date_approved_client')->change();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('quotation_requests', function (Blueprint $table) {
            $table->date('date_approved_external')->change();
            $table->date('date_approved_project_manager')->change();
            $table->date('date_approved_client')->change();
        });
    }
}
