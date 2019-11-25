<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddNewWorkflowEmailFieldsToTaskTypesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('task_types', function (Blueprint $table) {
            $table->unsignedInteger('email_template_id_wf_expired_task')->nullable()->after('name');
            $table->foreign('email_template_id_wf_expired_task')
                ->references('id')->on('email_templates')
                ->onDelete('restrict');
            $table->boolean('uses_wf_expired_task')->default(false)->after('name');

            $table->integer('number_of_days_to_send_email_completed_task')->default(0)->after('name');
            $table->unsignedInteger('email_template_id_wf_completed_task')->nullable()->after('name');
            $table->foreign('email_template_id_wf_completed_task')
                ->references('id')->on('email_templates')
                ->onDelete('restrict');
            $table->boolean('uses_wf_completed_task')->default(false)->after('name');
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
//        Schema::dropIfExists('email_template_id_wf_expired_task');
//        Schema::dropIfExists('uses_wf_expired_task');
//        Schema::dropIfExists('number_of_days_to_send_email_completed_task');
//        Schema::dropIfExists('email_template_id_wf_completed_task');
//        Schema::dropIfExists('uses_wf_completed_task');
    }
}
