<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateDocumentTemplate extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('document_templates', function (Blueprint $table) {
            $table->increments('id');
            $table->string('number');
            $table->string('characteristic')->nullable();
            $table->text('html_body')->nullable();
            $table->string('name')->nullable();
            $table->string('document_group')->nullable();;
            $table->string('template_type');

            $table->unsignedInteger('base_template_id')->nullable();
            $table->foreign('base_template_id')
                ->references('id')->on('document_templates')
                ->onDelete('restrict');

            $table->unsignedInteger('header_id')->nullable();
            $table->foreign('header_id')
                ->references('id')->on('document_templates')
                ->onDelete('restrict');

            $table->unsignedInteger('footer_id')->nullable();
            $table->foreign('footer_id')
                ->references('id')->on('document_templates')
                ->onDelete('restrict');

            $table->boolean('active');

            $table->unsignedInteger('created_by_id')->nullable();
            $table->foreign('created_by_id')
                ->references('id')->on('users')
                ->onDelete('restrict');

            $table->timestamps();
        });

        Schema::create('document_template_role', function (Blueprint $table) {
            $table->integer('document_template_id')->unsigned();
            $table->foreign('document_template_id')->references('id')->on('document_templates')->onDelete('restrict');

            $table->integer('role_id')->unsigned();
            $table->foreign('role_id')->references('id')->on('roles')->onDelete('restrict');
            $table->unique(['document_template_id','role_id']);

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
        Schema::dropIfExists('document_template_role');
    }
}
