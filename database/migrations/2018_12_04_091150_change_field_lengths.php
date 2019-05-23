<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\Schema;

class ChangeFieldLengths extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('production_projects', function ($table) {
            $table->string('description', 2500)->change();
        });

        Schema::table('intakes', function ($table) {
            $table->string('note', 2500)->change();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('production_projects', function ($table) {
            $table->string('description', 191)->change();
        });

        Schema::table('intakes', function ($table) {
            $table->string('note', 191)->change();
        });
    }
}
