<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddNewWorkflowFieldsToMeasureCategoriesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('measure_categories', function (Blueprint $table) {
            $table->unsignedInteger('email_template_id_wf_create_quotation_request')->nullable()->after('name');
            $table->foreign('email_template_id_wf_create_quotation_request', 'measure_categories_email_template_id_wf_cqr_foreign')
                ->references('id')->on('email_templates')
                ->onDelete('restrict');
            $table->boolean('uses_wf_email_quotation_request')->default(false)->after('name');
            $table->unsignedInteger('organisation_id_wf_create_quotation_request')->nullable()->after('name');
            $table->foreign('organisation_id_wf_create_quotation_request', 'measure_categories_organisation_id_wf_cqr_foreign')
                ->references('id')->on('organisations')
                ->onDelete('restrict');
            $table->boolean('uses_wf_create_quotation_request')->default(false)->after('name');
            $table->unsignedInteger('opportunity_status_id_wf_create_opportunity')->nullable()->after('name');
            $table->foreign('opportunity_status_id_wf_create_opportunity', 'measure_categories_opportunity_status_id_wf_cqr_foreign')
                ->references('id')->on('measures')
                ->onDelete('restrict');
            $table->unsignedInteger('measure_id_wf_create_opportunity')->nullable()->after('name');
            $table->foreign('measure_id_wf_create_opportunity', 'measure_categories_measure_id_wf_co_foreign')
                ->references('id')->on('measures')
                ->onDelete('restrict');
            $table->boolean('uses_wf_create_opportunity')->default(false)->after('name');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        if (Schema::hasColumn('measure_categories', 'email_template_id_wf_create_quotation_request'))
        {
            Schema::table('measure_categories', function (Blueprint $table)
            {
                $table->dropForeign('measure_categories_email_template_id_wf_cqr_foreign');
                $table->dropColumn('email_template_id_wf_create_quotation_request');
            });
        }
        if (Schema::hasColumn('measure_categories', 'uses_wf_email_quotation_request'))
        {
            Schema::table('measure_categories', function (Blueprint $table)
            {
                $table->dropColumn('uses_wf_email_quotation_request');
            });
        }
        if (Schema::hasColumn('measure_categories', 'organisation_id_wf_create_quotation_request'))
        {
            Schema::table('measure_categories', function (Blueprint $table)
            {
                $table->dropForeign('measure_categories_organisation_id_wf_cqr_foreign');
                $table->dropColumn('organisation_id_wf_create_quotation_request');
            });
        }
        if (Schema::hasColumn('measure_categories', 'uses_wf_create_quotation_request'))
        {
            Schema::table('measure_categories', function (Blueprint $table)
            {
                $table->dropColumn('uses_wf_create_quotation_request');
            });
        }
        if (Schema::hasColumn('measure_categories', 'opportunity_status_id_wf_create_opportunity'))
        {
            Schema::table('measure_categories', function (Blueprint $table)
            {
                $table->dropForeign('measure_categories_opportunity_status_id_wf_cqr_foreign');
                $table->dropColumn('opportunity_status_id_wf_create_opportunity');
            });
        }
        if (Schema::hasColumn('measure_categories', 'measure_id_wf_create_opportunity'))
        {
            Schema::table('measure_categories', function (Blueprint $table)
            {
                $table->dropForeign('measure_categories_measure_id_wf_co_foreign');
                $table->dropColumn('measure_id_wf_create_opportunity');
            });
        }
        if (Schema::hasColumn('measure_categories', 'uses_wf_create_opportunity'))
        {
            Schema::table('measure_categories', function (Blueprint $table)
            {
                $table->dropColumn('uses_wf_create_opportunity');
            });
        }
    }
}
