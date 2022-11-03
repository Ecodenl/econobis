<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddInspectionPlannedEmailTemplateIdToCooperations extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('cooperations', function (Blueprint $table) {
            $table->unsignedInteger('inspection_planned_email_template_id')->nullable();
            $table->foreign('inspection_planned_email_template_id')
                ->references('id')->on('email_templates')
                ->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('cooperations', function (Blueprint $table) {
            $table->dropForeign(['inspection_planned_email_template_id']);
            $table->dropColumn('inspection_planned_email_template_id');
        });
    }
}
