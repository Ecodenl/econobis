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
            $table->text('note');

            $table->unsignedInteger('type_id');
            $table->foreign('type_id')
                ->references('id')->on('task_types')
                ->onDelete('restrict');

            $table->unsignedInteger('contact_id')->nullable()->default(null);
            $table->foreign('contact_id')
                ->references('id')->on('contacts')
                ->onDelete('restrict');

            $table->unsignedInteger('intake_id')->nullable()->default(null);
            $table->foreign('intake_id')
                ->references('id')->on('intakes')
                ->onDelete('restrict');

            $table->unsignedInteger('contact_group_id')->nullable()->default(null);
            $table->foreign('contact_group_id')
                ->references('id')->on('contact_groups')
                ->onDelete('restrict');

            $table->unsignedInteger('opportunity_id')->nullable()->default(null);
            $table->foreign('opportunity_id')
                ->references('id')->on('opportunities')
                ->onDelete('restrict');

            $table->boolean('finished')->default(false);
            $table->date('date_finished')->nullable();
            $table->unsignedInteger('finished_by_id')->nullable()->default(null);
            $table->foreign('finished_by_id')
                ->references('id')->on('users')
                ->onDelete('restrict');

            $table->date('date_planned_start')->nullable();
            $table->date('date_planned_finish')->nullable();

            $table->unsignedInteger('responsible_user_id')->nullable();
            $table->foreign('responsible_user_id')
                ->references('id')->on('users')
                ->onDelete('restrict');

            $table->unsignedInteger('created_by_id');
            $table->foreign('created_by_id')
                ->references('id')->on('users')
                ->onDelete('restrict');

            $table->unsignedInteger('updated_by_id');
            $table->foreign('updated_by_id')
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
