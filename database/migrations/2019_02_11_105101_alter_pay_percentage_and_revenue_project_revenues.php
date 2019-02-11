<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AlterPayPercentageAndRevenueProjectRevenues extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('project_revenues', function (Blueprint $table) {
            DB::statement('ALTER TABLE project_revenues MODIFY revenue DOUBLE(10,2);');
            DB::statement('ALTER TABLE project_revenues MODIFY pay_percentage DOUBLE(5, 2);');
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