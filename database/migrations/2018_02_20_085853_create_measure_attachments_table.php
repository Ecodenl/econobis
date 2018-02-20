<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateMeasureAttachmentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('measure_attachments', function (Blueprint $table) {
            $table->increments('id');

            $table->string('filename')->default('');
            $table->string('name')->default('');

            $table->unsignedInteger('measure_id');
            $table->foreign('measure_id')
                ->references('id')->on('measures')
                ->onDelete('restrict');

            $table->timestamps();

            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('measure_attachments');
    }
}