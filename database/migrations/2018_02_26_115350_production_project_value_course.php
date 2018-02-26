<?php

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class ProductionProjectValueCourse extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('production_project_value_course', function (Blueprint $table) {
            $table->increments('id');

            $table->unsignedInteger('production_project_id');
            $table->foreign('production_project_id')
                ->references('id')->on('production_projects')
                ->onDelete('restrict');

            $table->date('date');

            $table->float('book_worth');
            $table->float('transfer_worth')->nullable();

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
        Schema::dropIfExists('production_project_value_course');
    }
}
