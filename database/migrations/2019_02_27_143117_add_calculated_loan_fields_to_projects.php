<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddCalculatedLoanFieldsToProjects extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('participant_mutations', function (Blueprint $table) {
            $table->renameColumn('account', 'amount');
        });
        Schema::table('participation_project', function (Blueprint $table) {
            $table->integer('amount_definitive')->nullable(false)->default(0);
            $table->integer('amount_optioned')->nullable(false)->default(0);
        });
        Schema::table('projects', function (Blueprint $table) {
            $table->integer('amount_definitive')->nullable(false)->default(0);
            $table->integer('amount_optioned')->nullable(false)->default(0);
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
