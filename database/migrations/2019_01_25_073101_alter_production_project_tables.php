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
        // Production projects
        Schema::rename('production_projects', 'projects');

        Schema::rename('production_project_revenue_category', 'project_revenue_category');
        Schema::rename('production_project_revenue_distribution', 'project_revenue_distribution');
        Schema::rename('production_project_revenue_type', 'project_revenue_type');
        Schema::rename('production_project_revenues', 'project_revenues');
        Schema::rename('production_project_status', 'project_status');
        Schema::rename('production_project_type', 'project_type');
        Schema::rename('production_project_value_course', 'project_value_course');

        Schema::rename('participant_production_project_payout_type', 'participant_project_payout_type');
        Schema::rename('participant_production_project_status', 'participant_project_status');
        Schema::rename('participation_production_project', 'participation_project');

        // Contact Group Participation
        Schema::table('contact_group_participation', function (Blueprint $table) {
            try{
                $table->dropForeign('contact_group_participation_production_project_id_foreign');
            }catch (\Exception $e){
                // Voor het geval de foreign key niet bestaat
            }
            $table->renameColumn('production_project_id', 'project_id');
            $table->foreign('project_id')
                ->references('id')->on('projects')
                ->onDelete('restrict');
        });

        // Documents
        Schema::table('documents', function (Blueprint $table) {
            try{
                $table->dropForeign('documents_production_project_id_foreign');
            }catch (\Exception $e){
                // Voor het geval de foreign key niet bestaat
            }
            $table->renameColumn('production_project_id', 'project_id');
            $table->foreign('project_id')
                ->references('id')->on('projects')
                ->onDelete('restrict');
        });
        Schema::table('documents', function (Blueprint $table) {
            try{
                $table->dropForeign('documents_participation_production_project_id_foreign');
            }catch (\Exception $e){
                // Voor het geval de foreign key niet bestaat
            }
            $table->renameColumn('participation_production_project_id', 'participation_project_id');
            $table->foreign('participation_project_id')
                ->references('id')->on('participation_project')
                ->onDelete('restrict');
        });

        // Emails
        Schema::table('emails', function (Blueprint $table) {
            try{
                $table->dropForeign('emails_production_project_id_foreign');
            }catch (\Exception $e){
                // Voor het geval de foreign key niet bestaat
            }
            $table->renameColumn('production_project_id', 'project_id');
            $table->foreign('project_id')
                ->references('id')->on('projects')
                ->onDelete('restrict');
        });

        Schema::table('project_revenues', function (Blueprint $table) {
            try{
                $table->dropForeign('production_project_revenues_production_project_id_foreign');
            }catch (\Exception $e){
                // Voor het geval de foreign key niet bestaat
            }
            $table->renameColumn('production_project_id', 'project_id');
            $table->foreign('project_id')
                ->references('id')->on('projects')
                ->onDelete('restrict');
        });

        Schema::table('project_value_course', function (Blueprint $table) {
            try{
                $table->dropForeign('production_project_value_course_production_project_id_foreign');
            }catch (\Exception $e){
                // Voor het geval de foreign key niet bestaat
            }
            $table->renameColumn('production_project_id', 'project_id');
            $table->foreign('project_id')
                ->references('id')->on('projects')
                ->onDelete('restrict');
        });

        Schema::table('projects', function (Blueprint $table) {
            try{
                $table->dropForeign('production_projects_production_project_status_id_foreign');
            }catch (\Exception $e){
                // Voor het geval de foreign key niet bestaat
            }
            $table->renameColumn('production_project_status_id', 'project_status_id');
            $table->foreign('project_status_id')
                ->references('id')->on('project_status')
                ->onDelete('restrict');
        });
        Schema::table('projects', function (Blueprint $table) {
            try{
                $table->dropForeign('production_projects_production_project_type_id_foreign');
            }catch (\Exception $e){
                // Voor het geval de foreign key niet bestaat
            }
            $table->renameColumn('production_project_type_id', 'project_type_id');
            $table->foreign('project_type_id')
                ->references('id')->on('project_type')
                ->onDelete('restrict');
        });

        // Participant production project
        Schema::table('participation_project', function (Blueprint $table) {
            try{
                $table->dropForeign('participation_production_project_production_project_id_foreign');
            }catch (\Exception $e){
                // Voor het geval de foreign key niet bestaat
            }
            $table->renameColumn('production_project_id', 'project_id');
            $table->foreign('project_id')
                ->references('id')->on('projects')
                ->onDelete('restrict');
        });

        // Tasks
        Schema::table('tasks', function (Blueprint $table) {
            try{
                $table->dropForeign('tasks_production_project_id_foreign');
            }catch (\Exception $e){
                // Voor het geval de foreign key niet bestaat
            }
            $table->renameColumn('production_project_id', 'project_id');
            $table->foreign('project_id')
                ->references('id')->on('projects')
                ->onDelete('restrict');
        });
        Schema::table('tasks', function (Blueprint $table) {
            try{
                $table->dropForeign('tasks_participation_production_project_id_foreign');
            }catch (\Exception $e){
                // Voor het geval de foreign key niet bestaat
            }
            $table->renameColumn('participation_production_project_id', 'participation_project_id');
            $table->foreign('participation_project_id')
                ->references('id')->on('participation_project')
                ->onDelete('restrict');
        });

        // Overige foreign keys bijwerken
        $this->renameForeign('participation_project', 'participation_production_project_contact_id_foreign', 'contact_id', 'contacts');
        $this->renameForeign('participation_project', 'participation_production_project_gifted_by_contact_id_foreign', 'gifted_by_contact_id', 'contacts');
        $this->renameForeign('participation_project', 'participation_production_project_legal_rep_contact_id_foreign', 'legal_rep_contact_id', 'contacts');
        $this->renameForeign('participation_project', 'participation_production_project_status_id_foreign', 'status_id', 'participant_project_status');
        $this->renameForeign('participation_project', 'participation_production_project_type_id_foreign', 'type_id', 'participant_project_payout_type');
        $this->renameForeign('project_revenue_distribution', 'production_project_revenue_distribution_contact_id_foreign', 'contact_id', 'contacts');
        $this->renameForeign('project_revenue_distribution', 'production_project_revenue_distribution_es_id_foreign', 'es_id', 'energy_suppliers');
        $this->renameForeign('project_revenue_distribution', 'production_project_revenue_distribution_participation_id_foreign', 'participation_id', 'participation_project');
        $this->renameForeign('project_revenue_distribution', 'production_project_revenue_distribution_revenue_id_foreign', 'revenue_id', 'project_revenues');
        $this->renameForeign('project_revenues', 'production_project_revenues_category_id_foreign', 'category_id', 'project_revenue_category');
        $this->renameForeign('project_revenues', 'production_project_revenues_created_by_id_foreign', 'created_by_id', 'users');
        $this->renameForeign('project_revenues', 'production_project_revenues_type_id_foreign', 'type_id', 'project_revenue_type');
        $this->renameForeign('project_value_course', 'production_project_value_course_created_by_id_foreign', 'created_by_id', 'users');
        $this->renameForeign('projects', 'production_projects_administration_id_foreign', 'administration_id', 'administrations');
        $this->renameForeign('projects', 'production_projects_created_by_id_foreign', 'created_by_id', 'users');
        $this->renameForeign('projects', 'production_projects_owned_by_id_foreign', 'owned_by_id', 'users');

        // Permissions
        DB::table('permissions')
            ->where('name','manage_production_project')
            ->update([
                "name" => "manage_project"
            ]);
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


        Schema::table('participation_production_project', function (Blueprint $table) {
            $table->renameColumn('project_id', 'production_project_id');
        });

        Schema::table('production_project_revenues', function (Blueprint $table) {
            $table->renameColumn('project_id', 'production_project_id');
        });

        Schema::table('production_project_value_course', function (Blueprint $table) {
            $table->renameColumn('project_id', 'production_project_id');
        });

        Schema::table('production_projects', function (Blueprint $table) {
            $table->renameColumn('project_status_id', 'production_project_status_id');
            $table->renameColumn('project_type_id', 'production_project_type_id');
        });

        // Tasks
        Schema::table('tasks', function (Blueprint $table) {
            $table->renameColumn('project_id', 'production_project_id');
            $table->renameColumn('participation_project_id', 'participation_production_project_id');
        });

        // Permissions
        DB::table('permissions')
            ->where('name','manage_project')
            ->update([
                "name" => "manage_production_project"
            ]);
    }

    protected function renameForeign(string $table, string $oldForeign, string $column, string $foreignTable)
    {
        Schema::table($table, function (Blueprint $table) use ($foreignTable, $column, $oldForeign) {
            try {
                $table->dropForeign($oldForeign);
            } catch (Exception $e) {
                // Voor het geval de foreign key niet bestaat
            }
            $table->foreign($column)
                ->references('id')->on($foreignTable)
                ->onDelete('restrict');
        });
    }
}