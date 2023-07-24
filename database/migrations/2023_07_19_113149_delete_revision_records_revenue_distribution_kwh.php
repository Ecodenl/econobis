<?php

use Illuminate\Database\Migrations\Migration;

class DeleteRevisionRecordsRevenueDistributionKwh extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        DB::table('revisions')
            ->where('revisionable_type', 'like', '%RevenueDistributionKwh%')
            ->delete();
        DB::table('revisions')
            ->where('revisionable_type', 'like', '%RevenueDistributionPartsKwh%')
            ->delete();
        DB::table('revisions')
            ->where('revisionable_type', 'like', '%RevenueDistributionValuesKwh%')
            ->delete();
        DB::table('revisions')
            ->where('revisionable_type', 'like', '%RevenueValuesKwh%')
            ->delete();
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
    }
}
