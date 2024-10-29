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
            $table->unsignedInteger('page_id');
            $table->foreign('page_id')
                ->references('id')->on('portal_free_fields_pages')
                ->onDelete('restrict');
            $table->unsignedInteger('field_id');
            $table->foreign('field_id')
                ->references('id')->on('free_fields_fields')
                ->onDelete('restrict');
            $table->boolean('change_portal');
            $table->integer('sort_order');
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
        Schema::dropIfExists('portal_free_fields_fields');
        Schema::dropIfExists('portal_free_fields_pages');
    }
};
