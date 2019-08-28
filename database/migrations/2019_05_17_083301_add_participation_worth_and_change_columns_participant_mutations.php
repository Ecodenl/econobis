<?php

use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddParticipationWorthAndChangeColumnsParticipantMutations extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('participant_mutations', function (Blueprint $table) {
            DB::statement('ALTER TABLE participant_mutations MODIFY amount_interest DOUBLE(8,2);');
            DB::statement('ALTER TABLE participant_mutations MODIFY amount_option DOUBLE(8,2);');
            DB::statement('ALTER TABLE participant_mutations MODIFY amount_granted DOUBLE(8,2);');
            DB::statement('ALTER TABLE participant_mutations MODIFY amount_final DOUBLE(8,2);');
            $table->double('participation_worth', 8, 2)->nullable()->after('quantity_final');
        });
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