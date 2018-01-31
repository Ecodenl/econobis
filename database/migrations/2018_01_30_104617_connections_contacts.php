<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class ConnectionsContacts extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('people', function (Blueprint $table) {
            $table->dropForeign('people_occupation_id_foreign');
            $table->dropColumn(['occupation_id']);
        });

        Schema::create('occupation_person', function (Blueprint $table) {
            $table->unsignedInteger('occupation_id')->nullable();
            $table->foreign('occupation_id')
                ->references('id')->on('occupations')
                ->onDelete('restrict');

            $table->unsignedInteger('person_id')->nullable();
            $table->foreign('person_id')
                ->references('id')->on('people')
                ->onDelete('restrict');

            $table->unsignedInteger('organisation_id')->nullable();
            $table->foreign('organisation_id')
                ->references('id')->on('organisations')
                ->onDelete('restrict');

            $table->primary(['occupation_id', 'person_id', 'organisation_id'], 'primary_3_keys');

            $table->date('start_date')->nullable();
            $table->date('end_date')->nullable();
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
        //
    }
}
