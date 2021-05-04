<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddSceFieldsToProjectsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('projects', function (Blueprint $table) {
            $table->boolean('subsidy_provided')->default(false)->after('project_type_id');
            $table->boolean('check_double_addresses')->default(false)->after('project_type_id');
            $table->string('base_project_code_ref', 16)->nullable()->after('project_type_id');
            $table->boolean('is_sce_project')->default(false)->after('project_type_id');
            $table->string('text_info_project_only_members')->default('Om in te schrijven voor dit project moet u eerst lid worden van onze coöperatie.')->after('is_membership_required');
            $table->boolean('visible_for_all_contacts')->default(false)->after('is_membership_required');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        if (Schema::hasColumn('projects', 'visible_for_all_contacts'))
        {
            Schema::table('projects', function (Blueprint $table)
            {
                $table->dropColumn('visible_for_all_contacts');
            });
        }
        if (Schema::hasColumn('projects', 'text_info_project_only_members'))
        {
            Schema::table('projects', function (Blueprint $table)
            {
                $table->dropColumn('text_info_project_only_members');
            });
        }
        if (Schema::hasColumn('projects', 'is_sce_project'))
        {
            Schema::table('projects', function (Blueprint $table)
            {
                $table->dropColumn('is_sce_project');
            });
        }
        if (Schema::hasColumn('projects', 'base_project_code_ref'))
        {
            Schema::table('projects', function (Blueprint $table)
            {
                $table->dropColumn('base_project_code_ref');
            });
        }
        if (Schema::hasColumn('projects', 'check_double_addresses'))
        {
            Schema::table('projects', function (Blueprint $table)
            {
                $table->dropColumn('check_double_addresses');
            });
        }
        if (Schema::hasColumn('projects', 'subsidy_provided'))
        {
            Schema::table('projects', function (Blueprint $table)
            {
                $table->dropColumn('subsidy_provided');
            });
        }
    }
}
