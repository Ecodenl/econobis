<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class ComposedContactGroupExcepted extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('composed_contact_group_excepted', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('parent_group_id');
            $table->foreign('parent_group_id')
                ->references('id')->on('contact_groups')
                ->onDelete('restrict');
            $table->unsignedInteger('group_id');
            $table->foreign('group_id')
                ->references('id')->on('contact_groups')
                ->onDelete('restrict');
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
        Schema::dropIfExists('composed_contact_group_excepted');
    }
}
