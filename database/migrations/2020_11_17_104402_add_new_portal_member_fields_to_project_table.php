<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddNewPortalMemberFieldsToProjectTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('projects', function (Blueprint $table) {
            $table->boolean('show_question_about_membership');
            $table->unsignedInteger('question_about_membership_group_id')->nullable();
            $table->foreign('question_about_membership_group_id')
                ->references('id')->on('contact_groups')
                ->onDelete('restrict');
            $table->string('text_is_member')->default('');
            $table->string('text_is_no_member')->default('');
            $table->string('text_become_member')->default('');
            $table->unsignedInteger('member_group_id')->nullable();
            $table->foreign('member_group_id')
                ->references('id')->on('contact_groups')
                ->onDelete('restrict');
            $table->string('text_become_no_member')->default('');
            $table->unsignedInteger('no_member_group_id')->nullable();
            $table->foreign('no_member_group_id')
                ->references('id')->on('contact_groups')
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
        Schema::table('projects', function (Blueprint $table) {
            $table->dropForeign(['no_member_group_id']);
            $table->dropColumn('no_member_group_id');
            $table->dropColumn('text_become_no_member');
            $table->dropForeign(['member_group_id']);
            $table->dropColumn('member_group_id');
            $table->dropColumn('text_become_member');
            $table->dropColumn('text_is_no_member');
            $table->dropColumn('text_is_member');
            $table->dropForeign(['question_about_membership_group_id']);
            $table->dropColumn('question_about_membership_group_id');
            $table->dropColumn('show_question_about_membership');

        });
    }
}
