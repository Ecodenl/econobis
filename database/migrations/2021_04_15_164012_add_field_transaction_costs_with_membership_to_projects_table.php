<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddFieldTransactionCostsWithMembershipToProjectsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('projects', function (Blueprint $table) {
            $table->boolean('use_transaction_costs_with_membership')->default(false)->after('text_transaction_costs');
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
            //
        });
        if (Schema::hasColumn('projects', 'use_transaction_costs_with_membership'))
        {
            Schema::table('projects', function (Blueprint $table)
            {
                $table->dropColumn('use_transaction_costs_with_membership');
            });
        }

    }
}
