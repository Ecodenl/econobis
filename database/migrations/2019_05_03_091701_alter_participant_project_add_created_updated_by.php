<?php

use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AlterParticipantProjectAddCreatedUpdatedBy extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('participation_project', function (Blueprint $table) {
            $table->unsignedInteger('created_by_id')->nullable()->default(null)->after('created_at');
            $table->foreign('created_by_id')
                ->references('id')->on('users')
                ->onDelete('restrict');
            $table->unsignedInteger('updated_by_id')->nullable()->default(null)->after('updated_at');
            $table->foreign('updated_by_id')
                ->references('id')->on('users')
                ->onDelete('restrict');
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