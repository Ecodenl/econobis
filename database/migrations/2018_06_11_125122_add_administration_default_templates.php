<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddAdministrationDefaultTemplates extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('administrations', function (Blueprint $table) {
            $table->unsignedInteger('email_template_id')->nullable();
            $table->foreign('email_template_id')
                ->references('id')->on('email_templates')
                ->onDelete('restrict');

            $table->unsignedInteger('email_template_reminder_id')->nullable();
            $table->foreign('email_template_reminder_id')
                ->references('id')->on('email_templates')
                ->onDelete('restrict');

            $table->unsignedInteger('email_template_exhortation_id')->nullable();
            $table->foreign('email_template_exhortation_id')
                ->references('id')->on('email_templates')
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
        Schema::table('administrations', function (Blueprint $table) {
            $table->dropForeign(['email_template_id']);
            $table->dropColumn('email_template_id');
            $table->dropForeign(['email_template_reminder_id']);
            $table->dropColumn('email_template_reminder_id');
            $table->dropForeign(['email_template_exhortation_id']);
            $table->dropColumn('email_template_exhortation_id');
        });
    }
}
