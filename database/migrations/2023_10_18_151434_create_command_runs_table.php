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
        Schema::create('command_runs', function (Blueprint $table) {
            $table->id();
            $table->string('app_cooperation_name');
            $table->unsignedInteger('schedule_run_id');
            $table->string('scheduled_commands_command_ref');
            $table->dateTime('start_at');
            $table->dateTime('end_at')->nullable();
            $table->boolean('finished');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('command_runs');
    }
};
