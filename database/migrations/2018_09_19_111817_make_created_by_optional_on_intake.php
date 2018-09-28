<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class MakeCreatedByOptionalOnIntake extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('intakes', function (Blueprint $table) {
            $table->unsignedInteger('created_by_id')->nullable()->change();
            $table->unsignedInteger('updated_by_id')->nullable()->change();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('intakes', function (Blueprint $table) {
            //
        });
    }
}
