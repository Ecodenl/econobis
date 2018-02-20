<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddRelationsToEmail extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('emails', function (Blueprint $table) {
            $table->unsignedInteger('task_id')->nullable()->default(null);
            $table->foreign('task_id')
                ->references('id')->on('tasks')
                ->onDelete('restrict');

            $table->unsignedInteger('quotation_request_id')->nullable()->default(null);
            $table->foreign('quotation_request_id')
                ->references('id')->on('quotation_requests')
                ->onDelete('restrict');

            $table->unsignedInteger('measure_id')->nullable()->default(null);
            $table->foreign('measure_id')
                ->references('id')->on('measures')
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
