<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddParticipationIdToProjectRevenuesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('project_revenues', function (Blueprint $table) {
            $table->unsignedInteger('participation_id')->nullable()->default(null)->after('project_id');
            $table->foreign('participation_id')
                ->references('id')->on('participation_project')
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
        if (Schema::hasColumn('project_revenues', 'participation_id'))
        {
            Schema::table('project_revenues', function (Blueprint $table)
            {
                $table->dropForeign('project_revenues_participation_id_foreign');
                $table->dropColumn('participation_id');
            });
        }
    }
}
