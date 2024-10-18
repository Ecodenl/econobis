<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
//        Schema::dropIfExists('portal_free_fields_field_records');
//        Schema::dropIfExists('portal_free_fields_fields');
//        Schema::dropIfExists('portal_free_fields_pages');

        Schema::create('portal_free_fields_pages', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name');
            $table->boolean('is_active')->default(false);
            $table->text('description')->nullable();
            $table->string('url_page_ref');
            $table->timestamps();
        });

        Schema::create('portal_free_fields_fields', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('table_id');
            $table->foreign('table_id')
                ->references('id')->on('free_fields_tables')
                ->onDelete('restrict');
            $table->unsignedInteger('page_id');
            $table->foreign('page_id')
                ->references('id')->on('portal_free_fields_pages')
                ->onDelete('restrict');
            $table->unsignedInteger('field_format_id');
            $table->foreign('field_format_id')
                ->references('id')->on('free_fields_field_formats')
                ->onDelete('restrict');
            $table->string('field_name');
//            $table->boolean('visible_portal');
            $table->boolean('change_portal');
//            $table->boolean('mandatory');
//            $table->string('default_value');
//            $table->boolean('exportable')->default(true);
            $table->integer('sort_order');
            $table->timestamps();
        });
        Schema::create('portal_free_fields_field_records', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('field_id');
            $table->foreign('field_id')
                ->references('id')->on('portal_free_fields_fields');
            $table->unsignedInteger('table_record_id');
            $table->text('field_value_text')->nullable();
//            $table->boolean('field_value_boolean')->nullable();
//            $table->integer('field_value_int')->nullable();
//            $table->double('field_value_double')->nullable();
//            $table->datetime('field_value_datetime')->nullable();
            $table->timestamps();
            $table->index('table_record_id');

        });

    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('portal_free_fields_field_records');
        Schema::dropIfExists('portal_free_fields_fields');
        Schema::dropIfExists('portal_free_fields_pages');
    }
};
