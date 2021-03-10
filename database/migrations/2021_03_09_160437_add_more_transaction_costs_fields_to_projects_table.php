<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddMoreTransactionCostsFieldsToProjectsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('projects', function (Blueprint $table) {
            $table->double('transaction_costs_amount_max', 10, 2)->nullable()->after('transaction_costs_code_ref');
            $table->double('transaction_costs_amount_min', 10, 2)->nullable()->after('transaction_costs_code_ref');
            $table->double('transaction_costs_percentage_3', 10, 2)->nullable()->after('transaction_costs_percentage');
            $table->double('transaction_costs_amount_3', 10, 2)->nullable()->after('transaction_costs_percentage');
            $table->double('transaction_costs_percentage_2', 10, 2)->nullable()->after('transaction_costs_percentage');
            $table->double('transaction_costs_amount_2', 10, 2)->nullable()->after('transaction_costs_percentage');
        });

    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('projects', function (Blueprint $table) {
            $table->dropColumn('transaction_costs_amount_max');
            $table->dropColumn('transaction_costs_amount_min');
            $table->dropColumn('transaction_costs_percentage_3');
            $table->dropColumn('transaction_costs_amount_3');
            $table->dropColumn('transaction_costs_percentage_2');
            $table->dropColumn('transaction_costs_amount_2');
        });
    }
}
