<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddNewWorkflowEmailFieldsToOpportunityStatusTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('opportunity_status', function (Blueprint $table) {
            $table->integer('number_of_days_to_send_email')->default(0)->after('name');
            $table->unsignedInteger('email_template_id_wf')->nullable()->after('name');
            $table->foreign('email_template_id_wf')
                ->references('id')->on('email_templates')
                ->onDelete('restrict');
            $table->boolean('uses_wf')->default(false)->after('name');
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
    }
}
