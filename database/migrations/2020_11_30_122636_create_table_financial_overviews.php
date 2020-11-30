<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTableFinancialOverviews extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('financial_overviews', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('administration_id');
            $table->foreign('administration_id')->references('id')->on('administrations');
            $table->year('year');
            $table->boolean('definitive')->default(false);
            $table->timestamps();
        });

        Schema::create('financial_overview_projects', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('financial_overview_id');
            $table->foreign('financial_overview_id', 'fo_id_foreign')->references('id')->on('financial_overviews');
            $table->unsignedInteger('project_id');
            $table->foreign('project_id')->references('id')->on('projects');
            $table->boolean('definitive')->default(false);
            $table->timestamps();

        });

        Schema::create('financial_overview_participant_projects', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('financial_overview_project_id');
            $table->foreign('financial_overview_project_id', 'fop_id_foreign')->references('id')->on('financial_overview_projects');
            $table->unsignedInteger('participant_project_id');
            $table->foreign('participant_project_id','pp_id_foreign')->references('id')->on('participation_project');
            $table->double('start_value', 11, 2)->default(0);
            $table->double('end_value', 11, 2)->default(0);
            $table->timestamps();

        });

        Schema::table('participant_mutations', function (Blueprint $table) {
            $table->boolean('financial_overview_definitive')->default(false)->after('paid_on');
        });

    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        if (Schema::hasColumn('participant_mutations', 'financial_overview_definitive'))
        {
            Schema::table('participant_mutations', function (Blueprint $table)
            {
                $table->dropColumn('financial_overview_definitive');
            });
        }
        Schema::dropIfExists('financial_overview_participant_projects');
        Schema::dropIfExists('financial_overview_projects');
        Schema::dropIfExists('financial_overviews');
    }
}
