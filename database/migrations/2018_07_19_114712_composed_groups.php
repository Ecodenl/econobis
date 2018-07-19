<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class ComposedGroups extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('composed_contact_group', function (Blueprint $table) {
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
        Schema::dropIfExists('composed_contact_group');
    }
}
