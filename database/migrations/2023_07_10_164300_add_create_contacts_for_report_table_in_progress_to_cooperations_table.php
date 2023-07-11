<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddCreateContactsForReportTableInProgressToCooperationsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('cooperations', function (Blueprint $table) {
            $table->boolean('create_contacts_for_report_table_in_progress')->default(false);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('cooperations', function (Blueprint $table) {
            $table->dropColumn('create_contacts_for_report_table_in_progress');
        });
    }
}
