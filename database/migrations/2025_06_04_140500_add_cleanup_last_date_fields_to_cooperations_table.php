<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddCleanupLastDateFieldsToCooperationsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('cooperations', function (Blueprint $table) {
            $table->datetime('cleanup_invoices_last_run_at')->after('cleanup_years_invoices_date_send')->nullable();
            $table->datetime('cleanup_oneoff_orders_last_run_at')->after('cleanup_years_oneoff_orders_start_date')->nullable();
            $table->datetime('cleanup_periodic_orders_last_run_at')->after('cleanup_years_periodic_orders_termination_date')->nullable();
            $table->datetime('cleanup_intakes_last_run_at')->after('cleanup_years_intakes_mutation_date')->nullable();
            $table->datetime('cleanup_opportunities_last_run_at')->after('cleanup_years_opportunities_mutation_date')->nullable();
            $table->datetime('cleanup_participations_change_date_last_run_at')->after('cleanup_years_participations_change_date')->nullable();
            $table->datetime('cleanup_participations_termination_date_last_run_at')->after('cleanup_years_participations_termination_date')->nullable();
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
            $table->dropColumn('cleanup_invoices_last_run_at');
            $table->dropColumn('cleanup_oneoff_orders_last_run_at');
            $table->dropColumn('cleanup_periodic_orders_last_run_at');
            $table->dropColumn('cleanup_intakes_last_run_at');
            $table->dropColumn('cleanup_opportunities_last_run_at');
            $table->dropColumn('cleanup_participations_change_date_last_run_at');
            $table->dropColumn('cleanup_participations_termination_date_last_run_at');
        });
    }
}
