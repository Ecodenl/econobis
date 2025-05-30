<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddCleanupYearsFieldsToCooperationsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('cooperations', function (Blueprint $table) {
            $table->unsignedInteger('cleanup_years_invoices_date_send')->default(7);
            $table->unsignedInteger('cleanup_years_oneoff_orders_start_date')->default(7);
            $table->unsignedInteger('cleanup_years_periodic_orders_termination_date')->default(7);
            $table->unsignedInteger('cleanup_years_intakes_mutation_date')->default(7);
            $table->unsignedInteger('cleanup_years_opportunities_mutation_date')->default(7);
            $table->unsignedInteger('cleanup_years_participations_change_date')->default(7);
            $table->unsignedInteger('cleanup_years_participations_termination_date')->default(7);
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
            $table->dropColumn('cleanup_years_invoices_date_send');
            $table->dropColumn('cleanup_years_oneoff_orders_start_date');
            $table->dropColumn('cleanup_years_periodic_orders_termination_date');
            $table->dropColumn('cleanup_years_intakes_mutation_date');
            $table->dropColumn('cleanup_years_opportunities_mutation_date');
            $table->dropColumn('cleanup_years_participations_change_date');
            $table->dropColumn('cleanup_years_participations_termination_date');
        });
    }
}
