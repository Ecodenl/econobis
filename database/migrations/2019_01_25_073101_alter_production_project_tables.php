<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AlterProductionProjectTables extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {


        // Contact Group Participation
        Schema::table('contact_group_participation', function (Blueprint $table) {
            $table->renameColumn('production_project_id', 'project_id');
        });

        // Documents
        Schema::table('documents', function (Blueprint $table) {
            $table->renameColumn('production_project_id', 'project_id');
            $table->renameColumn('participation_production_project_id', 'participation_project_id');
        });

        // Emails
        Schema::table('emails', function (Blueprint $table) {
            $table->renameColumn('production_project_id', 'project_id');
        });

        // Production projects
        Schema::rename('production_project_revenue_category', 'project_revenue_category');

        Schema::rename('production_project_revenue_distribution', 'project_revenue_distribution');

        Schema::rename('production_project_revenue_type', 'project_revenue_type');

        Schema::rename('production_project_revenues', 'project_revenues');
        Schema::table('project_revenues', function (Blueprint $table) {
            $table->renameColumn('production_project_id', 'project_id');
        });

        Schema::rename('production_project_status', 'project_status');

        Schema::rename('production_project_type', 'project_type');

        Schema::rename('production_project_value_course', 'project_value_course');
        Schema::table('project_value_course', function (Blueprint $table) {
            $table->renameColumn('production_project_id', 'project_id');
        });

        Schema::rename('production_projects', 'projects');
        Schema::table('projects', function (Blueprint $table) {
            $table->renameColumn('production_project_status_id', 'project_status_id');
            $table->renameColumn('production_project_type_id', 'project_type_id');
        });

        // Participant production project
        Schema::rename('participant_production_project_payout_type', 'participant_project_payout_type');

        Schema::rename('participant_production_project_status', 'participant_project_status');

        Schema::rename('participation_production_project', 'participation_project');
        Schema::table('participation_project', function (Blueprint $table) {
            $table->renameColumn('production_project_id', 'project_id');
        });

        // Tasks
        Schema::table('tasks', function (Blueprint $table) {
            $table->renameColumn('production_project_id', 'project_id');
            $table->renameColumn('participation_production_project_id', 'participation_project_id');
        });

    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {

        // Contact Group Participation
        Schema::table('contact_group_participation', function (Blueprint $table) {
            $table->renameColumn('project_id', 'production_project_id');
        });

        // Documents
        Schema::table('documents', function (Blueprint $table) {
            $table->renameColumn('project_id', 'production_project_id');
            $table->renameColumn('participation_project_id', 'participation_production_project_id');
        });

        // Emails
        Schema::table('emails', function (Blueprint $table) {
            $table->renameColumn('project_id', 'production_project_id');
        });

        // Participant production project
        Schema::rename('participant_project_payout_type', 'participant_production_project_payout_type');

        Schema::rename('participant_project_status', 'participant_production_project_status');

        Schema::rename('participation_project', 'participation_production_project');
        Schema::table('participation_production_project', function (Blueprint $table) {
            $table->renameColumn('project_id', 'production_project_id');
        });

        // Production projects
        Schema::rename('project_revenue_category', 'production_project_revenue_category');
        Schema::rename('project_revenue_distribution', 'production_project_revenue_distribution');
        Schema::rename('project_revenue_type', 'production_project_revenue_type');
        Schema::rename('project_revenues', 'production_project_revenues');
        Schema::table('production_project_revenues', function (Blueprint $table) {
            $table->renameColumn('project_id', 'production_project_id');
        });

        Schema::rename('project_status', 'production_project_status');
        Schema::rename('project_type', 'production_project_type');
        Schema::rename('project_value_course', 'production_project_value_course');
        Schema::table('production_project_value_course', function (Blueprint $table) {
            $table->renameColumn('project_id', 'production_project_id');
        });

        Schema::rename('projects', 'production_projects');
        Schema::table('production_projects', function (Blueprint $table) {
            $table->renameColumn('project_status_id', 'production_project_status_id');
            $table->renameColumn('project_type_id', 'production_project_type_id');
        });

        // Tasks
        Schema::table('tasks', function (Blueprint $table) {
            $table->renameColumn('project_id', 'production_project_id');
            $table->renameColumn('participation_project_id', 'participation_production_project_id');
        });
    }
}