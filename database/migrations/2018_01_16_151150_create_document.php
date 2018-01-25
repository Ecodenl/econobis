<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateDocument extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('documents', function (Blueprint $table) {
            $table->increments('id');
            $table->string('number');
            $table->string('filename');
            $table->string('description')->nullable();
            $table->string('document_type');
            $table->string('document_group');
            $table->string('free_text_1')->nullable();
            $table->string('free_text_2')->nullable();

            $table->unsignedInteger('contact_id')->nullable();
            $table->foreign('contact_id')
                ->references('id')->on('contacts')
                ->onDelete('restrict');

            $table->unsignedInteger('contact_group_id')->nullable();
            $table->foreign('contact_group_id')
                ->references('id')->on('contact_groups')
                ->onDelete('restrict');

            $table->unsignedInteger('opportunity_id')->nullable();
            $table->foreign('opportunity_id')
                ->references('id')->on('opportunities')
                ->onDelete('restrict');

            $table->unsignedInteger('sent_by_id')->nullable();
            $table->foreign('sent_by_id')
                ->references('id')->on('users')
                ->onDelete('restrict');

            $table->unsignedInteger('created_by_id');
            $table->foreign('created_by_id')
                ->references('id')->on('users')
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
        Schema::dropIfExists('documents');
    }
}
