<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class EditPeopleTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('people', function (Blueprint $table) {

            $table->integer('organisation_id')->nullable()->unsigned()->default(null);
            $table->foreign('organisation_id')->references('id')->on('organisations') ->onDelete('restrict');

            $table->integer('type_id')->nullable()->unsigned()->default(null);
            $table->foreign('type_id')->references('id')->on('person_types') ->onDelete('restrict');

            $table->date('date_of_birth')->nullable()->default(null);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('people', function (Blueprint $table) {
            //
        });
    }
}
