<?php

use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class ChangeParticipantProjectPayoutType extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('participant_project_payout_type', function (Blueprint $table) {
            $table->string('code_ref')->default('')->after('name');
            $table->softDeletes();
        });

        // Add code ref and sort order to all active statuses
        DB::table('participant_project_payout_type')
            ->where('name', 'Rekening')
            ->update(['code_ref' => 'account']);

        DB::table('participant_project_payout_type')
            ->where('name', 'Bijschrijven')
            ->update(['name' => 'Bijschrijven', 'code_ref' => 'credit']);

        // Add softdelete to table
        Schema::table('participant_project_payout_type', function (Blueprint $table) {

        });

        // Set existing status 'Energieleverancier' on delete
        DB::table('participant_project_payout_type')->where('name', 'Energieleverancier')->update(['deleted_at' => Carbon::now()]);

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