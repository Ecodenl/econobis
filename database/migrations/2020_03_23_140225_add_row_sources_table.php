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
        \Illuminate\Support\Facades\DB::insert('insert into sources (name) values (?)', ['Netwerk']);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        \Illuminate\Support\Facades\DB::delete('delete from sources where name = ?', ['Netwerk']);
    }
}
