<?php

use Illuminate\Database\Migrations\Migration;

class ChangeTaskTypeFactuurMaken extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //
        DB::table('task_types')
            ->where('name', 'Factuur maken')
            ->update(['name' => 'Nota maken']);
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
