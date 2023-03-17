<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class ChangeTransferWorthNotNullableInProjectValueCourseTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        DB::table('project_value_course')->whereNull('transfer_worth')->update(["transfer_worth" => 0]);

        Schema::table('project_value_course', function (Blueprint $table) {
            $table->float('transfer_worth')->nullable(false)->default(0)->change();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('project_value_course', function (Blueprint $table) {
            $table->float('transfer_worth')->nullable(true)->default(null)->change();
        });

        DB::table('project_value_course')->where('transfer_worth', 0)->update(["transfer_worth" => null]);
    }
}
