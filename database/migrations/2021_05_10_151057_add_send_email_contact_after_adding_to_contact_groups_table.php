<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddSendEmailContactAfterAddingToContactGroupsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('contact_groups', function (Blueprint $table) {
            $table->boolean('send_email_new_contact_link')->default(false);
            $table->unsignedInteger('email_template_id_new_contact_link')->nullable();
            $table->foreign('email_template_id_new_contact_link', 'contact_groups_email_template_id_new_contact_link_foreign')
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
        if (Schema::hasColumn('contact_groups', 'email_template_id_new_contact_link'))
        {
            Schema::table('contact_groups', function (Blueprint $table)
            {
                $table->dropForeign('contact_groups_email_template_id_new_contact_link_foreign');
                $table->dropColumn('email_template_id_new_contact_link');
            });
        }
        if (Schema::hasColumn('contact_groups', 'send_email_new_contact_link'))
        {
            Schema::table('contact_groups', function (Blueprint $table)
            {
                $table->dropColumn('send_email_new_contact_link');
            });
        }
    }
}
