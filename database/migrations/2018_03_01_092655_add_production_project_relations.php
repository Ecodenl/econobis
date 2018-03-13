<?php

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddProductionProjectRelations extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('tasks', function (Blueprint $table) {
            $table->unsignedInteger('production_project_id')->nullable();
            $table->foreign('production_project_id')
                ->references('id')->on('production_projects')
                ->onDelete('restrict');
        });

        Schema::table('emails', function (Blueprint $table) {
            $table->unsignedInteger('production_project_id')->nullable();
            $table->foreign('production_project_id')
                ->references('id')->on('production_projects')
                ->onDelete('restrict');
        });

        Schema::table('documents', function (Blueprint $table) {
            $table->unsignedInteger('production_project_id')->nullable();
            $table->foreign('production_project_id')
                ->references('id')->on('production_projects')
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
        Schema::table('tasks', function (Blueprint $table) {
            $table->dropForeign(['production_project_id']);
            $table->dropColumn('production_project_id');
        });

        Schema::table('emails', function (Blueprint $table) {
            $table->dropForeign(['production_project_id']);
            $table->dropColumn('production_project_id');
        });

        Schema::table('documents', function (Blueprint $table) {
            $table->dropForeign(['production_project_id']);
            $table->dropColumn('production_project_id');
        });
    }
}
