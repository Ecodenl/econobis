<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateContactGroupsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('contact_groups', function (Blueprint $table) {
            $table->increments('id');

            $table->string('name')->default('');
            $table->text('description');
            $table->boolean('closed')->default(0);

            $table->unsignedInteger('responsible_user_id')->nullable()->default(null);
            $table->foreign('responsible_user_id')
                ->references('id')->on('users')
                ->onDelete('restrict');

            $table->date('date_started')->nullable()->default(null);
            $table->date('date_finished')->nullable()->default(null);

            $table->unsignedInteger('created_by_id')->nullable()->default(null);
            $table->foreign('created_by_id')
                ->references('id')->on('users')
                ->onDelete('restrict');

            $table->timestamps();
        });

        Schema::create('contact_groups_pivot', function (Blueprint $table) {
            $table->unsignedInteger('contact_id');
            $table->foreign('contact_id')
                ->references('id')->on('contacts')
                ->onDelete('restrict');

            $table->unsignedInteger('contact_group_id');
            $table->foreign('contact_group_id')
                ->references('id')->on('contact_groups')
                ->onDelete('restrict');

            $table->unique(['contact_id', 'contact_group_id']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('contact_groups');
    }
}
