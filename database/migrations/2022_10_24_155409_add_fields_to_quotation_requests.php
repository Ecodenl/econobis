<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddFieldsToQuotationRequests extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('quotation_requests', function (Blueprint $table) {
            $table->dateTime('date_planned')->nullable()->default(null);
            $table->date('date_approved_external')->nullable()->default(null);
            $table->boolean('approved_project_manager')->default(false);
            $table->boolean('approved_client')->default(false);
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
            $table->dropColumn('date_planned');
            $table->dropColumn('date_approved_external');
            $table->dropColumn('approved_project_manager');
            $table->dropColumn('approved_client');
        });
    }
}
