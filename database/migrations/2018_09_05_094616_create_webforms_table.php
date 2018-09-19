<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateWebformsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('webforms', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name');
            $table->text('api_key');
            $table->integer('max_requests_per_minute');
            $table->date('date_start')->nullable();
            $table->date('date_end')->nullable();
            $table->date('api_key_date');
            $table->unsignedInteger('responsible_user_id')->nullable();
            $table->foreign('responsible_user_id')
                ->references('id')->on('users')
                ->onDelete('restrict');
            $table->unsignedInteger('responsible_team_id')->nullable();
            $table->foreign('responsible_team_id')
                ->references('id')->on('teams')
                ->onDelete('restrict');
            $table->text('last_requests');
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
        Schema::dropIfExists('webforms');
    }
}
