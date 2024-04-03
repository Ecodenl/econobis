<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddFieldNameWebformToFreeFieldsFieldsTableAndPrefixFieldNameWebformToFreeFieldsTablesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('free_fields_fields', function (Blueprint $table) {
            $table->string('field_name_webform')->nullable()->after('field_name');
        });

        Schema::table('free_fields_tables', function (Blueprint $table) {
            $table->string('prefix_field_name_webform', 25)->nullable()->after('name');
        });

        DB::table('free_fields_tables')->where('table', 'contacts')->update(["prefix_field_name_webform" => 'contact_']);
        DB::table('free_fields_tables')->where('table', 'addresses')->update(["prefix_field_name_webform" => 'adres_']);
        DB::table('free_fields_tables')->where('table', 'projects')->update(["prefix_field_name_webform" => 'project_']);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('free_fields_fields', function (Blueprint $table) {
            $table->dropColumn('field_name_webform');
        });

        Schema::table('free_fields_tables', function (Blueprint $table) {
            $table->dropColumn('prefix_field_name_webform');
        });
    }
}
