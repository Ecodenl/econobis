<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddWorkflowNewTaskToTaskTypesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('task_types', function (Blueprint $table) {
            $table->unsignedInteger('email_template_id_wf_new_task')->nullable()->after('name');
            $table->foreign('email_template_id_wf_new_task', 'task_types_email_template_id_wf_new_task_foreign')
                ->references('id')->on('email_templates')
                ->onDelete('restrict');
            $table->boolean('uses_wf_new_task')->default(false)->after('name');

        });

        Schema::table('tasks', function (Blueprint $table) {
            $table->dateTime('date_sent_wf_new_task')->nullable()->default(null);
        });

    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        if (Schema::hasColumn('tasks', 'date_sent_wf_new_task'))
        {
            Schema::table('tasks', function (Blueprint $table)
            {
                $table->dropColumn('date_sent_wf_new_task');
            });
        }
        if (Schema::hasColumn('task_types', 'uses_wf_new_task'))
        {
            Schema::table('task_types', function (Blueprint $table)
            {
                $table->dropColumn('uses_wf_new_task');
            });
        }
        if (Schema::hasColumn('task_types', 'email_template_id_wf_new_task'))
        {
            Schema::table('task_types', function (Blueprint $table)
            {
                $table->dropForeign('task_types_email_template_id_wf_new_task_foreign');
                $table->dropColumn('email_template_id_wf_new_task');
            });
        }

    }
}
