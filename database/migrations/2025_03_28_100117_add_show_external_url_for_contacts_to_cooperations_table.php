<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddShowExternalUrlForContactsToCooperationsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('cooperations', function (Blueprint $table) {
            $table->boolean('show_external_url_for_contacts')->default(false)->after('use_export_address_consumption');
            $table->string('external_url_contacts')->after('show_external_url_for_contacts');
            $table->string('external_url_contacts_button_text')->after('show_external_url_for_contacts');
            $table->boolean('external_url_contacts_on_new_page')->default(true)->after('external_url_contacts_button_text');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        if (Schema::hasColumn('cooperations', 'external_url_contacts_on_new_page'))
        {
            Schema::table('cooperations', function (Blueprint $table)
            {
                $table->dropColumn('external_url_contacts_on_new_page');
            });
        }
        if (Schema::hasColumn('cooperations', 'external_url_contacts_button_text'))
        {
            Schema::table('cooperations', function (Blueprint $table)
            {
                $table->dropColumn('external_url_contacts_button_text');
            });
        }
        if (Schema::hasColumn('cooperations', 'external_url_contacts'))
        {
            Schema::table('cooperations', function (Blueprint $table)
            {
                $table->dropColumn('external_url_contacts');
            });
        }
        if (Schema::hasColumn('cooperations', 'show_external_url_for_contacts'))
        {
            Schema::table('cooperations', function (Blueprint $table)
            {
                $table->dropColumn('show_external_url_for_contacts');
            });
        }
    }
}
