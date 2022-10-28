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
            $table->dateTime('date_planned')->nullable()->default(null)->after('opportunity_id');
            $table->date('date_approved_client')->nullable()->default(null)->after('date_released');;
            $table->date('date_approved_project_manage')->nullable()->default(null)->after('date_released');;
            $table->date('date_approved_external')->nullable()->default(null)->after('date_released');;
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
            $table->dropColumn('date_approved_project_manage');
            $table->dropColumn('date_approved_client');
        });
    }
}
