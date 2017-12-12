<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTasksTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tasks', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name')->default('');
            $table->text('description');

            $table->unsignedInteger('type_id');
            $table->foreign('type_id')
                ->references('id')->on('task_types')
                ->onDelete('restrict');

            $table->unsignedInteger('contact_id')->nullable()->default(null);
            $table->foreign('contact_id')
                ->references('id')->on('contacts')
                ->onDelete('restrict');

            $table->unsignedInteger('status_id');

            $table->unsignedInteger('registration_id')->nullable()->default(null);
            $table->foreign('registration_id')
                ->references('id')->on('registrations')
                ->onDelete('restrict');

            $table->unsignedInteger('contact_group_id')->nullable()->default(null);
            $table->foreign('contact_group_id')
                ->references('id')->on('contact_groups')
                ->onDelete('restrict');

            $table->date('date_planned')->nullable();
            $table->date('date_started')->nullable();
            $table->date('date_finished')->nullable();

            $table->unsignedInteger('responsible_user_id');
            $table->foreign('responsible_user_id')
                ->references('id')->on('users')
                ->onDelete('restrict');

            $table->unsignedInteger('created_by_id');
            $table->foreign('created_by_id')
                ->references('id')->on('users')
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
        Schema::dropIfExists('tasks');
    }
}
