<?php

use Illuminate\Database\Migrations\Migration;

class AddRowSourcesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        \Illuminate\Support\Facades\DB::insert('insert into sources (name) values (?)', ['netwerk']);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        \Illuminate\Support\Facades\DB::delete('delete from sources where name = ?', ['netwerk']);
    }
}
