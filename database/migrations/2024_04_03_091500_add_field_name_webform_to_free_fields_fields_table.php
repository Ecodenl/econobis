<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddFieldNameWebformToFreeFieldsFieldsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('free_fields_fields', function (Blueprint $table) {
            $table->string('field_name_webform')->after('field_name');
        });
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
    }
}
