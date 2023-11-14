<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateFreeFieldsTablesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('free_fields_tables', function (Blueprint $table) {
            $table->increments('id');
            $table->string('table');
            $table->string('name');
            $table->timestamps();
        });
        Schema::create('free_fields_field_formats', function (Blueprint $table) {
            $table->increments('id');
            $table->string('format_type');
            $table->string('format_name');
            $table->unsignedInteger('format_length');
            $table->unsignedInteger('format_decimals');
            $table->timestamps();
        });
        Schema::create('free_fields_fields', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('table_id');
            $table->foreign('table_id')
                ->references('id')->on('free_fields_tables')
                ->onDelete('restrict');
            $table->unsignedInteger('field_format_id');
            $table->foreign('field_format_id')
                ->references('id')->on('free_fields_field_formats')
                ->onDelete('restrict');
            $table->string('field_name');
            $table->boolean('visible_portal');
            $table->boolean('change_portal');
            $table->boolean('mandatory');
            $table->string('default_value');
            $table->timestamps();
        });
        Schema::create('free_fields_field_records', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('field_id');
            $table->foreign('field_id')
                ->references('id')->on('free_fields_fields');
            $table->unsignedInteger('table_record_id');
            $table->text('field_value_text')->nullable();
            $table->boolean('field_value_boolean')->nullable();
            $table->integer('field_value_int')->nullable();
            $table->double('field_value_double')->nullable();
            $table->datetime('field_value_datetime')->nullable();
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
        Schema::dropIfExists('free_fields_field_records');
        Schema::dropIfExists('free_fields_fields');
        Schema::dropIfExists('free_fields_field_formats');
        Schema::dropIfExists('free_fields_tables');
    }
}
