<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class RemoveGroupEmailParticipantPivot extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('email_group_email_addresses', function (Blueprint $table) {
            $table->dropForeign(['participant_id']);
            $table->dropColumn('participant_id');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('email_group_email_addresses', function (Blueprint $table) {
            $table->unsignedInteger('participant_id')->nullable();
            $table->foreign('participant_id')
                ->references('id')->on('participation_production_project')
                ->onDelete('restrict');


        });
    }
}
