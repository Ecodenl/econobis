<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AlterEmailAddResponsible extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('emails', function (Blueprint $table) {
            $table->unsignedInteger('responsible_user_id')->nullable();
            $table->foreign('responsible_user_id')
                ->references('id')->on('users')
                ->onDelete('restrict');
            $table->unsignedInteger('responsible_team_id')->nullable();
            $table->foreign('responsible_team_id')
                ->references('id')->on('teams')
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
        Schema::table('emails', function (Blueprint $table) {
            $table->dropForeign(['responsible_team_id']);
            $table->dropForeign(['responsible_user_id']);
            $table->dropColumn('responsible_team_id');
            $table->dropColumn('responsible_user_id');
        });
    }
}
