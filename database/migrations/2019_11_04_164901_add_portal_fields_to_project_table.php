<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddPortalFieldsToProjectTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('projects', function (Blueprint $table) {
            $table->string('link_agree_terms')->default('');
            $table->string('link_understand_info')->default('');
            $table->unsignedInteger('email_template_agreement_id')->nullable();
            $table->foreign('email_template_agreement_id')
                ->references('id')->on('email_templates')
                ->onDelete('restrict');
            $table->unsignedInteger('document_template_agreement_id')->nullable();
            $table->foreign('document_template_agreement_id')
                ->references('id')->on('document_templates')
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
        //
    }
}
