<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddFocIdsToFinancialOverviewPostTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('financial_overview_post', function (Blueprint $table) {
            $table->text('financial_overview_contact_ids')->after('financial_overview_id');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        if (Schema::hasColumn('financial_overview_post', 'financial_overview_contact_ids'))
        {
            Schema::table('financial_overview_post', function (Blueprint $table)
            {
                $table->dropColumn('financial_overview_contact_ids');
            });
        }

    }
}
