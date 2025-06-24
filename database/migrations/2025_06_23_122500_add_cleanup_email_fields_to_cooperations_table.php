<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddCleanupEmailFieldsToCooperationsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('cooperations', function (Blueprint $table) {
            $table->boolean('cleanup_email')->after('cleanup_participations_termination_date_last_run_at')->default(0);
            $table->unsignedInteger('cleanup_years_email_incoming')->after('cleanup_email')->nullable();
            $table->datetime('cleanup_years_email_incoming_date_last_run_at')->after('cleanup_years_email_incoming')->nullable();
            $table->unsignedInteger('cleanup_years_email_outgoing')->after('cleanup_years_email_incoming')->nullable();
            $table->datetime('cleanup_years_email_outgoing_date_last_run_at')->after('cleanup_years_email_outgoing')->nullable();
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
            $table->dropColumn('cleanup_email');
            $table->dropColumn('cleanup_years_email_incoming');
            $table->dropColumn('cleanup_years_email_incoming_date_last_run_at');
            $table->dropColumn('cleanup_years_email_outgoing');
            $table->dropColumn('cleanup_years_email_outgoing_date_last_run_at');
        });
    }
}
