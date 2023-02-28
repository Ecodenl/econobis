<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddMailTemplateSettingsToDistricts extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('districts', function (Blueprint $table) {
            $table->boolean('send_email_to_contact_when_planned')->default(false);
            $table->unsignedInteger('email_to_contact_template_id')->nullable();
            $table->foreign('email_to_contact_template_id')
                ->references('id')->on('email_templates')
                ->onDelete('restrict');

            $table->boolean('send_email_to_coach_when_planned')->default(false);
            $table->unsignedInteger('email_to_coach_template_id')->nullable();
            $table->foreign('email_to_coach_template_id')
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
        Schema::table('districts', function (Blueprint $table) {
            $table->dropForeign(['email_to_contact_template_id']);
            $table->dropColumn('email_to_contact_template_id');
            $table->dropColumn('send_email_to_contact_when_planned');

            $table->dropForeign(['email_to_coach_template_id']);
            $table->dropColumn('email_to_coach_template_id');
            $table->dropColumn('send_email_to_coach_when_planned');
        });
    }
}
