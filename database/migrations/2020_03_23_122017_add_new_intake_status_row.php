<?php

use Illuminate\Database\Migrations\Migration;

class AddNewIntakeStatusRow extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        \Illuminate\Support\Facades\DB::insert('insert into intake_status (name) values (?)', ['In behandeling']);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        \Illuminate\Support\Facades\DB::delete('delete from intake_status where name = ?', ['In behandeling']);
    }
}
