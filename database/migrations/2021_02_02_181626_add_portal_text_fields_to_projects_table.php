<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddPortalTextFieldsToProjectsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('projects', function (Blueprint $table) {
            $table->string('text_agree_terms', 2500)->default('');
            $table->string('text_link_agree_terms')->default('');
            $table->string('text_link_understand_info')->default('');
            $table->string('text_accept_agreement', 2500)->default('');
            $table->string('text_accept_agreement_question')->default('');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('projects', function (Blueprint $table) {
            $table->dropColumn('text_agree_terms');
            $table->dropColumn('text_link_agree_terms');
            $table->dropColumn('text_link_understand_info');
            $table->dropColumn('text_accept_agreement');
            $table->dropColumn('text_accept_agreement_question');
        });
    }
}
