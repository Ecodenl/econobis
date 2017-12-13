<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTaskAttachmentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('task_attachments', function (Blueprint $table) {
            $table->increments('id');

            $table->string('filename')->default('');
            $table->string('name')->default('');

            $table->unsignedInteger('task_id');
            $table->foreign('task_id')
                ->references('id')->on('tasks')
                ->onDelete('restrict');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('task_attachments');
    }
}
