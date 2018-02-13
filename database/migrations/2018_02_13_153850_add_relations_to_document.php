<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddRelationsToDocument extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('documents', function (Blueprint $table) {
            $table->unsignedInteger('campaign_id')->nullable()->default(null);
            $table->foreign('campaign_id')
                ->references('id')->on('campaigns')
                ->onDelete('restrict');

            $table->unsignedInteger('housing_file_id')->nullable()->default(null);
            $table->foreign('housing_file_id')
                ->references('id')->on('housing_files')
                ->onDelete('restrict');

            $table->unsignedInteger('quotation_request_id')->nullable()->default(null);
            $table->foreign('quotation_request_id')
                ->references('id')->on('quotation_requests')
                ->onDelete('restrict');

            $table->unsignedInteger('measure_id')->nullable()->default(null);
            $table->foreign('measure_id')
                ->references('id')->on('measures')
                ->onDelete('restrict');

            $table->unsignedInteger('task_id')->nullable()->default(null);
            $table->foreign('task_id')
                ->references('id')->on('tasks')
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
    }
}
