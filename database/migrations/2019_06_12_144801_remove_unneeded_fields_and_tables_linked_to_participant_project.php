<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class RemoveUnneededFieldsAndTablesLinkedToParticipantProject extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('participation_project', function (Blueprint $table) {
            $table->dropColumn('participations_requested');
            $table->dropColumn('participations_granted');
            $table->dropColumn('participations_sold');
            $table->dropColumn('participations_rest_sale');
        });

        Schema::dropIfExists('participant_transactions');
        Schema::dropIfExists('participant_transaction_type');
        Schema::dropIfExists('participant_project_status');
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
